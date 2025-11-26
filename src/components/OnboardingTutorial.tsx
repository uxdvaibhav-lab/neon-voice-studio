import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right";
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "step1",
    title: "Welcome to Solar Proposal Tool",
    description: "Let's take a quick tour of the main features to help you get started.",
    target: "body",
    position: "bottom"
  },
  {
    id: "step2", 
    title: "Navigation Sidebar",
    description: "Access different tools like Dashboard, Design Tool, and Proposal Tool from here.",
    target: "[data-tutorial='left-sidebar']",
    position: "right"
  },
  {
    id: "step3",
    title: "Document Controls",
    description: "Manage versions, sections, and document structure from this dropdown.",
    target: "[data-tutorial='document-controls']",
    position: "bottom"
  },
  {
    id: "step4",
    title: "Design Controls", 
    description: "Customize colors, fonts, and templates to match your brand.",
    target: "[data-tutorial='design-controls']",
    position: "bottom"
  },
  {
    id: "step5",
    title: "Team Collaboration",
    description: "Invite team members, manage comments, and collaborate in real-time.",
    target: "[data-tutorial='team-controls']",
    position: "bottom"
  },
  {
    id: "step6",
    title: "Preview & Send",
    description: "Preview your proposal and send it to clients directly from here.",
    target: "[data-tutorial='preview-send']",
    position: "bottom"
  },
  {
    id: "step7",
    title: "Quick Stats",
    description: "Monitor key metrics like ROI, savings, and carbon offset at a glance.",
    target: "[data-tutorial='quick-stats']",
    position: "left"
  },
  {
    id: "step8",
    title: "Financing Options",
    description: "Switch between different financing scenarios to show clients their options.",
    target: "[data-tutorial='financing-options']",
    position: "left"
  }
];

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingTutorial = ({ isOpen, onClose }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightElement, setHighlightElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const step = tutorialSteps[currentStep];
    const element = document.querySelector(step.target) as HTMLElement;
    setHighlightElement(element);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  const currentTutorialStep = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const getTooltipPosition = () => {
    if (!highlightElement) return { top: "50%", left: "50%" };
    
    const rect = highlightElement.getBoundingClientRect();
    const position = currentTutorialStep.position;
    
    switch (position) {
      case "top":
        return { top: rect.top - 10, left: rect.left + rect.width / 2 };
      case "bottom":
        return { top: rect.bottom + 10, left: rect.left + rect.width / 2 };
      case "left":
        return { top: rect.top + rect.height / 2, left: rect.left - 10 };
      case "right":
        return { top: rect.top + rect.height / 2, left: rect.right + 10 };
      default:
        return { top: rect.bottom + 10, left: rect.left + rect.width / 2 };
    }
  };

  const tooltipPosition = getTooltipPosition();

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />
      
      {/* Highlight */}
      {highlightElement && (
        <div
          className="fixed border-2 border-orange-500 rounded-lg pointer-events-none z-50"
          style={{
            top: highlightElement.getBoundingClientRect().top - 4,
            left: highlightElement.getBoundingClientRect().left - 4,
            width: highlightElement.getBoundingClientRect().width + 8,
            height: highlightElement.getBoundingClientRect().height + 8,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{currentTutorialStep.title}</h3>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{currentTutorialStep.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {currentStep + 1} of {tutorialSteps.length}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {isLastStep ? (
              <Button size="sm" onClick={onClose}>
                Finish
              </Button>
            ) : (
              <Button size="sm" onClick={() => setCurrentStep(currentStep + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};