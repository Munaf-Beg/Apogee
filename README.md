# 🚀 Apogee Events App

A sleek, responsive mobile dashboard built with **React Native (Expo)** and **TypeScript** to manage and explore events for the Apogee fest.

---

## 📸 Dashboard Preview
<div align="center">
  <img src="./assets/dashboard-mockup.png" width="350" alt="Apogee App Dashboard">
  <p><i>The central hub for all Apogee fest activities.</i></p>
</div>

---

## ✨ Features
- **🎯 Live Search:** Instant filtering of events by name with zero lag.
- **🏷️ Category Chips:** Quick-filter events by category (Music, Tech, Dance, Misc).
- **📊 Dynamic Stats:** Automatically calculates the "Most Popular Category" based on real-time registration data.
- **🔥 Smart Sorting:** Toggle events by registration count to see what's trending.
- **🖱️ Interactive Cards:** Independent "Save" state for each event card with haptic-style visual feedback.
- **📱 Safe UI:** Fully optimized for modern devices with Notch and Safe Area handling.

---

## 📂 Project Structure
```text
app/
 ┗ 📂 (tabs)/          # Main dashboard and navigation screens
src/
 ┣ 📂 components/      # Reusable UI units like EventCard & CategoryChip
 ┣ 📂 data/            # Centralized event data store (JSON/Static)
 ┣ 📂 types/           # TypeScript interfaces (The blueprints of the app)
 ┗ 📂 assets/          # Images, Icons, and Custom Fonts
