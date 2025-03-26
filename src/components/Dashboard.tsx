import React from 'react';
import { Trophy, Briefcase, Target } from 'lucide-react';

function Dashboard() {
  // Mock data - will be replaced with real data later
  const stats = {
    leetcodeSolved: 3,
    leetcodeGoal: 5,
    jobsApplied: 8,
    jobsGoal: 10,
    sitesBlocked: 7
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">LeetCode Problems</p>
              <p className="mt-1 text-3xl font-semibold text-indigo-600">
                {stats.leetcodeSolved}/{stats.leetcodeGoal}
              </p>
            </div>
            <Trophy className="h-12 w-12 text-indigo-200" />
          </div>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 rounded-full h-2"
                style={{ width: `${(stats.leetcodeSolved / stats.leetcodeGoal) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Job Applications</p>
              <p className="mt-1 text-3xl font-semibold text-green-600">
                {stats.jobsApplied}/{stats.jobsGoal}
              </p>
            </div>
            <Briefcase className="h-12 w-12 text-green-200" />
          </div>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 rounded-full h-2"
                style={{ width: `${(stats.jobsApplied / stats.jobsGoal) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sites Blocked</p>
              <p className="mt-1 text-3xl font-semibold text-purple-600">{stats.sitesBlocked}</p>
            </div>
            <Target className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Applied to Senior Developer position at Tech Corp</span>
            <span className="ml-auto text-gray-400">2h ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Solved "Two Sum" on LeetCode</span>
            <span className="ml-auto text-gray-400">4h ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Added netflix.com to blocked sites</span>
            <span className="ml-auto text-gray-400">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;