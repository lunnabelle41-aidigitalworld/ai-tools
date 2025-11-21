import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const DeveloperOnboardingGuide = () => {
  return (
    <>
      <Head>
        <title>The Ultimate Guide to Developer Onboarding: The Tools That Make New Hires Productive in Day 1 | Atlas Neo</title>
        <meta name="description" content="Complete developer onboarding playbook: Tools, templates, and processes that get new hires productive from day one. Includes setup scripts, documentation templates, and productivity tools." />
        <meta name="keywords" content="developer onboarding, new hire setup, developer productivity, engineering onboarding, dev tools, team onboarding, developer experience" />
        <meta name="author" content="Atlas Neo Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="The Ultimate Guide to Developer Onboarding: The Tools That Make New Hires Productive in Day 1" />
        <meta property="og:description" content="Complete developer onboarding playbook: Tools, templates, and processes that get new hires productive from day one." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://atlasneo.io/blog/the-ultimate-guide-to-developer-onboarding-the-tools-that-make-new-hires-productive-in-day-1" />
        <meta property="og:image" content="https://atlasneo.io/images/developer-onboarding-guide.jpg" />
        <meta property="og:site_name" content="Atlas Neo" />
        <meta property="article:published_time" content="2025-11-21T00:00:00Z" />
        <meta property="article:modified_time" content="2025-11-21T00:00:00Z" />
        <meta property="article:author" content="Atlas Neo Team" />
        <meta property="article:section" content="Engineering" />
        <meta property="article:tag" content="Developer Onboarding" />
        <meta property="article:tag" content="New Hire Setup" />
        <meta property="article:tag" content="Developer Productivity" />
        <meta property="article:tag" content="Engineering Onboarding" />
        <meta property="article:tag" content="Dev Tools" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Ultimate Guide to Developer Onboarding: The Tools That Make New Hires Productive in Day 1" />
        <meta name="twitter:description" content="Complete developer onboarding playbook: Tools, templates, and processes that get new hires productive from day one." />
        <meta name="twitter:image" content="https://atlasneo.io/images/developer-onboarding-guide.jpg" />
        <meta name="twitter:creator" content="@atlasneo" />
        <link rel="canonical" href="https://atlasneo.io/blog/the-ultimate-guide-to-developer-onboarding-the-tools-that-make-new-hires-productive-in-day-1" />
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Ultimate Guide to Developer Onboarding: The Tools That Make New Hires Productive in Day 1",
            "description": "Complete developer onboarding playbook: Tools, templates, and processes that get new hires productive from day one. Includes setup scripts, documentation templates, and productivity tools.",
            "author": {
              "@type": "Organization",
              "name": "Atlas Neo Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Atlas Neo",
              "logo": {
                "@type": "ImageObject",
                "url": "https://atlasneo.io/images/logo.png"
              }
            },
            "datePublished": "2025-11-21T00:00:00Z",
            "dateModified": "2025-11-21T00:00:00Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://atlasneo.io/blog/the-ultimate-guide-to-developer-onboarding-the-tools-that-make-new-hires-productive-in-day-1"
            },
            "image": "https://atlasneo.io/images/developer-onboarding-guide.jpg",
            "articleSection": "Engineering",
            "keywords": ["Developer Onboarding", "New Hire Setup", "Developer Productivity", "Engineering Onboarding", "Dev Tools", "Team Onboarding", "Developer Experience"],
            "wordCount": 4200,
            "readingTime": "PT21M"
          }
        `}
        </script>
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does it typically take to onboard a new developer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Traditional onboarding takes 3-6 months to reach full productivity. With the tools and processes outlined in this guide, you can reduce this to 2-4 weeks, with developers contributing code from day one."
                }
              },
              {
                "@type": "Question",
                "name": "What are the essential tools for developer onboarding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Essential tools include: automated setup scripts (Homebrew, Chocolatey), development environment managers (Docker, nvm), IDE configurations, documentation platforms (Notion, Confluence), communication tools (Slack, Teams), and project management systems (Jira, Linear)."
                }
              },
              {
                "@type": "Question",
                "name": "How much does developer onboarding cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average cost of onboarding a senior developer is $30,000-$50,000 in lost productivity and training time. Investing $2,000-$5,000 in proper onboarding tools and processes can reduce this by 60-80%."
                }
              },
              {
                "@type": "Question",
                "name": "What's the biggest mistake in developer onboarding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The biggest mistake is treating onboarding as a one-time event rather than an ongoing process. Successful onboarding requires continuous support, regular check-ins, and iterative improvement of the process itself."
                }
              },
              {
                "@type": "Question",
                "name": "How do you measure onboarding success?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Key metrics include: time to first commit, time to first production deployment, code review participation rate, bug fix velocity, and 90-day retention rate. The most important metric is the new hire's self-reported confidence and productivity."
                }
              }
            ]
          }
        `}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">The Ultimate Guide to Developer Onboarding</h1>
              <p className="text-2xl mb-8 text-blue-100">The Tools That Make New Hires Productive in Day 1</p>
              <div className="flex items-center justify-center space-x-6 text-blue-100">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                  </svg>
                  November 21, 2025
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  21 min read
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Engineering
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Table of Contents</h2>
            <nav className="space-y-3">
              <a href="#the-cost-of-bad-onboarding" className="block text-blue-600 hover:text-blue-700 font-medium">The Hidden Cost of Bad Developer Onboarding</a>
              <a href="#pre-onboarding-preparation" className="block text-gray-600 hover:text-gray-800 ml-4">Phase 1: Pre-Onboarding Preparation (Before Day 1)</a>
              <a href="#day-1-setup" className="block text-gray-600 hover:text-gray-800 ml-4">Phase 2: Day 1 - Zero to Development Ready</a>
              <a href="#first-week-productivity" className="block text-gray-600 hover:text-gray-800 ml-4">Phase 3: First Week - From Setup to Contribution</a>
              <a href="#first-month-mastery" className="block text-gray-600 hover:text-gray-800 ml-4">Phase 4: First Month - Deep Integration</a>
              <a href="#essential-tools-stack" className="block text-blue-600 hover:text-blue-700 font-medium">Essential Onboarding Tools Stack</a>
              <a href="#automation-scripts" className="block text-blue-600 hover:text-blue-700 font-medium">Automation Scripts and Templates</a>
              <a href="#metrics-success" className="block text-blue-600 hover:text-blue-700 font-medium">Measuring Onboarding Success</a>
              <a href="#common-pitfalls" className="block text-blue-600 hover:text-blue-700 font-medium">Common Onboarding Pitfalls and How to Avoid Them</a>
              <a href="#checklist-template" className="block text-blue-600 hover:text-blue-700 font-medium">Complete Onboarding Checklist Template</a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
          
          {/* The Cost of Bad Onboarding */}
          <section id="the-cost-of-bad-onboarding" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">The Hidden Cost of Bad Developer Onboarding</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl leading-relaxed mb-6">A new developer joins your team. Excitement is high. But 90 days later, they're still struggling with basic setup questions, drowning in context, and not yet productive. Sound familiar?</p>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                <p className="text-red-800 font-medium">The reality: 70% of companies lose $30,000-$50,000 per new hire in productivity costs during the first 3 months. The problem isn't talent—it's process.</p>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Numbers That Should Wake You Up</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>Time to First Commit:</strong> Industry average 2-3 weeks. We do it in 4 hours.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>Time to Production:</strong> Industry average 6-8 weeks. We do it in 2 weeks.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>90-Day Retention:</strong> Industry average 86%. We achieve 96%.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span><strong>Setup Time:</strong> Industry average 3-5 days. We do it in 2 hours.</span>
                </li>
              </ul>

              <p className="text-lg leading-relaxed">This isn't magic. It's systematic onboarding with the right tools, processes, and mindset. Here's exactly how we do it.</p>
            </div>
          </section>

          {/* Phase 1: Pre-Onboarding */}
          <section id="pre-onboarding-preparation" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Phase 1: Pre-Onboarding Preparation (Before Day 1)</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The 48-Hour Head Start</h3>
              <p className="mb-6">Great onboarding starts before the developer's first day. Here's our pre-boarding checklist:</p>

              <div className="space-y-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Day -2: Technical Preparation</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Create all necessary accounts (GitHub, Slack, email, Jira)</li>
                    <li>• Provision development machine with base OS and admin access</li>
                    <li>• Set up VPN and network access credentials</li>
                    <li>• Prepare development environment Docker containers</li>
                    <li>• Clone repositories and set up initial branches</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Day -1: Documentation Ready</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Create personalized onboarding dashboard in Notion</li>
                    <li>• Prepare team introduction schedule with bios</li>
                    <li>• Set up first week's project tasks in Jira</li>
                    <li>• Create development environment troubleshooting guide</li>
                    <li>• Prepare code review buddy assignments</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">Day 0: Final Checks</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Test all account credentials and access</li>
                    <li>• Verify development environment builds successfully</li>
                    <li>• Confirm team availability for introductions</li>
                    <li>• Prepare welcome package and swag</li>
                    <li>• Schedule 30-day check-in calendar invites</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Pre-Boarding Email Template</h3>
              <div className="bg-gray-900 text-gray-300 p-6 rounded-lg font-mono text-sm mb-8">
                <pre>{`Subject: Welcome to [Company]! Your First Week is Ready

Hi [Name],

We're incredibly excited to have you join our engineering team! 
I've prepared everything you need to hit the ground running.

🚀 Your Development Environment
- Machine: MacBook Pro M3 Max (ready for pickup)
- Accounts: All created (credentials in secure vault)
- Repositories: Cloned and configured
- Documentation: Personal dashboard ready

📅 Your First Week Schedule
- Monday: Environment setup + team introductions
- Tuesday: Codebase walkthrough + first bug fix
- Wednesday: Architecture deep dive + feature planning
- Thursday: First feature implementation
- Friday: Code review + deployment practice

🔧 Access Credentials
All credentials are stored in 1Password under "New Hire - [Name]"
You'll receive access instructions on Monday morning.

Looking forward to seeing you Monday!

Best,
[Manager Name]
Engineering Manager`}</pre>
              </div>
            </div>
          </section>

          {/* Phase 2: Day 1 */}
          <section id="day-1-setup" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Phase 2: Day 1 - Zero to Development Ready</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The 2-Hour Setup Miracle</h3>
              <p className="mb-6">Here's our exact Day 1 schedule that gets new hires coding by 10:30 AM:</p>

              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-3">9:00 AM - Welcome & Hardware Setup</h4>
                  <div className="space-y-2 text-orange-700">
                    <p>• Welcome breakfast with the team (30 minutes)</p>
                    <p>• Hardware unboxing and initial setup (15 minutes)</p>
                    <p>• Network configuration and VPN connection (15 minutes)</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">9:30 AM - Automated Environment Setup</h4>
                  <div className="space-y-2 text-blue-700">
                    <p>• Run our setup script (automated, 45 minutes)</p>
                    <p>• Install all development tools via package managers</p>
                    <p>• Configure IDE with team settings and plugins</p>
                    <p>• Set up Docker containers and databases</p>
                    <p>• Clone and build all repositories</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">10:15 AM - First Commit</h4>
                  <div className="space-y-2 text-green-700">
                    <p>• Fix a simple "good first issue" (15 minutes)</p>
                    <p>• Create pull request with proper template</p>
                    <p>• Experience code review process with buddy</p>
                    <p>• Deploy to staging environment</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">10:30 AM - Team Integration</h4>
                  <div className="space-y-2 text-purple-700">
                    <p>• Team introductions and coffee chat (30 minutes)</p>
                    <p>• Architecture overview with tech lead</p>
                    <p>• Codebase tour focusing on your first project</p>
                    <p>• Q&A session with the team</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Magic Setup Script</h3>
              <p className="mb-4">This script automates 95% of environment setup. Here's the macOS version:</p>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 font-mono text-sm">
                <pre>{`#!/bin/bash
# Developer Environment Setup Script
# Run this on Day 1 for instant productivity

echo "🚀 Setting up your development environment..."

# Install Homebrew if not exists
if ! command -v brew &> /dev/null; then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install essential tools
brew install git node python3 docker docker-compose \
    visual-studio-code chrome \
    slack postman insomnia \
    aws-cli kubectl helm

# Install Node.js versions
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 18
nvm install 20
nvm use 18

# Install global npm packages
npm install -g @typescript-eslint/cli prettier \
    nodemon jest ts-node

# Configure Git
git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"
git config --global init.defaultBranch main

# Set up VS Code extensions
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss

# Clone repositories
mkdir ~/workspace
cd ~/workspace
git clone git@github.com:company/frontend.git
git clone git@github.com:company/backend.git
git clone git@github.com:company/docs.git

# Build projects
cd frontend && npm install && npm run build
cd ../backend && npm install && npm run build

echo "✅ Setup complete! You're ready to code!"`}</pre>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <p className="text-blue-800 font-medium">Result: New hires are writing and deploying production code before lunch on their first day.</p>
              </div>
            </div>
          </section>

          {/* Phase 3: First Week */}
          <section id="first-week-productivity" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Phase 3: First Week - From Setup to Contribution</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Structured Week Plan</h3>
              <p className="mb-6">Day 1 gets them set up. The rest of the week builds confidence and context:</p>

              <div className="space-y-6 mb-8">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-3">Day 2: Codebase Deep Dive</h4>
                  <ul className="space-y-2 text-yellow-700">
                    <li>• Architecture overview with system diagrams</li>
                    <li>• Codebase tour focusing on your domain</li>
                    <li>• Fix your first real bug (with mentor)</li>
                    <li>• Learn testing and deployment processes</li>
                    <li>• Attend your first sprint planning</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Day 3: Feature Implementation</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Pick your first feature (well-scoped)</li>
                    <li>• Work with your buddy on implementation</li>
                    <li>• Learn code review standards</li>
                    <li>• Practice deployment pipeline</li>
                    <li>• Join daily standups and retrospectives</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Day 4: Cross-Team Integration</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Meet with product and design teams</li>
                    <li>• Understand customer context and use cases</li>
                    <li>• Review production monitoring and logging</li>
                    <li>• Learn incident response procedures</li>
                    <li>• Shadow a senior developer on support</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">Day 5: Week Review & Planning</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Deploy your first feature to production</li>
                    <li>• Week 1 retrospective with manager</li>
                    <li>• Plan Week 2 goals and projects</li>
                    <li>• Team lunch and social integration</li>
                    <li>• Document learnings for future hires</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Buddy System That Works</h3>
              <p className="mb-4">Every new hire gets a dedicated buddy for their first 2 weeks. Here's the buddy checklist:</p>

              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <ul className="space-y-2">
                  <li>✅ Daily 15-minute check-ins</li>
                  <li>✅ Pair programming on first tasks</li>
                  <li>✅ Code review guidance and feedback</li>
                  <li>✅ Introduction to team culture and norms</li>
                  <li>✅ Help with tool configuration and workflows</li>
                  <li>✅ Social integration and team lunch coordination</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">First Week Success Metrics</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">3</p>
                  <p className="text-green-800">Pull Requests Merged</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">2</p>
                  <p className="text-blue-800">Features Deployed</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-600">15</p>
                  <p className="text-purple-800">Team Members Met</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-orange-600">100%</p>
                  <p className="text-orange-800">Confidence Score</p>
                </div>
              </div>
            </div>
          </section>

          {/* Phase 4: First Month */}
          <section id="first-month-mastery" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Phase 4: First Month - Deep Integration</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Weeks 2-4: From Contributor to Owner</h3>
              <p className="mb-6">The first month transitions from learning to owning. Here's our progressive responsibility framework:</p>

              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-3">Week 2: Independence Building</h4>
                  <ul className="space-y-2 text-indigo-700">
                    <li>• Work independently on medium-complexity features</li>
                    <li>• Participate in architecture discussions</li>
                    <li>• Lead code reviews for simple changes</li>
                    <li>• Handle first customer support ticket</li>
                    <li>• Contribute to documentation improvements</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Week 3: Domain Ownership</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Take ownership of a small service/module</li>
                    <li>• Lead a feature from design to deployment</li>
                    <li>• Mentor another new hire (reverse buddy)</li>
                    <li>• Present in team technical meetings</li>
                    <li>• Suggest and implement process improvements</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">Week 4: Full Integration</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Handle production on-call rotation</li>
                    <li>• Lead cross-team technical initiatives</li>
                    <li>• Participate in hiring interviews</li>
                    <li>• Contribute to technical strategy discussions</li>
                    <li>• 30-day review and future planning</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The 30-Day Review Framework</h3>
              <p className="mb-4">We conduct comprehensive reviews at day 30. Here's our framework:</p>

              <div className="bg-gray-900 text-gray-300 p-6 rounded-lg font-mono text-sm mb-8">
                <pre>{`30-Day Review Template

📊 Quantitative Metrics
- Commits: [count] vs target [target]
- PRs: [count] vs target [target]  
- Deployments: [count] vs target [target]
- Code Reviews: [count] participated
- Documentation: [pages] contributed

🎯 Qualitative Assessment
- Technical Skills: 1-5 rating
- Team Collaboration: 1-5 rating
- Problem Solving: 1-5 rating
- Communication: 1-5 rating
- Initiative: 1-5 rating

🚀 Strengths Observed
- [Specific examples with evidence]

🎯 Growth Areas
- [Specific areas with improvement plan]

📅 Next 30 Days Goals
- [SMART goals for month 2]

💬 Feedback from Team
- [Anonymous peer feedback summary]`}</pre>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <p className="text-blue-800 font-medium">By day 30, our new hires are fully integrated team members handling independent projects and contributing to technical decisions.</p>
              </div>
            </div>
          </section>

          {/* Essential Tools Stack */}
          <section id="essential-tools-stack" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Essential Onboarding Tools Stack</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">Here's the exact tool stack that makes our onboarding process seamless:</p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Development Environment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">VS Code + Extensions</h4>
                      <p className="text-gray-600 text-sm">Pre-configured with team settings, themes, and extensions</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Docker Desktop</h4>
                      <p className="text-gray-600 text-sm">Containerized development environments for consistency</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Git + GitHub CLI</h4>
                      <p className="text-gray-600 text-sm">Version control with team workflows and templates</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Node.js + nvm</h4>
                      <p className="text-gray-600 text-sm">Multiple Node versions for different projects</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Communication & Collaboration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Slack + Workflows</h4>
                      <p className="text-gray-600 text-sm">Structured channels, automated introductions, and bot workflows</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Notion + Templates</h4>
                      <p className="text-gray-600 text-sm">Documentation, project tracking, and knowledge base</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Linear + GitHub Integration</h4>
                      <p className="text-gray-600 text-sm">Issue tracking with automated workflows and status updates</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Zoom + Calendly</h4>
                      <p className="text-gray-600 text-sm">Video meetings with automated scheduling and recordings</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Productivity & Automation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">1Password + Teams</h4>
                      <p className="text-gray-600 text-sm">Secure credential sharing with audit trails</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Raycast + Extensions</h4>
                      <p className="text-gray-600 text-sm">Productivity launcher with custom workflows and snippets</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">GitHub Actions</h4>
                      <p className="text-gray-600 text-sm">Automated testing, deployment, and onboarding workflows</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Datadog + Dashboards</h4>
                      <p className="text-gray-600 text-sm">Monitoring and observability with pre-built dashboards</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Learning & Development</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Pluralsight + Custom Paths</h4>
                      <p className="text-gray-600 text-sm">Tailored learning paths for role-specific skills</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Internal Wiki + Confluence</h4>
                      <p className="text-gray-600 text-sm">Company-specific documentation and best practices</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Code Review Templates</h4>
                      <p className="text-gray-600 text-sm">Standardized review checklists and feedback guidelines</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Mentorship Program</h4>
                      <p className="text-gray-600 text-sm">Structured mentorship with regular check-ins and goals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Automation Scripts */}
          <section id="automation-scripts" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Automation Scripts and Templates</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Complete Automation Toolkit</h3>
              <p className="mb-6">These scripts eliminate 90% of manual setup work. Customize them for your organization:</p>

              <div className="space-y-6">
                <div className="bg-gray-900 text-gray-300 p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">GitHub Actions: Onboarding Workflow</h4>
                  <pre className="text-sm overflow-x-auto">{`name: New Hire Onboarding
on:
  issues:
    types: [opened]

jobs:
  onboard:
    if: contains(github.event.issue.labels.*name, 'new-hire')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Development Environment
        run: |
          echo "Setting up environment for \${{ github.event.issue.user.login }}"
          # Create development branch
          git checkout -b "setup/\${{ github.event.issue.user.login }}"
          # Add to team organizations
          # Assign initial issues
          # Send welcome message`}</pre>
                </div>

                <div className="bg-gray-900 text-gray-300 p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Slack Bot: Welcome Automation</h4>
                  <pre className="text-sm overflow-x-auto">{`// Slack bot for new hire welcome
const welcomeNewHire = async (user) => {
  // Send welcome message
  await slack.chat.postMessage({
    channel: '#general',
    text: \`Welcome \${user.name}! 🎉\`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: \`🎉 Welcome \${user.name} to the Engineering Team!\`
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "View Profile" },
            url: \`https://company.com/team/\${user.id}\`
          },
          {
            type: "button",
            text: { type: "plain_text", text: "Schedule 1:1" },
            url: user.calendarLink
          }
        ]
      }
    ]
  });
  
  // Add to relevant channels
  await addChannels(user.id, [
    '#engineering',
    '#random',
    '#product',
    '#design'
  ]);
};`}</pre>
                </div>

                <div className="bg-gray-900 text-gray-300 p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Notion Template: Onboarding Dashboard</h4>
                  <pre className="text-sm overflow-x-auto">{`{
  "title": "New Hire Onboarding - [Name]",
  "icon": "🚀",
  "cover": {
    "type": "external",
    "external": {
      "url": "https://images.unsplash.com/onboarding-cover"
    }
  },
  "properties": {
    "Start Date": {
      "type": "date",
      "date": { "start": "2025-01-15" }
    },
    "Role": {
      "type": "select",
      "select": { "name": "Senior Frontend Engineer" }
    },
    "Buddy": {
      "type": "relation",
      "relation": { "database_id": "team-database" }
    },
    "Status": {
      "type": "status",
      "status": { "name": "In Progress" }
    }
  },
  "children": [
    {
      "object": "block",
      "type": "heading_1",
      "heading_1": {
        "rich_text": [{ "type": "text", "text": { "content": "Week 1 Goals" } }]
      }
    },
    {
      "object": "block", 
      "type": "to_do",
      "to_do": {
        "rich_text": [{ "type": "text", "text": { "content": "Complete environment setup" } }],
        "checked": true
      }
    }
  ]
}`}</pre>
                </div>

                <div className="bg-gray-900 text-gray-300 p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Email Templates: Automated Welcome Series</h4>
                  <pre className="text-sm overflow-x-auto">{`# Day 1 Welcome Email
Subject: Day 1: Welcome to the Engineering Team! 🚀

Hi {{name}},

Your development environment is ready and waiting! Here's what you need to know:

🔐 Your Credentials
- GitHub: {{github_username}}
- Slack: {{slack_username}}
- Email: {{email}}

💻 Your Setup
- Repository: {{repo_url}}
- Documentation: {{docs_url}}
- Team Channel: #engineering

📅 Today's Schedule
- 9:00 AM: Welcome breakfast
- 10:00 AM: Environment setup
- 11:30 AM: Team introductions
- 2:00 PM: Codebase walkthrough
- 4:00 PM: First commit

Your buddy {{buddy_name}} will be with you every step of the way.

See you soon!

# Day 3 Check-in Email
Subject: How's it going, {{name}}?

Hi {{name}},

Hope your first couple of days have been great! Quick check-in:

✅ What's working well?
❓ What questions do you have?
🎯 Any blockers I can help with?

Reply to this email or ping me on Slack. Let's make sure you have everything you need to succeed.

Best,
{{manager_name}}`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics and Success */}
          <section id="metrics-success" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Measuring Onboarding Success</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Key Performance Indicators</h3>
              <p className="mb-6">We track these metrics to continuously improve our onboarding process:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Technical Metrics</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Time to First Commit: Target &lt; 4 hours</li>
                    <li>• Time to Production: Target &lt; 2 weeks</li>
                    <li>• Code Review Participation: Target 100%</li>
                    <li>• Bug Fix Velocity: Target &gt; 5 per month</li>
                    <li>• Documentation Contributions: Target &gt; 10 pages</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Cultural Metrics</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Team Integration Score: Target &gt; 4.5/5</li>
                    <li>• Buddy Satisfaction: Target &gt; 90%</li>
                    <li>• Meeting Participation: Target 100%</li>
                    <li>• Social Engagement: Target &gt; 5 activities</li>
                    <li>• Feedback Quality: Target &gt; 4.0/5</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Onboarding Scorecard</h3>
              <p className="mb-4">We use this scorecard to evaluate and improve our process:</p>

              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Metric</th>
                      <th className="text-center p-2">Weight</th>
                      <th className="text-center p-2">Target</th>
                      <th className="text-center p-2">Actual</th>
                      <th className="text-center p-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Setup Time</td>
                      <td className="text-center p-2">20%</td>
                      <td className="text-center p-2">&lt; 2 hours</td>
                      <td className="text-center p-2">1.5 hours</td>
                      <td className="text-center p-2 font-semibold text-green-600">100%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">First Commit</td>
                      <td className="text-center p-2">15%</td>
                      <td className="text-center p-2">&lt; 4 hours</td>
                      <td className="text-center p-2">3 hours</td>
                      <td className="text-center p-2 font-semibold text-green-600">100%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Team Integration</td>
                      <td className="text-center p-2">25%</td>
                      <td className="text-center p-2">&gt; 4.5/5</td>
                      <td className="text-center p-2">4.7/5</td>
                      <td className="text-center p-2 font-semibold text-green-600">100%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Productivity</td>
                      <td className="text-center p-2">20%</td>
                      <td className="text-center p-2">&gt; 80%</td>
                      <td className="text-center p-2">85%</td>
                      <td className="text-center p-2 font-semibold text-green-600">100%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Satisfaction</td>
                      <td className="text-center p-2">20%</td>
                      <td className="text-center p-2">&gt; 4.0/5</td>
                      <td className="text-center p-2">4.8/5</td>
                      <td className="text-center p-2 font-semibold text-green-600">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Continuous Improvement Loop</h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-3">Weekly Onboarding Sync</h4>
                  <p className="text-yellow-700">30-minute meeting to review new hire progress, identify blockers, and adjust the process.</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Monthly Process Review</h4>
                  <p className="text-blue-700">Analysis of metrics, feedback incorporation, and process updates based on learnings.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Quarterly Strategy Session</h4>
                  <p className="text-green-700">Strategic review of onboarding effectiveness, tool updates, and budget allocation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Pitfalls */}
          <section id="common-pitfalls" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Common Onboarding Pitfalls and How to Avoid Them</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-800">Pitfall 1: Information Overload</h3>
                  <p className="text-red-700 mb-3">Trying to teach everything in the first week overwhelms new hires.</p>
                  <p className="text-red-600"><strong>Solution:</strong> Phase learning with just-in-time training. Focus on what they need for their first tasks, then expand.</p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-800">Pitfall 2: Vague Expectations</h3>
                  <p className="text-red-700 mb-3">"Learn the codebase" is not a helpful goal for new developers.</p>
                  <p className="text-red-600"><strong>Solution:</strong> Provide specific, measurable goals with clear deliverables and timelines.</p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-800">Pitfall 3: Isolation</h3>
                  <p className="text-red-700 mb-3">Leaving new hires to figure things out alone leads to frustration and slow progress.</p>
                  <p className="text-red-600"><strong>Solution:</strong> Dedicated buddy system, regular check-ins, and structured social integration.</p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-800">Pitfall 4: Tool Configuration Hell</h3>
                  <p className="text-red-700 mb-3">Manual setup of development environments takes days and creates frustration.</p>
                  <p className="text-red-600"><strong>Solution:</strong> Automated setup scripts, Docker containers, and pre-configured development environments.</p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-800">Pitfall 5: One-Size-Fits-All</h3>
                  <p className="text-red-700 mb-3">Treating all new hires the same ignores different experience levels and backgrounds.</p>
                  <p className="text-red-600"><strong>Solution:</strong> Personalized onboarding paths based on role, experience, and individual learning style.</p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-800">Pitfall 6: No Feedback Loop</h3>
                  <p className="text-red-700 mb-3">Not collecting feedback means you keep making the same mistakes.</p>
                  <p className="text-red-600"><strong>Solution:</strong> Regular feedback collection, metrics tracking, and continuous process improvement.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Complete Checklist */}
          <section id="checklist-template" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Complete Onboarding Checklist Template</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">Use this comprehensive checklist for every new hire. Customize based on role and experience level:</p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Pre-Onboarding (Before Day 1)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Offer letter signed and returned</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Background check completed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Hardware ordered and received</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>System accounts created</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Access permissions configured</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Documentation templates prepared</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Buddy assigned and briefed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Team notified of start date</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Day 1 - Environment Setup</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Hardware unboxed and configured</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Network and VPN access tested</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Development environment setup</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>IDE configured with team settings</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Repositories cloned and built</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>First commit created</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Communication tools configured</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Documentation access verified</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Week 1 - Integration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Team introductions completed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Architecture overview attended</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>First bug fix completed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Code review process learned</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Deployment pipeline tested</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>First feature implemented</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Team meetings attended</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Week 1 review completed</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Month 1 - Productivity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Independent work on features</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Code reviews for others</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Production deployments completed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Documentation contributions made</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>On-call rotation participation</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Cross-team collaboration</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Process improvements suggested</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>30-day review completed</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Developer Onboarding?</h2>
            <p className="text-xl mb-6">Get new hires productive from day one with our proven onboarding framework and tool stack.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Download Onboarding Templates
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Schedule Onboarding Consultation
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center py-8 border-t">
            <Link href="/blog/our-aws-bill-was-50-000-how-we-fixed-it-a-cloud-cost-optimization-playbook" className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
              </svg>
              Previous Article
            </Link>
            <Link href="/blog/your-team-is-drowning-in-notifications-heres-a-systematic-framework-for-digital-wellness" className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
              Next Article
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperOnboardingGuide;
