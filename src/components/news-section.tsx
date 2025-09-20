"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RefreshCw,
  Sparkles,
  Clock,
  TrendingUp,
  TrendingDown,
  Copy,
  Share,
  Filter,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react";

const mockNews = [
  {
    id: 1,
    title: "Federal Reserve Signals Potential Rate Cut in Q2 2024",
    summary:
      "The Federal Reserve hints at possible interest rate reductions following recent inflation data showing a cooling trend in consumer prices.",
    fullContent:
      "Federal Reserve Chairman Jerome Powell indicated during today's press conference that the central bank is considering a potential interest rate reduction in the second quarter of 2024. This comes after the latest Consumer Price Index data showed inflation cooling to 3.2%, down from the previous month's 3.7%. The decision would mark the first rate cut since the aggressive tightening cycle began in 2022.",
    category: "Monetary Policy",
    tags: [
      "Federal Reserve",
      "Interest Rates",
      "Inflation",
      "Jerome Powell",
      "CPI",
    ],
    timestamp: "2 hours ago",
    sentiment: "positive",
    source: "Reuters",
    author: "Sarah Johnson",
    readTime: "3 min read",
    views: 1247,
    likes: 89,
    comments: 23,
    impact: "high",
    region: "US",
  },
  {
    id: 2,
    title: "Tech Stocks Rally as AI Investment Surge Continues",
    summary:
      "Major technology companies see significant gains as artificial intelligence investments drive market optimism and quarterly earnings exceed expectations.",
    fullContent:
      "Technology stocks experienced their strongest rally in months as investors poured capital into AI-focused companies. NVIDIA led the charge with a 7.2% gain, followed by Microsoft and Google parent Alphabet. The surge comes amid reports of increased enterprise AI adoption and stronger-than-expected quarterly earnings from major tech players.",
    category: "Technology",
    tags: ["AI", "Tech Stocks", "NVIDIA", "Microsoft", "Earnings"],
    timestamp: "4 hours ago",
    sentiment: "positive",
    source: "Bloomberg",
    author: "Michael Chen",
    readTime: "4 min read",
    views: 2156,
    likes: 156,
    comments: 45,
    impact: "medium",
    region: "Global",
  },
  {
    id: 3,
    title: "Oil Prices Decline Amid Global Supply Concerns",
    summary:
      "Crude oil futures drop 3% as geopolitical tensions ease and supply chain disruptions show signs of improvement across major producing regions.",
    fullContent:
      "West Texas Intermediate crude fell to $78.50 per barrel, marking a 3.2% decline as global supply concerns begin to ease. The drop follows reports of improved production capacity in key oil-producing regions and reduced geopolitical tensions in the Middle East. Energy analysts predict continued volatility as OPEC+ prepares for their next production decision meeting.",
    category: "Commodities",
    tags: ["Oil", "WTI", "OPEC", "Energy", "Commodities"],
    timestamp: "6 hours ago",
    sentiment: "negative",
    source: "Financial Times",
    author: "David Rodriguez",
    readTime: "2 min read",
    views: 892,
    likes: 34,
    comments: 12,
    impact: "medium",
    region: "Global",
  },
];

const categories = [
  "All",
  "Monetary Policy",
  "Technology",
  "Commodities",
  "Stocks",
  "Crypto",
];
const impacts = ["All", "High", "Medium", "Low"];

export function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImpact, setSelectedImpact] = useState("All");
  const [expandedNews, setExpandedNews] = useState<number | null>(null);

  const filteredNews = mockNews.filter((news) => {
    const categoryMatch =
      selectedCategory === "All" || news.category === selectedCategory;
    const impactMatch =
      selectedImpact === "All" ||
      news.impact.toLowerCase() === selectedImpact.toLowerCase();
    return categoryMatch && impactMatch;
  });

  const handleSummarize = async (newsItem: (typeof mockNews)[0]) => {
    setSelectedNews(newsItem.id);
    setIsGenerating(true);

    setTimeout(() => {
      setSummary(
        `AI Summary: ${newsItem.summary} This development could significantly impact market sentiment and investor confidence in the coming weeks. Key factors to watch include policy implementation timeline and market reaction patterns. Market implications suggest potential volatility in related sectors.`
      );
      setIsGenerating(false);
    }, 2000);
  };

  const getImpactColor = (impact: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return colors[impact as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Financial News Feed
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay updated with detailed market insights and analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 hover:bg-lime-50 hover:border-lime-200 dark:hover:bg-lime-950 bg-transparent"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Feed
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedImpact} onValueChange={setSelectedImpact}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Impact Level" />
          </SelectTrigger>
          <SelectContent>
            {impacts.map((impact) => (
              <SelectItem key={impact} value={impact}>
                {impact}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredNews.map((news, index) => (
          <Card
            key={news.id}
            className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-r from-card to-card/80 ${
              index === 0 ? "ring-2 ring-primary/20" : ""
            }`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <CardTitle className="text-xl leading-tight text-foreground group-hover:text-primary transition-colors">
                    {news.title}
                  </CardTitle>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{news.timestamp}</span>
                    </div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span className="font-medium">{news.author}</span>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>{news.readTime}</span>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span className="font-medium">{news.source}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getImpactColor(news.impact)}>
                    {news.impact.toUpperCase()} IMPACT
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {news.category}
                  </Badge>
                  {news.sentiment === "positive" ? (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium">Bullish</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-xs font-medium">Bearish</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed text-base">
                {expandedNews === news.id ? news.fullContent : news.summary}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{news.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{news.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{news.comments}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {news.region}
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setExpandedNews(expandedNews === news.id ? null : news.id)
                  }
                >
                  {expandedNews === news.id ? "Show Less" : "Read Full Article"}
                </Button>
                <Button
                  onClick={() => handleSummarize(news)}
                  disabled={isGenerating && selectedNews === news.id}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating && selectedNews === news.id
                    ? "Generating..."
                    : "AI Summarize"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {summary && (
        <Card className="border-2 border-lime-200 dark:border-lime-800 shadow-xl bg-gradient-to-br from-lime-50 to-white dark:from-lime-950 dark:to-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              AI Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="min-h-[140px] resize-none text-base leading-relaxed border-lime-200 dark:border-lime-800 focus:ring-lime-500"
              placeholder="AI summary will appear here..."
            />
            <div className="flex gap-3">
              <Button size="lg" className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex items-center gap-2 hover:bg-lime-50 dark:hover:bg-lime-950 bg-transparent"
              >
                <Share className="w-4 h-4" />
                Share to Telegram
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
