import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ThumbsUp, MessageSquare, Tag, ArrowRight } from 'lucide-react';

// Blog post data
const blogPosts = {
  'wealth-building-guide-twenties': {
    title: 'The Complete Guide to Building Wealth in Your 20s: A Decade-by-Decade Strategy',
    description: 'Your twenties are a critical decade for establishing financial foundations. This comprehensive guide covers everything from emergency funds to investment strategies, helping you make the most of compound interest and time.',
    publishedDate: '2024-01-15',
    updatedDate: '2024-01-15',
    readTime: 15,
    category: 'Personal Finance',
    author: {
      name: 'Arjun Mehta',
      avatar: 'https://i.pravatar.cc/150?img=33',
      designation: 'Senior Financial Advisor',
      bio: 'Arjun has over 10 years of experience in financial planning and has helped hundreds of young professionals build wealth systematically.'
    },
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Wealth Building', 'Young Professionals', 'Investment Strategy', 'Personal Finance'],
    content: `
      <h2>Why Your 20s Are Critical for Wealth Building</h2>
      <p>Your twenties represent the most powerful decade for wealth building, thanks to the magic of compound interest and time. While your income might be modest compared to later decades, the time advantage you have is irreplaceable. Starting early means your money has more time to grow, and even small amounts invested consistently can grow into substantial wealth.</p>
      
      <p>Consider this: if you invest ₹5,000 per month starting at age 25 with an average annual return of 12%, you'll have approximately ₹3.5 crores by age 60. If you wait until 35 to start the same investment, you'll end up with only about ₹1.2 crores. The 10-year delay costs you over ₹2 crores!</p>
      
      <h2>Phase 1: Early 20s (22-25) - Foundation Building</h2>
      
      <h3>Emergency Fund: Your Financial Safety Net</h3>
      <p>Before any investment, build an emergency fund covering 3-6 months of expenses. In India, this is crucial given job market volatility and limited social safety nets. Start with ₹50,000-₹1,00,000 in a high-yield savings account or liquid mutual fund.</p>
      
      <p><strong>Emergency Fund Strategy:</strong></p>
      <ul>
        <li>Keep 2-3 months expenses in savings account for immediate access</li>
        <li>Invest remaining emergency fund in liquid funds for better returns</li>
        <li>Gradually increase to 6 months expenses as income grows</li>
        <li>Review and adjust based on job stability and family responsibilities</li>
      </ul>
      
      <h3>Health Insurance: Protecting Your Wealth</h3>
      <p>Health insurance is wealth protection, not an expense. Medical inflation in India averages 10-15% annually. A single major illness can wipe out years of savings. Get comprehensive health insurance with at least ₹10 lakh coverage.</p>
      
      <h3>Starting Your Investment Journey</h3>
      <p>Begin with SIP investments in equity mutual funds. Start small - even ₹1,000 per month matters. Focus on large-cap and flexi-cap funds for stability. As you understand markets better, diversify into mid-cap and small-cap funds.</p>
      
      <h2>Phase 2: Mid-20s (25-27) - Acceleration</h2>
      
      <h3>Career and Income Growth</h3>
      <p>Focus aggressively on skill development and career growth. Your income growth in these years will determine your wealth-building capacity for the next decade. Consider:</p>
      <ul>
        <li>Professional certifications relevant to your field</li>
        <li>Additional skills that increase your market value</li>
        <li>Networking and building professional relationships</li>
        <li>Strategic job changes for salary jumps</li>
      </ul>
      
      <h3>Tax-Efficient Investing</h3>
      <p>Maximize Section 80C deductions through ELSS funds, which offer tax benefits and potentially higher returns than traditional tax-saving instruments. Understand the tax implications of your investments early.</p>
      
      <h3>Building Credit History</h3>
      <p>Establish a good credit score early. Get a credit card, use it responsibly (never exceed 30% of limit), and pay bills on time. A good credit score will save you lakhs in loan interest over your lifetime.</p>
      
      <h2>Phase 3: Late 20s (27-30) - Optimization</h2>
      
      <h3>Advanced Investment Strategies</h3>
      <p>By now, you should have a more sophisticated investment approach:</p>
      <ul>
        <li><strong>Equity allocation:</strong> 70-80% of portfolio in equity funds</li>
        <li><strong>Debt allocation:</strong> 20-30% in debt funds for stability</li>
        <li><strong>International diversification:</strong> 10-20% in international funds</li>
        <li><strong>Sectoral exposure:</strong> Small allocation to sector-specific funds</li>
      </ul>
      
      <h3>Real Estate Considerations</h3>
      <p>While home ownership is a cultural priority in India, run the numbers carefully. In expensive cities like Mumbai or Bangalore, renting and investing the difference might be more profitable. Consider:</p>
      <ul>
        <li>EMI should not exceed 30% of take-home income</li>
        <li>Compare rental yield vs. equity returns</li>
        <li>Factor in maintenance, taxes, and opportunity costs</li>
        <li>Consider location, future growth prospects, and liquidity</li>
      </ul>
      
      <h2>Investment Allocation Strategy for Your 20s</h2>
      
      <h3>Conservative Approach (Low Risk Tolerance)</h3>
      <ul>
        <li>Large-cap funds: 40%</li>
        <li>Flexi-cap funds: 20%</li>
        <li>Debt funds: 30%</li>
        <li>International funds: 10%</li>
      </ul>
      
      <h3>Moderate Approach (Medium Risk Tolerance)</h3>
      <ul>
        <li>Large-cap funds: 30%</li>
        <li>Mid-cap funds: 25%</li>
        <li>Flexi-cap funds: 20%</li>
        <li>Debt funds: 15%</li>
        <li>International funds: 10%</li>
      </ul>
      
      <h3>Aggressive Approach (High Risk Tolerance)</h3>
      <ul>
        <li>Large-cap funds: 25%</li>
        <li>Mid-cap funds: 30%</li>
        <li>Small-cap funds: 20%</li>
        <li>International funds: 15%</li>
        <li>Debt funds: 10%</li>
      </ul>
      
      <h2>Common Mistakes to Avoid in Your 20s</h2>
      
      <h3>1. Lifestyle Inflation</h3>
      <p>As income increases, resist the urge to upgrade lifestyle proportionally. Follow the 50-30-20 rule: 50% for needs, 30% for wants, 20% for savings and investments.</p>
      
      <h3>2. Ignoring Insurance</h3>
      <p>Don't skip life and health insurance thinking you're young and healthy. Insurance is cheapest when you're young and becomes expensive or unavailable as you age.</p>
      
      <h3>3. Not Starting Early</h3>
      <p>The biggest mistake is waiting for the "right time" to start investing. Start with whatever amount you can, even if it's just ₹500 per month.</p>
      
      <h3>4. Chasing Quick Returns</h3>
      <p>Avoid get-rich-quick schemes, stock tips, and crypto speculation with money you can't afford to lose. Stick to systematic, diversified investing.</p>
      
      <h2>Technology and Tools for Wealth Building</h2>
      
      <h3>Investment Apps and Platforms</h3>
      <ul>
        <li><strong>Mutual Fund Investments:</strong> Groww, Kuvera, Coin by Zerodha</li>
        <li><strong>Stock Trading:</strong> Zerodha, Upstox, Angel Broking</li>
        <li><strong>Goal-based Planning:</strong> ET Money, Paytm Money</li>
        <li><strong>Expense Tracking:</strong> Money View, Walnut, Spendee</li>
      </ul>
      
      <h3>Automation is Key</h3>
      <p>Set up automatic investments through SIPs and automatic bill payments. Automation ensures consistency and removes emotional decision-making from investing.</p>
      
      <h2>Monitoring and Reviewing Your Portfolio</h2>
      
      <h3>Regular Review Schedule</h3>
      <ul>
        <li><strong>Monthly:</strong> Track expenses and review budget</li>
        <li><strong>Quarterly:</strong> Review portfolio performance and rebalance if needed</li>
        <li><strong>Annually:</strong> Complete financial health checkup and goal assessment</li>
      </ul>
      
      <h3>Key Metrics to Track</h3>
      <ul>
        <li>Net worth growth</li>
        <li>Investment returns vs. benchmarks</li>
        <li>Expense ratio and portfolio costs</li>
        <li>Asset allocation adherence</li>
        <li>Progress toward financial goals</li>
      </ul>
      
      <h2>Psychological Aspects of Wealth Building</h2>
      
      <h3>Developing the Right Mindset</h3>
      <p>Wealth building is as much psychological as it is mathematical. Develop patience, discipline, and long-term thinking. Understand that market volatility is normal and temporary.</p>
      
      <h3>Delayed Gratification</h3>
      <p>Practice delayed gratification by choosing long-term wealth over short-term pleasures. This doesn't mean living miserably, but making conscious trade-offs.</p>
      
      <h2>Building Multiple Income Streams</h2>
      
      <h3>Side Hustles and Passive Income</h3>
      <p>In your 20s, consider building additional income sources:</p>
      <ul>
        <li>Freelancing in your area of expertise</li>
        <li>Online content creation</li>
        <li>Tutoring or training</li>
        <li>Small business ventures</li>
        <li>Dividend-paying investments</li>
      </ul>
      
      <h2>Conclusion: The Compound Effect of Starting Early</h2>
      <p>Your 20s are the foundation decade for lifelong financial success. The habits you build, the knowledge you gain, and the investments you make now will compound over the next 30-40 years of your working life.</p>
      
      <p>Remember, wealth building is a marathon, not a sprint. Stay consistent, keep learning, and adjust your strategy as you grow. The decisions you make in your 20s about money will determine your financial freedom in your 50s and beyond.</p>
      
      <p>Start today, even if it's small. Your future self will thank you for the discipline and foresight you show today. The path to financial independence begins with a single step – take that step now.</p>
    `,
    relatedPosts: [
      {
        title: 'Indian Stock Market Analysis 2024: Sectors to Watch and Investment Opportunities',
        excerpt: 'An in-depth analysis of the Indian stock market trends for 2024.',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'indian-stock-market-analysis-2024',
      },
      {
        title: 'Financial Independence and Early Retirement (FIRE) Movement in India',
        excerpt: 'Learn how to achieve financial independence and retire early in the Indian context.',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'fire-movement-india-practical-guide',
      },
    ]
  },
  'indian-stock-market-analysis-2024': {
    title: 'Indian Stock Market Analysis 2024: Sectors to Watch and Investment Opportunities',
    description: 'An in-depth analysis of the Indian stock market trends for 2024, including sector-wise performance, emerging opportunities in renewable energy, technology, and healthcare sectors.',
    publishedDate: '2024-01-10',
    updatedDate: '2024-01-10',
    readTime: 20,
    category: 'Investments',
    author: {
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=28',
      designation: 'Market Research Analyst',
      bio: 'Priya is a CFA charterholder with 8 years of experience in equity research and portfolio management, specializing in Indian markets.'
    },
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Stock Market', 'India', 'Market Analysis', 'Investment', 'Sectors'],
    content: `
      <h2>Executive Summary: Indian Markets in 2024</h2>
      <p>The Indian stock market in 2024 presents a complex landscape of opportunities and challenges. With India's economy projected to grow at 6.5-7% GDP growth, the equity markets are positioned for continued expansion, albeit with selective sector performance. This comprehensive analysis examines key trends, sector opportunities, and investment strategies for the year ahead.</p>
      
      <p>Key highlights for 2024 include the continued digital transformation across sectors, green energy transition, manufacturing growth under PLI schemes, and the emerging opportunities in the healthcare and defense sectors.</p>
      
      <h2>Macroeconomic Overview</h2>
      
      <h3>GDP Growth and Economic Indicators</h3>
      <p>India's economic fundamentals remain robust with several positive indicators:</p>
      <ul>
        <li><strong>GDP Growth:</strong> Expected to maintain 6.5-7% growth rate</li>
        <li><strong>Inflation:</strong> Moderating towards RBI's 4% target</li>
        <li><strong>Interest Rates:</strong> Peak of the rate cycle likely reached</li>
        <li><strong>FII Flows:</strong> Stabilizing after volatile 2023</li>
        <li><strong>Corporate Earnings:</strong> Expected to grow 15-18% in FY24</li>
      </ul>
      
      <h3>Global Factors Impacting Indian Markets</h3>
      <p>Several global factors will influence Indian markets in 2024:</p>
      <ul>
        <li>US Federal Reserve policy and dollar strength</li>
        <li>China's economic recovery and geopolitical tensions</li>
        <li>Oil prices and commodity volatility</li>
        <li>Global supply chain restructuring favoring India</li>
      </ul>
      
      <h2>Sector-Wise Analysis and Opportunities</h2>
      
      <h3>1. Information Technology (Weight: Overweight)</h3>
      <p><strong>Investment Thesis:</strong> Recovery in demand, AI/automation adoption, and cost optimization driving margins.</p>
      
      <p><strong>Key Drivers:</strong></p>
      <ul>
        <li>Revival in US technology spending in H2 2024</li>
        <li>Artificial Intelligence and automation projects gaining traction</li>
        <li>Digital transformation continuing across industries</li>
        <li>Margin expansion through operational efficiency</li>
      </ul>
      
      <p><strong>Top Picks:</strong> TCS, Infosys, HCL Technologies, Tech Mahindra</p>
      <p><strong>Risks:</strong> Visa restrictions, client budget cuts, currency volatility</p>
      
      <h3>2. Renewable Energy (Weight: Overweight)</h3>
      <p><strong>Investment Thesis:</strong> India's commitment to net-zero by 2070 and massive government support for green energy.</p>
      
      <p><strong>Key Opportunities:</strong></p>
      <ul>
        <li>Solar and wind project development</li>
        <li>Energy storage and battery manufacturing</li>
        <li>Green hydrogen ecosystem development</li>
        <li>Electric vehicle charging infrastructure</li>
      </ul>
      
      <p><strong>Policy Support:</strong></p>
      <ul>
        <li>₹19,500 crore PLI scheme for solar manufacturing</li>
        <li>National Green Hydrogen Mission with ₹19,744 crore allocation</li>
        <li>Renewable Energy Certificates (REC) mechanism</li>
        <li>Carbon trading market development</li>
      </ul>
      
      <p><strong>Top Picks:</strong> Adani Green Energy, Tata Power, JSW Energy, Suzlon Energy</p>
      
      <h3>3. Healthcare and Pharmaceuticals (Weight: Overweight)</h3>
      <p><strong>Investment Thesis:</strong> Aging population, rising healthcare awareness, and India's global pharma leadership.</p>
      
      <p><strong>Growth Catalysts:</strong></p>
      <ul>
        <li>Domestic healthcare infrastructure expansion</li>
        <li>Biosimilars and specialty drug development</li>
        <li>Contract research and manufacturing (CRAM) growth</li>
        <li>Digital health and telemedicine adoption</li>
      </ul>
      
      <p><strong>Regulatory Environment:</strong></p>
      <ul>
        <li>National Digital Health Mission implementation</li>
        <li>Production Linked Incentive for pharmaceuticals</li>
        <li>USFDA inspection normalization</li>
        <li>Patent cliff opportunities in global markets</li>
      </ul>
      
      <p><strong>Top Picks:</strong> Dr. Reddy's, Cipla, Divi's Labs, Apollo Hospitals, Fortis Healthcare</p>
      
      <h3>4. Financial Services (Weight: Neutral to Overweight)</h3>
      <p><strong>Investment Thesis:</strong> Credit growth acceleration, improving asset quality, and financial inclusion.</p>
      
      <p><strong>Banking Sector Outlook:</strong></p>
      <ul>
        <li>Credit growth expected at 14-16% in FY24</li>
        <li>Net Interest Margins stabilizing</li>
        <li>Provision coverage ratios at healthy levels</li>
        <li>Digital banking and fintech partnerships</li>
      </ul>
      
      <p><strong>Insurance and NBFCs:</strong></p>
      <ul>
        <li>Life insurance penetration increasing</li>
        <li>General insurance growth from motor and health</li>
        <li>NBFC recovery and market share gains</li>
        <li>Microfinance sector stabilization</li>
      </ul>
      
      <p><strong>Top Picks:</strong> HDFC Bank, ICICI Bank, Bajaj Finance, SBI Life, HDFC Life</p>
      
      <h3>5. Defense and Aerospace (Weight: Overweight)</h3>
      <p><strong>Investment Thesis:</strong> "Aatmanirbhar Bharat" in defense, increasing budget allocation, and export potential.</p>
      
      <p><strong>Key Growth Drivers:</strong></p>
      <ul>
        <li>Defense budget increased to ₹5.94 lakh crore in FY24</li>
        <li>68% capital expenditure earmarked for domestic procurement</li>
        <li>Defense exports targeting $5 billion by 2024</li>
        <li>Private sector participation in defense manufacturing</li>
      </ul>
      
      <p><strong>Opportunities:</strong></p>
      <ul>
        <li>Aircraft and helicopter manufacturing</li>
        <li>Naval shipbuilding and submarines</li>
        <li>Missile systems and precision weapons</li>
        <li>Defense electronics and communication</li>
      </ul>
      
      <p><strong>Top Picks:</strong> HAL, BEL, Mazagon Dock, L&T, Bharat Dynamics</p>
      
      <h3>6. Manufacturing and Infrastructure (Weight: Overweight)</h3>
      <p><strong>Investment Thesis:</strong> Government's infrastructure push, PLI schemes, and supply chain diversification.</p>
      
      <p><strong>Infrastructure Development:</strong></p>
      <ul>
        <li>National Infrastructure Pipeline of ₹111 lakh crore</li>
        <li>PM Gati Shakti for integrated infrastructure</li>
        <li>Bharatmala and Sagarmala projects</li>
        <li>Smart cities and urban development</li>
      </ul>
      
      <p><strong>Manufacturing Growth:</strong></p>
      <ul>
        <li>Electronics manufacturing under PLI</li>
        <li>Automobile and auto components</li>
        <li>Textiles and apparel export promotion</li>
        <li>Chemicals and petrochemicals expansion</li>
      </ul>
      
      <p><strong>Top Picks:</strong> L&T, UltraTech Cement, JSW Steel, Maruti Suzuki, Bajaj Auto</p>
      
      <h2>Underweight Sectors and Caution Areas</h2>
      
      <h3>1. Fast-Moving Consumer Goods (FMCG)</h3>
      <p><strong>Challenges:</strong></p>
      <ul>
        <li>Rural demand slowdown impacting volumes</li>
        <li>Input cost inflation pressuring margins</li>
        <li>Intense competition from regional players</li>
        <li>Changing consumer preferences</li>
      </ul>
      
      <h3>2. Real Estate</h3>
      <p><strong>Concerns:</strong></p>
      <ul>
        <li>Interest rate sensitivity</li>
        <li>Affordability challenges in major cities</li>
        <li>Regulatory compliance costs</li>
        <li>Inventory overhang in certain markets</li>
      </ul>
      
      <h2>Investment Strategies for 2024</h2>
      
      <h3>Growth vs. Value Approach</h3>
      <p><strong>Growth Strategy:</strong> Focus on sectors with strong earnings visibility like technology, healthcare, and renewable energy. Target companies with sustainable competitive advantages and scalable business models.</p>
      
      <p><strong>Value Strategy:</strong> Look for undervalued opportunities in traditional sectors like banking, infrastructure, and manufacturing that are trading below historical valuations despite improving fundamentals.</p>
      
      <h3>Market Cap Allocation Strategy</h3>
      <ul>
        <li><strong>Large Cap (60-70%):</strong> Stability and liquidity during volatile periods</li>
        <li><strong>Mid Cap (20-25%):</strong> Growth potential with manageable risk</li>
        <li><strong>Small Cap (10-15%):</strong> High growth opportunities for risk-tolerant investors</li>
      </ul>
      
      <h3>Thematic Investment Opportunities</h3>
      
      <h4>1. Digital India Theme</h4>
      <ul>
        <li>Fintech and digital payments</li>
        <li>E-commerce and logistics</li>
        <li>Edtech and healthtech</li>
        <li>Digital infrastructure</li>
      </ul>
      
      <h4>2. Green Transition Theme</h4>
      <ul>
        <li>Renewable energy generation</li>
        <li>Electric vehicles and batteries</li>
        <li>Energy efficiency solutions</li>
        <li>Sustainable materials</li>
      </ul>
      
      <h4>3. Self-Reliance Theme</h4>
      <ul>
        <li>Defense manufacturing</li>
        <li>Electronics production</li>
        <li>Pharmaceutical APIs</li>
        <li>Critical mineral processing</li>
      </ul>
      
      <h2>Risk Factors and Challenges</h2>
      
      <h3>Domestic Risks</h3>
      <ul>
        <li>Monsoon performance impacting rural economy</li>
        <li>State election outcomes and policy changes</li>
        <li>Inflation resurgence affecting consumption</li>
        <li>Corporate governance issues in select companies</li>
      </ul>
      
      <h3>Global Risks</h3>
      <ul>
        <li>US recession fears and Federal Reserve policy</li>
        <li>China economic slowdown and regional tensions</li>
        <li>Commodity price volatility</li>
        <li>Global supply chain disruptions</li>
      </ul>
      
      <h2>Technical Analysis and Market Levels</h2>
      
      <h3>Nifty 50 Outlook</h3>
      <p><strong>Support Levels:</strong> 19,500-19,800 range provides strong support</p>
      <p><strong>Resistance Levels:</strong> 21,500-22,000 zone acts as immediate resistance</p>
      <p><strong>Target Range:</strong> 22,500-23,500 for the year if fundamentals support</p>
      
      <h3>Sectoral Rotation Strategy</h3>
      <p>Expect rotation from defensive sectors to cyclical sectors as economic recovery sustains. Technology and healthcare likely to outperform in the first half, while infrastructure and manufacturing may gain momentum in the second half.</p>
      
      <h2>Portfolio Allocation Recommendations</h2>
      
      <h3>Conservative Portfolio (Low Risk)</h3>
      <ul>
        <li>Large Cap Equity: 40%</li>
        <li>Banking and Financial Services: 25%</li>
        <li>FMCG and Healthcare: 20%</li>
        <li>Government Securities: 15%</li>
      </ul>
      
      <h3>Balanced Portfolio (Medium Risk)</h3>
      <ul>
        <li>Large Cap Equity: 35%</li>
        <li>Mid Cap Equity: 25%</li>
        <li>Sectoral/Thematic Funds: 20%</li>
        <li>Debt Instruments: 20%</li>
      </ul>
      
      <h3>Aggressive Portfolio (High Risk)</h3>
      <ul>
        <li>Large Cap Equity: 30%</li>
        <li>Mid and Small Cap Equity: 40%</li>
        <li>Sectoral/Thematic Funds: 25%</li>
        <li>Alternative Investments: 5%</li>
      </ul>
      
      <h2>Key Events and Dates to Watch</h2>
      
      <h3>Q4 FY24 and Q1 FY25</h3>
      <ul>
        <li>Corporate earnings announcements</li>
        <li>Union Budget 2024 and policy announcements</li>
        <li>RBI monetary policy meetings</li>
        <li>State election results and implications</li>
      </ul>
      
      <h3>Global Events</h3>
      <ul>
        <li>US Presidential elections impact</li>
        <li>FOMC meetings and interest rate decisions</li>
        <li>China's economic data and policy responses</li>
        <li>Geopolitical developments and trade policies</li>
      </ul>
      
      <h2>Conclusion and Investment Outlook</h2>
      <p>The Indian stock market in 2024 offers compelling opportunities for long-term investors willing to be selective and patient. While short-term volatility is expected due to global uncertainties, the medium to long-term outlook remains positive supported by strong domestic fundamentals.</p>
      
      <p>Key success factors for investors will include:</p>
      <ul>
        <li>Focusing on quality companies with strong fundamentals</li>
        <li>Diversifying across sectors and market caps</li>
        <li>Maintaining discipline during market volatility</li>
        <li>Staying informed about policy changes and global developments</li>
      </ul>
      
      <p>The themes of digitalization, sustainability, and self-reliance will continue to drive long-term wealth creation. Investors should position their portfolios to benefit from these structural trends while maintaining appropriate risk management.</p>
      
      <p>Remember that markets are forward-looking, and current valuations often reflect future expectations. Focus on companies and sectors with sustainable competitive advantages and strong execution capabilities to build wealth over the long term.</p>
    `,
    relatedPosts: [
      {
        title: 'The Complete Guide to Building Wealth in Your 20s',
        excerpt: 'Your twenties are a critical decade for establishing financial foundations.',
        imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'wealth-building-guide-twenties',
      },
      {
        title: 'Real Estate Investment in India: A Complete Guide',
        excerpt: 'Everything you need to know about real estate investment in India.',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'real-estate-investment-india-guide',
      },
    ]
  }
  // Additional blog posts can be added here
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    return (
      <MainLayout>
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link to="/blog">Return to Blog</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Blog Post Header */}
      <div className="bg-finance-cream py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-finance-green hover:underline mb-8">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
            
            <Badge className="mb-4 bg-finance-green/10 text-finance-green">
              {post.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{post.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.designation}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(post.publishedDate).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="gap-1">
                    <Tag size={12} />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 size={14} />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Bookmark size={14} />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Image */}
      <div className="h-96 w-full bg-gradient-to-t from-gray-900/50 to-transparent relative mb-12">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover absolute inset-0 z-[-1]" />
      </div>
      
      <div className="container pb-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg max-w-none prose-headings:text-finance-charcoal prose-headings:font-bold prose-p:text-finance-charcoal/80 prose-a:text-finance-green hover:prose-a:text-finance-green/80 prose-strong:text-finance-charcoal prose-ul:text-finance-charcoal/80 prose-li:text-finance-charcoal/80" dangerouslySetInnerHTML={{ __html: post.content }}>
            </div>
            
            <div className="border-t border-b border-gray-200 py-6 my-8 flex justify-between">
              <Button variant="outline" className="gap-2">
                <ThumbsUp size={16} />
                Helpful
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 size={16} />
                Share Article
              </Button>
              <Button variant="outline" className="gap-2">
                <MessageSquare size={16} />
                Leave a Comment
              </Button>
            </div>
            
            {/* Author Bio */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{post.author.name}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{post.author.designation}</p>
                  <p className="text-sm">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <div className="sticky top-24">
              {/* Related Posts */}
              <div className="bg-finance-green/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {post.relatedPosts.map((related, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={related.imageUrl} 
                          alt={related.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <CardTitle className="text-base line-clamp-2">{related.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs mt-1">{related.excerpt}</CardDescription>
                        <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80 p-0 mt-2">
                          <Link to={`/blog/${related.slug}`} className="flex items-center gap-1 text-xs">
                            Read Article <ArrowRight size={12} />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPost;
