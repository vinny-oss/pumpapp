# 💪 Avatar Lab - Bodybuilding Character Creator

A single-page bodybuilding character creator powered by NanoBanana AI image generation. Design your ideal bodybuilding avatar with customizable features and see it come to life!

## ✨ Features

- **Character Customization**
  - Hair styles: Bald, Buzz cut, Short, Medium, Long, Afro, Mohawk, Ponytail
  - Glasses: None, Sunglasses, Round glasses, Square glasses, Sport shades
  - Facial hair: None, Stubble, Short beard, Full beard, Mustache, Goatee
  - Physical stats: Height (cm), Weight (lb), Body fat percentage

- **Fine-Tune Controls**
  - Quick +/- buttons to adjust weight and body fat
  - Keyboard arrow key support for rapid adjustments
  - Real-time preview of character build description

- **Video Game Aesthetic**
  - Dark room with subtle spotlight effect (Fortnite-style lobby)
  - Pulsing ambient lighting animation
  - HUD overlay with character stats
  - Clean, modern AI product UI (ChatGPT/Claude inspired)

- **Theme Support**
  - Light/dark mode toggle
  - Theme preference saved to browser localStorage
  - Smooth transitions with respect for `prefers-reduced-motion`

- **AI Integration Ready**
  - NanoBanana API integration stubbed and ready
  - Prompt preview shows exactly what will be sent to the API
  - Loading overlay during generation
  - Status badge shows when avatar is up-to-date vs needs regeneration

## 🚀 Getting Started

### Option 1: Open Directly (Recommended)

Simply open `index.html` in your web browser. That's it! No build tools, no dependencies, no installation required.

### Option 2: Local Development Server

If you prefer a local server for development:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: GitHub Pages

This app is deployed at: **https://vinny-oss.github.io/pumpapp/**

To enable GitHub Pages deployment:
1. Go to repository Settings → Pages
2. Set source to deploy from the `claude/fitness-ai-gamified-app-011CUgCQxNoRp7urg9MrcYUq` branch
3. Or merge this branch into `main` or `gh-pages` and deploy from there

## 🎮 How to Use

1. **Select Character Features**
   - Choose hair style, glasses, and facial hair from the dropdowns
   - Set height (140-220 cm), weight (100-400 lb), and body fat (5-40%)

2. **Fine-Tune Your Build**
   - Use the +/- buttons to quickly adjust weight and body fat
   - Or use arrow keys when focused on the input fields
   - Watch the build summary update in real-time

3. **Generate Your Avatar**
   - Review the prompt preview to see what will be sent to NanoBanana
   - Click "Generate Character" to create your avatar
   - Or click "Apply Changes" after fine-tuning to update

4. **Toggle Theme**
   - Click the theme toggle button in the top-right
   - Your preference is automatically saved

## 🔧 Technical Details

### Architecture

- **Single-file application**: Everything in `index.html` (26KB)
- **No build process required**: Vanilla JavaScript, CSS, HTML
- **No external dependencies**: Pure web standards
- **State management**: Simple global state object with dirty tracking
- **API integration**: Stubbed with clear TODO markers

### File Structure

```
pumpapp/
├── index.html          # Complete Avatar Lab application (only file needed)
├── README.md           # This file
└── .gitignore
```

### Key Functions

**State Management:**
```javascript
const state = {
  hairStyle, glasses, facialHair,
  height, weight, bodyFat,
  lastGenerated, isGenerating, isDirty
}
```

**NanoBanana Integration:**
```javascript
buildNanoBananaPrompt(state)  // Builds the prompt text
callNanoBanana(promptText)     // Calls the API (currently stubbed)
```

**UI Updates:**
```javascript
renderUI()          // Updates all displays
updatePromptPreview() // Updates prompt preview
updateStatus()      // Updates status badge
```

## 🔌 Integrating NanoBanana Backend

The app is ready for backend integration. Look for these markers in `index.html`:

```javascript
/**
 * Call NanoBanana API (currently stubbed)
 * TODO: Wire this to actual NanoBanana image generation endpoint
 */
async function callNanoBanana(promptText) {
  // Replace the stub with your actual API call:
  // const response = await fetch('YOUR_NANOBANANA_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ prompt: promptText })
  // });
  // const data = await response.json();
  // Display the generated image...
}
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in the `:root` selector:

```css
:root {
  --accent: #0066cc;        /* Primary accent color */
  --bg-primary: #ffffff;    /* Background color */
  --stage-bg: #0a0a0a;      /* Character stage background */
  /* ... more variables */
}
```

### Adding Character Options

Add new options to the `<select>` elements in the HTML, and they'll automatically work with the existing state management.

### Modifying the Prompt

Edit the `buildNanoBananaPrompt()` function to change how the prompt is constructed:

```javascript
function buildNanoBananaPrompt(state) {
  // Customize the prompt template here
  return `Your custom prompt with ${state.height}cm...`;
}
```

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ JavaScript support
- CSS Grid and Custom Properties support
- Works on mobile and desktop

## 📱 Mobile Responsive

- Single-column layout on screens < 968px
- Touch-friendly buttons and controls
- Responsive text sizing
- Safe area insets for notched devices

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Arrow keys, Enter)
- Focus visible indicators
- Respects `prefers-reduced-motion` setting
- Semantic HTML structure

## 🔮 Future Enhancement Ideas

- Save/load character presets
- Character gallery with saved avatars
- Comparison view (before/after)
- Export character data as JSON
- Social sharing features
- Animation controls for the spotlight effect
- More customization options (skin tone, clothing, etc.)

## 📄 License

Feel free to use and modify this project for personal or commercial use!

---

**Built with vanilla web technologies** 🚀
**Powered by NanoBanana AI** 🍌 (coming soon)
