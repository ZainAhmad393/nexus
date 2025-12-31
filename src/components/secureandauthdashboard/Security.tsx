import React, { useState } from 'react';
import { Shield, ShieldCheck, Key, Smartphone, HelpCircle, UserCheck, AlertTriangle } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Security Settings</h1>
          <div className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <ShieldCheck className="w-4 h-4 mr-1" />
            Account Secured
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content (Left Side) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Change Password Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <Key className="w-5 h-5 text-slate-500 mr-2" />
                <h2 className="text-lg font-semibold">Change Password</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Current Password</label>
                  <input type="password" placeholder="Enter current password" title="Current Password" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">New Password</label>
                  <input type="password" placeholder="Enter new password" title="New Password" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  <p className="text-xs text-red-500 mt-1">Password Strength: Very Weak</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" title="Confirm New Password" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 text-slate-500 mr-2" />
                  <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
                </div>
                <button className="bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600">Disable</button>
              </div>
              <p className="text-sm text-slate-500 mb-6">Add an extra layer of security to your account.</p>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="text-blue-800 font-semibold mb-2">Authentication App Setup</h3>
                <p className="text-sm text-blue-700 mb-4">Scan the QR code below with your authenticator app (Google Authenticator, Authy, etc.)</p>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-slate-200 rounded flex items-center justify-center mb-4 border-2 border-dashed border-slate-400">
                    <span className="text-[10px] text-slate-500 text-center px-2">QR Code Placeholder</span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-500">Secret Key: ABCD EFGH IJKL MNOP QRST UVWX YZ12 3456</p>
                </div>
                
                <div className="mt-6">
                  <label className="block text-xs font-medium text-slate-600 mb-2">Verify Setup</label>
                  <p className="text-[10px] text-slate-500 mb-2">Enter the 6-digit code from your authenticator app</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input key={i} type="text" maxLength={1} title={`Digit ${i}`} className="w-10 h-10 border border-slate-300 rounded text-center focus:ring-2 focus:ring-blue-500 outline-none" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Backup Codes</span>
                <button className="text-slate-600 border border-slate-300 px-3 py-1 rounded text-xs hover:bg-slate-50">Show Codes</button>
              </div>
            </div>

            {/* Security Questions Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-5 h-5 text-slate-500 mr-2" />
                <h2 className="text-lg font-semibold">Security Questions</h2>
              </div>
              <div className="space-y-4">
                {[
                  "What was your first pet's name?",
                  "What city were you born in?",
                  "What is your mother's maiden name?"
                ].map((q, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-slate-600 mb-1">{q}</label>
                    <input type="text" placeholder="Your answer" title={q} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                ))}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Save Security Questions
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar (Right Side) */}
          <div className="space-y-6">
            
            {/* Recent Login Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <UserCheck className="w-5 h-5 text-slate-500 mr-2" />
                <h2 className="text-lg font-semibold">Recent Login Activity</h2>
              </div>
              <div className="space-y-4">
                {[
                  { date: "12/31/2025 • 6:12:36 PM", device: "Chrome on Windows", loc: "New York, US • 192.168.1.100", status: "success" },
                  { date: "12/30/2025 • 7:12:36 PM", device: "Safari on iPhone", loc: "London, UK • 104.28.28.100", status: "success" },
                  { date: "12/29/2025 • 7:12:36 PM", device: "Firefox on Linux", loc: "Tokyo, Japan • 203.0.113.45", status: "failed" },
                ].map((login, idx) => (
                  <div key={idx} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-bold text-slate-700">{login.date}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${login.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {login.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">{login.device}</p>
                    <p className="text-[10px] text-slate-400">{login.loc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-slate-500 mr-2" />
                <h2 className="text-lg font-semibold">Security Tips</h2>
              </div>
              <ul className="space-y-3">
                {[
                  { text: "Use a unique, strong password for your account", icon: <ShieldCheck className="w-4 h-4 text-green-500" /> },
                  { text: "Enable two-factor authentication", icon: <ShieldCheck className="w-4 h-4 text-green-500" /> },
                  { text: "Don't share your account credentials", icon: <ShieldCheck className="w-4 h-4 text-green-500" /> },
                  { text: "Review your login activity regularly", icon: <HelpCircle className="w-4 h-4 text-amber-500" /> },
                  { text: "Update your recovery options", icon: <HelpCircle className="w-4 h-4 text-amber-500" /> },
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start text-[11px] text-slate-600">
                    <span className="mr-2 mt-0.5">{tip.icon}</span>
                    {tip.text}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;