// Check if the current site is blocked
async function checkIfBlocked() {
  const { blockedSites } = await chrome.storage.local.get('blockedSites');
  const currentHostname = window.location.hostname;

  const isBlocked = blockedSites.some((site: { url: string }) => 
    currentHostname.includes(site.url)
  );

  if (isBlocked) {
    const { dailyLeetCodeGoal, dailyJobApplicationsGoal, tasks } = await chrome.storage.local.get([
      'dailyLeetCodeGoal',
      'dailyJobApplicationsGoal',
      'tasks'
    ]);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const leetCodeTasksCompleted = tasks.filter((task: any) => 
      task.type === 'leetcode' && 
      task.completed && 
      new Date(task.timestamp).setHours(0, 0, 0, 0) === today.getTime()
    ).length;

    const jobTasksCompleted = tasks.filter((task: any) => 
      task.type === 'job' && 
      task.completed && 
      new Date(task.timestamp).setHours(0, 0, 0, 0) === today.getTime()
    ).length;

    if (leetCodeTasksCompleted < dailyLeetCodeGoal || jobTasksCompleted < dailyJobApplicationsGoal) {
      document.body.innerHTML = `
        <div class="blocked-page">
          <h1>Site Blocked</h1>
          <p>Complete your daily goals to access this site:</p>
          <ul>
            <li>LeetCode Problems: ${leetCodeTasksCompleted}/${dailyLeetCodeGoal}</li>
            <li>Job Applications: ${jobTasksCompleted}/${dailyJobApplicationsGoal}</li>
          </ul>
        </div>
      `;
    }
  }
}

checkIfBlocked();