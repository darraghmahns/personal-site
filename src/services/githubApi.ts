// src/services/githubApi.ts
export interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
}

export interface ContributionData {
  date: string;
  count: number;
  level: number;
}

interface GraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
}

class GitHubApiService {
  private username: string;
  private baseUrl = 'https://api.github.com';
  private graphqlUrl = 'https://api.github.com/graphql';

  constructor(username: string) {
    this.username = username;
  }

  /**
   * Fetch contributions using GitHub GraphQL API
   * Returns rolling 365 days of real contribution data (current month on right)
   */
  async fetchContributionsGraphQL(): Promise<ContributionData[]> {
    const token = process.env.REACT_APP_GITHUB_TOKEN;

    if (!token) {
      console.warn('REACT_APP_GITHUB_TOKEN not set, cannot fetch real contribution data');
      return [];
    }

    // Calculate rolling 365-day date range
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 365);

    const query = `
      query($userName: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $userName) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            userName: this.username,
            from: from.toISOString(),
            to: to.toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`GitHub GraphQL API error: ${response.status}`);
      }

      const result: GraphQLResponse = await response.json();

      if (!result.data?.user?.contributionsCollection) {
        throw new Error('Invalid GraphQL response structure');
      }

      // Transform GraphQL response to ContributionData format
      const contributions: ContributionData[] = [];
      const weeks = result.data.user.contributionsCollection.contributionCalendar.weeks;

      weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          contributions.push({
            date: day.date,
            count: day.contributionCount,
            level: day.contributionCount === 0 ? 0 : Math.min(Math.ceil(day.contributionCount / 3), 4)
          });
        });
      });

      return contributions.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Error fetching GitHub contributions via GraphQL:', error);
      return [];
    }
  }

  /**
   * Fetch user's public events from GitHub API (fallback)
   * This gives us recent activity (last 90 days)
   */
  async fetchRecentEvents(): Promise<GitHubEvent[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${this.username}/events/public`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub events:', error);
      return [];
    }
  }

  /**
   * Convert GitHub events to contribution data (fallback for REST API)
   */
  processEventsToContributions(events: GitHubEvent[]): ContributionData[] {
    const contributionMap = new Map<string, number>();

    // Process events and count contributions per day
    events.forEach(event => {
      const date = event.created_at.split('T')[0]; // Get YYYY-MM-DD format

      // Count different types of contributions
      if (['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)) {
        const currentCount = contributionMap.get(date) || 0;
        contributionMap.set(date, currentCount + 1);
      }
    });

    // Convert to array and add level (intensity)
    const contributions: ContributionData[] = [];
    contributionMap.forEach((count, date) => {
      contributions.push({
        date,
        count,
        level: Math.min(Math.ceil(count / 3), 4) // Scale to 0-4 levels
      });
    });

    return contributions.sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Get user profile information
   */
  async fetchUserProfile() {
    try {
      const response = await fetch(`${this.baseUrl}/users/${this.username}`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      return null;
    }
  }
}

export default GitHubApiService;
