// src/services/githubGraphQL.ts
// This requires a GitHub Personal Access Token
// Only use this if you want more detailed contribution data

interface GraphQLContributionDay {
  contributionCount: number;
  date: string;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
}

interface GraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: GraphQLContributionDay[];
          }[];
          totalContributions: number;
        };
      };
    };
  };
}

class GitHubGraphQLService {
  private token: string;
  private username: string;

  constructor(username: string, token: string) {
    this.username = username;
    this.token = token;
  }

  private levelToNumber(level: string): number {
    switch (level) {
      case 'NONE': return 0;
      case 'FIRST_QUARTILE': return 1;
      case 'SECOND_QUARTILE': return 2;
      case 'THIRD_QUARTILE': return 3;
      case 'FOURTH_QUARTILE': return 4;
      default: return 0;
    }
  }

  async fetchContributions(year?: number) {
    const currentYear = year || new Date().getFullYear();
    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      username: this.username,
      from: `${currentYear}-01-01T00:00:00Z`,
      to: `${currentYear}-12-31T23:59:59Z`
    };

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables })
      });

      if (!response.ok) {
        throw new Error(`GraphQL API error: ${response.status}`);
      }

      const data: GraphQLResponse = await response.json();
      
      return {
        totalContributions: data.data.user.contributionsCollection.contributionCalendar.totalContributions,
        contributions: data.data.user.contributionsCollection.contributionCalendar.weeks
          .flatMap(week => week.contributionDays)
          .map(day => ({
            date: day.date,
            count: day.contributionCount,
            level: this.levelToNumber(day.contributionLevel)
          }))
      };
    } catch (error) {
      console.error('Error fetching GitHub GraphQL data:', error);
      throw error;
    }
  }
}

export default GitHubGraphQLService;