import { useState } from 'react';

export default function SignUp({ onSignUpSuccess, onToggleMode }) {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !passcode) {
      setError('Please fill in all fields.');
      return;
    }
    if (passcode !== confirmPasscode) {
      setError('Passcodes do not match.');
      return;
    }

    // Save registration details to localStorage
    localStorage.setItem('admin_user', JSON.stringify({ username, passcode }));
    setError('');
    setUsername('');
    setPasscode('');
    setConfirmPasscode('');
    onSignUpSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium rounded-xl text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Create username"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none text-[#E5E5E7] transition-all font-medium text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Passcode</label>
        <input 
          type="password" 
          value={passcode} 
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Create passcode"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none text-[#E5E5E7] transition-all font-medium text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Confirm Passcode</label>
        <input 
          type="password" 
          value={confirmPasscode} 
          onChange={(e) => setConfirmPasscode(e.target.value)}
          placeholder="Confirm passcode"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none text-[#E5E5E7] transition-all font-medium text-sm"
          required
        />
      </div>

      <button 
        type="submit"
        className="w-full py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 text-sm mt-2"
      >
        Register Account
      </button>
    </form>
  );
}
