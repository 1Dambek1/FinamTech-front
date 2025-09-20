"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "./settings-provider";
import {
  TrendingUp,
  PenTool,
  Calendar,
  Moon,
  Sun,
  Zap,
  ZapOff,
  DollarSign,
  Wallet,
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { isDarkMode, animationsEnabled, toggleDarkMode, toggleAnimations } =
    useSettings();

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "news", label: "News Feed", icon: TrendingUp },
    { id: "generate", label: "Generate Post", icon: PenTool },
    { id: "portfolio", label: "Portfolio", icon: Wallet },
    { id: "schedule", label: "Schedule", icon: Calendar },
  ];

  return (
    <header className="border-b border-border/40 bg-card/95 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-xl animate-enabled:pulse-glow">
                <DollarSign className="w-6 h-6 text-primary-foreground font-bold" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
                FinanceBot Pro
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Premium AI Financial Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50">
              {animationsEnabled ? (
                <Zap className="w-4 h-4 text-lime-500" />
              ) : (
                <ZapOff className="w-4 h-4 text-muted-foreground" />
              )}
              <Switch
                checked={animationsEnabled}
                onCheckedChange={toggleAnimations}
                aria-label="Toggle animations"
                className="data-[state=checked]:bg-lime-500"
              />
            </div>

            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50">
              {isDarkMode ? (
                <Moon className="w-4 h-4 text-blue-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>

        <nav className="flex gap-2 p-1 bg-muted/30 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-background text-foreground shadow-sm border border-border/50"
                    : "hover:bg-background/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-lime-500" : ""}`}
                />
                <span className="text-sm">{tab.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
