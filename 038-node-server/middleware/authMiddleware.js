const jwt = require('jsonwebtoken');

const JWT_SECRET = 'SECRET_SUPER_KUAT_HARUS_DIGANTI_NANTI'; 

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "Akses ditolak: Token tidak tersedia." });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Akses ditolak: Token tidak valid atau kadaluarsa." });
        }
        
        req.user = user; 
        next();
    });
};