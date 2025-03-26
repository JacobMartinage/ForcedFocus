export interface Task {
  id: string;
  type: 'leetcode' | 'job';
  title: string;
  completed: boolean;
  timestamp: number;
  url?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  runtime?: string;
  memory?: string;
}

export interface BlockedSite {
  id: string;
  url: string;
  isDefault: boolean;
}

export interface Settings {
  dailyLeetCodeGoal: number;
  dailyJobApplicationsGoal: number;
  blockedSites: BlockedSite[];
  leetcodeUsername?: string;
}

export interface LeetCodeProblem {
  title: string;
  titleSlug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'ac' | 'notac' | null;
  timestamp?: number;
  runtime?: string;
  memory?: string;
}