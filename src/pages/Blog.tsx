// src/pages/Blog.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Blog.css';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const Blog: React.FC = () => {
  // Mock blog posts - replace with real data management later
  const [posts] = useState<BlogPost[]>([
    {
      id: 'healthcare-software-challenges',
      title: 'Building Healthcare Software: Lessons from Keck Medicine',
      excerpt: 'Insights from developing patient scheduling systems and working with healthcare APIs like Cerner in a regulated environment.',
      content: '', // Full content would be stored separately
      date: '2025-01-15',
      readTime: '8 min read',
      tags: ['Healthcare', 'React', 'API Integration', 'Cerner'],
      featured: true
    },
    {
      id: 'ai-powered-cycling-platform',
      title: 'How I Built an AI-Powered Cycling Training Platform',
      excerpt: 'Deep dive into the architecture and challenges of building Reroute, from route generation algorithms to Strava API integration.',
      content: '',
      date: '2024-12-20',
      readTime: '12 min read',
      tags: ['AI', 'FastAPI', 'PostgreSQL', 'React', 'Strava API'],
      featured: true
    },
    {
      id: 'scalable-payment-systems',
      title: 'Building Scalable Payment Systems with Stripe',
      excerpt: 'Lessons learned implementing secure payment processing at Posted Software and best practices for handling financial data.',
      content: '',
      date: '2024-11-10',
      readTime: '6 min read',
      tags: ['Payments', 'Security', 'Stripe', 'Node.js']
    },
    {
      id: 'react-performance-optimization',
      title: 'React Performance Optimization: Beyond the Basics',
      excerpt: 'Advanced techniques for optimizing React applications, including memoization strategies and bundle size reduction.',
      content: '',
      date: '2024-10-25',
      readTime: '10 min read',
      tags: ['React', 'Performance', 'Optimization', 'JavaScript']
    }
  ]);

  const [selectedTag, setSelectedTag] = useState<string>('All');
  
  const allTags = ['All', ...Array.from(new Set(posts.flatMap(post => post.tags)))];
  
  const filteredPosts = selectedTag === 'All' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag));

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="blog-container">
      <div className="blog-header">
        <h1>Technical Blog</h1>
        <p>Insights from building software, solving problems, and learning new technologies</p>
      </div>

      {featuredPosts.length > 0 && (
        <section className="featured-posts">
          <h2>Featured Posts</h2>
          <div className="featured-grid">
            {featuredPosts.map(post => (
              <article key={post.id} className="featured-post-card">
                <div className="post-meta">
                  <span className="post-date">{formatDate(post.date)}</span>
                  <span className="read-time">{post.readTime}</span>
                </div>
                <h3>
                  <Link to={`/blog/${post.id}`} className="post-link">
                    {post.title}
                  </Link>
                </h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="tag"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="all-posts">
        <div className="posts-header">
          <h2>All Posts</h2>
          <div className="tag-filter">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="posts-list">
          {regularPosts.length === 0 ? (
            <p className="no-posts">No posts found with the selected tag.</p>
          ) : (
            regularPosts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-meta">
                  <span className="post-date">{formatDate(post.date)}</span>
                  <span className="read-time">{post.readTime}</span>
                </div>
                <h3>
                  <Link to={`/blog/${post.id}`} className="post-link">
                    {post.title}
                  </Link>
                </h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="tag"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <div className="blog-cta">
        <h3>Want to discuss these topics?</h3>
        <p>I'm always interested in connecting with fellow developers and discussing technical challenges.</p>
        <Link to="/contact" className="cta-button">Get in Touch</Link>
      </div>
    </section>
  );
};

export default Blog;