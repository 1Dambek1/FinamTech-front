"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  DollarSign,
  Target,
  Brain,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const portfolioData = [
  {
    id: 1,
    asset: "Bitcoin",
    symbol: "BTC",
    amount: 0.5,
    avgPrice: 42000,
    currentPrice: 46200,
    invested: 21000,
    currentValue: 23100,
    change: 10.0,
    prediction: "bullish",
    newsImpact: "positive",
  },
  {
    id: 2,
    asset: "Ethereum",
    symbol: "ETH",
    amount: 8,
    avgPrice: 2800,
    currentPrice: 3400,
    invested: 22400,
    currentValue: 27200,
    change: 21.4,
    prediction: "bullish",
    newsImpact: "positive",
  },
  {
    id: 3,
    asset: "Tesla",
    symbol: "TSLA",
    amount: 50,
    avgPrice: 220,
    currentPrice: 195,
    invested: 11000,
    currentValue: 9750,
    change: -11.4,
    prediction: "neutral",
    newsImpact: "mixed",
  },
];

const predictionData = [
  { time: "Now", btc: 46200, eth: 3400, tsla: 195 },
  { time: "1W", btc: 48500, eth: 3600, tsla: 205 },
  { time: "1M", btc: 52000, eth: 3800, tsla: 220 },
  { time: "3M", btc: 58000, eth: 4200, tsla: 240 },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

export function PortfolioTracker() {
  const [portfolio, setPortfolio] = useState(portfolioData);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAsset, setNewAsset] = useState({
    asset: "",
    amount: "",
    price: "",
  });

  const totalInvested = portfolio.reduce((sum, item) => sum + item.invested, 0);
  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.currentValue,
    0
  );
  const totalChange = ((totalValue - totalInvested) / totalInvested) * 100;

  const pieData = portfolio.map((item) => ({
    name: item.symbol,
    value: item.currentValue,
    color: COLORS[portfolio.indexOf(item) % COLORS.length],
  }));

  const addAsset = () => {
    if (newAsset.asset && newAsset.amount && newAsset.price) {
      const amount = Number.parseFloat(newAsset.amount);
      const price = Number.parseFloat(newAsset.price);
      const newItem = {
        id: Date.now(),
        asset: newAsset.asset,
        symbol: newAsset.asset.toUpperCase(),
        amount,
        avgPrice: price,
        currentPrice: price,
        invested: amount * price,
        currentValue: amount * price,
        change: 0,
        prediction: "neutral",
        newsImpact: "neutral",
      };
      setPortfolio([...portfolio, newItem]);
      setNewAsset({ asset: "", amount: "", price: "" });
      setShowAddDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Portfolio Tracker
          </h2>
          <p className="text-muted-foreground">
            Track investments and get AI-powered predictions
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Investment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Investment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="asset">Asset Name</Label>
                <Input
                  id="asset"
                  placeholder="e.g., Bitcoin, Apple, Tesla"
                  value={newAsset.asset}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, asset: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount/Shares</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.5"
                  value={newAsset.amount}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, amount: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="price">Average Purchase Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="42000"
                  value={newAsset.price}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, price: e.target.value })
                  }
                />
              </div>
              <Button onClick={addAsset} className="w-full">
                Add to Portfolio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                ${totalInvested.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                ${totalValue.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {totalChange > 0 ? (
                <TrendingUp className="w-5 h-5 text-primary" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
              <span
                className={`text-2xl font-bold ${
                  totalChange > 0 ? "text-primary" : "text-destructive"
                }`}
              >
                {totalChange > 0 ? "+" : ""}
                {totalChange.toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
            <CardDescription>Distribution of your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [
                      `$${value.toLocaleString()}`,
                      "Value",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Price Predictions
            </CardTitle>
            <CardDescription>
              Based on news analysis and market trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictionData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="btc"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="eth"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="tsla"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
          <CardDescription>
            Detailed view of each investment with AI insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-semibold">{item.asset}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.amount} {item.symbol}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold">
                      ${item.currentValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg: ${item.avgPrice.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-semibold ${
                        item.change > 0 ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${(item.currentValue - item.invested).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.prediction === "bullish" && (
                      <Badge
                        variant="default"
                        className="bg-primary/10 text-primary"
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Bullish
                      </Badge>
                    )}
                    {item.prediction === "neutral" && (
                      <Badge variant="outline">
                        <Target className="w-3 h-3 mr-1" />
                        Neutral
                      </Badge>
                    )}
                    {item.newsImpact === "positive" && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Positive News
                      </Badge>
                    )}
                    {item.newsImpact === "mixed" && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Mixed Signals
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
