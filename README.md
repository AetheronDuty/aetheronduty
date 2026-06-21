A comprehensive competitive gaming platform built with modern web technologies, featuring player profiles, tournaments, battle passes, marketplace integration, and blockchain wallet support.

## 🎮 Project Overview

Aetheron is a full-featured gaming platform that provides players with:
- **Player Progression System**: XP-based leveling, rank tiers (Bronze to Grandmaster), and comprehensive statistics
- **Tournament Hub**: Competitive tournaments with bracket management, prize pools, and live match tracking
- **Battle Pass**: Seasonal progression system with free and premium reward tiers
- **Marketplace**: In-game item trading with ATP and XLM currency support
- **Wallet Integration**: Blockchain wallet support (Freighter, Albedo, Rabet) for ATP and XLM transactions
- **Social Features**: Friends system, clan management, and leaderboards
- **Match Analytics**: Detailed match history, weapon statistics, and performance metrics

## 🏗️ Architecture

### Tech Stack

- **Frontend Framework**: React 19.2.0 with TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4 for fast development and optimized builds
- **Styling**: Tailwind CSS 3.4.19 with shadcn/ui component library
- **Routing**: React Router 7.18.0 for client-side navigation
- **Animations**: Framer Motion 12.40.0 for smooth page transitions
- **Forms**: React Hook Form 7.70.0 with Zod 4.3.5 validation
- **Charts**: Recharts 2.15.4 for data visualization
- **Icons**: Lucide React 0.562.0
- **Theme**: next-themes 0.4.6 for dark/light mode support

### Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout wrapper with sidebar/navbar
│   ├── Navbar.tsx          # Top navigation bar
│   ├── Sidebar.tsx         # Collapsible sidebar navigation
│   ├── ToastContainer.tsx  # Toast notification system
│   └── ui/                 # 40+ shadcn/ui components
├── hooks/
│   └── useApp.tsx          # Global app state management (Context API)
├── pages/
│   ├── LandingPage.tsx     # Public landing page
│   ├── AuthPage.tsx        # Authentication (login/register)
│   ├── DashboardPage.tsx   # Main player dashboard
│   ├── ProfilePage.tsx     # Player profile and stats
│   ├── LeaderboardPage.tsx # Global rankings
│   ├── BattlePassPage.tsx  # Seasonal battle pass
│   ├── TournamentHubPage.tsx # Tournament management
│   ├── WalletPage.tsx      # Wallet and transactions
│   ├── MarketplacePage.tsx # Item marketplace
│   ├── FriendsPage.tsx     # Social features
│   └── AdminDashboard.tsx  # Admin panel
├── types/
│   └── index.ts            # TypeScript type definitions
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
├── App.tsx                 # Root component with routing
├── main.tsx                # Application entry point
├── App.css                 # App-specific styles
└── index.css               # Global styles and Tailwind directives
```

### Core Systems

#### 1. State Management
- **Context API**: Global app state managed through `useApp` hook
- **State includes**: Authentication status, user data, sidebar state, notifications, toasts
- **No external state management**: Lightweight approach using React Context

#### 2. Routing
- **React Router**: Client-side routing with animated transitions
- **Protected Routes**: Layout wrapper for authenticated pages
- **Page Transitions**: Framer Motion animations for smooth navigation

#### 3. Type System
Comprehensive TypeScript definitions for:
- Player profiles and statistics
- Match history and game modes
- Tournament brackets and formats
- Battle pass tiers and rewards
- Wallet transactions and currencies
- Marketplace items and inventory
- Clan management and friendships
- Achievements and missions

#### 4. Component Architecture
- **shadcn/ui**: 40+ pre-built UI components with Radix UI primitives
- **Custom Components**: Layout, navigation, and feature-specific components
- **Reusability**: Consistent design system with variant-based styling

### Key Features

#### Player System
- **Rank Tiers**: Bronze, Silver, Gold, Platinum, Diamond, Master, Grandmaster
- **Statistics**: K/D ratio, win rate, match history, weapon accuracy
- **Progression**: XP-based leveling with tier advancement
- **Status Tracking**: Online, in-game, away, offline status

#### Tournament System
- **Formats**: Single elimination, double elimination, round-robin
- **Prize Pools**: USD, XLM, or ATP currency support
- **Entry Fees**: ATP, XLM, or free entry options
- **Live Brackets**: Real-time match tracking and results
- **Regional Support**: Location-based tournament organization

#### Battle Pass
- **Seasonal Content**: Rotating seasons with unique themes
- **Dual Tracks**: Free and premium reward paths
- **Reward Types**: Skins, operators, weapons, emotes, charms, currency, XP boosts
- **Rarity System**: Common, Rare, Epic, Legendary items

#### Wallet Integration
- **Supported Wallets**: Freighter, Albedo, Rabet
- **Currencies**: ATP (platform token), XLM (Stellar), USD
- **Transaction Types**: Match rewards, conversions, tournament prizes, withdrawals, deposits, purchases
- **Real-time Balance**: Live balance updates and transaction history

#### Marketplace
- **Item Categories**: Skins, operators, weapons, emotes, bundles
- **Currency Support**: ATP and XLM pricing
- **Inventory Management**: Owned, equipped, and wishlisted items
- **Dynamic Pricing**: Original prices and discounts

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development

The development server runs on `http://localhost:5173` by default with hot module replacement enabled.

## 📦 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Design System

### Theme Configuration
- **Dark Mode**: Default theme with void background
- **Color Palette**: Custom Tailwind theme with gaming-focused colors
- **Typography**: Modern sans-serif fonts with clear hierarchy
- **Spacing**: Consistent spacing scale for layout consistency

### Component Library
The project uses shadcn/ui components built on Radix UI primitives:
- **Accessibility**: WCAG compliant components
- **Customization**: Tailwind CSS-based styling
- **Type Safety**: Full TypeScript support
- **Animation**: Smooth transitions and micro-interactions

## 🔧 Configuration Files

- `vite.config.ts` - Vite build and dev server configuration
- `tailwind.config.js` - Tailwind CSS theme and plugin configuration
- `tsconfig.json` - TypeScript compiler configuration
- `eslint.config.js` - ESLint linting rules
- `postcss.config.js` - PostCSS processing configuration
- `components.json` - shadcn/ui component configuration

## 🌐 Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📝 License

Private project - All rights reserved

## 🤝 Contributing

This is a private project. For questions or support, please contact the development team.
