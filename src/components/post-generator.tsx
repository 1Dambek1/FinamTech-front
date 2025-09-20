"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Copy,
  Send,
  Wand2,
  RotateCcw,
  Zap,
  Eye,
  BookOpen,
  TrendingUp,
  MessageSquare,
  DollarSign,
  Upload,
  Save,
  Trash2,
  Heart,
} from "lucide-react";

const toneOptions = [
  {
    value: "professional",
    label: "📊 Professional",
    description: "Formal, data-driven analysis",
  },
  {
    value: "casual",
    label: "💬 Casual",
    description: "Friendly, conversational tone",
  },
  {
    value: "analytical",
    label: "🔍 Analytical",
    description: "Deep technical analysis",
  },
  {
    value: "optimistic",
    label: "🚀 Optimistic",
    description: "Bullish, growth-focused",
  },
  {
    value: "cautious",
    label: "⚠️ Cautious",
    description: "Risk-aware, balanced view",
  },
  {
    value: "educational",
    label: "🎓 Educational",
    description: "Teaching and explaining concepts",
  },
];

const lengthOptions = [
  {
    value: "tweet",
    label: "🐦 Tweet Style",
    description: "Short & punchy (280 chars)",
    chars: "~280",
  },
  {
    value: "short",
    label: "📝 Short Post",
    description: "Quick insights (1-2 paragraphs)",
    chars: "~500",
  },
  {
    value: "medium",
    label: "📄 Medium Post",
    description: "Detailed analysis (3-4 paragraphs)",
    chars: "~1000",
  },
  {
    value: "long",
    label: "📚 Long Form",
    description: "Comprehensive breakdown (5+ paragraphs)",
    chars: "~2000",
  },
];

const postTypes = [
  { value: "analysis", label: "📊 Market Analysis", icon: TrendingUp },
  { value: "news", label: "📰 News Commentary", icon: MessageSquare },
  { value: "educational", label: "🎓 Educational", icon: BookOpen },
  { value: "prediction", label: "🔮 Market Prediction", icon: Eye },
  { value: "alert", label: "🚨 Trading Alert", icon: DollarSign },
];

interface SavedPost {
  id: string;
  content: string;
  topic: string;
  tone: string;
  length: string;
  postType: string;
  createdAt: Date;
}

export function PostGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
  const [postType, setPostType] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userExample, setUserExample] = useState("");
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const selectedTone = toneOptions.find((t) => t.value === tone);
      const selectedLength = lengthOptions.find((l) => l.value === length);
      const selectedType = postTypes.find((p) => p.value === postType);

      let samplePost = "";

      if (userExample.trim()) {
        samplePost = `🚀 ${topic.toUpperCase()} UPDATE\n\n[Generated based on your example style]\n\n${userExample.substring(
          0,
          200
        )}...\n\n📊 Key Points:\n• Market momentum building\n• Strong fundamentals\n• Growing institutional interest\n\n💡 Analysis: Following the style of your example, ${topic} shows promising indicators for continued growth.\n\n#${topic.replace(
          /\s+/g,
          ""
        )} #Finance #Investment`;
      } else {
        if (postType === "analysis") {
          samplePost = `📊 ${topic.toUpperCase()} MARKET ANALYSIS\n\nLatest market analysis shows interesting developments in ${topic}...\n\n🔍 Key Metrics:\n• Price Action: Strong momentum building\n• Volume: 23% above average\n• Sentiment: Bullish across major indicators\n\n💡 Takeaway: ${topic} is showing signs of sustained growth with institutional backing increasing by 15% this quarter.\n\n⚠️ Risk Level: Moderate - Consider position sizing\n\n#${topic.replace(
            /\s+/g,
            ""
          )} #MarketAnalysis #Trading`;
        } else if (postType === "news") {
          samplePost = `🚨 BREAKING: ${topic.toUpperCase()} UPDATE\n\nLatest developments in ${topic} are creating significant market movements. Here's what happened:\n\n📈 Impact Summary:\n• Immediate price reaction: +5.2%\n• Market cap increase: $2.1B\n• Trading volume surge: 340%\n\n🎯 What This Means:\nThis development could reshape the ${topic} landscape for the coming months. Early indicators suggest sustained momentum.\n\n💭 Your thoughts? Drop them below!\n\n#Breaking #${topic.replace(
            /\s+/g,
            ""
          )} #FinanceNews`;
        } else {
          samplePost = `🚀 ${topic.toUpperCase()} INSIGHTS\n\nHere's what you need to know about the latest developments in ${topic}...\n\n📊 Current Status:\n• Market sentiment: Positive\n• Technical outlook: Bullish\n• Fundamental strength: Growing\n\n💡 Key Takeaway: ${topic} continues to show promise with strong fundamentals and growing adoption.\n\n#${topic.replace(
            /\s+/g,
            ""
          )} #Investment #Finance`;
        }
      }

      if (length === "tweet") {
        samplePost = `🚀 ${topic} update: Strong momentum building with positive indicators 📈 #${topic.replace(
          /\s+/g,
          ""
        )}`;
      } else if (length === "long") {
        samplePost += `\n\n📚 Deep Dive:\nThe underlying fundamentals of ${topic} have been strengthening over the past quarter. Institutional adoption rates have increased by 25%, while retail interest remains consistently high.\n\n🔮 Looking Ahead:\nBased on current trends and market dynamics, we could see continued growth in this sector. However, investors should remain vigilant about potential volatility.\n\n📊 Technical Analysis:\nKey support levels are holding strong, with resistance at previous highs being tested. Volume patterns suggest accumulation by smart money.\n\n💼 Investment Thesis:\nFor long-term investors, this presents an interesting opportunity to gain exposure to a growing sector with strong fundamentals and increasing adoption.`;
      }

      setGeneratedPost(samplePost);
      setIsGenerating(false);
    }, 2500);
  };

  const savePost = () => {
    if (!generatedPost.trim()) return;

    const newPost: SavedPost = {
      id: Date.now().toString(),
      content: generatedPost,
      topic,
      tone,
      length,
      postType,
      createdAt: new Date(),
    };

    setSavedPosts((prev) => [newPost, ...prev]);
  };

  const deletePost = (id: string) => {
    setSavedPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const copyToClipboard = (text: string = generatedPost) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          AI Post Generator
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          Create engaging financial content with advanced customization
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create" className="text-sm sm:text-base">
            Create Post
          </TabsTrigger>
          <TabsTrigger value="saved" className="text-sm sm:text-base">
            Saved Posts ({savedPosts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4 sm:space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="mobile-card">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Wand2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Post Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 mobile-card">
              <div className="space-y-3">
                <Label
                  htmlFor="topic"
                  className="text-sm sm:text-base font-medium"
                >
                  Topic or Keywords
                </Label>
                <Input
                  id="topic"
                  placeholder="e.g., Bitcoin, Federal Reserve, Stock Market, Tesla Earnings..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-10 sm:h-12 text-sm sm:text-base border-primary/20 focus:ring-primary"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm sm:text-base font-medium">
                  Post Type
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                  {postTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Card
                        key={type.value}
                        className={`cursor-pointer transition-all ${
                          postType === type.value
                            ? "ring-2 ring-primary border-primary"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => setPostType(type.value)}
                      >
                        <CardContent className="p-2 sm:p-3 text-center">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary" />
                          <div className="text-xs font-medium mobile-text">
                            {type.label}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="tone"
                    className="text-sm sm:text-base font-medium"
                  >
                    Tone & Style
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="h-10 sm:h-12 border-primary/20">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="text-sm sm:text-base">
                              {option.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {option.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="length"
                    className="text-sm sm:text-base font-medium"
                  >
                    Post Length
                  </Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="h-10 sm:h-12 border-primary/20">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm sm:text-base">
                                {option.label}
                              </span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {option.chars}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {option.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="userExample"
                  className="text-sm sm:text-base font-medium flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Your Example Post (Optional)
                </Label>
                <Textarea
                  id="userExample"
                  placeholder="Paste an example of your preferred writing style here. The AI will analyze and generate similar content..."
                  value={userExample}
                  onChange={(e) => setUserExample(e.target.value)}
                  className="min-h-[100px] sm:min-h-[120px] border-primary/20 focus:ring-primary text-sm sm:text-base"
                />
                <div className="text-xs text-muted-foreground">
                  💡 Tip: Provide an example of your preferred tone, structure,
                  or style for more personalized results
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={
                  !topic.trim() || !tone || !length || !postType || isGenerating
                }
                size="lg"
                className="w-full h-12 sm:h-14 text-sm sm:text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" />
                    Generating Post...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Generate Post
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedPosts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No saved posts yet</h3>
                <p className="text-muted-foreground">
                  Generate and save posts to see them here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {savedPosts.map((post) => (
                <Card key={post.id} className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-base sm:text-lg">
                          {post.topic}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {
                              toneOptions.find((t) => t.value === post.tone)
                                ?.label
                            }
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {
                              lengthOptions.find((l) => l.value === post.length)
                                ?.label
                            }
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {
                              postTypes.find((p) => p.value === post.postType)
                                ?.label
                            }
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 mobile-stack">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(post.content)}
                          className="mobile-button"
                        >
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deletePost(post.id)}
                          className="text-destructive hover:text-destructive mobile-button"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg font-mono text-xs sm:text-sm max-h-32 overflow-y-auto">
                      {post.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Saved {post.createdAt.toLocaleDateString()} at{" "}
                      {post.createdAt.toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {generatedPost && (
        <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 to-white dark:from-primary/10 dark:to-card">
          <CardHeader className="mobile-card">
            <div className="flex items-center justify-between mobile-stack">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Generated Post
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary text-xs"
                >
                  AI Generated
                </Badge>
                <Badge variant="outline" className="border-primary/20 text-xs">
                  {generatedPost.length} chars
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 mobile-card">
            <Textarea
              value={generatedPost}
              onChange={(e) => setGeneratedPost(e.target.value)}
              className="min-h-[250px] sm:min-h-[320px] resize-none font-mono text-xs sm:text-sm leading-relaxed border-primary/20 focus:ring-primary"
              placeholder="Generated post will appear here..."
            />
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                onClick={() => copyToClipboard()}
                size="sm"
                className="mobile-button"
              >
                <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Copy
              </Button>
              <Button
                onClick={savePost}
                size="sm"
                variant="outline"
                className="hover:bg-primary/10 mobile-button bg-transparent"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-primary/10 mobile-button bg-transparent"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Share
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGenerate}
                className="mobile-button bg-transparent"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
