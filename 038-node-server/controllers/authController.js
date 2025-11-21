const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const JWT_SECRET = 'SECRET_SUPER_KUAT_HARUS_DIGANTI_NANTI'; 
const saltRounds = 10;


exports.register = async (req, res) => {
    try {

        if (!req.body) {
            return res.status(400).json({ message: "Request body tidak ditemukan." });
        }

        const { nama, email, password, role } = req.body;

        if (!email || !password || !nama) {
             return res.status(400).json({ message: "Nama, email, dan password wajib diisi." });
        }
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            nama,
            email,
            password: hashedPassword,
            role: role || 'karyawan', 
        });

        res.status(201).json({ 
            message: "Registrasi berhasil", 
            user: { id: newUser.id, nama: newUser.nama, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal registrasi.", error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body tidak ditemukan." });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Email atau password salah." }); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email atau password salah." });
        }

        const payload = {
            id: user.id,
            nama: user.nama,
            role: user.role 
        };
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1h' 
        });

        res.json({
            message: `Login berhasil sebagai ${user.role}`,
            token: token 
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};

