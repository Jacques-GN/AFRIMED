import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Save, FileText, AlertTriangle } from 'lucide-react';
import { mockPatients } from '../services/supabaseClient';
import { getDiagnosticSuggestions } from '../services/geminiService';

export default function Consultation() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const patient = patientId === 'new' ? null : mockPatients.find(p => p.id === patientId);
  
  const [constantes, setConstantes] = useState({ temp: '', ta: '', pouls: '' });
  const [motif, setMotif] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [diagnostic, setDiagnostic] = useState('');

  const handleAiAnalyze = async () => {
    setAiLoading(true);
    const result = await getDiagnosticSuggestions(constantes, motif, patient?.history || '');
    setAiSuggestions(result);
    setAiLoading(false);
  };

  const handleSave = () => {
    alert("Consultation enregistrée avec succès ! (Prototype)");
    navigate('/doctor');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={() => navigate('/doctor')} className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{patient ? `Consultation : ${patient.name}` : 'Nouveau Patient'}</h1>
            {patient && <p className="text-sm text-gray-500">Code: {patient.code} | Antécédents: {patient.history}</p>}
          </div>
        </div>
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition">
          <Save className="w-5 h-5 mr-2" /> Clôturer
        </button>
      </header>

      <main className="p-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-sky-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span>
              Motif et Constantes
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motif de consultation</label>
                <textarea value={motif} onChange={(e) => setMotif(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" rows="2" placeholder="Ex: Fièvre et céphalées depuis 3 jours" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temp. (°C)</label>
                  <input type="number" step="0.1" value={constantes.temp} onChange={(e) => setConstantes({...constantes, temp: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="37.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">T.A (mmHg)</label>
                  <input type="text" value={constantes.ta} onChange={(e) => setConstantes({...constantes, ta: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="120/80" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pouls (bpm)</label>
                  <input type="number" value={constantes.pouls} onChange={(e) => setConstantes({...constantes, pouls: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="80" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-sky-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span>
              Diagnostic & Prescription
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnostic retenu</label>
                <input type="text" value={diagnostic} onChange={(e) => setDiagnostic(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Ex: Paludisme simple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prescription (Ordonnance)</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg" rows="4" placeholder="1. Artéméther-Luméfantrine : 1 cp matin et soir pendant 3 jours" />
                {patient?.allergies !== 'Aucune' && (
                  <div className="mt-2 bg-red-50 text-red-600 p-3 rounded-lg flex items-center text-sm">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Attention : Patient allergique à {patient.allergies}. Vérifiez la prescription.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-purple-700">
              <Brain className="w-5 h-5 mr-2" /> Assistant IA
            </h2>
            <button onClick={handleAiAnalyze} disabled={aiLoading || !motif} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-300 mb-4">
              {aiLoading ? 'Analyse en cours...' : 'Générer des suggestions'}
            </button>
            {aiSuggestions && (
              <div className="space-y-3">
                {aiSuggestions.hypotheses.map((h, idx) => (
                  <div key={idx} className="bg-purple-50 p-3 rounded-lg text-sm">
                    <div className="font-semibold text-purple-900">{h.diagnostic}</div>
                    <div className="text-purple-700 mt-1">{h.justification}</div>
                    <div className="mt-2 text-xs font-medium text-purple-600">Examens: {h.examens_suggeres.join(', ')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-500" /> Demande de labo
            </h2>
            <select className="w-full p-3 border border-gray-300 rounded-lg mb-3">
              <option value="">Sélectionner un examen...</option>
              <option value="NFS">NFS (Numération Formule Sanguine)</option>
              <option value="Frottis">Frottis sanguin goutte épaisse</option>
              <option value="Glycemie">Glycémie à jeun</option>
            </select>
            <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">Envoyer au laboratoire</button>
          </div>
        </div>
      </main>
    </div>
  );
}