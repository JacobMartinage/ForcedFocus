import { BlockedSite, Task } from '../types';

// Check if the user has met their goals
async function hasMetGoals(): Promise<boolean> {
  const { dailyLeetCodeGoal, dailyJobApplicationsGoal, tasks } = await chrome.storage.local.get(['dailyLeetCodeGoal', 'dailyJobApplicationsGoal', 'tasks']);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const leetCodeTasksCompleted = (tasks as Task[])
    .filter(task => 
      task.type === 'leetcode' && 
      task.completed && 
      new Date(task.timestamp).setHours(0, 0, 0, 0) === today.getTime()
    ).length;

  const jobTasksCompleted = (tasks as Task[])
    .filter(task => 
      task.type === 'job' && 
      task.completed && 
      new Date(task.timestamp).setHours(0, 0, 0, 0) === today.getTime()
    ).length;

  return leetCodeTasksCompleted >= dailyLeetCodeGoal && jobTasksCompleted >= dailyJobApplicationsGoal;
}

// Check if a URL is blocked
async function isUrlBlocked(url: string): Promise<boolean> {
  const { blockedSites } = await chrome.storage.local.get('blockedSites');
  const hostname = new URL(url).hostname;
  
  return (blockedSites as BlockedSite[])
    .some(site => hostname.includes(site.url));
}

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return; // Only handle main frame navigation
  
  const blocked = await isUrlBlocked(details.url);
  const goalsmet = await hasMetGoals();
  
  if (blocked && !goalsmet) {
    // Redirect to blocked page
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL('blocked.html')
    });
  }
});

// Listen for LeetCode problem completion
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'LEETCODE_PROBLEM_SOLVED') {
    const { problem } = message;
    const newTask: Task = {
      id: Date.now().toString(),
      type: 'leetcode',
      title: problem.title,
      completed: true,
      timestamp: Date.now(),
      url: `https://leetcode.com/problems/${problem.titleSlug}`,
      difficulty: problem.difficulty,
      runtime: problem.runtime,
      memory: problem.memory
    };

    const { tasks = [] } = await chrome.storage.local.get('tasks');
    
    // Check if this problem was already completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const alreadyCompleted = tasks.some((task: Task) => 
      task.type === 'leetcode' &&
      task.title === problem.title &&
      new Date(task.timestamp).setHours(0, 0, 0, 0) === today.getTime()
    );

    if (!alreadyCompleted) {
      await chrome.storage.local.set({
        tasks: [...tasks, newTask]
      });
    }
  }
});