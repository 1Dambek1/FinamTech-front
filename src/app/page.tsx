"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { NewsSection } from "@/components/news-section";
import { PostGenerator } from "@/components/post-generator";
import { ScheduleSection } from "@/components/schedule-section";
import { MarketOverview } from "@/components/market-overview";
import { PortfolioTracker } from "@/components/portfolio-tracker";
import { SettingsProvider } from "@/components/settings-provider";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-background">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="fade-in">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <MarketOverview />
                <div className="grid lg:grid-cols-2 gap-8">
                  <NewsSection compact />
                  <div className="space-y-6">
                    <PostGenerator compact />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "news" && <NewsSection />}
            {activeTab === "generate" && <PostGenerator />}
            {activeTab === "portfolio" && <PortfolioTracker />}
            {activeTab === "schedule" && <ScheduleSection />}
          </div>
        </main>
      </div>
    </SettingsProvider>
  );
}
