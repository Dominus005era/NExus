import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Building2, Briefcase, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  currentProfile: UserProfile;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSaveProfile, currentProfile }) => {
  const [name, setName] = useState(currentProfile.name || 'Rahul');
  const [role, setRole] = useState(currentProfile.role || 'CEO');
  const [company, setCompany] = useState(currentProfile.company || 'TechMart Electronics');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim() || 'Rahul',
      role: role.trim() || 'CEO',
      company: company.trim() || 'TechMart Electronics',
      isLoggedIn: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0e1424] border border-slate-700/80 rounded-2xl w-full max-w-md shadow-2xl p-6 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Executive Authentication & Onboarding</h3>
            <p className="text-xs text-slate-400">Configure your session role and company environment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
              placeholder="e.g. Rahul"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center space-x-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>Executive Role</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
            >
              <option value="CEO">CEO (Chief Executive Officer)</option>
              <option value="COO">COO (Chief Operating Officer)</option>
              <option value="Head of Supply Chain">Head of Supply Chain</option>
              <option value="VP of Operations">VP of Operations</option>
              <option value="Director of Procurement">Director of Procurement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center space-x-1.5">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Company Organization</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
              placeholder="TechMart Electronics"
            />
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>5,229 verified orders & document racks ready</span>
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter NEXUS Operations Control</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
