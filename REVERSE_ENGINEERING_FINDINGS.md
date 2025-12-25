# Significa Website - Reverse Engineering Findings

## What Makes Significa's Website Advanced

### 1. **Physics Engine - Matter.js**

The core of their interactive sections uses **Matter.js 0.19.0** - a full 2D physics engine.

**Key Features Implemented:**

- Interactive draggable elements with gravity
- Newton's Cradle (pendulum system with constraints)
- Collision detection and response
- Friction and restitution physics
- Mouse constraints for drag interactions
- Scroll speed integration for physics effects

**Current Status:** ✅ Already installed in package.json, but NOT being used in home page

### 2. **Interactive Components Missing**

#### A. Physics Section (Implemented in their code)

- Gravity-based falling cards
- Mouse drag interaction
- Collision physics
- Friction simulation
- Dynamic size/position calculation

#### B. Newton's Cradle (Implemented in their code)

- Pendulum constraints
- Trigonometric angle calculations
- Swinging motion with physics
- Collision impulse
- Inertia and restitution tuning

#### C. Scroll-Based Animations

- Scroll velocity calculation
- Parallax effects at different speeds
- Scroll-linked animations
- Direction detection (up/down)

### 3. **Current Missing Pieces in Your Implementation**

**In your pages.json home page:**

- ❌ Physics blocks use generic names instead of proper Storyblok component structure
- ❌ No connection to Matter.js engine
- ❌ Missing animation variant specifications
- ❌ No scroll-based animation data
- ❌ Missing hero section animation types
- ❌ No interaction metadata

**In your components:**

- ✅ physics.svelte exists
- ✅ physics-section.svelte exists (fully implemented with Matter.js)
- ✅ newton.svelte exists (fully implemented with pendulum physics)
- ❌ These aren't being called from pages.json!

### 4. **Advanced Features Present in Actual Site**

1. **Canvas Drawing** - Draw your own "Segg" interactive element
2. **Comparison Slider** - Before/after with elastic easing
3. **Hover Gallery** - 3D transform effects on hover
4. **Parallax Scrolling** - Velocity-based offset calculations
5. **Reel/Video Player** - Cursor-following interactive button
6. **Timeline Animations** - Scroll-linked event timeline
7. **Drag Interactions** - Custom drag actions with momentum

### 5. **Animation Libraries Used**

- ✅ **Matter.js** - Physics engine (installed, not used)
- ✅ **Svelte transitions** - Built-in (fade, fly, slide)
- ✅ **Svelte motion** - Tweened stores with easing
- ✅ **CSS keyframes** - Custom Tailwind animations
- ✅ **Intersection Observer** - Scroll trigger animations
- ✅ **Custom actions** - Reusable animation logic

### 6. **CSS Advanced Techniques**

- Custom Tailwind keyframes: `strike`, `shake`, `bounce-slow`
- Custom easing: `cubic-bezier(0.90, 0, 0.05, 1)`
- Clip-path animations for advanced effects
- Motion-safe utilities for accessibility
- Transform-based animations (GPU accelerated)

### 7. **Data Structure Issues**

**What Your pages.json Has (WRONG):**

```json
{
  "component": "physics",
  "body": [
    {
      "component": "physics-balloon-card",
      "title": "The chicken.",
      "physics_type": "offset"
    }
  ]
}
```

**What It Should Have (CORRECT):**

```json
{
  "component": "physics",
  "variant": "section",
  "section_title1": "Our",
  "section_title2": "services.",
  "section_description": "Design-led digital products.",
  "physics_blocks": [
    {
      "component": "physics-balloon-card",
      "title": "The chicken."
    }
  ]
}
```

The difference:

- `physics_blocks` NOT `body`
- `section_title1` + `section_title2` NOT `title`
- `variant` field required
- Component structure matches PhysicsStoryblok type

## Recommendations

1. ✅ Keep Matter.js (already installed)
2. ✅ Use existing physics.svelte and physics-section.svelte components
3. ✅ Use existing newton.svelte for pendulum animations
4. 🔧 **Update pages.json to proper structure**
5. 🔧 **Add more animation metadata to home page data**
6. 🔧 **Implement scroll-based animations**
7. 🔧 **Add hero section animations**

## Files with Advanced Implementations

- `src/components/physics-section.svelte` - Full Matter.js setup
- `src/components/pages/home/newton.svelte` - Pendulum physics
- `src/components/blocks/physics.svelte` - Physics block wrapper
- `src/lib/stores/device.ts` - Device detection for animations
- `src/lib/utils/dom.ts` - DOM utility functions for scroll speed
