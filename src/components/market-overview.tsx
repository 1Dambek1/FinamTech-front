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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  Settings,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const marketData = [
  {
    time: "09:00",
    btc: 45000,
    eth: 3200,
    sp500: 4500,
    gold: 2040,
    oil: 78.5,
    eur: 1.08,
  },
  {
    time: "10:00",
    btc: 45200,
    eth: 3250,
    sp500: 4520,
    gold: 2042,
    oil: 79.2,
    eur: 1.082,
  },
  {
    time: "11:00",
    btc: 44800,
    eth: 3180,
    sp500: 4480,
    gold: 2038,
    oil: 78.8,
    eur: 1.079,
  },
  {
    time: "12:00",
    btc: 45500,
    eth: 3300,
    sp500: 4550,
    gold: 2045,
    oil: 79.5,
    eur: 1.085,
  },
  {
    time: "13:00",
    btc: 45800,
    eth: 3350,
    sp500: 4580,
    gold: 2048,
    oil: 80.1,
    eur: 1.087,
  },
  {
    time: "14:00",
    btc: 46200,
    eth: 3400,
    sp500: 4620,
    gold: 2050,
    oil: 80.8,
    eur: 1.089,
  },
];

const allAssets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 46200,
    change: 2.8,
    changeAmount: 1200,
    color: "text-orange-500",
    volume: "28.5B",
    marketCap: "906B",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3400,
    change: 6.25,
    changeAmount: 200,
    color: "text-blue-500",
    volume: "15.2B",
    marketCap: "408B",
  },
  {
    name: "S&P 500",
    symbol: "SPX",
    price: 4620,
    change: 1.2,
    changeAmount: 55,
    color: "text-purple-500",
    volume: "3.8B",
    marketCap: "N/A",
  },
  {
    name: "Gold",
    symbol: "GOLD",
    price: 2050,
    change: -0.8,
    changeAmount: -16,
    color: "text-yellow-500",
    volume: "2.1B",
    marketCap: "N/A",
  },
  {
    name: "Crude Oil",
    symbol: "OIL",
    price: 80.8,
    change: 3.2,
    changeAmount: 2.5,
    color: "text-green-600",
    volume: "1.9B",
    marketCap: "N/A",
  },
  {
    name: "EUR/USD",
    symbol: "EUR",
    price: 1.089,
    change: 0.9,
    changeAmount: 0.01,
    color: "text-indigo-500",
    volume: "180B",
    marketCap: "N/A",
  },
];

const generate24HourData = (symbol: string, basePrice: number) => {
  const data = [];
  let price = basePrice;
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0") + ":00";
    const change = (Math.random() - 0.5) * 0.05; // ±2.5% random change
    price = price * (1 + change);
    data.push({
      time: hour,
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  return data;
};

export function MarketOverview() {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([
    "BTC",
    "ETH",
    "SPX",
    "GOLD",
  ]);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [selectedAssetChart, setSelectedAssetChart] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const displayedAssets = allAssets.filter((asset) =>
    selectedAssets.includes(asset.symbol)
  );

  const toggleAsset = (symbol: string) => {
    setSelectedAssets((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  const openAssetChart = (asset: any) => {
    const data = generate24HourData(asset.symbol, asset.price);
    setChartData(data);
    setSelectedAssetChart(asset);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Market Overview
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Real-time financial data and trends
          </p>
        </div>
        <div className="flex items-center gap-3 mobile-stack">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm"
          >
            <Activity className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCustomizer(!showCustomizer)}
            className="flex items-center gap-2 mobile-button"
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Customize</span>
          </Button>
        </div>
      </div>

      {showCustomizer && (
        <Card className="border-primary/20">
          <CardHeader className="mobile-card">
            <CardTitle className="text-base sm:text-lg">
              Customize Dashboard
            </CardTitle>
            <CardDescription className="text-sm">
              Select which assets to display
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 mobile-card">
            <div>
              <span className="text-sm font-medium mb-3 block">
                Assets to Display
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allAssets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="flex items-center space-x-2"
                  >
                    <Switch
                      checked={selectedAssets.includes(asset.symbol)}
                      onCheckedChange={() => toggleAsset(asset.symbol)}
                    />
                    <span className="text-xs sm:text-sm">{asset.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mobile-grid">
        {displayedAssets.map((asset) => (
          <Card
            key={asset.symbol}
            className="hover:shadow-lg transition-all duration-300 border-border/50 mobile-card"
          >
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {asset.name}
                  </CardTitle>
                  <CardDescription
                    className={`text-sm sm:text-lg font-bold ${asset.color}`}
                  >
                    {asset.symbol}
                  </CardDescription>
                </div>
                {asset.change > 0 ? (
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                ) : (
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
                )}
              </div>
            </CardHeader>
            <CardContent className="mobile-compact">
              <div className="space-y-2">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  onClick={() => openAssetChart(asset)}
                >
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  <span className="text-base sm:text-xl font-bold text-foreground">
                    {asset.price.toLocaleString()}
                  </span>
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-primary ml-auto" />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      asset.change > 0 ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {asset.change > 0 ? "+" : ""}
                    {asset.change}%
                  </span>
                  <span
                    className={`text-xs ${
                      asset.change > 0 ? "text-primary" : "text-destructive"
                    }`}
                  >
                    ({asset.change > 0 ? "+" : ""}${asset.changeAmount})
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Volume: {asset.volume}</div>
                  {asset.marketCap !== "N/A" && (
                    <div>Market Cap: ${asset.marketCap}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedAssetChart}
        onOpenChange={() => setSelectedAssetChart(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-base sm:text-lg">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${selectedAssetChart?.color} bg-opacity-20`}
              >
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              {selectedAssetChart?.name} ({selectedAssetChart?.symbol}) - 24H
              Chart
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Current Price
                </div>
                <div className="text-sm sm:text-lg font-bold">
                  ${selectedAssetChart?.price?.toLocaleString()}
                </div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  24h Change
                </div>
                <div
                  className={`text-sm sm:text-lg font-bold ${
                    selectedAssetChart?.change > 0
                      ? "text-primary"
                      : "text-destructive"
                  }`}
                >
                  {selectedAssetChart?.change > 0 ? "+" : ""}
                  {selectedAssetChart?.change}%
                </div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Volume
                </div>
                <div className="text-sm sm:text-lg font-bold">
                  {selectedAssetChart?.volume}
                </div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Market Cap
                </div>
                <div className="text-sm sm:text-lg font-bold">
                  {selectedAssetChart?.marketCap}
                </div>
              </div>
            </div>

            <div className="h-64 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
