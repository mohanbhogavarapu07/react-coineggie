
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronLeft, 
  FileText, 
  ArrowRight, 
  BarChart3 
} from 'lucide-react';

// Sample article data (in a real app, this would be fetched from a database)
const articleData = {
  'mutual-fund-basics': {
    title: 'Mutual Fund Basics: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of mutual funds, types of funds, and how to start investing with just ₹500 per month.',
    category: 'Investments',
    readTime: 8,
    difficulty: 'Beginner',
    author: 'Rahul Sharma',
    authorRole: 'Senior Financial Analyst',
    authorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    publishDate: 'August 15, 2023',
    lastUpdated: 'March 12, 2024',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>Introduction to Mutual Funds</h2>
      <p>A mutual fund is a professionally managed investment vehicle that pools money from multiple investors to purchase securities. These securities can include stocks, bonds, money market instruments, and other assets. By investing in a mutual fund, you gain access to a diversified portfolio managed by financial experts, even with a small initial investment.</p>
      
      <h2>Key Advantages of Mutual Funds</h2>
      <ul>
        <li><strong>Professional Management:</strong> Fund managers handle investment decisions based on research and market analysis.</li>
        <li><strong>Diversification:</strong> Even small investments are spread across multiple securities, reducing risk.</li>
        <li><strong>Affordability:</strong> Start investing with as little as ₹500 per month through Systematic Investment Plans (SIPs).</li>
        <li><strong>Liquidity:</strong> Most open-ended funds allow redemption on any business day.</li>
        <li><strong>Transparency:</strong> Fund performance and portfolio holdings are disclosed regularly.</li>
        <li><strong>Regulatory Oversight:</strong> SEBI regulations protect investor interests.</li>
      </ul>
      
      <h2>Types of Mutual Funds</h2>
      
      <h3>Based on Asset Class</h3>
      <h4>1. Equity Funds</h4>
      <p>These funds primarily invest in stocks, offering high growth potential with higher risk. They're ideal for long-term goals (7+ years). Equity funds can be further classified as:</p>
      <ul>
        <li><strong>Large-cap funds:</strong> Invest in stable, established companies</li>
        <li><strong>Mid-cap funds:</strong> Focus on growing mid-sized companies</li>
        <li><strong>Small-cap funds:</strong> Invest in smaller companies with high growth potential</li>
        <li><strong>Multi-cap funds:</strong> Invest across market capitalizations</li>
        <li><strong>Sector funds:</strong> Focus on specific sectors like technology or healthcare</li>
      </ul>
      
      <h4>2. Debt Funds</h4>
      <p>These funds invest in fixed-income securities like government bonds, corporate bonds, and money market instruments. They offer stable returns with lower risk and are suitable for short to medium-term goals (1-5 years).</p>
      
      <h4>3. Hybrid Funds</h4>
      <p>These funds invest in a mix of equity and debt, offering moderate returns with balanced risk. Balanced funds, equity-oriented hybrid funds, and monthly income plans fall into this category.</p>
      
      <h3>Based on Investment Objective</h3>
      <h4>1. Growth Funds</h4>
      <p>These funds aim to provide capital appreciation over the long term by investing primarily in equities.</p>
      
      <h4>2. Income Funds</h4>
      <p>These funds focus on generating regular income by investing in debt securities.</p>
      
      <h4>3. Tax-saving Funds (ELSS)</h4>
      <p>Equity Linked Savings Schemes offer tax benefits under Section 80C with a lock-in period of 3 years.</p>
      
      <h2>Understanding Key Terminology</h2>
      <dl>
        <dt>Net Asset Value (NAV)</dt>
        <dd>The market value of a fund's assets minus its liabilities, divided by the number of outstanding units. This represents the per-unit value of the fund.</dd>
        
        <dt>Expense Ratio</dt>
        <dd>The annual fee charged by the fund for management and operational expenses, expressed as a percentage of assets.</dd>
        
        <dt>Exit Load</dt>
        <dd>A fee charged when you redeem your units within a specified period from investment.</dd>
        
        <dt>Systematic Investment Plan (SIP)</dt>
        <dd>A method to invest a fixed amount in a mutual fund at regular intervals (usually monthly).</dd>
      </dl>
      
      <h2>How to Start Investing in Mutual Funds</h2>
      <ol>
        <li><strong>Complete KYC:</strong> Fulfill Know Your Customer requirements with valid ID and address proof.</li>
        <li><strong>Choose an investment route:</strong> Invest directly through the AMC or via a distributor/broker.</li>
        <li><strong>Select funds based on your goals:</strong> Consider your investment horizon, risk tolerance, and financial objectives.</li>
        <li><strong>Decide between lump sum or SIP:</strong> SIPs help in averaging costs and maintaining investment discipline.</li>
        <li><strong>Monitor and rebalance:</strong> Review your portfolio periodically and make adjustments as needed.</li>
      </ol>
      
      <h2>Understanding Mutual Fund Risks</h2>
      <p>While mutual funds offer many advantages, they come with certain risks:</p>
      <ul>
        <li><strong>Market Risk:</strong> Fund values fluctuate with market conditions.</li>
        <li><strong>Credit Risk:</strong> The possibility of default by debt issuers in debt funds.</li>
        <li><strong>Interest Rate Risk:</strong> Bond prices fall when interest rates rise, affecting debt fund returns.</li>
        <li><strong>Liquidity Risk:</strong> Some funds may face challenges in selling securities quickly at fair prices.</li>
      </ul>
      
      <h2>Tax Implications of Mutual Fund Investments</h2>
      <table>
        <thead>
          <tr>
            <th>Fund Type</th>
            <th>Short-Term Capital Gains</th>
            <th>Long-Term Capital Gains</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Equity Funds</td>
            <td>Held &lt; 1 year: 15% tax</td>
            <td>Held &gt; 1 year: 10% tax on gains above ₹1 lakh</td>
          </tr>
          <tr>
            <td>Debt Funds</td>
            <td>Held &lt; 3 years: Taxed at income tax slab rate</td>
            <td>Held &gt; 3 years: 20% tax with indexation benefit</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Conclusion</h2>
      <p>Mutual funds offer a convenient, accessible, and professionally managed investment option for investors at all levels. By understanding the different types of funds, their features, and aligning them with your financial goals, you can build a robust investment portfolio. Start with a small SIP of ₹500 per month, focusing on consistency rather than amount, and gradually increase your investments as you become more comfortable with the concept.</p>
      
      <div class="alert alert-info">
        <p><strong>Important Note:</strong> The information provided in this article is for educational purposes only and should not be considered financial advice. Always consult with a certified financial advisor before making investment decisions.</p>
      </div>
    `,
    relatedArticles: [
      { 
        title: 'Understanding Asset Allocation Strategies',
        slug: 'asset-allocation-strategies',
        excerpt: 'Explore different asset allocation models and how to adjust them based on your risk tolerance and investment horizon.'
      },
      { 
        title: 'SIP vs. Lump Sum: Which Investment Strategy Works Better?',
        slug: 'sip-vs-lump-sum',
        excerpt: 'A data-driven comparison of systematic investment plans and lump sum investments across various market cycles.'
      },
      { 
        title: 'How to Analyze Mutual Fund Performance',
        slug: 'analyzing-mutual-fund-performance',
        excerpt: 'Learn to evaluate mutual funds beyond just returns – understand risk metrics, expense ratios, and portfolio composition.'
      }
    ]
  },
  'tax-saving-section-80c': {
    title: 'Tax Saving: Maximizing Section 80C Benefits',
    excerpt: 'Comprehensive guide to Section 80C investments, eligible expenses, and strategies to save up to ₹46,800 in taxes.',
    category: 'Tax Planning',
    readTime: 12,
    difficulty: 'Intermediate',
    author: 'Priya Mehta',
    authorRole: 'Tax Consultant',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    publishDate: 'December 3, 2023',
    lastUpdated: 'February 28, 2024',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>Introduction to Section 80C</h2>
      <p>Section 80C of the Income Tax Act, 1961 is one of the most important tax-saving provisions available to Indian taxpayers. It allows you to claim deductions of up to ₹1,50,000 from your total income, potentially saving up to ₹46,800 in taxes (for those in the 30% tax bracket, plus cess).</p>
      
      <p>This article provides a comprehensive guide to maximizing your Section 80C benefits through strategic investments and eligible expenses.</p>
      
      <h2>Eligible Investments and Expenses Under Section 80C</h2>
      
      <h3>1. Long-term Investment Options</h3>
      
      <h4>Public Provident Fund (PPF)</h4>
      <ul>
        <li><strong>Key Features:</strong> Government-backed scheme with a 15-year tenure (extendable)</li>
        <li><strong>Interest Rate:</strong> Currently 7.1% p.a. (subject to quarterly revisions)</li>
        <li><strong>Investment Limit:</strong> Minimum ₹500, maximum ₹1,50,000 per financial year</li>
        <li><strong>Taxation:</strong> EEE (Exempt-Exempt-Exempt) – contributions, interest, and maturity amount are tax-free</li>
        <li><strong>Ideal For:</strong> Long-term wealth creation with guaranteed returns and zero risk</li>
      </ul>
      
      <h4>Employee Provident Fund (EPF)</h4>
      <ul>
        <li><strong>Key Features:</strong> Mandatory retirement savings scheme for salaried employees</li>
        <li><strong>Contribution:</strong> 12% of basic salary contributed by employee, matched by employer</li>
        <li><strong>Interest Rate:</strong> 8.15% for FY 2023-24</li>
        <li><strong>Taxation:</strong> EEE, though interest on contributions exceeding ₹2.5 lakh per year is taxable</li>
        <li><strong>Note:</strong> Only the employee's contribution qualifies for Section 80C deduction</li>
      </ul>
      
      <h4>National Pension System (NPS)</h4>
      <ul>
        <li><strong>Key Features:</strong> Government-sponsored pension scheme with market-linked returns</li>
        <li><strong>Investment Limit:</strong> Minimum ₹1,000 per year, no maximum limit</li>
        <li><strong>Tax Benefits:</strong> Deduction up to ₹1.5 lakh under Section 80C, additional ₹50,000 under Section 80CCD(1B)</li>
        <li><strong>Taxation:</strong> EET (Exempt-Exempt-Taxable) – 60% of corpus tax-free at maturity, 40% mandatorily used for annuity</li>
        <li><strong>Ideal For:</strong> Retirement planning with potential for higher returns through equity exposure</li>
      </ul>
      
      <h3>2. Insurance-related Options</h3>
      
      <h4>Life Insurance Premiums</h4>
      <ul>
        <li><strong>Eligible Premiums:</strong> For self, spouse, children, or HUF members</li>
        <li><strong>Maximum Deduction:</strong> Premium up to 10% of sum assured for policies issued after April 1, 2012</li>
        <li><strong>Types:</strong> Term plans, endowment plans, ULIPs (subject to conditions)</li>
        <li><strong>Note:</strong> Only pure life insurance components qualify; investment components in ULIPs may have separate tax implications</li>
      </ul>
      
      <h4>Health Insurance Premiums</h4>
      <p>Note: Health insurance premiums qualify for deduction under Section 80D, not 80C.</p>
      
      <h3>3. Equity-Linked Savings Schemes (ELSS)</h3>
      <ul>
        <li><strong>Key Features:</strong> Mutual funds with predominantly equity investments and a 3-year lock-in period</li>
        <li><strong>Returns:</strong> Market-linked, historically higher than traditional tax-saving instruments</li>
        <li><strong>Investment Limit:</strong> Minimum varies by fund house, maximum up to ₹1,50,000</li>
        <li><strong>Taxation:</strong> Long-term capital gains above ₹1 lakh taxed at 10% without indexation</li>
        <li><strong>Ideal For:</strong> Investors with moderate to high risk appetite seeking inflation-beating returns</li>
      </ul>
      
      <h3>4. Fixed Income Options</h3>
      
      <h4>Tax-Saving Fixed Deposits</h4>
      <ul>
        <li><strong>Key Features:</strong> Bank FDs with a mandatory 5-year lock-in period</li>
        <li><strong>Interest Rate:</strong> Currently 5.5-7% p.a. (varies by bank)</li>
        <li><strong>Taxation:</strong> Interest income taxable at applicable income tax slab rate; TDS applicable</li>
        <li><strong>Ideal For:</strong> Conservative investors seeking guaranteed returns with tax benefits</li>
      </ul>
      
      <h4>National Savings Certificate (NSC)</h4>
      <ul>
        <li><strong>Key Features:</strong> Government-backed savings certificate with a 5-year tenure</li>
        <li><strong>Interest Rate:</strong> 7.7% p.a. compounded annually</li>
        <li><strong>Investment Limit:</strong> Minimum ₹1,000, no maximum limit</li>
        <li><strong>Taxation:</strong> Interest accrued annually qualifies for Section 80C deduction except in the final year; maturity amount taxable</li>
      </ul>
      
      <h3>5. Other Eligible Expenses</h3>
      
      <h4>Tuition Fees</h4>
      <ul>
        <li><strong>Eligible Fees:</strong> Full-time education tuition fees for up to two children</li>
        <li><strong>Coverage:</strong> Schools, colleges, universities (Indian institutions only)</li>
        <li><strong>Exclusions:</strong> Development fees, donation, transportation, or hostel expenses</li>
      </ul>
      
      <h4>Home Loan Principal Repayment</h4>
      <ul>
        <li><strong>Eligible Amount:</strong> Principal component of EMI payments</li>
        <li><strong>Conditions:</strong> Property should not be sold within 5 years of possession</li>
        <li><strong>Note:</strong> Interest component may qualify for deduction under Section 24</li>
      </ul>
      
      <h4>Stamp Duty and Registration Fees</h4>
      <ul>
        <li><strong>Eligible Expenses:</strong> Paid during the purchase of a house property</li>
        <li><strong>Claim Period:</strong> Only in the financial year in which these expenses are incurred</li>
      </ul>
      
      <h2>Strategic Approaches to Section 80C Investments</h2>
      
      <h3>1. Goal-Based Allocation</h3>
      <table>
        <thead>
          <tr>
            <th>Financial Goal</th>
            <th>Time Horizon</th>
            <th>Recommended Section 80C Instruments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Retirement (20+ years)</td>
            <td>Long-term</td>
            <td>PPF, NPS, ELSS</td>
          </tr>
          <tr>
            <td>Child's Education (10-15 years)</td>
            <td>Medium to Long-term</td>
            <td>PPF, Sukanya Samriddhi Yojana (for girl child), ELSS</td>
          </tr>
          <tr>
            <td>Home Purchase (5-7 years)</td>
            <td>Medium-term</td>
            <td>NSC, Tax-saving FDs</td>
          </tr>
          <tr>
            <td>Protection</td>
            <td>Ongoing</td>
            <td>Term Insurance Premium</td>
          </tr>
        </tbody>
      </table>
      
      <h3>2. Risk-Based Allocation</h3>
      
      <h4>Conservative Investor Profile</h4>
      <ul>
        <li>60% in PPF</li>
        <li>25% in Tax-saving FDs</li>
        <li>15% in Term Insurance Premium</li>
      </ul>
      
      <h4>Moderate Investor Profile</h4>
      <ul>
        <li>40% in PPF</li>
        <li>30% in ELSS</li>
        <li>15% in NSC</li>
        <li>15% in Term Insurance Premium</li>
      </ul>
      
      <h4>Aggressive Investor Profile</h4>
      <ul>
        <li>60% in ELSS</li>
        <li>25% in NPS</li>
        <li>15% in Term Insurance Premium</li>
      </ul>
      
      <h2>Maximizing Section 80C Benefits: Advanced Strategies</h2>
      
      <h3>1. Leveraging Existing Expenses</h3>
      <p>Before making additional investments, identify expenses you're already incurring that qualify for Section 80C deduction:</p>
      <ul>
        <li>Children's tuition fees</li>
        <li>Home loan principal repayment</li>
        <li>EPF contribution (deducted from salary)</li>
      </ul>
      <p>This approach helps avoid unnecessary investments solely for tax purposes.</p>
      
      <h3>2. Staggered Investments</h3>
      <p>For ELSS investments, consider a Systematic Investment Plan (SIP) approach rather than a lump sum investment:</p>
      <ul>
        <li>Reduces timing risk by averaging out market volatility</li>
        <li>Improves investment discipline</li>
        <li>Each SIP installment has its own 3-year lock-in period, providing better liquidity in later years</li>
      </ul>
      
      <h3>3. Combining Section 80C with Other Tax Benefits</h3>
      <p>Maximize overall tax efficiency by utilizing other tax-saving provisions alongside Section 80C:</p>
      <ul>
        <li>Section 80D: Health insurance premiums (up to ₹25,000 for self and family, additional ₹25,000 for parents)</li>
        <li>Section 80CCD(1B): Additional ₹50,000 for NPS contributions</li>
        <li>Section 80E: Interest on education loan (no upper limit)</li>
        <li>Section 80G: Donations to specified charitable institutions (50-100% deduction)</li>
      </ul>
      
      <h2>Common Mistakes to Avoid</h2>
      <ol>
        <li><strong>Last-minute investments:</strong> Rushing investments in February-March often leads to suboptimal choices</li>
        <li><strong>Ignoring existing deductions:</strong> Not accounting for EPF, tuition fees, or home loan principal</li>
        <li><strong>Choosing inappropriate instruments:</strong> Selecting products based solely on tax benefits without considering goals and risk profile</li>
        <li><strong>Overlooking liquidity needs:</strong> Locking all savings in long-term instruments</li>
        <li><strong>Missing submission deadlines:</strong> Failing to submit investment proofs to employers by the specified date</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Section 80C offers significant tax-saving opportunities, but the focus should be on smart financial planning rather than tax saving alone. The ideal approach is to align your Section 80C investments with your financial goals, risk tolerance, and investment horizon.</p>
      
      <p>By strategically allocating your ₹1.5 lakh Section 80C limit across different eligible options, you can not only save up to ₹46,800 in taxes (for those in the 30% tax bracket) but also create a well-diversified portfolio that serves your long-term financial objectives.</p>
      
      <div class="alert alert-info">
        <p><strong>Important Note:</strong> Tax laws are subject to change. The information provided in this article is based on the tax laws applicable for the Assessment Year 2024-25 (Financial Year 2023-24). Always consult a tax professional for personalized advice.</p>
      </div>
    `,
    relatedArticles: [
      { 
        title: 'Understanding the New Tax Regime vs. Old Tax Regime',
        slug: 'new-vs-old-tax-regime',
        excerpt: 'A comprehensive comparison of both tax regimes to help you make an informed choice about which is more beneficial for your financial situation.'
      },
      { 
        title: 'Beyond 80C: Other Tax Deductions You Shouldn\'t Miss',
        slug: 'beyond-80c-tax-deductions',
        excerpt: 'Explore additional tax-saving sections like 80D, 80E, 80G, and more to further reduce your tax liability.'
      },
      { 
        title: 'Tax Planning for Salaried Individuals: A Complete Guide',
        slug: 'tax-planning-salaried',
        excerpt: 'Learn how to optimize your salary structure, claim the right deductions, and minimize your tax outgo while maximizing savings.'
      }
    ]
  }
};

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articleData[slug as keyof typeof articleData];
  
  if (!article) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/knowledge-base">Return to Knowledge Base</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="bg-white">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/knowledge-base" className="flex items-center text-sm text-muted-foreground hover:text-finance-green transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Knowledge Base
            </Link>
          </div>
          
          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-finance-green/10 text-finance-green">
                  {article.category}
                </span>
                <span className={`kb-pill ${
                  article.difficulty === 'Beginner' ? 'kb-pill-beginner' : 
                  article.difficulty === 'Intermediate' ? 'kb-pill-intermediate' : 
                  'kb-pill-advanced'
                }`}>
                  {article.difficulty}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              
              <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Published: {article.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Updated: {article.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={article.authorImage} 
                  alt={article.author}
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div>
                  <div className="font-medium">{article.author}</div>
                  <div className="text-sm text-muted-foreground">{article.authorRole}</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="p-4">
                <h3 className="font-medium mb-4">Table of Contents</h3>
                <ul className="space-y-2 text-sm">
                  {article.content.split('<h2>').slice(1).map((section, index) => (
                    <li key={index} className="hover:text-finance-green transition-colors">
                      <a href={`#section-${index + 1}`}>
                        {section.split('</h2>')[0]}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mb-12 rounded-xl overflow-hidden">
            <img 
              src={article.heroImage}
              alt={article.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Main article content */}
              <article className="prose prose-lg max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </article>
              
              {/* Article feedback */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="font-medium mb-4">Was this article helpful?</h3>
                <div className="flex gap-4">
                  <Button variant="outline" className="gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Yes
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ThumbsDown className="h-4 w-4" />
                    No
                  </Button>
                </div>
              </div>
              
              {/* Author bio */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <div className="flex items-start gap-4">
                  <img 
                    src={article.authorImage} 
                    alt={article.author}
                    className="w-16 h-16 rounded-full object-cover" 
                  />
                  <div>
                    <h3 className="font-medium mb-1">About {article.author}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{article.authorRole}</p>
                    <p className="text-sm">
                      {article.author} specializes in making complex financial concepts accessible to everyone. 
                      With over 10 years of experience in the financial industry, they bring practical insights 
                      and actionable advice to help readers make informed financial decisions.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Related articles */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {article.relatedArticles.map((related, index) => (
                    <Card key={index} className="hover:shadow-md transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg hover:text-finance-green transition-colors">
                          <Link to={`/knowledge-base/article/${related.slug}`}>
                            {related.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>{related.excerpt}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                          <Link to={`/knowledge-base/article/${related.slug}`} className="flex items-center gap-1">
                            Read Article <ArrowRight size={14} />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {/* Sidebar content */}
              <div className="space-y-6 sticky top-24">
                <Card className="overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Share this article</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-4">
                    <h3 className="font-medium mb-4">Popular in {article.category}</h3>
                    <ul className="space-y-4">
                      {article.relatedArticles.map((related, index) => (
                        <li key={index} className="text-sm">
                          <Link 
                            to={`/knowledge-base/article/${related.slug}`}
                            className="hover:text-finance-green transition-colors font-medium"
                          >
                            {related.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
                
                <Card className="bg-finance-green text-white">
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Need personalized advice?</h3>
                    <p className="text-sm mb-4 text-white/80">Connect with our financial experts for tailored guidance based on your situation.</p>
                    <Button variant="secondary" className="w-full">Schedule a Consultation</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArticlePage;
