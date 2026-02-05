// src/components/ContributionHeatmap.tsx
import React, { useState, useEffect } from 'react';
import GitHubApiService from '../services/githubApi';
import '../assets/styles/ContributionHeatmap.css';

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 for intensity levels
}

const ContributionHeatmap: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your GitHub username or set REACT_APP_GITHUB_USERNAME
  const githubUsername = process.env.REACT_APP_GITHUB_USERNAME || 'darraghmahns';

  // Calculate current streak from contribution data
  const calculateStreak = (data: ContributionDay[]): number => {
    let streak = 0;
    // Start from most recent day and work backwards
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].count > 0) {
        streak++;
      } else {
        // Streak is broken
        break;
      }
    }
    return streak;
  };

  // Load contributions data (prefer prebuilt JSON from GitHub GraphQL via CI)
  const loadGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);

      // First try prebuilt JSON (generated via GitHub Actions)
      try {
        const res = await fetch('/contributions.json', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json && json.weeks && Array.isArray(json.weeks)) {
            // Transform GitHub Actions JSON format
            const days: ContributionDay[] = [];
            json.weeks.forEach((week: any) => {
              week.contributionDays.forEach((day: any) => {
                days.push({
                  date: day.date,
                  count: day.contributionCount,
                  level: day.contributionCount === 0 ? 0 : Math.min(Math.ceil(day.contributionCount / 3), 4)
                });
              });
            });

            setContributions(days);
            const total = days.reduce((sum, d) => sum + d.count, 0);
            setTotalContributions(total);
            setCurrentStreak(calculateStreak(days));
            return; // done
          }
        }
      } catch (e) {
        console.log('No prebuilt contributions.json found, trying GraphQL API');
      }

      // Fallback 1: Try GitHub GraphQL API directly
      const githubApi = new GitHubApiService(githubUsername);
      const data = await githubApi.fetchContributionsGraphQL();

      if (data.length > 0) {
        setContributions(data);
        const total = data.reduce((sum, day) => sum + day.count, 0);
        setTotalContributions(total);
        setCurrentStreak(calculateStreak(data));
      } else {
        // GraphQL failed (no token or error)
        throw new Error('GraphQL API returned no data');
      }

    } catch (err) {
      console.error('Error loading GitHub data:', err);
      setError('Unable to load GitHub contribution data. Please ensure GITHUB_TOKEN is configured.');
      setContributions([]);
      setTotalContributions(0);
      setCurrentStreak(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGitHubData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getWeeksArray = () => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      
      if (index === 0) {
        // Fill in empty days at the beginning of the first week
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', count: 0, level: 0 });
        }
      }
      
      currentWeek.push(day);
      
      if (dayOfWeek === 6 || index === contributions.length - 1) {
        // End of week or last day
        if (currentWeek.length < 7) {
          // Fill remaining days
          while (currentWeek.length < 7) {
            currentWeek.push({ date: '', count: 0, level: 0 });
          }
        }
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const getLevelColor = (level: number): string => {
    const colors = {
      0: 'var(--heatmap-empty)',
      1: 'var(--heatmap-light)',
      2: 'var(--heatmap-medium)',
      3: 'var(--heatmap-high)',
      4: 'var(--heatmap-highest)'
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  const getTooltipText = (day: ContributionDay): string => {
    if (!day.date) return '';
    const date = new Date(day.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    
    if (day.count === 0) {
      return `No contributions on ${formattedDate}`;
    } else if (day.count === 1) {
      return `1 contribution on ${formattedDate}`;
    } else {
      return `${day.count} contributions on ${formattedDate}`;
    }
  };

  const weeks = getWeeksArray();

  // Generate dynamic month labels based on contribution data (rolling 12 months)
  const getMonthLabels = (): string[] => {
    if (contributions.length === 0) return [];

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels: string[] = [];
    let currentMonth = -1;

    weeks.forEach((week, weekIndex) => {
      // Get the first valid day in this week to determine the month
      const firstValidDay = week.find(day => day.date);
      if (firstValidDay && firstValidDay.date) {
        const date = new Date(firstValidDay.date);
        const month = date.getMonth();

        // Only add label if this is a new month
        if (month !== currentMonth) {
          labels.push(monthNames[month]);
          currentMonth = month;
        } else {
          labels.push(''); // Empty label for weeks in same month
        }
      } else {
        labels.push('');
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) {
    return (
      <div className="contribution-heatmap">
        <div className="heatmap-header">
          <h3>Coding Activity</h3>
          <p>Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contribution-heatmap">
      <div className="heatmap-header">
        <h3>Coding Activity</h3>
        {error && <p className="error-message">{error}</p>}
        <div className="contribution-stats">
          <span className="stat">
            <strong>{totalContributions.toLocaleString()}</strong> contributions in the last year
          </span>
          <span className="stat">
            <strong>{currentStreak}</strong> day current streak
          </span>
          <span className="stat">
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="github-link">
              View on GitHub →
            </a>
          </span>
        </div>
      </div>
      
      <div className="heatmap-container">
        <div className="month-labels">
          {monthLabels.map((month, index) => (
            <span key={index} className="month-label">{month}</span>
          ))}
        </div>
        
        <div className="heatmap-grid">
          <div className="day-labels">
            {dayLabels.map((day, index) => (
              <span key={index} className="day-label" style={{ opacity: index % 2 === 1 ? 1 : 0 }}>
                {day}
              </span>
            ))}
          </div>
          
          <div className="weeks-container">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="week">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="contribution-day"
                    style={{ 
                      backgroundColor: getLevelColor(day.level),
                      opacity: day.date ? 1 : 0
                    }}
                    title={getTooltipText(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="heatmap-legend">
          <span className="legend-label">Less</span>
          <div className="legend-colors">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className="legend-color"
                style={{ backgroundColor: getLevelColor(level) }}
              />
            ))}
          </div>
          <span className="legend-label">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
