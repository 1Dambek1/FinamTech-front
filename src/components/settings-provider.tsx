"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface SettingsContextType {
  isDarkMode: boolean;
  animationsEnabled: boolean;
  toggleDarkMode: () => void;
  toggleAnimations: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedAnimations = localStorage.getItem("animations") !== "false";

    setIsDarkMode(savedDarkMode);
    setAnimationsEnabled(savedAnimations);

    // Apply dark mode class
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }

    // Apply animations class
    if (savedAnimations) {
      document.documentElement.classList.add("animate-enabled");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleAnimations = () => {
    const newAnimations = !animationsEnabled;
    setAnimationsEnabled(newAnimations);
    localStorage.setItem("animations", newAnimations.toString());

    if (newAnimations) {
      document.documentElement.classList.add("animate-enabled");
    } else {
      document.documentElement.classList.remove("animate-enabled");
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        isDarkMode,
        animationsEnabled,
        toggleDarkMode,
        toggleAnimations,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
