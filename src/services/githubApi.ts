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

class GitHubApiService {
  private username: string;
  private baseUrl = 'https://api.github.com';

  constructor(username: string) {
    this.username = username;
  }

  /**
   * Fetch user's public events from GitHub API
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
   * Fetch user's repositories to get commit activity
   */
  async fetchUserRepos() {
    try {
      const response = await fetch(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return [];
    }
  }

  /**
   * Convert GitHub events to contribution data
   * Note: This is limited to recent activity due to API restrictions
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
   * Generate full year of contribution data
   * Combines real recent data with estimated historical data
   */
  async generateContributionData(): Promise<ContributionData[]> {
    const events = await this.fetchRecentEvents();
    const recentContributions = this.processEventsToContributions(events);
    
    // Generate full year of data
    const contributions: ContributionData[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Create entry for each day in the past year
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      
      // Use real data if available, otherwise use estimated/mock data
      const realData = recentContributions.find(c => c.date === dateString);
      
      if (realData) {
        contributions.push(realData);
      } else {
        // Generate realistic mock data for older dates
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        const randomFactor = Math.random();
        
        let count = 0;
        if (!isWeekend && randomFactor > 0.4) {
          count = Math.floor(Math.random() * 12) + 1;
        } else if (isWeekend && randomFactor > 0.8) {
          count = Math.floor(Math.random() * 5) + 1;
        }

        contributions.push({
          date: dateString,
          count,
          level: count === 0 ? 0 : Math.min(Math.ceil(count / 3), 4)
        });
      }
    }

    return contributions;
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