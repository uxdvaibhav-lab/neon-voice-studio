import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatarAlex from "@/assets/avatar-alex.jpg";
import avatarJohn from "@/assets/avatar-john.jpg";
import avatarJane from "@/assets/avatar-jane.jpg";
import avatarMike from "@/assets/avatar-mike.jpg";
import avatarMark from "@/assets/avatar-mark.jpg";
import thumbHero from "@/assets/thumb-hero.jpg";
import thumbCompany from "@/assets/thumb-company.jpg";
import thumbSystem from "@/assets/thumb-system.jpg";
import thumbInvestment from "@/assets/thumb-investment.jpg";
import thumbTimeline from "@/assets/thumb-timeline.jpg";
import thumbBenefits from "@/assets/thumb-benefits.jpg";
import thumbSteps from "@/assets/thumb-steps.jpg";
import {
  LayoutDashboard,
  ClipboardList,
  PenTool,
  Battery,
  FileText,
  FileCheck,
  Settings,
  ChevronDown,
  Palette,
  Users,
  Sun,
  DollarSign,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { DocumentControlMenu } from "@/components/controls/DocumentControlMenu";
import { DesignControlMenu } from "@/components/controls/DesignControlMenu";
import { CollaborationMenu } from "@/components/controls/CollaborationMenu";
import { ProfileMenu } from "@/components/controls/ProfileMenu";
import { NavigationDrawer } from "@/components/NavigationDrawer";
import { MobileHeader } from "@/components/MobileHeader";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";

// Utility function to extract text content from React children
const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }
  
  if (typeof children === 'number') {
    return children.toString();
  }
  
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  
  if (React.isValidElement(children)) {
    // Recursively extract text from child elements
    return extractTextFromChildren(children.props.children);
  }
  
  return '';
};

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

// Mock Editable Text Component (Visual Only)
const EditableTextMock = ({
  children,
  className = "",
  improvedText,
  multiline = false,
}: {
  children: React.ReactNode;
  className?: string;
  improvedText?: string;
  multiline?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const editRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Handle click outside to close edit mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  // Auto-focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      // Pre-fill with current text
      const currentText = extractTextFromChildren(children);
      setEditedText(currentText);
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
    if (e.key === "Enter" && !multiline) {
      setIsEditing(false);
    }
  };

  const displayText = editedText && !isEditing ? editedText : children;

  return (
    <div ref={editRef} className="relative inline-block w-full" onClick={handleClick}>
      {isEditing ? (
        multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editedText}
            placeholder={extractTextFromChildren(children)}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full px-2 py-1 rounded border-[0.5px] border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none bg-background text-foreground placeholder:text-muted-foreground/60 ${className}`}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editedText}
            placeholder={extractTextFromChildren(children)}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full px-2 py-1 rounded border-[0.5px] border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground/60 ${className}`}
          />
        )
      ) : (
        <div
          className={`cursor-pointer transition-all duration-200 rounded hover:bg-muted hover:ring-1 hover:ring-border ${className}`}
        >
          {displayText}
        </div>
      )}
    </div>
  );
};
const Index = () => {
  const navigate = useNavigate();
  const [selectedFinancing, setSelectedFinancing] = useState<"cash" | "loan" | "lease">("cash");

  // Mock data for controls
  const mockVersions = [
    {
      id: "v1",
      timestamp: "2 hours ago",
      date: "2024-01-15 14:30",
      author: "You",
      authorAvatar: avatar1,
      changeSummary: "Updated pricing structure and added battery storage option",
      isCurrent: true,
    },
    {
      id: "v2",
      timestamp: "Yesterday",
      date: "2024-01-14 09:15",
      author: "John Doe",
      authorAvatar: avatar2,
      changeSummary: "Modified system design specifications",
      isCurrent: false,
    },
    {
      id: "v3",
      timestamp: "3 days ago",
      date: "2024-01-12 16:45",
      author: "You",
      authorAvatar: avatar1,
      changeSummary: "Initial proposal draft created",
      isCurrent: false,
    },
  ];
  const mockSections = [
    {
      id: "hero",
      name: "Hero Section",
      visible: true,
      order: 1,
      thumbnail: thumbHero,
    },
    {
      id: "company",
      name: "Company Info",
      visible: true,
      order: 2,
      thumbnail: thumbCompany,
    },
    {
      id: "system",
      name: "System Design",
      visible: true,
      order: 3,
      thumbnail: thumbSystem,
    },
    {
      id: "investment",
      name: "Investment Breakdown",
      visible: true,
      order: 4,
      thumbnail: thumbInvestment,
    },
    {
      id: "timeline",
      name: "Project Timeline",
      visible: true,
      order: 5,
      thumbnail: thumbTimeline,
    },
    {
      id: "benefits",
      name: "Benefits & Savings",
      visible: true,
      order: 6,
      thumbnail: thumbBenefits,
    },
    {
      id: "next-steps",
      name: "Next Steps",
      visible: false,
      order: 7,
      thumbnail: thumbSteps,
    },
  ];
  const mockTemplates = [
    {
      id: "modern",
      name: "Modern",
      preview: "/templates/modern.png",
      fontFamily: "Inter",
      primaryColor: "#1f2937",
      accentColor: "#f97316",
    },
    {
      id: "classic",
      name: "Classic",
      preview: "/templates/classic.png",
      fontFamily: "Georgia",
      primaryColor: "#374151",
      accentColor: "#3b82f6",
    },
    {
      id: "professional",
      name: "Professional",
      preview: "/templates/professional.png",
      fontFamily: "Roboto",
      primaryColor: "#0f172a",
      accentColor: "#8b5cf6",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      preview: "/templates/minimalist.png",
      fontFamily: "Helvetica",
      primaryColor: "#18181b",
      accentColor: "#06b6d4",
    },
  ];
  const mockCurrentTemplate = mockTemplates[0];

  const [brandColors, setBrandColors] = useState({
    primary: "#F97316",
    secondary: "#FB923C",
    accent: "#FDBA74",
  });

  const [typography, setTypography] = useState({
    headingFont: "Inter, sans-serif",
    bodyFont: "Inter, sans-serif",
  });
  const mockCurrentUser = {
    id: "user1",
    name: "Alex Thompson",
    email: "alex@sundraftsolar.com",
    avatar: avatarAlex,
    role: "owner",
    initials: "AT",
  };
  const mockCollaborators = [
    {
      id: "collab1",
      name: "John Doe",
      email: "john@example.com",
      avatar: avatarJohn,
      role: "editor",
      online: true,
      currentSection: "System Design",
      initials: "JD",
    },
    {
      id: "collab2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: avatarJane,
      role: "viewer",
      online: false,
      currentSection: null,
      initials: "JS",
    },
    {
      id: "collab3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: avatarMike,
      role: "editor",
      online: true,
      currentSection: "Investment Breakdown",
      initials: "MJ",
    },
  ];
  const mockComments = [
    {
      id: "comment1",
      author: "John Doe",
      authorAvatar: avatarJohn,
      content: "Should we increase the system size to 15kW for better ROI?",
      section: "System Design",
      timestamp: "1 hour ago",
      resolved: false,
      read: false,
      replies: 2,
      mentions: [],
    },
    {
      id: "comment2",
      author: "Jane Smith",
      authorAvatar: avatarJane,
      content: "The pricing looks competitive. Great work!",
      section: "Investment Breakdown",
      timestamp: "3 hours ago",
      resolved: true,
      read: true,
      replies: 0,
      mentions: ["You"],
    },
    {
      id: "comment3",
      author: "Mike Johnson",
      authorAvatar: avatarMike,
      content: "@Alex Can you clarify the warranty terms?",
      section: "System Design",
      timestamp: "Yesterday",
      resolved: false,
      read: false,
      replies: 1,
      mentions: ["You"],
    },
  ];
  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      icon: ClipboardList,
      label: "Requirement Gathering",
    },
    {
      icon: PenTool,
      label: "Design Tool",
    },
    {
      icon: Battery,
      label: "Battery Design",
    },
    {
      icon: FileText,
      label: "Proposal Tool",
      active: true,
    },
    {
      icon: FileCheck,
      label: "Permit",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Mobile Header - Only visible on mobile/tablet */}
      <MobileHeader
        navigationDrawer={
          <NavigationDrawer selectedFinancing={selectedFinancing} onFinancingChange={setSelectedFinancing} />
        }
        proposalTitle="SunDraft Solar Proposal"
        proposalSubtitle="Advanced Solar Design System"
      />

      {/* Desktop App Frame */}
      <div className="max-w-[120rem] mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white animate-in fade-in duration-700 mt-[56px] md:mt-0">
        {/* Window Title Bar - Hidden on mobile/tablet */}
        <div className="hidden md:flex items-center justify-between px-2 sm:px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200">
          {/* App Info */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 tracking-tight">
                SunDraft Solar Proposal
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">Advanced Solar Design System</p>
            </div>
          </div>

          {/* Window Actions */}
          <div className="flex items-center gap-2">
            {/* Document Controls Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9 text-foreground hover:text-foreground hover:bg-accent"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline text-xs sm:text-sm">Document</span>
                  <ChevronDown className="hidden sm:block w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[95vw] sm:w-[400px] md:w-[420px] max-w-[420px] max-h-[80vh] sm:max-h-[600px] overflow-y-auto"
                sideOffset={8}
              >
                <DocumentControlMenu
                  versions={mockVersions}
                  sections={mockSections}
                  onRestoreVersion={(id) => console.log("Restore version:", id)}
                  onReorderSections={(order) => console.log("New order:", order)}
                  onToggleSectionVisibility={(id) => console.log("Toggle section:", id)}
                />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Design & Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9 text-foreground hover:text-foreground hover:bg-accent"
                >
                  <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline text-xs sm:text-sm">Design</span>
                  <ChevronDown className="hidden sm:block w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[95vw] sm:w-[380px] md:w-[400px] max-w-[400px] max-h-[80vh] sm:max-h-[600px] overflow-y-auto"
                sideOffset={8}
              >
                <DesignControlMenu
                  currentTemplate={mockCurrentTemplate}
                  templates={mockTemplates}
                  brandColors={brandColors}
                  typography={typography}
                  onTemplateChange={(id) => console.log("Template:", id)}
                  onBrandColorsChange={(colors) => setBrandColors({ ...brandColors, ...colors })}
                  onTypographyChange={(typo) => setTypography({ ...typography, ...typo })}
                  onSaveAsCustomTemplate={() => console.log("Save as custom")}
                  onExportPDF={() => console.log("Export PDF")}
                />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Collaboration Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 sm:gap-2 px-2 sm:px-3 h-8 sm:h-9 text-foreground hover:text-foreground hover:bg-accent relative"
                >
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline text-xs sm:text-sm">Team</span>
                  {/* Unread comments badge */}
                  {mockComments.filter((c) => !c.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-destructive text-destructive-foreground text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                      {mockComments.filter((c) => !c.read).length}
                    </span>
                  )}
                  <ChevronDown className="hidden sm:block w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[95vw] sm:w-[400px] md:w-[420px] max-w-[420px] max-h-[80vh] sm:max-h-[600px] overflow-y-auto"
                sideOffset={8}
              >
                <CollaborationMenu
                  currentUser={mockCurrentUser}
                  collaborators={mockCollaborators}
                  comments={mockComments}
                  onInviteCollaborator={(email, role) => console.log("Invite:", email, role)}
                  onRemoveCollaborator={(id) => console.log("Remove:", id)}
                  onResolveComment={(id) => console.log("Resolve:", id)}
                  onJumpToComment={(id) => console.log("Jump to:", id)}
                />
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full p-0 h-8 w-8">
                  <Avatar className="h-8 w-8 border-2 border-border hover:border-muted-foreground transition-colors">
                    <AvatarImage src={mockCurrentUser.avatar} alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                      {mockCurrentUser.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <ProfileMenu user={mockCurrentUser} onSignOut={() => console.log("Sign out")} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* App Content */}
        <div className="flex h-[calc(100vh-8rem)] relative">
          {/* Left Sidebar - Hidden on mobile, visible on tablet+ */}
          <aside className="hidden md:flex w-12 md:w-16 bg-gray-50 border-r border-gray-200 flex-col items-center py-6 animate-in slide-in-from-left duration-500">
            <nav className="flex flex-col items-center gap-2 flex-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-lg transition-all duration-200 ${item.active ? "border-2 border-primary text-primary" : "text-gray-500 hover:bg-accent hover:text-accent-foreground"}`}
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5" strokeWidth={1.5} />
                </button>
              ))}
            </nav>

            <button
              className="p-3 rounded-lg text-gray-500 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              aria-label="Settings"
              title="Settings"
            >
              <Settings className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </aside>

          {/* Main Content Area - Full width on mobile */}
          <main className="flex-1 overflow-y-auto scrollbar-hide animate-in slide-in-from-bottom duration-700">
            <div className="p-4 sm:p-6 md:p-8 pb-8 space-y-6 sm:space-y-8">
              {/* Section 1: Personalized Cover Letter */}
              <section className="bg-white text-gray-900 rounded-lg border border-gray-200 p-6 sm:p-8 mb-6 animate-in fade-in duration-700 delay-100">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-4">A Solar Solution, Designed for You</h2>
                  <EditableTextMock multiline className="text-lg text-gray-900/90 leading-relaxed">
                    <p className="text-lg text-gray-900/90 leading-relaxed">
                      Hi Alisa, based on our conversation about your energy independence and rising electricity bills,
                      here's a solar solution tailored specifically for your home at 125 Maple Drive, Sunnyvale, CA.
                      With the Federal ITC at 30% through 2032, now is the perfect time to lock in substantial savings
                      and secure your energy future.
                    </p>
                  </EditableTextMock>
                </div>
              </section>

              {/* Section 2: Why Solar Now? */}
              <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Solar Now?</h2>
                <div className="space-y-4">
                  <EditableTextMock multiline>
                    <p className="text-gray-700 leading-relaxed">
                      Your electricity bills have increased 12% annually, but solar locks in your rates for 25 years.
                      The Federal tax credit of 30% is available now but begins declining in 2026. Your neighbors are
                      already saving—average payback in your area is just 6.2 years.
                    </p>
                  </EditableTextMock>
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
                      <EditableTextMock className="text-3xl font-bold text-gray-900">
                        <div className="text-3xl font-bold text-gray-900">$245</div>
                      </EditableTextMock>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Annual Consumption</div>
                      <EditableTextMock className="text-3xl font-bold text-gray-900">
                        <div className="text-3xl font-bold text-gray-900">12,500 kWh</div>
                      </EditableTextMock>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Rate Increase</div>
                      <EditableTextMock className="text-3xl font-bold text-gray-900">
                        <div className="text-3xl font-bold text-gray-900">2.5%/year</div>
                      </EditableTextMock>
                    </div>
                  </div>
                  <EditableTextMock multiline>
                    <p className="text-gray-700 leading-relaxed">
                      Without solar, your projected utility costs over 20 years could total $87,500, assuming current
                      rate increases continue. That's money flowing out instead of building equity in your energy
                      system.
                    </p>
                  </EditableTextMock>
                </div>
              </section>

              {/* Section 4: How Solar Works for You */}
              <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-400">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How Solar Works for You</h2>
                <EditableTextMock multiline>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Solar panels capture sunlight → inverter converts to electricity → powers your home → excess flows
                    to grid → you get credits. Unlike generic solar, we've customized this specifically for your roof
                    orientation, your consumption pattern, and your energy goals.
                  </p>
                </EditableTextMock>
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
                    <EditableTextMock className="text-2xl font-bold text-gray-900">
                      <div className="text-2xl font-bold text-gray-900">12.5 kW</div>
                    </EditableTextMock>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Panel Count</div>
                    <EditableTextMock className="text-2xl font-bold text-gray-900">
                      <div className="text-2xl font-bold text-gray-900">32 Panels</div>
                    </EditableTextMock>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Annual Production</div>
                    <EditableTextMock className="text-2xl font-bold text-orange-600">
                      <div className="text-2xl font-bold text-orange-600">16,800 kWh</div>
                    </EditableTextMock>
                  </div>
                </div>
                <EditableTextMock multiline>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Why this configuration:</strong> Captures 94% of your peak consumption, optimized for your
                    roof's east-facing slope, avoids shade from mature oak trees on the west side. Using Tier-1 panels
                    rated for 25 years with industry-leading inverter efficiency.
                  </p>
                </EditableTextMock>
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
                    <EditableTextMock className="text-2xl font-bold text-gray-900">
                      <div className="text-2xl font-bold text-gray-900">13.5 kWh</div>
                    </EditableTextMock>
                    <p className="text-xs text-gray-600 mt-2">Powers essential circuits for 8-12 hours</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Daily Cycles</div>
                    <EditableTextMock className="text-2xl font-bold text-gray-900">
                      <div className="text-2xl font-bold text-gray-900">1-2 cycles</div>
                    </EditableTextMock>
                    <p className="text-xs text-gray-600 mt-2">Estimated battery life: 10-15 years</p>
                  </div>
                </div>
                <EditableTextMock multiline>
                  <p className="text-gray-700 leading-relaxed">
                    During recent local outages, your backup power would have kept your fridge, lights, water pump, and
                    home office running for up to 12 hours. Your area experienced 3 outages in the past year averaging 4
                    hours each—never lose power in critical moments again.
                  </p>
                </EditableTextMock>
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
                      <EditableTextMock className="text-right">
                        <span className="font-semibold text-gray-900">$18,500</span>
                      </EditableTextMock>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b border-gray-200 px-6 py-4">
                      <span className="text-gray-700 text-left">Labor & Installation</span>
                      <EditableTextMock className="text-right">
                        <span className="font-semibold text-gray-900">$6,200</span>
                      </EditableTextMock>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b border-gray-200 px-6 py-4">
                      <span className="text-gray-700 text-left">Permitting & Inspection</span>
                      <EditableTextMock className="text-right">
                        <span className="font-semibold text-gray-900">$1,550</span>
                      </EditableTextMock>
                    </div>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 px-6 py-4">
                      <span className="font-bold text-gray-900 text-left">Total System Cost</span>
                      <EditableTextMock className="text-right">
                        <span className="font-bold text-gray-900">$26,250</span>
                      </EditableTextMock>
                    </div>
                  </div>
                </div>

                {/* Financing Options */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financing Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="border border-gray-200 rounded-lg p-5 flex flex-col">
                      <div className="font-semibold text-gray-900 mb-3">Cash Purchase</div>
                      <EditableTextMock>
                        <div className="text-3xl font-bold text-orange-600 mb-2">$18,375</div>
                      </EditableTextMock>
                      <p className="text-sm text-gray-600 mt-auto">After 30% Federal ITC</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-5 flex flex-col">
                      <div className="font-semibold text-gray-900 mb-3">Solar Loan</div>
                      <EditableTextMock>
                        <div className="text-3xl font-bold text-orange-600 mb-2">$175/mo</div>
                      </EditableTextMock>
                      <p className="text-sm text-gray-600 mt-auto">20-year term, 4.99% APR</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-5 flex flex-col">
                      <div className="font-semibold text-gray-900 mb-3">Lease/PPA</div>
                      <EditableTextMock>
                        <div className="text-3xl font-bold text-orange-600 mb-2">$145/mo</div>
                      </EditableTextMock>
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
                    <EditableTextMock className="text-5xl font-bold text-orange-600">
                      <div className="text-5xl font-bold text-orange-600">$68,420</div>
                    </EditableTextMock>
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
                      <EditableTextMock className="text-xl font-bold text-orange-600">
                        <div className="text-xl font-bold text-orange-600">+$21,000</div>
                      </EditableTextMock>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 p-4 bg-orange-50/30">
                  <EditableTextMock multiline>
                    <p className="text-gray-700 leading-relaxed italic">
                      <strong>Imagine Year 6:</strong> System paid for itself. <strong>Years 7-25:</strong> Pure savings
                      go to your priorities—kids' college, retirement, vacations. A 25-year investment that outlives the
                      typical mortgage and builds lasting value.
                    </p>
                  </EditableTextMock>
                </div>
              </section>

              {/* Section 9: Common Questions Answered */}
              <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-900">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Questions Answered</h2>

                <div className="space-y-4">
                  <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
                    <summary className="font-semibold text-gray-900">Does this void my roof warranty?</summary>
                    <EditableTextMock multiline>
                      <p className="mt-3 text-gray-700 text-sm">
                        No. Our installation includes roof penetration sealing and we work with certified roofers. Your
                        roof warranty remains intact, and we provide a 10-year workmanship warranty covering any
                        roof-related issues.
                      </p>
                    </EditableTextMock>
                  </details>

                  <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
                    <summary className="font-semibold text-gray-900">What about cloudy days?</summary>
                    <EditableTextMock multiline>
                      <p className="mt-3 text-gray-700 text-sm">
                        Panels still generate on cloudy days, producing 15-25% of peak output. Your area gets 245 sunny
                        days per year—more than enough to meet your energy goals and achieve projected savings.
                      </p>
                    </EditableTextMock>
                  </details>

                  <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
                    <summary className="font-semibold text-gray-900">What if I sell my house?</summary>
                    <EditableTextMock multiline>
                      <p className="mt-3 text-gray-700 text-sm">
                        Solar systems add an average of $21,000 to home value. If financed, the loan can transfer with
                        the home, or you can pay it off from sale proceeds. Most buyers see solar as a major selling
                        point.
                      </p>
                    </EditableTextMock>
                  </details>

                  <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
                    <summary className="font-semibold text-gray-900">What about maintenance?</summary>
                    <EditableTextMock multiline>
                      <p className="mt-3 text-gray-700 text-sm">
                        Minimal maintenance required. Annual inspection costs $100-300, and occasional cleaning if
                        needed. Our 25-year equipment warranty and 10-year labor warranty cover any failures—we handle
                        everything.
                      </p>
                    </EditableTextMock>
                  </details>

                  <details className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-200">
                    <summary className="font-semibold text-gray-900">Is my roof strong enough?</summary>
                    <EditableTextMock multiline>
                      <p className="mt-3 text-gray-700 text-sm">
                        We conducted a structural analysis and your roof is rated for solar loads. If reinforcement is
                        needed, we include it in the quote. Our structural engineer certifies every installation.
                      </p>
                    </EditableTextMock>
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
                    <EditableTextMock className="text-4xl font-bold text-orange-600 mb-2">
                      <div className="text-4xl font-bold text-orange-600">2,847</div>
                    </EditableTextMock>
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
                    <EditableTextMock multiline>
                      <p className="text-sm text-gray-700 italic">
                        "System exceeded projections by 3%. Installation was seamless, and the team answered every
                        question. Best decision we made for our home."
                      </p>
                    </EditableTextMock>
                    <p className="text-xs text-gray-600 mt-2">— Sarah M., Sunnyvale</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">Customer Testimonial</div>
                    <EditableTextMock multiline>
                      <p className="text-sm text-gray-700 italic">
                        "Worried about roof warranty at first, but they explained everything. Three years later, zero
                        issues and I'm saving $180/month."
                      </p>
                    </EditableTextMock>
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
                      <EditableTextMock multiline>
                        <p className="text-sm text-gray-600">
                          1-2 day installation. Expect moderate noise. Parking space needed for crew truck. Your project
                          manager will coordinate everything.
                        </p>
                      </EditableTextMock>
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
                  <EditableTextMock multiline>
                    <p className="text-sm text-orange-700">
                      Alex Thompson | (555) 123-4567 | alex@sundraftsolar.com
                      <br />
                      Available to answer questions throughout the entire process.
                    </p>
                  </EditableTextMock>
                </div>
              </section>

              {/* Section 12: Why Now? + Urgency */}
              <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-in fade-in duration-700 delay-1200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Now?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-orange-200 rounded-lg p-4">
                    <div className="font-semibold text-orange-900 mb-2">⏰ Federal ITC Expires</div>
                    <EditableTextMock multiline>
                      <p className="text-sm text-orange-700">
                        30% tax credit available through 2032, then drops to 26%. For your system, that's{" "}
                        <strong>$1,050 in lost savings</strong> if you wait.
                      </p>
                    </EditableTextMock>
                  </div>
                  <div className="border border-orange-200 rounded-lg p-4">
                    <div className="font-semibold text-orange-900 mb-2">📅 Limited Installation Slots</div>
                    <EditableTextMock multiline>
                      <p className="text-sm text-orange-700">
                        Current installer availability fills by [Month]. Lock in summer installation to maximize
                        first-year production.
                      </p>
                    </EditableTextMock>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 p-4 bg-orange-50/30">
                  <EditableTextMock multiline>
                    <p className="text-gray-700 leading-relaxed italic">
                      <strong>
                        Imagine year 6 when your system is paid off and you're generating free electricity for 19 more
                        years.
                      </strong>{" "}
                      Energy rates historically increase 2.5% per year—solar locks yours for 25 years. This is your
                      moment to lock in energy independence.
                    </p>
                  </EditableTextMock>
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
            </div>
          </main>

          {/* Right Panel - Hidden on mobile/tablet, visible on desktop */}
          <aside className="hidden lg:block lg:w-64 xl:w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto scrollbar-hide animate-in slide-in-from-right duration-700">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <EditableTextMock
                      className="text-xs text-gray-500 block"
                      improvedText="Return on Investment Timeline"
                    >
                      <div className="text-xs text-gray-500">ROI Period</div>
                    </EditableTextMock>
                    <EditableTextMock className="text-lg font-bold text-brand-teal" improvedText="7.2 Years">
                      <div className="text-lg font-bold text-brand-teal">8.5 Years</div>
                    </EditableTextMock>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <EditableTextMock className="text-xs text-gray-500 block" improvedText="Total Lifetime Savings">
                      <div className="text-xs text-gray-500">25-Year Savings</div>
                    </EditableTextMock>
                    <EditableTextMock className="text-lg font-bold text-brand-teal" improvedText="$71,250">
                      <div className="text-lg font-bold text-brand-teal">$58,500</div>
                    </EditableTextMock>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <EditableTextMock className="text-xs text-gray-500 block" improvedText="Carbon Emissions Offset">
                      <div className="text-xs text-gray-500">CO₂ Offset</div>
                    </EditableTextMock>
                    <EditableTextMock className="text-lg font-bold text-brand-teal" improvedText="250 Tons">
                      <div className="text-lg font-bold text-brand-teal">200 Tons</div>
                    </EditableTextMock>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Financing Options</h3>
                <div className="space-y-2">
                  {/* Cash Purchase Option */}
                  <button
                    onClick={() => setSelectedFinancing("cash")}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedFinancing === "cash" ? "border-brand-orange bg-brand-orange/5 shadow-sm" : "border-gray-200 hover:border-brand-orange/50 hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedFinancing === "cash" ? "border-brand-orange bg-brand-orange" : "border-gray-400"}`}
                        >
                          {selectedFinancing === "cash" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Cash Purchase</div>
                          <div className="text-xs text-gray-500">One-time payment</div>
                        </div>
                      </div>
                      {selectedFinancing === "cash" && (
                        <div className="text-xs font-medium text-brand-orange">Selected</div>
                      )}
                    </div>
                  </button>

                  {/* Solar Loan Option */}
                  <button
                    onClick={() => setSelectedFinancing("loan")}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedFinancing === "loan" ? "border-brand-orange bg-brand-orange/5 shadow-sm" : "border-gray-200 hover:border-brand-orange/50 hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedFinancing === "loan" ? "border-brand-orange bg-brand-orange" : "border-gray-400"}`}
                        >
                          {selectedFinancing === "loan" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Solar Loan</div>
                          <div className="text-xs text-gray-500">Monthly payments</div>
                        </div>
                      </div>
                      {selectedFinancing === "loan" && (
                        <div className="text-xs font-medium text-brand-orange">Selected</div>
                      )}
                    </div>
                  </button>

                  {/* Lease Option */}
                  <button
                    onClick={() => setSelectedFinancing("lease")}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedFinancing === "lease" ? "border-brand-orange bg-brand-orange/5 shadow-sm" : "border-gray-200 hover:border-brand-orange/50 hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedFinancing === "lease" ? "border-brand-orange bg-brand-orange" : "border-gray-400"}`}
                        >
                          {selectedFinancing === "lease" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Lease Option</div>
                          <div className="text-xs text-gray-500">Low monthly cost</div>
                        </div>
                      </div>
                      {selectedFinancing === "lease" && (
                        <div className="text-xs font-medium text-brand-orange">Selected</div>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              <div className="sticky bottom-0 pt-4 pb-4 space-y-3 border-t border-border mt-6 bg-gray-50">
                <Button variant="outline-orange" className="w-full" onClick={() => navigate("/preview")}>
                  Preview
                </Button>
                <Button 
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 hover:shadow-md text-white transition-all"
                  onClick={() => toast.success("Proposal sent successfully!", {
                    position: "bottom-center",
                    duration: 3000,
                    style: {
                      background: "#f97316",
                      color: "white",
                      border: "none"
                    }
                  })}
                >
                  Send Proposal
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Action Buttons - Mobile Only */}
      <FloatingActionButtons
        onPreview={() => navigate("/preview")}
        onSendProposal={() => toast.success("Proposal sent successfully!", {
          position: "bottom-center",
          duration: 3000,
          style: {
            background: "#f97316",
            color: "white",
            border: "none"
          }
        })}
      />
    </div>
  );
};
export default Index;
