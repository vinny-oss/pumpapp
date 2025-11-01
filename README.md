# 💪 PUMP APP - Gamified Fitness Tracker

A fun, gamified fitness tracking app that focuses on the 4 essential pillars of fitness:
- 💪 **Lift/Gym** - Physical exercise
- 💧 **Water/Hydration** - Stay hydrated
- 😴 **Sleep/Rest** - Quality rest and recovery
- 🍔 **Fuel/Nutrition** - Proper nutrition

## Features

- **Interactive Character** - Watch your character transform based on which pillars you complete!
- **16 Unique States** - The character displays differently for every combination of pillars
- **Streak Tracking** - Build daily streaks by completing all 4 pillars
- **Local Storage** - Your progress is automatically saved in your browser
- **Responsive Design** - Works great on desktop and mobile devices
- **Beautiful Animations** - Smooth transitions and celebrations when you complete pillars

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (usually http://localhost:5173)

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Track Your Pillars** - Click on each pillar card to mark it as complete
2. **Watch Your Character Grow** - The character gets bigger and more "pumped" as you complete more pillars
3. **Build Streaks** - Complete all 4 pillars daily to build your streak
4. **Reset if Needed** - Use the "Reset Today" button to start over

## How to Customize

### Changing Character Appearances

Edit `src/components/Character.tsx` and modify the `getCharacterEmoji()` function to change what the character looks like for different pillar combinations.

### Modifying Pillar Colors and Descriptions

In `src/App.tsx`, find the `pillars` array and customize:
- `title` - The pillar name
- `emoji` - The emoji displayed
- `description` - The description text
- `color` - The accent color (use hex codes)

### Adjusting Animations

CSS animations are located in:
- `src/components/Character.css` - Character animations
- `src/components/PillarCard.css` - Card animations
- `src/App.css` - Global app styles

### Adding New Features

The app architecture:
- `src/types.ts` - TypeScript interfaces and types
- `src/utils.ts` - Helper functions and local storage logic
- `src/App.tsx` - Main app component
- `src/components/` - Reusable components

## File Structure

```
pumpapp/
├── src/
│   ├── components/
│   │   ├── Character.tsx       # Character display with 16 states
│   │   ├── Character.css
│   │   ├── PillarCard.tsx      # Individual pillar tracking cards
│   │   ├── PillarCard.css
│   │   ├── Stats.tsx           # Streak statistics display
│   │   └── Stats.css
│   ├── types.ts                # TypeScript type definitions
│   ├── utils.ts                # Helper functions and logic
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Main app styles
│   ├── index.css               # Global styles
│   └── main.tsx                # App entry point
├── package.json
└── README.md
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations

## Data Storage

All data is stored in your browser's local storage under the key `pump_app_state`. This includes:
- Current pillar completion status
- Historical daily progress
- Current and best streaks

## Tips for Development

1. **Hot Reload** - The dev server automatically reloads when you save files
2. **TypeScript Errors** - Check the terminal for TypeScript errors
3. **Browser Console** - Open DevTools to see any runtime errors
4. **Local Storage** - Use DevTools > Application > Local Storage to view saved data

## Future Enhancement Ideas

- Add custom goals per pillar (e.g., "Drink 8 glasses of water")
- Implement charts to visualize progress over time
- Add achievements and badges
- Create different character themes
- Add social sharing features
- Implement reminders/notifications

## License

Feel free to use and modify this project for personal or commercial use!

---

Built with ❤️ for the fitness community!
