// src/pages/BlogPost.tsx
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import '../assets/styles/BlogPost.css';

// Mock blog posts content - in a real app, this would come from a CMS or API
const blogPostsContent: Record<string, any> = {
  'healthcare-software-challenges': {
    id: 'healthcare-software-challenges',
    title: 'Building Healthcare Software: Lessons from Keck Medicine',
    date: '2025-01-15',
    readTime: '8 min read',
    tags: ['Healthcare', 'React', 'API Integration', 'Cerner'],
    content: `
      <p>Working as a Software Engineer Intern at Keck Medicine of USC has given me invaluable insights into the unique challenges and requirements of healthcare software development. In this post, I'll share some key lessons learned while building admin portals for patient scheduling systems.</p>

      <h2>The Healthcare Context</h2>
      <p>Healthcare software operates under strict regulatory requirements (HIPAA, FDA guidelines) and must integrate with complex legacy systems. Every feature must be designed with patient safety and data security as top priorities.</p>

      <h2>Working with Cerner API</h2>
      <p>Integrating with Cerner's healthcare API has been both challenging and educational. Here are some key considerations:</p>
      <ul>
        <li><strong>Data Standards:</strong> Understanding HL7 FHIR standards for healthcare data exchange</li>
        <li><strong>Authentication:</strong> Implementing secure OAuth 2.0 flows for healthcare applications</li>
        <li><strong>Rate Limiting:</strong> Respecting API rate limits while ensuring responsive user experiences</li>
        <li><strong>Error Handling:</strong> Gracefully handling network issues that could impact patient care</li>
      </ul>

      <h2>Frontend Challenges in Healthcare</h2>
      <p>Building user interfaces for healthcare applications requires special attention to:</p>
      <ul>
        <li><strong>Accessibility:</strong> Ensuring the application works for users with diverse abilities</li>
        <li><strong>Clear Information Architecture:</strong> Medical professionals need quick access to critical information</li>
        <li><strong>Mobile Responsiveness:</strong> Healthcare workers often use tablets and mobile devices</li>
        <li><strong>Performance:</strong> Every second counts in healthcare environments</li>
      </ul>

      <h2>Technology Stack Insights</h2>
      <p>Our current stack includes React, Mantine UI, Next.js, and C++ for performance-critical components. This combination allows us to build fast, accessible interfaces while maintaining the flexibility to optimize critical paths.</p>

      <h2>Looking Forward</h2>
      <p>Healthcare technology is rapidly evolving, with AI and machine learning playing increasingly important roles. The experience of building these systems has reinforced my interest in the intersection of technology and healthcare.</p>

      <p><em>Note: All information shared respects patient privacy and company confidentiality guidelines.</em></p>
    `
  },
  'ai-powered-cycling-platform': {
    id: 'ai-powered-cycling-platform',
    title: 'How I Built an AI-Powered Cycling Training Platform',
    date: '2024-12-20',
    readTime: '12 min read',
    tags: ['AI', 'FastAPI', 'PostgreSQL', 'React', 'Strava API'],
    content: `
      <p>Reroute started as a personal project to solve a problem I faced as a cyclist in Montana: finding good training routes that avoid busy highways. What began as a simple route generator evolved into a comprehensive AI-powered training platform.</p>

      <h2>The Problem</h2>
      <p>Existing cycling apps either generated routes that prioritized shortest distance over safety, or required extensive local knowledge to find good training routes. I wanted something that could:</p>
      <ul>
        <li>Generate safe, training-focused routes</li>
        <li>Integrate with my existing Strava data</li>
        <li>Create personalized training plans</li>
        <li>Track performance metrics over time</li>
      </ul>

      <h2>Architecture Overview</h2>
      <p>Reroute is built as a modern full-stack application:</p>
      <ul>
        <li><strong>Frontend:</strong> React with TypeScript, Tailwind CSS, and Mapbox for visualizations</li>
        <li><strong>Backend:</strong> FastAPI (Python) for rapid development and automatic API documentation</li>
        <li><strong>Database:</strong> PostgreSQL with PostGIS for geospatial data</li>
        <li><strong>AI:</strong> OpenAI GPT-4 for training plan generation and route optimization</li>
        <li><strong>Deployment:</strong> Google Cloud Run for scalable, serverless deployment</li>
      </ul>

      <h2>Route Generation Challenges</h2>
      <p>Building an effective route generation system required solving several technical challenges:</p>

      <h3>Geospatial Data Processing</h3>
      <p>I integrated with GraphHopper for routing and SRTM elevation data to ensure accurate elevation profiles. The challenge was balancing route quality with API response times.</p>

      <h3>AI Integration</h3>
      <p>Using GPT-4 to generate training plans required careful prompt engineering to ensure the AI understood cycling-specific concepts like Training Stress Score (TSS), Functional Threshold Power (FTP), and periodization.</p>

      <h2>Strava Integration Deep Dive</h2>
      <p>Integrating with Strava's API presented several interesting challenges:</p>
      <ul>
        <li><strong>OAuth Flow:</strong> Implementing a secure OAuth flow with popup windows</li>
        <li><strong>Rate Limiting:</strong> Strava has strict rate limits that required implementing smart caching</li>
        <li><strong>Data Processing:</strong> Converting Strava's activity data into actionable training insights</li>
      </ul>

      <h2>Performance Optimizations</h2>
      <p>As the platform grew, several performance optimizations became necessary:</p>
      <ul>
        <li>Implementing Redis caching for frequently accessed route data</li>
        <li>Using database indexes for geospatial queries</li>
        <li>Optimizing React components with proper memoization</li>
        <li>Implementing lazy loading for map components</li>
      </ul>

      <h2>Lessons Learned</h2>
      <ul>
        <li><strong>Start Simple:</strong> The MVP focused on just route generation before adding AI features</li>
        <li><strong>User Feedback is Gold:</strong> Beta testers provided insights I never would have discovered</li>
        <li><strong>Performance Matters:</strong> Users expect maps and routes to load quickly</li>
        <li><strong>AI Requires Domain Knowledge:</strong> Effective prompts require understanding the problem domain deeply</li>
      </ul>

      <h2>What's Next</h2>
      <p>Current development focuses on improving the AI agent capabilities and adding social features for cyclists to share routes and training plans.</p>

      <p><a href="https://reroute-app-828281382646.us-central1.run.app" target="_blank" rel="noopener noreferrer">Try Reroute live</a> | <a href="https://github.com/darraghmahns/ReRoute_v2" target="_blank" rel="noopener noreferrer">View source code</a></p>
    `
  }
};

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  
  if (!postId || !blogPostsContent[postId]) {
    return <Navigate to="/blog" replace />;
  }

  const post = blogPostsContent[postId];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article className="blog-post-container">
      <div className="blog-post-header">
        <Link to="/blog" className="back-link">← Back to Blog</Link>
        
        <div className="post-meta">
          <span className="post-date">{formatDate(post.date)}</span>
          <span className="read-time">{post.readTime}</span>
        </div>
        
        <h1>{post.title}</h1>
        
        <div className="post-tags">
          {post.tags.map((tag: string) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="blog-post-content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="blog-post-footer">
        <div className="author-section">
          <h3>About the Author</h3>
          <p>
            Darragh Mahns is a Software Engineer and Computer Science graduate student at USC. 
            Currently working as a Software Engineer Intern at Keck Medicine of USC, 
            building healthcare applications and patient management systems.
          </p>
          <Link to="/contact" className="contact-author">Get in Touch</Link>
        </div>

        <div className="post-navigation">
          <Link to="/blog" className="cta-button">Read More Posts</Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;