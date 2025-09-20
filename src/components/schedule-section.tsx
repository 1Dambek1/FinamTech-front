"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  Clock,
  Bell,
  Plus,
  Trash2,
  MessageSquare,
  FileText,
  TrendingUp,
} from "lucide-react";

interface Schedule {
  id: number;
  name: string;
  time: string;
  days: string[];
  contentType: "news" | "posts" | "prices";
  topics: string[];
  enabled: boolean;
}

const daysOfWeek = [
  { id: "monday", label: "Monday", short: "Mon" },
  { id: "tuesday", label: "Tuesday", short: "Tue" },
  { id: "wednesday", label: "Wednesday", short: "Wed" },
  { id: "thursday", label: "Thursday", short: "Thu" },
  { id: "friday", label: "Friday", short: "Fri" },
  { id: "saturday", label: "Saturday", short: "Sat" },
  { id: "sunday", label: "Sunday", short: "Sun" },
];

const contentTypes = [
  {
    value: "news",
    label: "Latest News",
    icon: MessageSquare,
    description: "Get breaking financial news",
  },
  {
    value: "posts",
    label: "Generated Posts",
    icon: FileText,
    description: "AI-generated market analysis",
  },
  {
    value: "prices",
    label: "Price Updates",
    icon: TrendingUp,
    description: "Real-time price movements",
  },
];

export function ScheduleSection() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      name: "Morning Market Brief",
      time: "08:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      contentType: "news",
      topics: ["Market Open", "Overnight News"],
      enabled: true,
    },
    {
      id: 2,
      name: "Weekend Crypto Update",
      time: "18:00",
      days: ["saturday", "sunday"],
      contentType: "prices",
      topics: ["Bitcoin", "Ethereum", "DeFi"],
      enabled: false,
    },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    name: "",
    time: "",
    days: [] as string[],
    contentType: "" as "news" | "posts" | "prices" | "",
    topics: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSchedule = () => {
    if (
      !newSchedule.name ||
      !newSchedule.time ||
      !newSchedule.contentType ||
      newSchedule.days.length === 0
    )
      return;

    const schedule: Schedule = {
      id: Date.now(),
      name: newSchedule.name,
      time: newSchedule.time,
      days: newSchedule.days,
      contentType: newSchedule.contentType,
      topics: newSchedule.topics
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      enabled: true,
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      name: "",
      time: "",
      days: [],
      contentType: "",
      topics: "",
    });
    setShowAddForm(false);
  };

  const toggleSchedule = (id: number) => {
    setSchedules(
      schedules.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const deleteSchedule = (id: number) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const toggleDay = (day: string) => {
    setNewSchedule((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const getContentTypeIcon = (type: string) => {
    const contentType = contentTypes.find((ct) => ct.value === type);
    return contentType ? contentType.icon : MessageSquare;
  };

  const getContentTypeColor = (type: string) => {
    const colors = {
      news: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      posts:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      prices:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Telegram Notifications
          </h2>
          <p className="text-muted-foreground">
            Schedule when and what you receive in your messenger
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Schedule
        </Button>
      </div>

      {showAddForm && (
        <Card className="scale-in border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Create New Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="schedule-name">Schedule Name</Label>
              <Input
                id="schedule-name"
                placeholder="e.g., Morning Market Brief"
                value={newSchedule.name}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-3">
              <Label>Content Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card
                      key={type.value}
                      className={`cursor-pointer transition-all ${
                        newSchedule.contentType === type.value
                          ? "ring-2 ring-primary border-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setNewSchedule({
                          ...newSchedule,
                          contentType: type.value as any,
                        })
                      }
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {type.description}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Days of Week</Label>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="flex flex-col items-center">
                    <Checkbox
                      checked={newSchedule.days.includes(day.id)}
                      onCheckedChange={() => toggleDay(day.id)}
                    />
                    <span className="text-xs mt-1">{day.short}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-time">Time</Label>
              <Input
                id="schedule-time"
                type="time"
                value={newSchedule.time}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, time: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-topics">Topics (comma-separated)</Label>
              <Input
                id="schedule-topics"
                placeholder="e.g., Bitcoin, Stock Market, Federal Reserve"
                value={newSchedule.topics}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, topics: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddSchedule}>Create Schedule</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {schedules.map((schedule) => {
          const ContentIcon = getContentTypeIcon(schedule.contentType);
          return (
            <Card
              key={schedule.id}
              className={`slide-in ${
                schedule.enabled ? "ring-2 ring-primary/20" : "opacity-60"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 flex items-center gap-2">
                      <Bell
                        className={`w-4 h-4 ${
                          schedule.enabled
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      {schedule.name}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{schedule.time}</span>
                      </div>
                      <Badge
                        className={getContentTypeColor(schedule.contentType)}
                      >
                        <ContentIcon className="w-3 h-3 mr-1" />
                        {
                          contentTypes.find(
                            (ct) => ct.value === schedule.contentType
                          )?.label
                        }
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {schedule.days.map((dayId) => {
                        const day = daysOfWeek.find((d) => d.id === dayId);
                        return (
                          <Badge
                            key={dayId}
                            variant="outline"
                            className="text-xs"
                          >
                            {day?.short}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={schedule.enabled}
                      onCheckedChange={() => toggleSchedule(schedule.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSchedule(schedule.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {schedule.topics.map((topic, index) => (
                    <Badge key={index} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {schedules.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Schedules Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first notification schedule to get started
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Schedule
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
