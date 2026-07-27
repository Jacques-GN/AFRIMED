import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle } from 'lucide-react';
import { mockLabRequests } from '../services/supabaseClient';

export default function LabDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(mockLabRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [resultText, setResultText] = useState('');

  const handleValidate = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Terminé', results: resultText } : r));
    setSelectedRequest(null);
    setResultText('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-sky-600">AFRIMED - Espace Laboratoire</h1>
        <button onClick={() => navigate('/login')} className="flex items-center text-gray-600 hover:text-red-500">
          <LogOut className="w-5 h-5 mr-1" /> Déconnexion
        </button>
      </header>
      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Demandes d'examens en attente</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr><th className="p-4">Date</th><th className="p-4">Patient</th><th className="p-4">Examen</th><th className="p-4">Statut</th><th className="p-4">Action</th></tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm">{req.date}</td>
                  <td className="p-4 font-medium">{req.patientName}</td>
                  <td className="p-4">{req.type}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.status === 'Terminé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {req.status === 'En attente' ? (
                      <button onClick={() => setSelectedRequest(req)} className="text-sky-600 hover:underline text-sm font-medium">Saisir résultats</button>
                    ) : (
                      <span className="text-gray-400 text-sm">{req.results}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Résultats pour {selectedRequest.patientName}</h3>
              <p className="text-sm text-gray-600 mb-4">Examen : {selectedRequest.type}</p>
              <textarea value={resultText} onChange={(e) => setResultText(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-4" rows="4" placeholder="Saisir les résultats ici..." />
              <div className="flex justify-end gap-3">
                <button onClick={() => setSelectedRequest(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Annuler</button>
                <button onClick={() => handleValidate(selectedRequest.id)} className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" /> Valider
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}