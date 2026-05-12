# DartES - Darts Scoreboard

A Darts Scoreboard application built with **Next.js** and **Tailwind CSS**. Designed for local matches, detailed stat tracking, and professional broadcasting integration.

![Project Preview](https://i.imgur.com/XvfFsJZ.png)

---

## Features

### AI Opponents (NEW!)
- **Physics-Based Simulation:** Play against highly realistic bots that don't just rely on random numbers. Throws are simulated using 2D geometric physics and Gaussian scatter - meaning when a bot misses, it physically misses into adjacent beds.
- **Dynamic Difficulty Levels:** Configure bot skill from Level 1 (21 - 25 Avg) all the way up to Level 10 (91 - 100 Avg).
- **Pro-Level Targeting Logic:** Bots play like real humans. They actively avoid "Bogey" numbers, utilize smart 4-dart setup strategies when above 170, and follow prioritized checkout paths.
- **Interactive Visualizer:** Watch the bot's turn unfold in real-time on a dartboard that plots the exact physical landing coordinates of every dart.

### **Core Gameplay**
- **Complete Scoreboard:** Tracks scores for up to 5 players with standard 501/301 rules.
- **Sets & Legs:** Fully configurable match length (e.g., First to 3 Legs wins a Set).
- **Checkout Guide:** Intelligent checkout suggestions (e.g., `T20, T19, D12`) appear automatically when a finish is possible.
- **Smart Input:** Mobile-friendly numeric pad, bust detection, and an Undo/Delete system.

### **Stats & Data Persistence**
- **Live Statistics:** Tracks throw history, legs won, and sets won in real-time.
- **Excel Export:** Download detailed match reports (`.xlsx`) containing throw-by-throw data, leg logs, and player statistics.
- **Auto-Save:** The game state persists automatically to LocalStorage. Refresh the page or close the browser without losing your match progress.

### **Broadcast Mode (OBS Integration)**
- **Dedicated Overlay:** A clean, transparent `/broadcast` route designed for streaming software.
- **Real-Time Sync:** The overlay updates instantly as you score on the controller, with no server required.
- **OBS Dock Support:** Control the game directly inside OBS using Custom Browser Docks.
- **Chroma Key Ready:** Built-in "Green Screen" mode for compatibility with vMix, XSplit, and Window Capture workflows.

### **Customization**
- **Theme Engine:** Fully customizable color scheme.
- **Player Management:** Rename players, toggle active participants, and reorder on the fly.
- **Game Settings:** Adjust starting score and match format.
