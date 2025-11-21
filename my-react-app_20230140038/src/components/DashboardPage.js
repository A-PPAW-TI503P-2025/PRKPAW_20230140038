import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
function DashboardPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Pengguna');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                
                const decoded = jwtDecode(token);
                setUserName(decoded.nama || 'Pengguna'); 
            } catch (error) {
                console.error("Token decoding failed:", error);
                handleLogout(); 
            }
        } else {
            navigate('/login'); 
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Selamat Datang, {userName}!
                </h1>

                <p className="text-lg text-gray-700 mb-8">
                    Ini adalah Halaman Dashboard Anda. Akses Anda aman menggunakan JWT.
                </p>

                {/* Tombol Logout */}
                <button
                    onClick={handleLogout}
                    className="py-2 px-6 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;