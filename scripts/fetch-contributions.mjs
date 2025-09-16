// scripts/fetch-contributions.mjs
// Fetch last 365 days of contributions via GitHub GraphQL and write to public/contributions.json
// Requires env: GITHUB_API_TOKEN (PAT), GITHUB_USERNAME

import fs from 'fs';
import path from 'path';

const token = process.env.GITHUB_API_TOKEN;
const username = process.env.GITHUB_USERNAME || 'darraghmahns';

if (!token) {
  console.error('Missing GITHUB_API_TOKEN env');
  process.exit(1);
}

function levelToNumber(level) {
  switch (level) {
    case 'NONE': return 0;
    case 'FIRST_QUARTILE': return 1;
    case 'SECOND_QUARTILE': return 2;
    case 'THIRD_QUARTILE': return 3;
    case 'FOURTH_QUARTILE': return 4;
    default: return 0;
  }
}

const toIso = (d) => new Date(d).toISOString();

const now = new Date();
const from = new Date(now);
from.setDate(from.getDate() - 365);

const query = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }
`;

const variables = {
  username,
  from: toIso(from),
  to: toIso(now)
};

console.log(`Fetching contributions for ${username} from ${variables.from} to ${variables.to}`);

const resp = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query, variables })
});

if (!resp.ok) {
  const text = await resp.text();
  console.error(`GitHub GraphQL error ${resp.status}: ${text}`);
  process.exit(1);
}

const json = await resp.json();
const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
const total = json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;

const days = weeks.flatMap(w => w.contributionDays || []).map(d => ({
  date: d.date,
  count: d.contributionCount,
  level: levelToNumber(d.contributionLevel)
}));

// Ensure sorted by date ascending
days.sort((a, b) => a.date.localeCompare(b.date));

const out = {
  username,
  generatedAt: new Date().toISOString(),
  totalContributions: total, // in window
  days
};

const outPath = path.join(process.cwd(), 'public', 'contributions.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`Wrote ${days.length} days to ${outPath}`);

