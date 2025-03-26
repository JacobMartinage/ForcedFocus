import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import type { Task } from '../types';

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      type: 'leetcode',
      title: 'Two Sum',
      completed: true,
      timestamp: Date.now() - 3600000
    },
    {
      id: '2',
      type: 'job',
      title: 'Senior Developer at Tech Corp',
      completed: true,
      timestamp: Date.now() - 7200000
    }
  ]);

  const [newTask, setNewTask] = useState('');
  const [taskType, setTaskType] = useState<'leetcode' | 'job'>('leetcode');

  const addTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      type: taskType,
      title: newTask,
      completed: false,
      timestamp: Date.now()
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex space-x-4 mb-6">
          <select
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value as 'leetcode' | 'job')}
          >
            <option value="leetcode">LeetCode Problem</option>
            <option value="job">Job Application</option>
          </select>
          
          <input
            type="text"
            placeholder={taskType === 'leetcode' ? 'Enter problem name...' : 'Enter company name...'}
            className="flex-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          
          <button
            onClick={addTask}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    task.type === 'leetcode' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {task.type === 'leetcode' ? 'LeetCode' : 'Job'}
                </span>
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.title}
                </span>
              </div>
              
              <button
                onClick={() => toggleTask(task.id)}
                className={`p-2 rounded-full ${
                  task.completed
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {task.completed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;