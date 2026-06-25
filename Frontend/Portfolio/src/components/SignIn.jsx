import { useState } from 'react';
import axios from "axios";


export default function SignIn({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try{
      const response = await axios.post("/api/auth/login",{
        username,
        passcode
      });
    
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
        setError('');
        onLoginSuccess();
        setUsername('');
        setPasscode('');
      }
      
    } 
    catch(error){
      console.log(error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials and try again.");
    } 
  
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium rounded-xl text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1D]/60 mb-1.5">Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none text-[#1A1A1D] placeholder-black/30 transition-all font-medium text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1D]/60 mb-1.5">Passcode</label>
        <input 
          type="password" 
          value={passcode} 
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none text-[#1A1A1D] placeholder-black/30 transition-all font-medium text-sm"
          required
        />
      </div>

      <button 
        type="submit"
        className="w-full py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 text-sm mt-2"
      >
        Sign In
      </button>

      
    </form>
  );
}
