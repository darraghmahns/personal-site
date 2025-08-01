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

  // Replace with your GitHub username
  const githubUsername = 'darraghmahns';

  // Generate mock data - replace with real GitHub API data later
  const generateMockData = (): ContributionDay[] => {
    const data: ContributionDay[] = [];
    const today = new Date();
    const oneYear = 365;
    
    let total = 0;
    let streak = 0;
    let streakActive = true;

    for (let i = oneYear; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate realistic contribution pattern
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const randomFactor = Math.random();
      
      let count = 0;
      if (!isWeekend && randomFactor > 0.3) {
        count = Math.floor(Math.random() * 15) + 1;
      } else if (isWeekend && randomFactor > 0.7) {
        count = Math.floor(Math.random() * 8) + 1;
      }
      
      // Simulate some busy periods (like project sprints)
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      if ((dayOfYear > 50 && dayOfYear < 80) || (dayOfYear > 200 && dayOfYear < 230)) {
        count = Math.floor(count * 1.5) + Math.floor(Math.random() * 5);
      }

      const level = count === 0 ? 0 : Math.min(Math.ceil(count / 4), 4);
      
      data.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });

      total += count;
      
      // Calculate streak
      if (i <= 7) { // Only check last week for current streak
        if (count > 0 && streakActive) {
          streak++;
        } else {
          streakActive = false;
        }
      }
    }

    setTotalContributions(total);
    setCurrentStreak(streak);
    return data;
  };

  // Load GitHub data
  const loadGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const githubApi = new GitHubApiService(githubUsername);
      const data = await githubApi.generateContributionData();
      
      setContributions(data);
      
      // Calculate stats
      const total = data.reduce((sum, day) => sum + day.count, 0);
      setTotalContributions(total);
      
      // Calculate current streak (last 7 days)
      const recent = data.slice(-7);
      let streak = 0;
      for (let i = recent.length - 1; i >= 0; i--) {
        if (recent[i].count > 0) {
          streak++;
        } else {
          break;
        }
      }
      setCurrentStreak(streak);
      
    } catch (err) {
      console.error('Error loading GitHub data:', err);
      setError('Failed to load GitHub data. Using sample data.');
      
      // Fallback to mock data
      const mockData = generateMockData();
      setContributions(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGitHubData();
  }, []);

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
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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