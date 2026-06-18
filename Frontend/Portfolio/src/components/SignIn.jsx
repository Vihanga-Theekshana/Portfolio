import { useState } from 'react';

export default function SignIn({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const getAdminUser = () => {
    try {
      const stored = localStorage.getItem('admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const admin = getAdminUser();
    
    // Fallback default admin credentials
    const validUsername = admin ? admin.username : 'admin';
    const validPasscode = admin ? admin.passcode : 'admin';

    if (username === validUsername && passcode === validPasscode) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid username or passcode.');
    }
  };

  const adminExists = !!getAdminUser();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium rounded-xl text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1714]/60 mb-1.5">Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#1C1714]/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none text-[#1C1714] transition-all font-medium text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1714]/60 mb-1.5">Passcode</label>
        <input 
          type="password" 
          value={passcode} 
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#1C1714]/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none text-[#1C1714] transition-all font-medium text-sm"
          required
        />
      </div>

      <button 
        type="submit"
        className="w-full py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 text-sm mt-2"
      >
        Sign In
      </button>

      {!adminExists && (
        <div className="text-center mt-3">
          <span className="text-[10px] uppercase tracking-wider text-[#1C1714]/40 font-medium">Default: username "admin", passcode "admin"</span>
        </div>
      )}
    </form>
  );
}
