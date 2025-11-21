// src/components/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api/auth/register';
function RegisterPage() {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        role: 'mahasiswa' 
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post(API_URL, formData);
            setSuccess(response.data.message);
            
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (err) {
            setError(err.response ? err.response.data.message : 'Registrasi gagal');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>
                
                {success && <p className="text-green-600 text-center mb-4">{success}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input Nama */}
                    <div>
                        <label htmlFor="nama">Nama:</label>
                        <input type="text" name="nama" value={formData.nama} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    {/* Input Email */}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    {/* Input Password */}
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    {/* Input Role (mahasiswa/admin) */}
                    <div>
                        <label htmlFor="role">Role:</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value="mahasiswa">Mahasiswa</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;