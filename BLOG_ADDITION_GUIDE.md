# Blog Addition Guide for AI Vault

This guide documents the process for adding new blog posts to the AI Vault website, ensuring consistency with the established pattern.

## Overview

When adding new blog posts to AI Vault, there are two main components:
1. **Individual blog post files** (`.tsx` files in `pages/blog/`)
2. **Blog metadata entries** (in `pages/blog.tsx`)

## Step-by-Step Process

### 1. Create Individual Blog Post File

**Location:** `pages/blog/[blog-slug].tsx`

**File Structure:**
```tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BlogPost = () => {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Blog Post Title - AI Vault</title>
        <meta name="description" content="Blog post excerpt" />
        <meta name="keywords" content="relevant, keywords, here" />
        <meta name="author" content="Atlas Neo Team" />
        <meta property="og:title" content="Blog Post Title" />
        <meta property="og:description" content="Blog post excerpt" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://atlasneo.io${router.asPath}`} />
        <meta property="og:image" content="https://atlasneo.io/images/blog/blog-slug.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Post Title" />
        <meta name="twitter:description" content="Blog post excerpt" />
        <meta name="twitter:image" content="https://atlasneo.io/images/blog/blog-slug.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Blog Post Title",
            "description": "Blog post excerpt",
            "author": {
              "@type": "Organization",
              "name": "Atlas Neo Team"
            },
            "datePublished": "2025-XX-XX",
            "dateModified": "2025-XX-XX",
            "image": "https://atlasneo.io/images/blog/blog-slug.jpg",
            "url": `https://atlasneo.io${router.asPath}`,
            "publisher": {
              "@type": "Organization",
              "name": "Atlas Neo",
              "logo": {
                "@type": "ImageObject",
                "url": "https://atlasneo.io/images/logo.png"
              }
            }
          })}
        </script>
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="mb-4">
              <Link href="/blog" className="text-blue-200 hover:text-white transition-colors">
                ← Back to Blog
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4">Blog Post Title</h1>
            <div className="flex items-center text-blue-200">
              <span>Atlas Neo Team</span>
              <span className="mx-2">•</span>
              <span>2025-XX-XX</span>
              <span className="mx-2">•</span>
              <span>XX min read</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none">
            {/* Blog content goes here */}
            <p>Blog post content...</p>
          </div>
          
          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between">
              <Link href="/blog/previous-blog-slug" className="text-blue-600 hover:text-blue-800">
                ← Previous Post
              </Link>
              <Link href="/blog/next-blog-slug" className="text-blue-600 hover:text-blue-800">
                Next Post →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
```

### 2. Add Metadata to Blog Page

**Location:** `pages/blog.tsx`

**Add to `blogPosts` array:**
```tsx
{
  id: 'blog-slug',
  title: 'Blog Post Title',
  excerpt: 'Brief description of the blog post content (150-200 characters)',
  date: '2025-XX-XX',
  author: 'Atlas Neo Team',
  category: 'Category Name',
  readTime: 'XX min read'
},
```

## Important Guidelines

### File Naming Convention
- Use kebab-case for file names
- Example: `the-2025-developers-stack-architectural-blueprint-building-at-scale.tsx`

### Blog Post ID/Slug
- Must match the filename (without `.tsx`)
- Use kebab-case
- Should be descriptive and SEO-friendly

### Date Format
- Always use `YYYY-MM-DD` format
- Example: `'2025-11-20'`

### Categories
Common categories used:
- Engineering
- Strategy
- Vision
- Productivity
- Design
- Development
- AI
- Business

### Read Time
- Format: `'XX min read'`
- Estimate based on reading speed of ~200-250 words per minute

### Navigation Links
- Always include previous/next post navigation
- Use the actual slugs of adjacent posts in the chronological order

### SEO Metadata
- Title: `[Blog Title] - AI Vault`
- Description: Use the blog excerpt
- Keywords: Include relevant terms from the content
- Open Graph tags for social sharing
- JSON-LD structured data for search engines

## Recent Additions Example

The following 20 blog posts were added using this pattern:

1. The 2025 Developer's Stack: An Architectural Blueprint for Building at Scale
2. Beyond Feature Lists: The Executive's Framework for Strategic SaaS Procurement
3. The Tool Selection Paradox: Why More Choice Kills Productivity & How to Fix It
4. Figma vs. Sketch vs. Penpot in 2025: The Ultimate UI/UX Platform Showdown
5. The Low-Code Arena: A Developer's Brutally Honest Review of Bubble, Webflow, and Adalo
6. Notion vs. Coda vs. AnyType: The Quest for the One True Workspace
7. The Invisible Interface: How AI Agents Will Make Apps & Websites Obsolete
8. We Used AI to Build a Startup in 48 Hours: The Stack, The Cost, The Reality
9. Beyond ChatGPT: The Atlas Neo Guide to Niche AI Tools You've Never Heard Of
10. The State of Open Source 2025: Funding, Fragmentation, and the Future
11. The Great Consolidation: Which SaaS Categories Are Dying and Which Are Thriving?
12. Pricing Page Teardown: How the Top 100 SaaS Companies Structure Their Plans
13. Our AWS Bill Was $50,000. Here's How We Fixed It. A Cloud Cost Optimization Playbook
14. The Ultimate Guide to Developer Onboarding: The Tools That Make New Hires Productive in Day 1
15. Your Team Is Drowning in Notifications. Here's a Systematic Framework for Digital Wellness.
16. Tool Darwinism: Why the Best Product Doesn't Always Win
17. The Composability Imperative: Why Your Future Stack Will Be Built Like Lego Blocks
18. The Ethics of Code: A Developer's Guide to Responsible Tool Selection
19. From Monolith to Micro-SaaS: The Unstoppable Fragmentation of Software
20. The Atlas Neo Manifesto: Why the World Needs a Smarter Map of the Digital Toolscape

## Verification Checklist

After adding a new blog post:

- [ ] Individual `.tsx` file created in `pages/blog/`
- [ ] Metadata entry added to `blogPosts` array in `pages/blog.tsx`
- [ ] File name matches the `id` field in metadata
- [ ] SEO metadata is complete and accurate
- [ ] JSON-LD structured data is properly formatted
- [ ] Navigation links point to correct adjacent posts
- [ ] Content is properly formatted with Tailwind CSS classes
- [ ] All apostrophes in strings are properly escaped (`\'`)
- [ ] Blog post appears on the main blog page

## Common Issues to Avoid

1. **Unescaped Apostrophes:** Always use `\'` instead of `'` in JSX strings
2. **Mismatched Slugs:** Ensure filename matches the `id` field exactly
3. **Missing Navigation:** Always include previous/next post links
4. **Incorrect Date Format:** Use `YYYY-MM-DD` format consistently
5. **Missing SEO Tags:** Include all meta tags for proper SEO

This guide ensures consistency across all blog posts and maintains the established pattern for future additions.
