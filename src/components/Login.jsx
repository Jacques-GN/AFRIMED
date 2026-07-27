import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, User, FlaskConical, Shield } from 'lucide-react'

export default function Login({ setUser }) {
  const [role, setRole] = useState('medecin')
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (role === 'patient') {
      if (code.trim()) navigate(`/patient/${code.trim()}`)
    } else {
      setUser({ role, name: role === 'medecin' ? 'Dr. Koné' : role === 'laborantin' ? 'Lab. Soré' : 'Admin' })
      navigate(role === 'medecin' || role === 'admin' ? '/doctor' : '/lab')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-3 rounded-full"><Stethoscope className="w-8 h-8 text-white" /></div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">AFRIMED</h1>
        <p className="text-center text-gray-500 mb-6">Prototype de consultation médicale assistée par IA</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profil de démonstration</label>
            <div className="grid grid-cols-3 gap-2">
              {['medecin', 'laborantin', 'admin'].map((r) => (
                <button key={r} type="button" onClick={() => { setRole(r); setCode('') }} className={`p-2 text-sm rounded-lg border flex flex-col items-center gap-1 transition-colors ${role === r ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                  {r === 'medecin' && <User className="w-5 h-5" />}
                  {r === 'laborantin' && <FlaskConical className="w-5 h-5" />}
                  {r === 'admin' && <Shield className="w-5 h-5" />}
                  <span className="capitalize">{r}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <button type="button" onClick={() => setRole('patient')} className={`w-full mb-3 p-3 rounded-lg border text-sm font-medium transition-colors ${role === 'patient' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-200 hover:bg-green-50'}`}>Accès Patient (par code)</button>
          </div>
          {role === 'patient' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code Patient Unique</label>
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ex: AFR-8821" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          )}
          {role !== 'patient' && (
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">Se connecter</button>
          )}
        </form>
      </div>
    </div>
  )
}