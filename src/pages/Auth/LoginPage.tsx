import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cross, Mail, Lock, Phone, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuthStore();

  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('prabhasgorusu001@gmail.com');
  const [password, setPassword] = useState('Hospital@123');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(identifier, 'patient');
      setIsLoading(false);
      navigate('/profile');
    }, 600);
  };

  const handleQuickDemoLogin = (role: 'patient' | 'pharmacist' | 'admin') => {
    const email =
      role === 'patient'
        ? 'prabhasgorusu001@gmail.com'
        : role === 'pharmacist'
        ? 'pharmacist@apexcarehospital.org'
        : 'admin@apexcarehospital.org';
    login(email, role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-medical-600 flex items-center justify-center text-white shadow-md">
              <Cross className="w-6 h-6 stroke-[2.4]" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              ApexCare
            </span>
          </Link>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to access your digital hospital pharmacy prescriptions & orders
          </p>
        </div>

        {/* Toggle Mode: Password or OTP */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setAuthMode('password')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              authMode === 'password' ? 'bg-white text-medical-800 shadow-xs' : ''
            }`}
          >
            Password Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('otp')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              authMode === 'otp' ? 'bg-white text-medical-800 shadow-xs' : ''
            }`}
          >
            Instant OTP Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Email Address / Mobile Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. prabhasgorusu001@gmail.com"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>
          </div>

          {authMode === 'password' ? (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-medical-600 hover:underline font-bold"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                6-Digit One-Time Password (OTP)
              </label>
              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="w-full py-2.5 bg-medical-50 hover:bg-medical-100 text-medical-700 font-bold rounded-xl border border-medical-200"
                >
                  Send OTP to Mobile / Email
                </button>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 4-6 digit OTP (Demo: 123456)"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none text-center font-mono text-base font-bold tracking-widest"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>OTP sent! (Use 123456)</span>
                    <button
                      type="button"
                      onClick={() => alert('New OTP sent!')}
                      className="text-medical-600 hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            variant="primary"
            size="lg"
            className="w-full shadow-md shadow-medical-200 mt-2"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        {/* Quick Demo Logins Bar */}
        <div className="pt-2 border-t border-slate-100 space-y-2 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Instant Demo Account Switchers
          </span>
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <button
              onClick={() => handleQuickDemoLogin('patient')}
              className="py-1.5 px-2 bg-slate-50 hover:bg-medical-50 hover:text-medical-700 rounded-xl border border-slate-200 font-bold transition-colors cursor-pointer"
            >
              👤 Patient
            </button>
            <button
              onClick={() => handleQuickDemoLogin('pharmacist')}
              className="py-1.5 px-2 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 rounded-xl border border-slate-200 font-bold transition-colors cursor-pointer"
            >
              💊 Pharmacist
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="py-1.5 px-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl border border-slate-200 font-bold transition-colors cursor-pointer"
            >
              ⚙️ Admin
            </button>
          </div>
        </div>

        {/* Create account footer */}
        <div className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-medical-600 hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
