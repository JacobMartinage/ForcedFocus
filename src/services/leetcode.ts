const LEETCODE_API = 'https://leetcode.com/graphql';

export async function fetchUserSolvedProblems(username: string): Promise<LeetCodeProblem[]> {
  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        submitStatsGlobal {
          difficulty
          count
        }
      }
    }
  `;

  try {
    const response = await fetch(LEETCODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode data');
    }

    const data = await response.json();
    return data.data.matchedUser.submitStats.acSubmissionNum;
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return [];
  }
}

export async function fetchRecentSubmissions(username: string): Promise<LeetCodeProblem[]> {
  const query = `
    query recentSubmissions($username: String!) {
      recentSubmissionList(username: $username) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
      }
    }
  `;

  try {
    const response = await fetch(LEETCODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recent submissions');
    }

    const data = await response.json();
    return data.data.recentSubmissionList;
  } catch (error) {
    console.error('Error fetching recent submissions:', error);
    return [];
  }
}