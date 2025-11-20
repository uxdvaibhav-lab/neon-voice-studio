import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Download, Share2, Sun } from "lucide-react";
import { useState } from "react";

// Interactive Breakeven Chart Component
const InteractiveBreakevenChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  
  const chartData = [
    {year: 1, savings: -20000}, {year: 2, savings: -15000}, {year: 3, savings: -10000},
    {year: 4, savings: -5000}, {year: 5, savings: -2000}, {year: 6, savings: 0},
    {year: 7, savings: 5000}, {year: 8, savings: 12000}, {year: 10, savings: 25000},
    {year: 15, savings: 45000}, {year: 20, savings: 60000}, {year: 25, savings: 68420}
  ];
  
  const getChartPoint = (year, savings) => {
    const x = 60 + ((year - 1) / 24) * 680;
    const y = 250 - ((savings + 20000) / 88420) * 220;
    return {x, y};
  };
  
  const pathData = chartData.map((point, index) => {
    const {x, y} = getChartPoint(point.year, point.savings);
    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');
  
  return (
    <div className="relative h-80 bg-white rounded-lg p-4">
      <svg className="w-full h-full" viewBox="0 0 800 300">
        <defs>
          <pattern id="grid" width="32" height="30" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <line x1="60" y1="250" x2="740" y2="250" stroke="#374151" strokeWidth="2"/>
        <line x1="60" y1="250" x2="60" y2="30" stroke="#374151" strokeWidth="2"/>
        
        <text x="45" y="255" textAnchor="end" className="text-xs fill-gray-600">$0</text>
        <text x="45" y="200" textAnchor="end" className="text-xs fill-gray-600">$20k</text>
        <text x="45" y="145" textAnchor="end" className="text-xs fill-gray-600">$40k</text>
        <text x="45" y="90" textAnchor="end" className="text-xs fill-gray-600">$60k</text>
        
        <text x="60" y="270" textAnchor="middle" className="text-xs fill-gray-600">1</text>
        <text x="200" y="270" textAnchor="middle" className="text-xs fill-gray-600">6</text>
        <text x="400" y="270" textAnchor="middle" className="text-xs fill-gray-600">15</text>
        <text x="740" y="270" textAnchor="middle" className="text-xs fill-gray-600">25</text>
        
        <line x1="200" y1="30" x2="200" y2="250" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5"/>
        <rect x="200" y="30" width="540" height="220" fill="#f97316" fillOpacity="0.1"/>
        
        <path d={pathData} fill="none" stroke="#f97316" strokeWidth="3"/>
        
        {chartData.map((point, index) => {
          const {x, y} = getChartPoint(point.year, point.savings);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="6"
              fill="#f97316"
              className="cursor-pointer hover:r-8 transition-all"
              onMouseEnter={(e) => {
                setHoveredPoint({year: point.year, savings: point.savings});
                setMousePos({x: e.clientX, y: e.clientY});
              }}
              onMouseMove={(e) => setMousePos({x: e.clientX, y: e.clientY})}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}
        
        <text x="200" y="20" textAnchor="middle" className="text-sm font-semibold fill-orange-600">Breakeven</text>
        <text x="470" y="20" textAnchor="middle" className="text-sm font-semibold fill-orange-600">Pure Savings Years 7-25</text>
        <text x="740" y="60" textAnchor="middle" className="text-sm font-semibold fill-orange-600">$68,420</text>
      </svg>
      
      {hoveredPoint && (
        <div 
          className="fixed bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-50"
          style={{left: mousePos.x + 10, top: mousePos.y + 10}}
        >
          <div className="font-semibold">Year {hoveredPoint.year}</div>
          <div className="text-orange-300">
            {hoveredPoint.savings >= 0 ? `+$${hoveredPoint.savings.toLocaleString()}` : `-$${Math.abs(hoveredPoint.savings).toLocaleString()}`}
          </div>
        </div>
      )}
    </div>
  );
};

// Add CSS animation for line drawing
const chartStyles = `
  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const PreviewProposal = () => {
  const navigate = useNavigate();
  const [financingOption, setFinancingOption] = useState<'cash' | 'loan' | 'lease'>('loan');

  return (
    <div className="min-h-screen bg-background">
      <style>{chartStyles}</style>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-semibold text-lg tracking-tight">Solar Proposal Preview</h1>
              <p className="text-sm text-muted-foreground">Client Ready View</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        {/* Section 1: Personalized Cover Letter */}
        <section className="bg-white text-gray-900 rounded-lg border border-gray-200 p-6 sm:p-8 mb-6 animate-in fade-in duration-700 delay-100">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-4">A Solar Solution, Designed for You</h2>
            <p className="text-lg text-gray-900/90 leading-relaxed">
              Hi Alisa, based on our conversation about your energy independence and rising electricity bills,
              here's a solar solution tailored specifically for your home at 125 Maple Drive, Sunnyvale, CA.
              With the Federal ITC at 30% through 2032, now is the perfect time to lock in substantial savings
              and secure your energy future.
            </p>
          </div>
        </section>

        {/* Section 2: Why Solar Now? */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Solar Now?</h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Your electricity bills have increased 12% annually, but solar locks in your rates for 25 years.
              The Federal tax credit of 30% is available now but begins declining in 2026. Your neighbors are
              already saving—average payback in your area is just 6.2 years.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-orange-200 rounded-lg p-4">
                <div className="font-semibold text-orange-900 mb-1">Energy Independence</div>
                <p className="text-sm text-orange-700">Protect against future rate hikes</p>
              </div>
              <div className="border border-orange-200 rounded-lg p-4">
                <div className="font-semibold text-orange-900 mb-1">30% Tax Credit</div>
                <p className="text-sm text-orange-700">Federal ITC expires soon</p>
              </div>
              <div className="border border-orange-200 rounded-lg p-4">
                <div className="font-semibold text-orange-900 mb-1">Carbon Offset</div>
                <p className="text-sm text-orange-700">Reduce environmental impact</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Current Situation Analysis */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Situation Analysis</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Current Monthly Bill</div>
                <div className="text-3xl font-bold text-gray-900">$245</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Annual Consumption</div>
                <div className="text-3xl font-bold text-gray-900">12,500 kWh</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Rate Increase</div>
                <div className="text-3xl font-bold text-gray-900">2.5%/year</div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Without solar, your projected utility costs over 20 years could total $87,500, assuming current
              rate increases continue. That's money flowing out instead of building equity in your energy
              system.
            </p>
          </div>
        </section>

        {/* Section 4: How Solar Works for You */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-400">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Solar Works for You</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Solar panels capture sunlight → inverter converts to electricity → powers your home → excess flows
            to grid → you get credits. Unlike generic solar, we've customized this specifically for your roof
            orientation, your consumption pattern, and your energy goals.
          </p>
          <div className="border border-orange-200 rounded-lg p-4">
            <div className="font-semibold text-orange-900 mb-2">Your System Captures 94% of Peak Consumption</div>
            <p className="text-sm text-orange-700">
              Optimized for your east-facing slope and seasonal usage patterns
            </p>
          </div>
        </section>

        {/* Section 5: Your Customized Solar System */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Customized Solar System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">System Size</div>
              <div className="text-2xl font-bold text-gray-900">12.5 kW</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Panel Count</div>
              <div className="text-2xl font-bold text-gray-900">32 Panels</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Annual Production</div>
              <div className="text-2xl font-bold text-orange-600">16,800 kWh</div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Why this configuration:</strong> Captures 94% of your peak consumption, optimized for your
            roof's east-facing slope, avoids shade from mature oak trees on the west side. Using Tier-1 panels
            rated for 25 years with industry-leading inverter efficiency.
          </p>
          <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center bg-orange-50">
            <p className="text-sm text-gray-700 font-medium mb-2">Interactive 3D System Layout</p>
            <p className="text-xs text-gray-600">32 panels optimally positioned on your east-facing roof slope</p>
          </div>
        </section>

        {/* Section 6: Battery + Energy Independence */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Battery + Energy Independence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Backup Capacity</div>
              <div className="text-2xl font-bold text-gray-900">13.5 kWh</div>
              <p className="text-xs text-gray-600 mt-2">Powers essential circuits for 8-12 hours</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Daily Cycles</div>
              <div className="text-2xl font-bold text-gray-900">1-2 cycles</div>
              <p className="text-xs text-gray-600 mt-2">Estimated battery life: 10-15 years</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            During recent local outages, your backup power would have kept your fridge, lights, water pump, and
            home office running for up to 12 hours. Your area experienced 3 outages in the past year averaging 4
            hours each—never lose power in critical moments again.
          </p>
        </section>

        {/* Section 7: Investment & Financing */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-8 animate-in fade-in duration-700 delay-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment & Financing</h2>

          {/* System Cost Breakdown */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Cost Breakdown</h3>
            <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 px-6 py-4">
                <span className="text-gray-700 text-left">Equipment</span>
                <span className="font-semibold text-gray-900 text-right">$18,500</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 px-6 py-4">
                <span className="text-gray-700 text-left">Labor & Installation</span>
                <span className="font-semibold text-gray-900 text-right">$6,200</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 px-6 py-4">
                <span className="text-gray-700 text-left">Permitting & Inspection</span>
                <span className="font-semibold text-gray-900 text-right">$1,550</span>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 px-6 py-4">
                <span className="font-bold text-gray-900 text-left">Total System Cost</span>
                <span className="font-bold text-gray-900 text-right">$26,250</span>
              </div>
            </div>
          </div>

          {/* Financing Options */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financing Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="border border-gray-200 rounded-lg p-5 flex flex-col">
                <div className="font-semibold text-gray-900 mb-3">Cash Purchase</div>
                <div className="text-3xl font-bold text-orange-600 mb-2">$18,375</div>
                <p className="text-sm text-gray-600 mt-auto">After 30% Federal ITC</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-5 flex flex-col">
                <div className="font-semibold text-gray-900 mb-3">Solar Loan</div>
                <div className="text-3xl font-bold text-orange-600 mb-2">$175/mo</div>
                <p className="text-sm text-gray-600 mt-auto">20-year term, 4.99% APR</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-5 flex flex-col">
                <div className="font-semibold text-gray-900 mb-3">Lease/PPA</div>
                <div className="text-3xl font-bold text-orange-600 mb-2">$145/mo</div>
                <p className="text-sm text-gray-600 mt-auto">25-year agreement</p>
              </div>
            </div>
          </div>

          {/* Incentives */}
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-5">
            <h4 className="font-semibold text-orange-900 mb-3">Available Incentives</h4>
            <ul className="space-y-2 text-sm text-orange-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Federal ITC: 30% tax credit ($7,875)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>State Rebate: $1,200</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Net Metering Credits: ~$800/year</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 8: 25-Year Financial Outlook */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-800">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">25-Year Financial Outlook</h2>

          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">Total 25-Year Savings</div>
              <div className="text-5xl font-bold text-orange-600">$68,420</div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">25-Year Solar Financial Outlook</h3>
              <p className="text-sm text-gray-600 mb-4">Shows break-even point, pure savings years, and home value impact after installing solar</p>
              
              <InteractiveBreakevenChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Year 6: Breakeven</div>
                <div className="text-xl font-bold text-orange-600">System Paid Off</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Years 7-25</div>
                <div className="text-xl font-bold text-orange-600">Pure Savings</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Home Value</div>
                <div className="text-xl font-bold text-orange-600">+$21,000</div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 p-4 bg-orange-50/30">
            <p className="text-gray-700 leading-relaxed italic">
              <strong>Imagine Year 6:</strong> System paid for itself. <strong>Years 7-25:</strong> Pure savings
              go to your priorities—kids' college, retirement, vacations. A 25-year investment that outlives the
              typical mortgage and builds lasting value.
            </p>
          </div>
        </section>

        {/* Section 9: Common Questions Answered */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-900">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Questions Answered</h2>

          <div className="space-y-4">
            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
              <summary className="font-semibold text-gray-900">Does this void my roof warranty?</summary>
              <p className="mt-3 text-gray-700 text-sm">
                No. Our installation includes roof penetration sealing and we work with certified roofers. Your
                roof warranty remains intact, and we provide a 10-year workmanship warranty covering any
                roof-related issues.
              </p>
            </details>

            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
              <summary className="font-semibold text-gray-900">What about cloudy days?</summary>
              <p className="mt-3 text-gray-700 text-sm">
                Panels still generate on cloudy days, producing 15-25% of peak output. Your area gets 245 sunny
                days per year—more than enough to meet your energy goals and achieve projected savings.
              </p>
            </details>

            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
              <summary className="font-semibold text-gray-900">What if I sell my house?</summary>
              <p className="mt-3 text-gray-700 text-sm">
                Solar systems add an average of $21,000 to home value. If financed, the loan can transfer with
                the home, or you can pay it off from sale proceeds. Most buyers see solar as a major selling
                point.
              </p>
            </details>

            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
              <summary className="font-semibold text-gray-900">What about maintenance?</summary>
              <p className="mt-3 text-gray-700 text-sm">
                Minimal maintenance required. Annual inspection costs $100-300, and occasional cleaning if
                needed. Our 25-year equipment warranty and 10-year labor warranty cover any failures—we handle
                everything.
              </p>
            </details>

            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
              <summary className="font-semibold text-gray-900">Is my roof strong enough?</summary>
              <p className="mt-3 text-gray-700 text-sm">
                We conducted a structural analysis and your roof is rated for solar loads. If reinforcement is
                needed, we include it in the quote. Our structural engineer certifies every installation.
              </p>
            </details>
          </div>
        </section>

        {/* Section 10: Why Choose Our Company */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-1000">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Company</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-sm text-gray-600">Years in Business</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">2,847</div>
              <div className="text-sm text-gray-600">Systems Installed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.9★</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Certifications & Warranties</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ NABCEP Certified Installers</li>
              <li>✓ 25-Year Equipment Warranty</li>
              <li>✓ 10-Year Labor Warranty</li>
              <li>✓ Performance Guarantee: 98.5% of projections</li>
              <li>✓ 24/7 System Monitoring & Support</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">Customer Testimonial</div>
              <p className="text-sm text-gray-700 italic">
                "System exceeded projections by 3%. Installation was seamless, and the team answered every
                question. Best decision we made for our home."
              </p>
              <p className="text-xs text-gray-600 mt-2">— Sarah M., Sunnyvale</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">Customer Testimonial</div>
              <p className="text-sm text-gray-700 italic">
                "Worried about roof warranty at first, but they explained everything. Three years later, zero
                issues and I'm saving $180/month."
              </p>
              <p className="text-xs text-gray-600 mt-2">— Michael D., Mountain View</p>
            </div>
          </div>
        </section>

        {/* Section 11: Installation Timeline & Process */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-1100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Timeline & Process</h2>

          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center text-orange-600 font-bold">
                1
              </div>
              <div>
                <div className="font-semibold text-gray-900">Permitting (Week 1-4)</div>
                <p className="text-sm text-gray-600">
                  We handle all permits and utility pre-approval. Timeline based on local jurisdiction speed.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center text-orange-600 font-bold">
                2
              </div>
              <div>
                <div className="font-semibold text-gray-900">Installation Day (Week 6)</div>
                <p className="text-sm text-gray-600">
                  1-2 day installation. Expect moderate noise. Parking space needed for crew truck. Your project
                  manager will coordinate everything.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center text-orange-600 font-bold">
                3
              </div>
              <div>
                <div className="font-semibold text-gray-900">Inspection & Activation (Week 8)</div>
                <p className="text-sm text-gray-600">
                  Final inspection, utility meter change, system commissioning. You start generating power
                  immediately after approval.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-orange-200 rounded-lg p-4">
            <div className="font-semibold text-orange-900 mb-2">Your Project Manager</div>
            <p className="text-sm text-orange-700">
              Alex Thompson | (555) 123-4567 | alex@sundraftsolar.com
              <br />
              Available to answer questions throughout the entire process.
            </p>
          </div>
        </section>

        {/* Section 12: Why Now? + Urgency */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-1200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Now?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border border-orange-200 rounded-lg p-4">
              <div className="font-semibold text-orange-900 mb-2">⏰ Federal ITC Expires</div>
              <p className="text-sm text-orange-700">
                30% tax credit available through 2032, then drops to 26%. For your system, that's{" "}
                <strong>$1,050 in lost savings</strong> if you wait.
              </p>
            </div>
            <div className="border border-orange-200 rounded-lg p-4">
              <div className="font-semibold text-orange-900 mb-2">📅 Limited Installation Slots</div>
              <p className="text-sm text-orange-700">
                Current installer availability fills by [Month]. Lock in summer installation to maximize
                first-year production.
              </p>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 p-4 bg-orange-50/30">
            <p className="text-gray-700 leading-relaxed italic">
              <strong>
                Imagine year 6 when your system is paid off and you're generating free electricity for 19 more
                years.
              </strong>{" "}
              Energy rates historically increase 2.5% per year—solar locks yours for 25 years. This is your
              moment to lock in energy independence.
            </p>
          </div>
        </section>

        {/* Section 13: Next Steps & Call to Action */}
        <section className="bg-white rounded-lg border border-gray-200 p-8 mb-6 animate-in fade-in duration-700 delay-1300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Next Steps & Easy Path Forward</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-items-center">
            <Button className="w-full bg-orange-600 text-white hover:bg-orange-700 py-6 text-sm font-regular">
              Approve This Proposal
            </Button>
            <Button
              variant="outline"
              className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 py-6 text-sm font-regular"
            >
              Schedule Call
            </Button>
          </div>

          <div className="text-left text-gray-600 text-sm">
            Not ready? No problem. We're here when you are. Questions? Contact Alex Thompson directly at (555)
            123-4567.
          </div>
        </section>

        {/* Section 14: Your Next Milestone */}
        <section className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 animate-in fade-in duration-700 delay-1400">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Happens After Approval?</h2>

          <div className="space-y-3 text-sm text-orange-500">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 border border-orange-500 rounded-full flex items-center justify-center text-orange-500 text-xs font-regular">
                ✓
              </div>
              <div>
                <div className="font-semibold">Next: We file permits (we handle it)</div>
                <p className="text-gray-600">You'll receive permit documents + timeline update</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 border border-orange-500 rounded-full flex items-center justify-center text-orange-500 text-xs font-regular">
                2
              </div>
              <div>
                <div className="font-semibold">When to expect: Permit approval in ~4 weeks</div>
                <p className="text-gray-600">Based on current local jurisdiction processing times</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 border border-orange-500 rounded-full flex items-center justify-center text-orange-500  text-xs font-regular">
                3
              </div>
              <div>
                <div className="font-semibold">Your part: Sign final utility agreement (2 minutes online)</div>
                <p className="text-gray-600">We'll guide you through every step</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PreviewProposal;