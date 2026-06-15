# WRD - Wardrobe Digital (Frontend) 👗👖

Welcome to the frontend application for **WRD**, a universal mobile and web wardrobe management platform built using Expo and React Native.

This codebase is a clean, optimized, and backend-ready repository separated from the design mockup HTML templates.

---

## 🛠️ Project Architecture

```
WRD_Frontend/
├── assets/              # App images, logos, and static assets
├── constants/           # Styling theme (theme.ts) and static data fallback (data.ts)
├── src/
│   ├── app/             # File-based routing (Expo Router)
│   │   ├── (tabs)/      # Bottom tab navigation (Dashboard, Closet, boards, style planner)
│   │   ├── _layout.tsx  # Root navigation layout
│   │   ├── profile.tsx  # User profile screen
│   │   ├── thari-ai.tsx # Tinder-style swipe outfit builder
│   │   └── outfit-builder.tsx # Interactive canvas builder
│   └── services/
│       └── api.ts       # Unified API client layer with local mock fallback
├── .env.example         # Template for environment configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies & scripts
```

---

## ⚡ Integration with Backend

The application is structured to dynamically integrate with a backend API using the client service layer in `src/services/api.ts`.

### How it works:
1. If the environment variable `EXPO_PUBLIC_API_URL` is set, the app will make HTTP requests to the backend endpoints (e.g. `GET /closet-items`, `GET /profile`).
2. If `EXPO_PUBLIC_API_URL` is not set or the backend requests fail, the application gracefully falls back to the rich static mock data in `constants/data.ts` to keep the UI fully functional.

### Configuration:
1. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set `EXPO_PUBLIC_API_URL` to your backend's API endpoint:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:3000/api
   ```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
To run the server locally:
```bash
npx expo start
```

Press key shortcuts in your terminal to open on different platforms:
- **`w`** to open in the **Web Browser**
- **`a`** to open in an **Android Emulator**
- **`i`** to open in an **iOS Simulator** (macOS only)

---

## 📤 Push to GitHub

To push only this optimized frontend code to a new standalone GitHub repository:

1. Initialize a new git repository in the `WRD_Frontend` directory (if not already done):
   ```bash
   git init
   ```
2. Add your files and commit:
   ```bash
   git add .
   git commit -m "Initial commit of optimized WRD frontend"
   ```
3. Link the repository to your remote GitHub repo and push:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```
