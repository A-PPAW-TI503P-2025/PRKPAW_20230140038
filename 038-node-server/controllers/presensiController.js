const { Presensi } = require("../models"); 
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";


exports.CheckIn = async (req, res) => { 
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const existingRecord = await Presensi.findOne({
      where: { userId: userId, checkOut: null }, 
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ message: "Anda sudah melakukan check-in hari ini." }); 
    }

    const newRecord = await Presensi.create({
      userId: userId,
      nama: userName,
      checkIn: waktuSekarang,
    });

    const formattedData = {
      userId: newRecord.userId,
      nama: newRecord.nama,
      checkIn: format(newRecord.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
      checkOut: null 
    };

    console.log(
      `DATA TERUPDATE: Karyawan ${userName} (ID: ${userId}) melakukan check-in ke DB.`
    );
    res.status(201).json({
      message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: formattedData,
    });
  } catch (error) { 
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

exports.CheckOut = async (req, res) => { 
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    
    const recordToUpdate = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (!recordToUpdate) {
      return res.status(404).json({
        message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
      }); 
    }

    recordToUpdate.checkOut = waktuSekarang;
    await recordToUpdate.save();  

    const formattedData = {
      userId: recordToUpdate.userId,
      nama: recordToUpdate.nama,
      checkIn: format(recordToUpdate.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
      checkOut: format(recordToUpdate.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
    };

    console.log(
      `DATA TERUPDATE: Karyawan ${userName} (ID: ${userId}) melakukan check-out dari DB.`
    );
    res.json({
      message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: formattedData,
    });
  } catch (error) { 
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

exports.deletePresensi = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const presensiId = req.params.id; 
       
        const recordToDelete = await Presensi.findByPk(presensiId);
       
        if (!recordToDelete) {
          return res.status(404).json({ message: "Catatan presensi tidak ditemukan." });
        }

        if (recordToDelete.userId !== userId) {
          return res.status(403).json({ message: "Akses ditolak: Anda bukan pemilik catatan ini." });
        }

        await recordToDelete.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};

exports.updatePresensi = async (req, res) => {
    try {
        const presensiId = req.params.id;
    const { checkIn, checkOut, nama } = req.body;

    if (checkIn === undefined && checkOut === undefined && nama === undefined) {
      return res.status(400).json({ message: "Request body tidak berisi data yang valid untuk diupdate." });
    }

    const recordToUpdate = await Presensi.findByPk(presensiId);
    if (!recordToUpdate) {
      return res.status(404).json({ message: "Catatan presensi tidak ditemukan." });
    }

    // Validate and parse checkIn if provided
    if (checkIn !== undefined) {
      const parsedCheckIn = new Date(checkIn);
      if (isNaN(parsedCheckIn.getTime())) {
        return res.status(400).json({ message: "Nilai checkIn tidak valid. Gunakan format tanggal yang benar." });
      }
      recordToUpdate.checkIn = parsedCheckIn;
    }

    // Validate and parse checkOut if provided
    if (checkOut !== undefined) {
      const parsedCheckOut = new Date(checkOut);
      if (isNaN(parsedCheckOut.getTime())) {
        return res.status(400).json({ message: "Nilai checkOut tidak valid. Gunakan format tanggal yang benar." });
      }
      recordToUpdate.checkOut = parsedCheckOut;
    }

    // Update name if provided
    if (nama !== undefined) {
      recordToUpdate.nama = nama;
    }

    await recordToUpdate.save();

    res.json({ message: "Data presensi berhasil diperbarui.", data: recordToUpdate });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
   }
};