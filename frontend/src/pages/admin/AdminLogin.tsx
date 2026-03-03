import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLogin() {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-charcoal rounded-full mb-4">
            <Lock size={20} className="text-beige" />
          </div>
          <h1 className="font-heading text-3xl text-charcoal">Admin Access</h1>
          <p className="font-body text-sm text-charcoal-muted mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-gallery space-y-4">
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className="w-full px-4 py-3 pr-10 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal transition-colors"
                placeholder="Enter password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1 font-body">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
