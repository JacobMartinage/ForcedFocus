import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { defaultBlockedSites } from '../data/defaultBlockedSites';
import type { BlockedSite, Settings } from '../types';

function Settings() {
  const [settings, setSettings] = useState<Settings>({
    dailyLeetCodeGoal: 5,
    dailyJobApplicationsGoal: 3,
    blockedSites: defaultBlockedSites
  });

  const [newSite, setNewSite] = useState('');

  const addBlockedSite = () => {
    if (!newSite.trim()) return;

    const newBlockedSite: BlockedSite = {
      id: Date.now().toString(),
      url: newSite,
      isDefault: false
    };

    setSettings({
      ...settings,
      blockedSites: [...settings.blockedSites, newBlockedSite]
    });
    setNewSite('');
  };

  const removeBlockedSite = (id: string) => {
    setSettings({
      ...settings,
      blockedSites: settings.blockedSites.filter(site => site.id !== id)
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Goals</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Daily LeetCode Problems
            </label>
            <input
              type="number"
              min="1"
              value={settings.dailyLeetCodeGoal}
              onChange={(e) => setSettings({
                ...settings,
                dailyLeetCodeGoal: parseInt(e.target.value) || 1
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Daily Job Applications
            </label>
            <input
              type="number"
              min="1"
              value={settings.dailyJobApplicationsGoal}
              onChange={(e) => setSettings({
                ...settings,
                dailyJobApplicationsGoal: parseInt(e.target.value) || 1
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Blocked Sites</h2>
        
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Enter website URL..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addBlockedSite()}
          />
          
          <button
            onClick={addBlockedSite}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {settings.blockedSites.map(site => (
            <div
              key={site.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <span>{site.url}</span>
                {site.isDefault && (
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-gray-200 text-gray-700">
                    Default
                  </span>
                )}
              </div>
              
              {!site.isDefault && (
                <button
                  onClick={() => removeBlockedSite(site.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;