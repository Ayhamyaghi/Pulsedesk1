import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';
import { Plus, UserPlus, UserMinus, UserCheck, MoreVertical, Search, Mail, Triangle } from 'lucide-react';

export const TraineeManage: React.FC = () => {
  const { users, addUser, toggleUserStatus } = useAppContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newEmail) {
      addUser(newName, newEmail);
      setNewName('');
      setNewEmail('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Trainees Management</h1>
          <p className="text-slate-500 mt-1">Add, activate, or deactivate trainee accounts.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <UserPlus size={18} />
          Add Trainee
        </Button>
      </header>

      <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm relative">
        <div className="p-4 border-b border-border-subtle bg-slate-50/50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter trainees by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-border-subtle">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Trainee Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${user.status === 'active' ? 'text-slate-900' : 'text-slate-500'}`}>
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail size={12} />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`gap-2 ${user.status === 'active' ? 'hover:bg-red-50 hover:text-red-600' : 'hover:bg-green-50 hover:text-green-600'}`}
                      >
                        {user.status === 'active' ? (
                          <>
                            <UserMinus size={14} />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck size={14} />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0" title="Add New Trainee">
            <form onSubmit={handleAdd} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Enter trainee full name"
                  className="w-full px-4 py-2.5 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="trainee@example.com"
                  className="w-full px-4 py-2.5 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-border-subtle mt-6">
                <Button type="submit" className="flex-1">Add Trainee</Button>
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
