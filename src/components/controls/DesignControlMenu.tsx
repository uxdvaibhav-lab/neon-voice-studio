import { Palette, FileImage, Download, Sparkles, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ColorPicker } from "@/components/ui/color-picker";
import { FontSelector } from "@/components/ui/font-selector";
import { ScrollArea } from "@/components/ui/scroll-area";
interface Template {
  id: string;
  name: string;
  preview: string;
  fontFamily: string;
  primaryColor: string;
  accentColor: string;
  category?: string;
}
interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
}
interface Typography {
  headingFont: string;
  bodyFont: string;
}
interface DesignControlMenuProps {
  currentTemplate: Template;
  templates: Template[];
  brandColors: BrandColors;
  typography: Typography;
  onTemplateChange: (templateId: string) => void;
  onBrandColorsChange: (colors: Partial<BrandColors>) => void;
  onTypographyChange: (typography: Partial<Typography>) => void;
  onSaveAsCustomTemplate: () => void;
  onExportPDF?: () => void;
}
const FONT_OPTIONS = [{
  name: "Inter",
  value: "Inter, sans-serif"
}, {
  name: "Playfair Display",
  value: "Playfair Display, serif"
}, {
  name: "Montserrat",
  value: "Montserrat, sans-serif"
}, {
  name: "Roboto",
  value: "Roboto, sans-serif"
}, {
  name: "Poppins",
  value: "Poppins, sans-serif"
}, {
  name: "Lora",
  value: "Lora, serif"
}, {
  name: "Raleway",
  value: "Raleway, sans-serif"
}, {
  name: "Open Sans",
  value: "Open Sans, sans-serif"
}];
const COLOR_PRESETS = [{
  name: "Solar Orange",
  primary: "#F97316",
  secondary: "#FB923C",
  accent: "#FDBA74"
}, {
  name: "Ocean Blue",
  primary: "#0EA5E9",
  secondary: "#38BDF8",
  accent: "#7DD3FC"
}, {
  name: "Forest Green",
  primary: "#10B981",
  secondary: "#34D399",
  accent: "#6EE7B7"
}, {
  name: "Royal Purple",
  primary: "#8B5CF6",
  secondary: "#A78BFA",
  accent: "#C4B5FD"
}, {
  name: "Corporate Gray",
  primary: "#64748B",
  secondary: "#94A3B8",
  accent: "#CBD5E1"
}, {
  name: "Energy Teal",
  primary: "#14B8A6",
  secondary: "#2DD4BF",
  accent: "#5EEAD4"
}];
export const DesignControlMenu = ({
  currentTemplate,
  templates,
  brandColors,
  typography,
  onTemplateChange,
  onBrandColorsChange,
  onTypographyChange,
  onSaveAsCustomTemplate,
  onExportPDF
}: DesignControlMenuProps) => {
  return <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {/* Brand Colors */}
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Brand Colors
          </h4>

          <div className="space-y-3 mb-4">
            <ColorPicker label="Primary Color" value={brandColors.primary} onChange={value => onBrandColorsChange({
            primary: value
          })} />

            <ColorPicker label="Secondary Color" value={brandColors.secondary} onChange={value => onBrandColorsChange({
            secondary: value
          })} />

            <ColorPicker label="Accent Color" value={brandColors.accent} onChange={value => onBrandColorsChange({
            accent: value
          })} />
          </div>

          {/* Color Presets */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick Presets</p>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PRESETS.map(preset => <button key={preset.name} onClick={() => onBrandColorsChange({
              primary: preset.primary,
              secondary: preset.secondary,
              accent: preset.accent
            })} className="p-2 rounded-lg border border-border hover:border-muted-foreground transition-all text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded-full border border-border" style={{
                  backgroundColor: preset.primary
                }} />
                    <div className="w-3 h-3 rounded-full border border-border" style={{
                  backgroundColor: preset.secondary
                }} />
                    <div className="w-2 h-2 rounded-full border border-border" style={{
                  backgroundColor: preset.accent
                }} />
                  </div>
                  <p className="text-[10px] text-foreground font-medium">{preset.name}</p>
                </button>)}
            </div>
          </div>
        </div>

        <Separator />

        {/* Typography */}
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Type className="w-4 h-4" />
            Typography
          </h4>

          <div className="space-y-3">
            <FontSelector label="Heading Font" value={typography.headingFont} onChange={value => onTypographyChange({
            headingFont: value
          })} fonts={FONT_OPTIONS} />

            <FontSelector label="Body Font" value={typography.bodyFont} onChange={value => onTypographyChange({
            bodyFont: value
          })} fonts={FONT_OPTIONS} />
          </div>

          {/* Font Pairing Presets */}
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">Font Pairing Presets</p>
            <div className="space-y-2">
              <button onClick={() => onTypographyChange({
              headingFont: "Inter, sans-serif",
              bodyFont: "Inter, sans-serif"
            })} className="w-full p-2 rounded-lg border border-border hover:border-muted-foreground transition-all text-left">
                <p className="text-xs font-semibold text-foreground" style={{
                fontFamily: "Inter, sans-serif"
              }}>
                  Modern Professional
                </p>
                <p className="text-[10px] text-muted-foreground">Inter + Inter</p>
              </button>

              <button onClick={() => onTypographyChange({
              headingFont: "Playfair Display, serif",
              bodyFont: "Lora, serif"
            })} className="w-full p-2 rounded-lg border border-border hover:border-muted-foreground transition-all text-left">
                <p className="text-xs font-semibold text-foreground" style={{
                fontFamily: "Playfair Display, serif"
              }}>
                  Editorial Elegant
                </p>
                <p className="text-[10px] text-muted-foreground">Playfair + Lora</p>
              </button>

              <button onClick={() => onTypographyChange({
              headingFont: "Montserrat, sans-serif",
              bodyFont: "Open Sans, sans-serif"
            })} className="w-full p-2 rounded-lg border border-border hover:border-muted-foreground transition-all text-left">
                <p className="text-xs font-semibold text-foreground" style={{
                fontFamily: "Montserrat, sans-serif"
              }}>
                  Tech Bold
                </p>
                <p className="text-[10px] text-muted-foreground">Montserrat + Open Sans</p>
              </button>

              <button onClick={() => onTypographyChange({
              headingFont: "Poppins, sans-serif",
              bodyFont: "Roboto, sans-serif"
            })} className="w-full p-2 rounded-lg border border-border hover:border-muted-foreground transition-all text-left">
                <p className="text-xs font-semibold text-foreground" style={{
                fontFamily: "Poppins, sans-serif"
              }}>
                  Clean Minimal
                </p>
                <p className="text-[10px] text-muted-foreground">Poppins + Roboto</p>
              </button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Template Selector */}
        <div>
          

          <Button variant="outline" size="sm" className="w-full" onClick={onSaveAsCustomTemplate}>
            <FileImage className="w-4 h-4 mr-2" />
            Save as Custom Template
          </Button>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="default" size="sm" className="w-full" onClick={() => console.log("Apply design")}>
            Apply Design
          </Button>
          <Button variant="outline" size="sm" className="w-full" onClick={() => console.log("Reset to default")}>
            Reset to Default
          </Button>
        </div>
      </div>
    </ScrollArea>;
};