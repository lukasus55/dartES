"use client"

import { z } from "zod";

// Using zod to update on runtime
export const PlayerSchema = z.object({
  id: z.number(),
  name: z.string(),
  isEnabled: z.boolean(),
});

export const ConfigSchema = z.object({
  theme: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    highlight: z.string(),
    greenScreen: z.string(),
  }),
  startingScore: z.number(),
  legsToWinSet: z.number(),
  players: z.array(PlayerSchema),
});

export type Player = z.infer<typeof PlayerSchema>;
export type Config = z.infer<typeof ConfigSchema>;

export const DEFAULT_THEME = {
  primary: "#F3EFF5",
  secondary: "#6A7282",
  accent: "#72B01D",
  highlight: "#0F131B",
  greenScreen: "#0F0",
};

export const DEFAULT_SETTINGS = {
  startingScore: 501,
  legsToWinSet: 3,
};

export const DEFAULT_PLAYERS: Player[] = [
  { id: 1, name: "PLAYER 1", isEnabled: true },
  { id: 2, name: "PLAYER 2", isEnabled: true },
  { id: 3, name: "PLAYER 3", isEnabled: false },
  { id: 4, name: "PLAYER 4", isEnabled: false },
  { id: 5, name: "PLAYER 5", isEnabled: false },
];

export const DEFAULT_CONFIG: Config = {
  theme: {
    primary: DEFAULT_THEME.primary,
    secondary: DEFAULT_THEME.secondary,
    accent: DEFAULT_THEME.accent,
    highlight: DEFAULT_THEME.highlight,
    greenScreen: DEFAULT_THEME.greenScreen,
  },
  startingScore: DEFAULT_SETTINGS.startingScore,
  legsToWinSet: DEFAULT_SETTINGS.legsToWinSet,
  players: DEFAULT_PLAYERS,
};

const STORAGE_KEY = "dartES_config";

export function getConfig(): Config {
  const savedData = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  
  if (!savedData) return DEFAULT_CONFIG;

  try {
    const parsedData = JSON.parse(savedData);
    
    const result = ConfigSchema.safeParse(parsedData);

    if (result.success) {
      return result.data;
    } else {
      console.warn("Invalid config found, falling back to defaults:", result.error.format());
      return DEFAULT_CONFIG;
    }
  } catch (error) {
    console.error("Failed to parse config string, falling back to defaults.");
    return DEFAULT_CONFIG;
  }
}

export function saveSettings({startingScore, legsToWinSet} : {startingScore:number, legsToWinSet:number}) {
  const savedConfig: Config = getConfig();

  const newConfig: Config = {
    ...savedConfig,
    startingScore: startingScore,
    legsToWinSet: legsToWinSet,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  window.dispatchEvent(new Event("storage"));
}

interface SaveColorProps {
  primary: string,
  secondary: string,
  accent: string,
  highlight: string,
  greenScreen: string
}

export function saveTheme({primary, secondary, accent, highlight, greenScreen} : SaveColorProps) {
  const savedConfig: Config = getConfig();

  const newConfig: Config = {
    ...savedConfig,
    theme: {
      primary: primary,
      secondary: secondary,
      accent: accent,
      highlight: highlight,
      greenScreen: greenScreen
    }
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  window.dispatchEvent(new Event("storage"));
}