import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, FlaskConical, Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('medecin');

  const handleLogin = (e) => {
    e.preventDefault();
    // Prototype : redirection directe basée sur le rôle sélectionné
    if (role === 'medecin') navigate('/doctor');
    else if (role === 'labo') navigate('/lab');
    else if (role === 'admin') navigate('/doctor'); // Simplifié pour le prototype
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Stethoscope className="w-12 h-12 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">AFRIMED</h1>
        </div>
        <p className="text-center text-gray-600 mb-6">Prototype de consultation médicale assistée par IA</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profil de démonstration</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="medecin">Médecin (Dr. Ouédraogo)</option>
              <option value="labo">Laborantin</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" defaultValue="demo@afrimed.bf" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input type="password" defaultValue="password" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition">
            Se connecter
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500 mb-2">Accès Patient (par code unique)</p>
          <div className="flex gap-2">
            <input type="text" id="patientCode" placeholder="Ex: AFR-8X9" className="flex-1 p-3 border border-gray-300 rounded-lg" />
            <button 
              onClick={() => {
                const code = document.getElementById('patientCode').value;
                if(code) navigate(`/patient/${code}`);
              }}
              className="bg-secondary text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}