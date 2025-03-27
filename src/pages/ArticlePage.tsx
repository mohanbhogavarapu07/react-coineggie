
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Clock, BarChartHorizontal, Share2, Bookmark, ThumbsUp, MessageSquare, Calendar, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// This is a mock article data for demonstration
const articleData = {
  'mutual-fund-basics': {
    title: 'Mutual Fund Basics: A Beginner\'s Guide',
    description: 'Learn everything you need to know about investing in mutual funds in India, from basic concepts to practical steps for getting started.',
    published: 'June 15, 2023',
    updated: 'September 3, 2023',
    readTime: 8,
    difficulty: 'Beginner',
    category: 'Investments',
    author: {
      name: 'Priya Sharma',
      designation: 'Investment Analyst',
      avatar: 'https://i.pravatar.cc/150?img=28'
    },
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>What is a Mutual Fund?</h2>
      <p>A mutual fund is a type of financial vehicle that pools money from many investors to purchase securities. The fund is managed by professional fund managers who allocate the fund's assets to attempt to produce capital gains or income for the fund's investors.</p>
      
      <p>When you invest in a mutual fund, you are buying shares (or portions) of the mutual fund and become a shareholder of the fund. Mutual funds are operated by professional money managers, who allocate the fund's assets and attempt to produce capital gains or income for the fund's investors.</p>
      
      <h2>Types of Mutual Funds in India</h2>
      
      <h3>Based on Asset Class:</h3>
      <ul>
        <li><strong>Equity Funds:</strong> These funds invest primarily in stocks and share prices of companies across different sectors. They have the potential for high returns but also carry higher risk.</li>
        <li><strong>Debt Funds:</strong> These funds invest in fixed-income securities like government bonds, corporate bonds, and money market instruments. They offer more stable returns than equity funds but with lower growth potential.</li>
        <li><strong>Hybrid Funds:</strong> These funds invest in a mix of equity and debt instruments to provide a balance between growth and stability.</li>
      </ul>
      
      <h3>Based on Investment Objective:</h3>
      <ul>
        <li><strong>Growth Funds:</strong> Aimed at capital appreciation over the long term.</li>
        <li><strong>Income Funds:</strong> Focused on generating regular and steady income.</li>
        <li><strong>Tax-Saving Funds (ELSS):</strong> Equity-linked savings schemes that offer tax benefits under Section 80C of the Income Tax Act.</li>
      </ul>
      
      <h2>How Do Mutual Funds Work?</h2>
      <p>When you invest in a mutual fund, your money is pooled together with that of other investors. This pooled money is then used to create a portfolio of stocks, bonds, or other securities, depending on the fund's investment objective.</p>
      
      <p>The value of a mutual fund is known as the Net Asset Value (NAV). It represents the per-share value of the fund and is calculated at the end of each trading day by dividing the total value of all the securities in the portfolio, minus any liabilities, by the number of outstanding shares.</p>
      
      <h2>Advantages of Investing in Mutual Funds</h2>
      <ul>
        <li><strong>Professional Management:</strong> Your investments are managed by experienced professionals who have the expertise to make informed investment decisions.</li>
        <li><strong>Diversification:</strong> Mutual funds spread investments across various securities, which helps reduce risk.</li>
        <li><strong>Affordability:</strong> You can start investing with as little as ₹500 per month through a Systematic Investment Plan (SIP).</li>
        <li><strong>Liquidity:</strong> Open-ended mutual funds allow you to redeem your investments at any time at the current NAV.</li>
        <li><strong>Regulated Industry:</strong> Mutual funds in India are regulated by the Securities and Exchange Board of India (SEBI), providing a level of investor protection.</li>
      </ul>
      
      <h2>How to Start Investing in Mutual Funds</h2>
      <ol>
        <li><strong>Identify Your Financial Goals:</strong> Determine what you're investing for (retirement, education, buying a home, etc.) and your time horizon.</li>
        <li><strong>Assess Your Risk Tolerance:</strong> Understand how much risk you're comfortable taking with your investments.</li>
        <li><strong>Choose the Right Fund:</strong> Based on your goals and risk tolerance, select funds that align with your objectives.</li>
        <li><strong>Complete KYC Requirements:</strong> You need to be KYC (Know Your Customer) compliant to invest in mutual funds. This can be done online through various platforms.</li>
        <li><strong>Decide on Investment Mode:</strong> Choose between a lump sum investment or a Systematic Investment Plan (SIP).</li>
        <li><strong>Monitor Your Investments:</strong> Regularly review your portfolio's performance and make adjustments if necessary.</li>
      </ol>
      
      <h2>Understanding Systematic Investment Plans (SIPs)</h2>
      <p>A Systematic Investment Plan (SIP) allows you to invest a fixed amount in a mutual fund at regular intervals (usually monthly). SIPs offer several advantages:</p>
      <ul>
        <li><strong>Disciplined Investing:</strong> SIPs help instill financial discipline as you commit to investing regularly.</li>
        <li><strong>Rupee Cost Averaging:</strong> By investing a fixed amount regularly, you buy more units when prices are low and fewer when prices are high, potentially lowering the average cost per unit over time.</li>
        <li><strong>Power of Compounding:</strong> The earlier you start, the more time your money has to grow, maximizing the benefits of compounding.</li>
      </ul>
      
      <h2>Key Metrics to Evaluate Mutual Funds</h2>
      <ul>
        <li><strong>Past Performance:</strong> While past returns don't guarantee future results, they can provide insights into how the fund has performed in different market conditions.</li>
        <li><strong>Expense Ratio:</strong> This is the annual fee charged by the fund for managing your money. Lower expense ratios can significantly impact long-term returns.</li>
        <li><strong>Fund Manager Experience:</strong> Evaluate the fund manager's track record and experience in managing similar funds.</li>
        <li><strong>Portfolio Composition:</strong> Understand what the fund is investing in and ensure it aligns with your risk profile.</li>
        <li><strong>Fund Size:</strong> Very large funds might face challenges in maintaining performance, while very small funds might have higher expense ratios.</li>
      </ul>
      
      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Chasing Past Performance:</strong> Don't select funds solely based on their recent performance. Consider consistency and risk-adjusted returns.</li>
        <li><strong>Ignoring Costs:</strong> High expense ratios can significantly eat into your returns over time.</li>
        <li><strong>Frequent Switching:</strong> Moving between funds too often can result in higher costs and potential tax implications.</li>
        <li><strong>Lack of Diversification:</strong> Don't put all your money in one type of fund. Diversify across different asset classes and fund categories.</li>
        <li><strong>Investing Without Goals:</strong> Always align your fund selection with your financial goals and time horizon.</li>
      </ul>
      
      <h2>Taxation of Mutual Funds in India</h2>
      <p>The tax implications of mutual fund investments depend on the type of fund and the holding period:</p>
      
      <h3>Equity Funds:</h3>
      <ul>
        <li><strong>Short-term Capital Gains (STCG):</strong> If held for less than 12 months, gains are taxed at 15%.</li>
        <li><strong>Long-term Capital Gains (LTCG):</strong> If held for more than 12 months, gains exceeding ₹1 lakh per year are taxed at 10% without indexation benefits.</li>
      </ul>
      
      <h3>Debt Funds:</h3>
      <ul>
        <li><strong>Short-term Capital Gains (STCG):</strong> If held for less than 36 months, gains are added to your income and taxed according to your income tax slab.</li>
        <li><strong>Long-term Capital Gains (LTCG):</strong> If held for more than 36 months, gains are taxed at 20% with indexation benefits.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Mutual funds offer a convenient, professional, and diversified approach to investing in financial markets. By understanding the basics of mutual funds and following a disciplined investment approach, individuals can work towards achieving their financial goals.</p>
      
      <p>Remember that all investments carry some level of risk, and it's essential to do your research or consult with a financial advisor before making investment decisions.</p>
    `,
    relatedArticles: [
      {
        title: 'Understanding Asset Allocation Strategies',
        excerpt: 'Explore different asset allocation models and how to adjust them based on your risk tolerance and investment horizon.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'asset-allocation-strategies',
      },
      {
        title: 'Tax Saving: Maximizing Section 80C Benefits',
        excerpt: 'Comprehensive guide to Section 80C investments, eligible expenses, and strategies to save up to ₹46,800 in taxes.',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'tax-saving-section-80c',
      },
    ]
  },
  'tax-saving-section-80c': {
    title: 'Tax Saving: Maximizing Section 80C Benefits',
    description: 'A comprehensive guide to understanding Section 80C of the Income Tax Act and maximizing your tax benefits through strategic investments and expenses.',
    published: 'July 22, 2023',
    updated: 'October 5, 2023',
    readTime: 12,
    difficulty: 'Intermediate',
    category: 'Tax Planning',
    author: {
      name: 'Vikram Bhatt',
      designation: 'Tax Consultant',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>Understanding Section 80C</h2>
      <p>Section 80C of the Income Tax Act, 1961, is one of the most popular tax-saving provisions available to Indian taxpayers. It allows individuals and Hindu Undivided Families (HUFs) to claim deductions of up to ₹1,50,000 from their total income for certain investments and expenses.</p>
      
      <p>Effectively utilizing Section 80C can help reduce your taxable income and, consequently, the amount of tax you need to pay. With the highest tax bracket at 30% (plus applicable surcharge and cess), maximizing your Section 80C deductions can lead to savings of up to ₹46,800 per financial year.</p>
      
      <h2>Eligible Investments Under Section 80C</h2>
      
      <h3>1. Public Provident Fund (PPF)</h3>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Government-backed, long-term savings scheme</li>
        <li>Current interest rate: approximately 7.1% per annum (updated quarterly)</li>
        <li>15-year lock-in period with partial withdrawal facility after 6 years</li>
        <li>Minimum annual investment: ₹500; Maximum: ₹1,50,000</li>
        <li>Interest earned is tax-free</li>
      </ul>
      <p><strong>Ideal for:</strong> Conservative investors looking for guaranteed returns and long-term wealth creation.</p>
      
      <h3>2. Employee Provident Fund (EPF)</h3>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Mandatory for employees in organizations with 20+ employees</li>
        <li>Employee contributes 12% of basic salary; employer matches this</li>
        <li>Current interest rate: approximately 8.15% per annum</li>
        <li>Tax-free interest and maturity amount (subject to certain conditions)</li>
      </ul>
      <p><strong>Ideal for:</strong> Salaried individuals looking for retirement benefits.</p>
      
      <h3>3. Equity-Linked Savings Scheme (ELSS)</h3>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Mutual funds that primarily invest in equities</li>
        <li>Shortest lock-in period among 80C options: 3 years</li>
        <li>Potential for higher returns compared to other options</li>
        <li>Returns are subject to Long Term Capital Gains tax at 10% for gains exceeding ₹1 lakh</li>
      </ul>
      <p><strong>Ideal for:</strong> Investors with higher risk appetite seeking potentially higher returns and liquidity.</p>
      
      <h3>4. National Pension System (NPS)</h3>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Government-sponsored pension scheme</li>
        <li>Additional deduction of up to ₹50,000 under Section 80CCD(1B)</li>
        <li>Investment options across equity, corporate bonds, government securities, and alternative assets</li>
        <li>Lock-in until retirement (60 years) with limited premature withdrawal options</li>
      </ul>
      <p><strong>Ideal for:</strong> Individuals seeking retirement benefits and additional tax savings beyond ₹1.5 lakh.</p>
      
      <h3>5. Tax-Saving Fixed Deposits</h3>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Fixed deposits with a 5-year lock-in period</li>
        <li>Current interest rates range from 5.5% to 7% depending on the bank</li>
        <li>Interest is taxable as per the individual's income tax slab</li>
        <li>Safety of principal amount</li>
      </ul>
      <p><strong>Ideal for:</strong> Conservative investors looking for guaranteed returns and capital safety.</p>
      
      <h3>6. National Savings Certificate (NSC)</h3>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Government-backed savings bond available at post offices</li>
        <li>5-year lock-in period</li>
        <li>Current interest rate: approximately 6.8% per annum, compounded annually</li>
        <li>Interest earned is taxable but also eligible for deduction under Section 80C</li>
      </ul>
      <p><strong>Ideal for:</strong> Conservative investors looking for guaranteed returns with moderate liquidity needs.</p>
      
      <h3>7. Unit Linked Insurance Plans (ULIPs)</h3>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Combines insurance coverage with investment</li>
        <li>Minimum lock-in period of 5 years</li>
        <li>Returns depend on market performance and fund selection</li>
        <li>Tax-free maturity amount under Section 10(10D) if conditions are met</li>
      </ul>
      <p><strong>Ideal for:</strong> Individuals looking for a combination of insurance and investment with tax benefits.</p>
      
      <h3>8. Sukanya Samriddhi Yojana (SSY)</h3>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Special scheme for girl children under 10 years of age</li>
        <li>Current interest rate: approximately 7.6% per annum, compounded annually</li>
        <li>15-year lock-in period; matures when the girl reaches 21 years</li>
        <li>Interest and maturity amount are tax-free</li>
      </ul>
      <p><strong>Ideal for:</strong> Parents with girl children looking for long-term savings with tax benefits.</p>
      
      <h2>Eligible Expenses Under Section 80C</h2>
      
      <h3>1. Life Insurance Premiums</h3>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Premiums paid for self, spouse, or children are eligible</li>
        <li>Premium should not exceed 10% of the sum assured for policies issued after April 1, 2012</li>
        <li>Term insurance, endowment plans, whole life policies all qualify</li>
      </ul>
      
      <h3>2. Home Loan Principal Repayment</h3>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Principal repayment of housing loans is eligible</li>
        <li>Property should not be sold within 5 years of possession</li>
        <li>Only self-occupied or vacant properties qualify</li>
      </ul>
      
      <h3>3. Children's Tuition Fees</h3>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Tuition fees paid for up to two children for full-time education</li>
        <li>Only covers tuition fees, not development fees, donations, or transportation</li>
        <li>Applies to schools, colleges, universities, or similar educational institutions</li>
      </ul>
      
      <h3>4. Stamp Duty and Registration Charges</h3>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Charges paid for the purchase of a residential property</li>
        <li>Can be claimed in the year of payment</li>
      </ul>
      
      <h2>Strategic Approach to Section 80C Investments</h2>
      
      <h3>Based on Risk Profile:</h3>
      
      <h4>Conservative Investors:</h4>
      <ul>
        <li>PPF: ₹50,000</li>
        <li>Tax-saving FD: ₹50,000</li>
        <li>NSC: ₹50,000</li>
      </ul>
      
      <h4>Moderate Risk Takers:</h4>
      <ul>
        <li>PPF: ₹50,000</li>
        <li>ELSS: ₹50,000</li>
        <li>NSC: ₹50,000</li>
      </ul>
      
      <h4>Aggressive Investors:</h4>
      <ul>
        <li>ELSS: ₹1,00,000</li>
        <li>NPS: ₹50,000 (under Section 80C) + ₹50,000 (under Section 80CCD(1B))</li>
      </ul>
      
      <h3>Based on Financial Goals:</h3>
      
      <h4>Short-term Goals (3-5 years):</h4>
      <ul>
        <li>ELSS: ₹75,000</li>
        <li>Tax-saving FD: ₹75,000</li>
      </ul>
      
      <h4>Medium-term Goals (5-10 years):</h4>
      <ul>
        <li>ELSS: ₹75,000</li>
        <li>NSC: ₹75,000</li>
      </ul>
      
      <h4>Long-term Goals (10+ years):</h4>
      <ul>
        <li>PPF: ₹75,000</li>
        <li>NPS: ₹75,000</li>
      </ul>
      
      <h2>Common Mistakes to Avoid</h2>
      
      <h3>1. Last-Minute Investments</h3>
      <p>Rushing to make Section 80C investments at the end of the financial year often leads to suboptimal choices. Instead, plan your investments at the beginning of the year and consider Systematic Investment Plans (SIPs) for ELSS to benefit from rupee cost averaging.</p>
      
      <h3>2. Ignoring Existing Investments and Expenses</h3>
      <p>Before making new investments, calculate your existing Section 80C deductions like EPF contributions, life insurance premiums, and children's tuition fees. This helps avoid over-investment beyond the ₹1.5 lakh limit.</p>
      
      <h3>3. Not Matching Investments with Goals</h3>
      <p>Choose Section 80C options that align with your financial goals, liquidity needs, and risk appetite rather than focusing solely on tax benefits.</p>
      
      <h3>4. Overlooking Additional Tax Benefits</h3>
      <p>Some investments like NPS offer additional tax benefits beyond Section 80C. Similarly, health insurance premiums (Section 80D) and home loan interest (Section 24) provide deductions over and above Section 80C.</p>
      
      <h2>Tax-Saving Calendar: Optimizing Deductions Throughout the Year</h2>
      
      <h3>April-June:</h3>
      <ul>
        <li>Review previous year's tax-saving investments</li>
        <li>Estimate EPF contribution for the current year</li>
        <li>Start SIP in ELSS funds</li>
      </ul>
      
      <h3>July-September:</h3>
      <ul>
        <li>Pay children's tuition fees in advance if possible</li>
        <li>Review and renew insurance policies</li>
      </ul>
      
      <h3>October-December:</h3>
      <ul>
        <li>Calculate remaining Section 80C limit</li>
        <li>Consider lump sum investments in PPF or NSC</li>
      </ul>
      
      <h3>January-March:</h3>
      <ul>
        <li>Make final investments to reach the ₹1.5 lakh limit</li>
        <li>Collect all relevant documents and certificates for tax filing</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Section 80C offers a valuable opportunity to reduce your tax liability while simultaneously building wealth for your financial goals. By understanding the various eligible investments and expenses, and by strategically allocating your ₹1.5 lakh limit, you can maximize both tax savings and returns.</p>
      
      <p>Remember that tax planning should be an integral part of your overall financial planning, not a standalone activity. The best approach is to spread your tax-saving investments throughout the year and select options that align with your financial goals, risk profile, and liquidity requirements.</p>
      
      <p>Finally, keep yourself updated on any changes in tax laws and interest rates, as these can impact the attractiveness of different Section 80C options from year to year.</p>
    `,
    relatedArticles: [
      {
        title: 'Mutual Fund Basics: A Beginner\'s Guide',
        excerpt: 'Learn the fundamentals of mutual funds, types of funds, and how to start investing with just ₹500 per month.',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'mutual-fund-basics',
      },
      {
        title: 'ESOP Taxation: Complete Guide for Startup Employees',
        excerpt: 'Understanding the tax implications of Employee Stock Option Plans at different stages - grant, vesting, exercise, and sale.',
        imageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'esop-taxation-guide',
      },
    ]
  },
  // Add more articles here as needed
};

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articleData[slug as keyof typeof articleData];
  
  if (!article) {
    return (
      <MainLayout>
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link to="/knowledge-base">Return to Knowledge Base</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Article Header */}
      <div className="bg-finance-cream py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link to="/knowledge-base" className="inline-flex items-center gap-2 text-finance-green hover:underline mb-8">
              <ArrowLeft size={16} />
              Back to Knowledge Base
            </Link>
            
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{article.description}</p>
            
            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-finance-green/10 text-finance-green border-finance-green/20">
                  {article.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar size={14} />
                <span>Published: {article.published}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock size={14} />
                <span>{article.readTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`kb-pill ${
                  article.difficulty === 'Beginner' ? 'kb-pill-beginner' : 
                  article.difficulty === 'Intermediate' ? 'kb-pill-intermediate' : 
                  'kb-pill-advanced'
                }`}>
                  {article.difficulty}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground">{article.author.designation}</p>
                </div>
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
        <img src={article.image} alt={article.title} className="w-full h-full object-cover absolute inset-0 z-[-1]" />
      </div>
      
      <div className="container pb-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg max-w-none prose-headings:text-finance-charcoal prose-headings:font-bold prose-p:text-finance-charcoal/80 prose-a:text-finance-green hover:prose-a:text-finance-green/80 prose-strong:text-finance-charcoal" dangerouslySetInnerHTML={{ __html: article.content }}>
            </div>
            
            <div className="border-t border-b border-gray-200 py-6 my-8 flex justify-between">
              <Button variant="outline" className="gap-2">
                <ThumbsUp size={16} />
                Helpful
              </Button>
              <Button variant="outline" className="gap-2">
                <Link2 size={16} />
                Copy Link
              </Button>
              <Button variant="outline" className="gap-2">
                <MessageSquare size={16} />
                Leave a Comment
              </Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <div className="sticky top-24">
              <div className="bg-muted p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-1">
                  {article.content.match(/<h2>(.*?)<\/h2>/g)?.map((match, index) => {
                    const title = match.replace(/<h2>|<\/h2>/g, '');
                    const anchor = title.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <a key={index} href={`#${anchor}`} className="block py-1 px-2 hover:bg-muted-foreground/10 rounded text-muted-foreground hover:text-finance-green transition-colors">
                        {title}
                      </a>
                    );
                  })}
                </nav>
              </div>
              
              <div className="bg-finance-green/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-finance-green" />
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {article.relatedArticles.map((related, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-32 overflow-hidden">
                          <img 
                            src={related.imageUrl} 
                            alt={related.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardHeader>
                      <div className="p-4">
                        <CardTitle className="text-base">{related.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs mt-1">{related.excerpt}</CardDescription>
                      </div>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80 p-0">
                          <Link to={`/knowledge-base/article/${related.slug}`} className="flex items-center gap-1 text-xs">
                            Read Article <ArrowLeft size={12} className="rotate-180" />
                          </Link>
                        </Button>
                      </CardFooter>
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

export default ArticlePage;
