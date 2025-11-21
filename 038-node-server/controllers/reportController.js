const { Presensi } = require("../models"); 

exports.getDailyReport = async (req, res) => { 
  try {
    const presensiRecords = await Presensi.findAll({
        order: [['checkIn', 'DESC']] 
    });

    console.log("Controller: Mengambil data laporan harian dari database...");
    
    res.json({
      reportDate: new Date().toLocaleDateString(),
      data: presensiRecords, 
    });

  } catch (error) {
    console.error("Error mengambil laporan:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil laporan", error: error.message });
  }
};