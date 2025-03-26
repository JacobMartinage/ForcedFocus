// Track the submission status element
let submissionObserver: MutationObserver | null = null;
let lastProblemTitle: string | null = null;

function getProblemInfo() {
  const titleElement = document.querySelector('[data-cy="question-title"]');
  const difficultyElement = document.querySelector('[diff]');
  
  return {
    title: titleElement?.textContent?.trim() || '',
    titleSlug: window.location.pathname.split('/')[2] || '',
    difficulty: difficultyElement?.getAttribute('diff') || 'Easy'
  };
}

function handleSubmissionResult(resultElement: Element) {
  const isAccepted = resultElement.textContent?.includes('Accepted');
  if (!isAccepted) return;

  const problem = getProblemInfo();
  
  // Prevent duplicate submissions for the same problem
  if (lastProblemTitle === problem.title) return;
  lastProblemTitle = problem.title;

  // Get runtime and memory stats
  const statsElements = document.querySelectorAll('[class*="data-container"]');
  let runtime = '', memory = '';
  
  statsElements.forEach(element => {
    const text = element.textContent || '';
    if (text.includes('Runtime')) {
      runtime = text.match(/(\d+)\s*ms/)?.[1] || '';
    } else if (text.includes('Memory')) {
      memory = text.match(/(\d+\.?\d*)\s*MB/)?.[1] || '';
    }
  });

  chrome.runtime.sendMessage({
    type: 'LEETCODE_PROBLEM_SOLVED',
    problem: {
      ...problem,
      timestamp: Date.now(),
      runtime,
      memory
    }
  });
}

function observeSubmissions() {
  // Stop any existing observer
  if (submissionObserver) {
    submissionObserver.disconnect();
  }

  // Watch for the submission result element
  submissionObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const resultElement = document.querySelector('[data-e2e-locator="submission-result"]');
        if (resultElement) {
          handleSubmissionResult(resultElement);
        }
      }
    }
  });

  // Start observing the submission container
  const submissionContainer = document.querySelector('[class*="result-container"]');
  if (submissionContainer) {
    submissionObserver.observe(submissionContainer, {
      childList: true,
      subtree: true
    });
  }
}

// Watch for navigation between problems
const problemObserver = new MutationObserver(() => {
  const problemTitle = document.querySelector('[data-cy="question-title"]');
  if (problemTitle) {
    lastProblemTitle = null; // Reset last problem when navigating to a new problem
    observeSubmissions();
  }
});

// Observe changes to the main content area
const mainContent = document.querySelector('#app') || document.body;
problemObserver.observe(mainContent, {
  childList: true,
  subtree: true
});

// Initial setup
observeSubmissions();

// Cleanup
window.addEventListener('unload', () => {
  if (submissionObserver) submissionObserver.disconnect();
  problemObserver.disconnect();
});