# Significa Website - Animation & Interaction Analysis

## Project Overview

**Repository**: Significa (significa.co)  
**Framework**: Svelte 4.2 + SvelteKit  
**Type**: Modern web agency website with sophisticated animation patterns

---

## 1. ANIMATION LIBRARIES & DEPENDENCIES

### Primary Physics Engine

- **[Matter.js](https://brainjs.github.io/matter-js/)** (`matter-js@0.19.0`)
  - Full 2D rigid body physics engine
  - Used for interactive physics simulations and particle systems

### Core Animation Tools

- **Svelte Built-in Transitions** (`svelte/transition`)
  - `fade`, `fly`, `slide`, `scale`
  - No external animation library dependency (GSAP, Framer Motion not used)
- **Svelte Motion** (`svelte/motion`)
  - `tweened` store for smooth value transitions
  - Custom easing functions

### UI Component Library

- **@significa/svelte-ui** (v0.0.34)
  - Custom UI components with built-in interaction handlers
  - Includes actions: `escapeKey`, `clickOutside`, `bodyLock`

### Additional Libraries

- **svelte-confetti** (v1.4.0) - Particle effects

---

## 2. PHYSICS ENGINE IMPLEMENTATIONS

### A. Interactive Physics Sections

#### **Physics Section Component**

**File**: [src/components/physics-section.svelte](src/components/physics-section.svelte)

**Purpose**: Dynamic physics-based content management system  
**Key Features**:

- Real-time 2D physics simulation with Matter.js
- Interactive draggable elements that respond to physics
- Gravity-based particle system
- Support for multiple element types (balloons, rectangles, stickers, inputs)

**Implementation Details**:

```typescript
const GRAVITY_DEFAULT_VALUE = 0.0017 as const;
const INPUT_NAME = 'input' as const;

// Physics bodies created for each element:
- Friction: 1 (simulates realistic friction)
- Dynamic rotation based on physics simulation
- Real-time position updating via requestAnimationFrame

// Element Types Supported:
- PhysicsBalloonCardStoryblok
- PhysicsRectangleCardStoryblok
- PhysicsInputStoryblok
- PhysicsStickerStoryblok
```

**Key Mechanisms**:

1. **Container Ref Binding**: Elements registered in refs array
2. **Dynamic Body Creation**: Bodies created when items change
3. **Render Loop**: Custom render function for each body
4. **Responsive Scaling**: Window resize handling with body recalculation

#### **Newton's Cradle Physics Demo**

**File**: [src/components/pages/home/newton.svelte](src/components/pages/home/newton.svelte)

**Purpose**: Showcase pendulum physics with interactive constraint system

**Implementation**:

```typescript
// Three interconnected pendulum systems
const GRAVITY_DEFAULT_VALUE = 0.0017;

// Bodies with specific properties:
- inertia: Infinity (prevents rolling)
- restitution: 1 (perfect bounce)
- friction: 0, frictionAir: 0

// Constraints:
- Matter.Constraint with specified length
- Anchors at top as static pivot points
- Trigonometry for slope calculation
```

**Interactive Features**:

- Mouse-based interaction with MouseConstraint
- Real-time angle calculation using `Math.atan2()`
- Responsive to window resize with dynamic constraint updates

---

## 3. CANVAS & DRAWING IMPLEMENTATIONS

### Canvas Drawing System

**Directory**: [src/components/draw-your-segg/](src/components/draw-your-segg/)

#### **Canvas Rendering Engine**

**File**: [src/components/draw-your-segg/canvas-rendering.ts](src/components/draw-your-segg/canvas-rendering.ts)

**Purpose**: Low-level HTML5 Canvas 2D rendering for drawing application

**Features**:

```typescript
// Point and Stroke Geometry
- Point[] array for path coordinates
- Stroke objects with width, color, path

// Drawing Algorithms
- Midpoint calculation between consecutive points
- Quadratic curve interpolation (smooth strokes)
- Point simplification by minimum distance threshold

// Canvas Rendering
- quadraticCurveTo() for smooth curves
- Dynamic stroke styling (lineCap, lineJoin)
- Canvas clearing and redrawing
```

#### **Drawing Input System**

**File**: [src/components/draw-your-segg/draw-your-segg.svelte](src/components/draw-your-segg/draw-your-segg.svelte)

**Components**:

- Canvas element binding
- Brush tool implementation
- Pencil tool implementation
- Cursor customization
- Templating system

---

## 4. SCROLL-BASED ANIMATIONS

### A. Scroll Detection & Response

#### **Scroll Speed Calculation**

**File**: [src/lib/utils/dom.ts](src/lib/utils/dom.ts)

```typescript
// Closure-based scroll speed detector
export const getScrollSpeed = (() => {
  let lastPos: number | null;
  let newPos: number;
  let timer: NodeJS.Timeout;
  let delta: number;
  const delay = 40; // Debounce delay

  // Returns delta scroll distance
  // Clears after timeout
})();
```

**Use Case**: Calculate scroll velocity for parallax and motion-based effects

#### **Scroll-Triggered Navigation**

**File**: [src/lib/stores/topnav-scroll-status.ts](src/lib/stores/topnav-scroll-status.ts)

**Features**:

- Scroll direction detection (up/down)
- Threshold-based state changes
- RequestAnimationFrame optimization (prevents jank)
- Custom scroll status store

**Implementation**:

```typescript
const SCROLL_DIR_THRESHOLD = 76; // Minimum scroll distance to detect direction
const SCROLL_THRESHOLD = 200;    // Scroll distance to hide nav

// Returns ScrollStatus object:
{
  isPastZero: boolean;
  isPastThreshold: boolean;
  direction?: 'up' | 'down';
}
```

### B. Scroll-Based Visual Effects

#### **Slideshow with Parallax**

**File**: [src/components/blocks/slideshow.svelte](src/components/blocks/slideshow.svelte)

```svelte
<!-- Easing function applied to scroll value -->
<script>
  let y = 0;
  let eased = 0;

  const ease = () => {
    eased = eased + (y - eased) * 0.075; // Spring easing
    frame = window.requestAnimationFrame(ease);
  };
</script>

<!-- Smooth parallax translation -->
style="transform: translateX(calc({eased / 5}px * -1 + 15vw))"
```

**Effect**: Images move at 1/5 scroll speed for parallax depth

#### **Airplane Parallax (Vertical List)**

**File**: [src/components/blocks/vertical-list.svelte](src/components/blocks/vertical-list.svelte)

```javascript
// Quadratic physics-based motion
style={isVisible && x > 0
  ? `transform: translate(${x / velocity}px, ${-(Math.pow(x, 2) * (a * velocity))}px);`
  : ''}
```

**Physics**: Uses quadratic formula for curved flight path

---

## 5. INTERACTIVE COMPONENTS

### A. Hover-Based Interactions

#### **Hoverable Gallery**

**File**: [src/components/hoverable-gallery.svelte](src/components/hoverable-gallery.svelte)

**Transform States** (CSS + Svelte):

```typescript
interface TransformOptions {
  x: string;        // Horizontal offset percentage
  y: string;        // Vertical offset percentage
  deg: number;      // Rotation in degrees
  z: number;        // Z-index stacking
}

// Static state (idle)
[
  { x: '0%', y: '55%', deg: 4, z: 1 },
  { x: '0%', y: '75%', deg: -14, z: 1 },
  { x: '-15%', y: '50%', deg: 4, z: 1 },
  // ... more cards
]

// Hover state (interactive)
[
  { x: '-5%', y: '5%', deg: -4, z: 1 },
  { x: '0%', y: '0%', deg: -5, z: 1 },
  // ... animate to top layer
]
```

**Implementation**:

```svelte
<!-- Debounced hover state for smooth transitions -->
let hovered = writable(false); let debouncedHover = debounced(hovered, 200); // 200ms debounce

<!-- Apply transforms with CSS transitions -->
style={`transform:translate(${transformState.x}, ${transformState.y}) rotate(${transformState.deg}deg); z-index: ${transformState.z}`}
class="transition-all duration-[250ms]"
```

#### **Hoverable Gallery Card**

**File**: [src/components/hoverable-gallery-card.svelte](src/components/hoverable-gallery-card.svelte)

**Features**:

- Separate static and hover transform states
- 250ms transition duration
- Debounced state updates
- Photo and notepad variants

### B. Drag-Based Interactions

#### **Drag Scrolling Action**

**File**: [src/lib/actions/drag-scrolling.ts](src/lib/actions/drag-scrolling.ts)

```typescript
export const dragScrolling = (
  node: HTMLElement,
  options: {
    isActive: boolean;
    centerYOffset?: number;
    centerXOffset?: number;
    onInteraction?: VoidFunction;
  }
)

// Features:
- Cursor: 'grab' idle, 'grabbing' while dragging
- Constrained scrolling (prevents overflow)
- User select disabled during drag
- Interaction callback tracking
- Center positioning on mount
```

**Use Case**: Interactive canvas and gallery navigation

### C. Responsive Interactive Components

#### **Comparison Slider with Easing**

**File**: [src/components/blocks/comparison.svelte](src/components/blocks/comparison.svelte)

```typescript
// Tweened store for smooth dragging
let visibility = tweened(0, { duration: 0, easing: (t) => t });

// Custom easing for auto-positioning
visibility.set(50, {
  duration: 500,
  easing: (t) => {
    // elasticOut easing function
    return Math.sin((-5.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -12.0 * t) + 1.0;
  }
});
```

**Interaction Types**:

- Mouse drag
- Touch drag
- Automatic positioning when intersecting viewport

---

## 6. CSS ANIMATION TECHNIQUES

### A. Tailwind CSS Custom Animations

**File**: [tailwind.config.cjs](tailwind.config.cjs)

```javascript
keyframes: {
  strike: {
    '0%': { 'clip-path': 'polygon(0 0, 0% 0, 0% 120%, 0 120%)' },
    '100%': { 'clip-path': 'polygon(0 0, 100% 0, 100% 120%, 0 120%)' }
  },
  'strike-clip-path': {
    '0%': { 'clip-path': 'polygon(0 0, 0% 0, 0% 120%, 0 120%)' },
    '100%': { 'clip-path': 'polygon(0 0, 100% 0, 100% 120%, 0 120%)' }
  },
  shake: {
    '0%': { transform: 'translateX(0px)' },
    '25%': { transform: 'translateX(-6px)' },
    '75%': { transform: 'translateX(6px)' },
    '100%': { transform: 'translateX(0px)' }
  }
},

animation: {
  strike: 'strike 300ms ease-in-out forwards',
  'strike-clip-path': 'strike-clip-path 300ms ease-in-out forwards',
  shake: 'shake 600ms cubic-bezier(.78,-0.02,.36,.97)'
}
```

### B. Transition Utilities

**Custom Easing Function**:

```css
ease-[cubic-bezier(0.90, 0, 0.05, 1)]
```

**Duration Variants**:

```css
transition-all
duration-200   /* 200ms fade/scale transitions */
duration-300   /* 300ms slide/fly transitions */
duration-500   /* 500ms longer animations */
duration-700   /* 700ms hero section animations */
```

### C. Motion-Safe Utilities

```svelte
class="motion-safe:transition-colors"
```

---

## 7. COMPONENT STRUCTURE & NAMING CONVENTIONS

### Directory Organization

```
src/
├── components/
│   ├── [Component].svelte          // Main component
│   ├── physics-section.svelte       // Physics simulations
│   ├── physics-blocks/              // Physics sub-components
│   │   ├── balloon-card.svelte
│   │   ├── rectangle-card.svelte
│   │   └── physics-input.svelte
│   ├── blocks/                      // Content blocks
│   │   ├── canvas.svelte
│   │   ├── slideshow.svelte
│   │   ├── comparison.svelte
│   │   ├── draw-segg.svelte
│   │   └── ...
│   ├── draw-your-segg/              // Drawing system
│   │   ├── draw-your-segg.svelte
│   │   ├── canvas-rendering.ts
│   │   ├── canvas.svelte
│   │   ├── brush.svelte
│   │   ├── pencil.svelte
│   │   └── tools.svelte
│   ├── pages/                       // Page-specific components
│   │   ├── home/
│   │   │   ├── newton.svelte        // Physics demo
│   │   │   └── ...
│   │   └── careers/
│   │       └── canvas.svelte        // Interactive canvas
│   └── illustrations/               // SVG assets
├── lib/
│   ├── actions/                     // Svelte actions
│   │   ├── drag-scrolling.ts
│   │   ├── instersection-observer.ts
│   │   └── ...
│   ├── stores/                      // Svelte stores
│   │   ├── topnav-scroll-status.ts
│   │   ├── debounced.ts
│   │   ├── device.ts
│   │   └── ...
│   └── utils/
│       ├── dom.ts                   // Scroll utilities
│       └── ...
└── styles/
    └── index.css                    // Tailwind + custom CSS
```

### Naming Conventions

**Components**:

- PascalCase for Svelte components: `HoverableGallery.svelte`, `PhysicsSection.svelte`
- Descriptive names indicating functionality: `drag-scrolling.ts`, `topnav-scroll-status.ts`

**Functions & Utilities**:

- camelCase: `getScrollSpeed()`, `debounced()`, `intersectionObserver()`
- Prefix indicating type: `create` for stores, `get` for getters

**Stores**:

- Descriptive names: `topnav-scroll-status`, `debounced`
- Factory functions: `createTopNavScrollStatus()`, `createBreakpointMediaQueryStore()`

**Constants**:

- UPPER_SNAKE_CASE: `GRAVITY_DEFAULT_VALUE`, `SCROLL_THRESHOLD`, `SCROLL_DIR_THRESHOLD`

---

## 8. CUSTOM ANIMATION FRAMEWORKS & PATTERNS

### A. Debounced State Store

**File**: [src/lib/stores/debounced.ts](src/lib/stores/debounced.ts)

```typescript
export function debounced<T>(value: Writable<T>, delay = 500) {
  const debouncedValue = writable<T | null>(null);

  let timeout: NodeJS.Timeout;

  value.subscribe((value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.set(value);
    }, delay);
  });

  return debouncedValue;
}
```

**Usage**: Smooth hover transitions, scroll state changes

### B. Scroll Status Store

Creates reactive scroll detection without external libraries

**Features**:

- RequestAnimationFrame batching for performance
- Direction detection with threshold
- Multiple threshold tracking (0, 200px)
- Prevents jank with ticking mechanism

### C. Intersection Observer Action

**File**: [src/lib/actions/instersection-observer.ts](src/lib/actions/instersection-observer.ts)

```typescript
export function intersectionObserver(
  node: HTMLElement,
  [callback, options]: [
    (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void,
    IntersectionObserverInit | undefined
  ]
);
```

**Usage**: Trigger animations when elements enter viewport

### D. Word Animation System

**File**: [src/components/slogan.svelte](src/components/slogan.svelte)

```typescript
// Sequential word reveal animation
let source: string[] = ['Think.', 'Design.', 'Develop.', 'Launch.', 'Repeat.'];
let target: string[] = [];

// 200ms stagger between words
$: if (animate) {
  setTimeout(() => {
    if (target.length !== source.length) {
      target = [...target, source[target.length]];
    } else {
      dispatch('end');
    }
  }, 200);
}
```

**Applied Styles**:

```svelte
style={target[i]
  ? 'opacity: 1; transform: translateY(0);'
  : 'opacity: 0; transform: translateY(1ch);'}
class="transition-all duration-500 ease-motion"
```

### E. Reel (Video Player) with Parallax

**File**: [src/components/reel.svelte](src/components/reel.svelte)

**Features**:

- Mouse position tracking
- Play button rendered at cursor position
- Fade/scale transitions on button show/hide
- Responsive video controls

---

## 9. ADVANCED INTERACTION PATTERNS

### A. Multi-State Navigation

**File**: [src/components/top-navigation.svelte](src/components/top-navigation.svelte)

```svelte
<!-- Scroll-driven visibility -->
class={clsx(
  'ease-[cubic-bezier(0.90, 0, 0.05, 1)] fixed z-30 w-full border-b',
  'bg-background/95 backdrop-blur-md transition-[transform,border-color]',
  'duration-300',
  !$scrollStatus.isPastZero ? 'border-b-transparent' : 'border-b-border',
  !$scrollStatus.isPastThreshold
    ? 'translate-y-0'
    : $scrollStatus.direction === 'down' || isNavHidden
      ? '-translate-y-full'
      : 'translate-y-0'
)}
```

**Logic**:

- Hide on scroll down when threshold exceeded
- Show on scroll up
- Custom bezier easing for smooth motion

### B. Drawer with Transitions

**File**: [src/components/page-drawer.svelte](src/components/page-drawer.svelte)

```svelte
<!-- Fly transition with context-dependent direction -->
in:fly={{ x: 300, duration: 200 }}
out:fly={{ x: expanding ? -300 : 300, duration: expanding ? 200 : 100 }}
```

**Features**:

- Slide-in from right on open
- Conditional exit direction
- Different durations based on context
- Body lock to prevent background scroll

### C. Timeline with Scroll-Linked Animation

**File**: [src/components/pages/about/timeline.svelte](src/components/pages/about/timeline.svelte)

```javascript
// Scroll position drives horizontal translation
style="transform: translateX({Math.max(
  -width + containerWidth,
  Math.max(0, y - top - (800 / factor - windowHeight) / 2) * -1
)}px);"
```

**Uses**:

- `distance-to-top` action for element positioning
- Scroll Y binding
- Dynamic calculation of translation

---

## 10. PERFORMANCE OPTIMIZATIONS

### A. RequestAnimationFrame Usage

- **Slideshow parallax**: RAF-based easing loop
- **Physics engine**: RAF-driven body updates
- **Scroll detection**: RAF-batched scroll direction updates

### B. Debouncing & Throttling

- **Hover states**: 200ms debounce to reduce re-renders
- **Scroll detection**: 76px threshold to prevent frequent updates
- **Resize handling**: Physics body recalculation on demand

### C. Intersection Observer

- Lazy trigger animations only when visible
- Prevents off-screen animation execution
- Reduces CPU usage

### D. CSS Containment

```svelte
class="isolate" <!-- CSS containment for performance -->
```

---

## 11. BROWSER API INTEGRATIONS

- **Window Events**: scroll, resize
- **Mouse Events**: mousedown, mousemove, mouseup, mouseleave, mouseenter
- **Touch Events**: touchmove
- **requestAnimationFrame**: Smooth animations
- **IntersectionObserver API**: Viewport detection
- **Canvas 2D API**: Drawing system
- **SVG Rendering**: Inline illustrations

---

## 12. KEY ANIMATION FILES SUMMARY

| File                                                                         | Purpose                    | Animation Type              |
| ---------------------------------------------------------------------------- | -------------------------- | --------------------------- |
| [physics-section.svelte](src/components/physics-section.svelte)              | Dynamic physics simulation | Matter.js Physics           |
| [pages/home/newton.svelte](src/components/pages/home/newton.svelte)          | Pendulum physics demo      | Matter.js Physics           |
| [draw-your-segg/](src/components/draw-your-segg/)                            | Interactive drawing canvas | Canvas 2D                   |
| [blocks/slideshow.svelte](src/components/blocks/slideshow.svelte)            | Parallax scroll effect     | Scroll-based RAF            |
| [hoverable-gallery.svelte](src/components/hoverable-gallery.svelte)          | Interactive card stacking  | CSS Transform + Transitions |
| [blocks/comparison.svelte](src/components/blocks/comparison.svelte)          | Before/after slider        | Tweened store               |
| [top-navigation.svelte](src/components/top-navigation.svelte)                | Hide on scroll nav         | Scroll detection store      |
| [lib/actions/drag-scrolling.ts](src/lib/actions/drag-scrolling.ts)           | Drag to scroll interaction | Mouse events                |
| [lib/stores/topnav-scroll-status.ts](src/lib/stores/topnav-scroll-status.ts) | Scroll direction detection | RAF + Events                |
| [slogan.svelte](src/components/slogan.svelte)                                | Sequential word reveal     | setTimeout + CSS            |

---

## 13. TECHNOLOGIES NOT USED (NOTABLE ABSENCES)

- ❌ GSAP (Greensock Animation Platform)
- ❌ Framer Motion
- ❌ Three.js / Babylon.js (3D graphics)
- ❌ AOS (Animate On Scroll library)
- ❌ ScrollTrigger
- ❌ Lottie animations

**Filosofy**: Significa builds custom, lightweight animation solutions using native Svelte transitions, custom stores, and Matter.js for physics-only where needed.

---

## CONCLUSION

Significa's animation approach emphasizes:

1. **Performance First**: RequestAnimationFrame, RAF batching, intersection observers
2. **Framework Native**: Leveraging Svelte's reactive system instead of external libraries
3. **Physics Accuracy**: Matter.js for realistic physics-based interactions
4. **Canvas Mastery**: Custom HTML5 Canvas drawing implementation
5. **CSS Efficiency**: Tailwind + custom keyframes for GPU-accelerated transitions
6. **Scroll Integration**: Custom scroll detection without ScrollTrigger
7. **Accessibility**: motion-safe utilities for reduced-motion preferences
8. **Type Safety**: Full TypeScript implementation

The website demonstrates advanced web animation techniques while maintaining minimal dependencies and excellent performance characteristics.
