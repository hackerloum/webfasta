# AI Website Studio - Design System Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Design Philosophy](#design-philosophy)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing System](#spacing-system)
6. [Border Radius](#border-radius)
7. [Shadows & Effects](#shadows--effects)
8. [Animations](#animations)
9. [Components](#components)
10. [Layout & Grid](#layout--grid)
11. [Responsive Design](#responsive-design)
12. [Accessibility](#accessibility)

---

## 🎯 Project Overview

**AI Website Studio** is a modern, AI-powered website builder that allows users to create production-ready websites through natural language prompts. The application features a split-screen interface with AI chat, code editor, and live preview capabilities.

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Backend**: Supabase (Edge Functions)
- **AI**: Lovable AI Gateway (Google Gemini 2.5 Flash)

---

## 🎨 Design Philosophy

### Core Principles

1. **Modern & Professional**: Clean, contemporary design that feels premium
2. **Dark-First**: Optimized for dark mode with excellent contrast
3. **Gradient Accents**: Strategic use of gradients for visual interest
4. **Smooth Animations**: Subtle, purposeful animations that enhance UX
5. **Accessibility**: WCAG compliant with proper contrast ratios
6. **Responsive**: Mobile-first approach with seamless scaling

### Visual Style

- **Aesthetic**: Modern SaaS platform with developer-focused UI
- **Mood**: Professional, trustworthy, innovative
- **Tone**: Clean, minimal, with strategic use of color and space

---

## 🎨 Color System

All colors are defined in HSL format for better manipulation and consistency.

### Primary Colors

#### Primary (Cyan Blue)
- **HSL**: `199 89% 48%`
- **Hex**: `#0EA5E9` (approximately)
- **Usage**: Primary actions, links, highlights, brand elements
- **Foreground**: `210 40% 98%` (Light text on primary)

#### Accent (Turquoise)
- **HSL**: `180 84% 55%`
- **Hex**: `#14B8A6` (approximately)
- **Usage**: Secondary actions, gradients, complementary highlights
- **Foreground**: `222 47% 11%` (Dark text on accent)

### Base Colors

#### Background
- **HSL**: `222 47% 11%`
- **Hex**: `#0F172A` (approximately)
- **Usage**: Main application background
- **Description**: Deep navy blue, almost black

#### Foreground
- **HSL**: `210 40% 98%`
- **Hex**: `#F8FAFC` (approximately)
- **Usage**: Primary text color
- **Description**: Off-white, high contrast

#### Card
- **HSL**: `224 44% 15%`
- **Hex**: `#1E293B` (approximately)
- **Usage**: Card backgrounds, elevated surfaces
- **Foreground**: `210 40% 98%`

#### Muted
- **HSL**: `217 33% 17%`
- **Hex**: `#1E293B` (approximately)
- **Usage**: Subtle backgrounds, disabled states
- **Foreground**: `215 20% 65%` (Muted text)

#### Secondary
- **HSL**: `217 33% 20%`
- **Hex**: `#334155` (approximately)
- **Usage**: Secondary backgrounds, borders
- **Foreground**: `210 40% 98%`

### Semantic Colors

#### Destructive (Red)
- **HSL**: `0 63% 50%`
- **Hex**: `#EF4444` (approximately)
- **Usage**: Errors, delete actions, warnings
- **Foreground**: `210 40% 98%`

#### Border
- **HSL**: `217 33% 22%`
- **Hex**: `#475569` (approximately)
- **Usage**: Borders, dividers, separators

#### Input
- **HSL**: `217 33% 22%`
- **Hex**: `#475569` (approximately)
- **Usage**: Input field borders

#### Ring (Focus)
- **HSL**: `199 89% 48%`
- **Hex**: `#0EA5E9` (approximately)
- **Usage**: Focus rings, active states

### Special Colors

#### Code Background
- **HSL**: `222 47% 8%`
- **Hex**: `#0A0F1A` (approximately)
- **Usage**: Code editor backgrounds

#### Code Border
- **HSL**: `217 33% 18%`
- **Hex**: `#1E293B` (approximately)
- **Usage**: Code editor borders

### Color Usage Guidelines

```css
/* Primary Actions */
bg-primary, text-primary, border-primary

/* Accent Elements */
bg-accent, text-accent, border-accent

/* Backgrounds */
bg-background (main), bg-card (elevated), bg-muted (subtle)

/* Text */
text-foreground (primary), text-muted-foreground (secondary)

/* Borders */
border-border, border-input

/* States */
bg-destructive (errors), ring (focus)
```

### Gradient Combinations

#### Primary Gradient
```css
background: linear-gradient(135deg, hsl(199 89% 48%), hsl(180 84% 55%));
/* From Primary to Accent */
```

#### Card Gradient
```css
background: linear-gradient(135deg, hsl(224 44% 15%), hsl(217 33% 18%));
/* Subtle card depth */
```

#### Text Gradient (Animated)
```css
background: linear-gradient(to right, primary, accent, primary);
background-size: 200% auto;
animation: gradient 3s ease infinite;
```

---

## 📝 Typography

### Font Stack

The project uses the system font stack for optimal performance:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Type Scale

#### Headings

- **H1 (Hero)**: 
  - Size: `5xl` (3rem) to `8xl` (6rem) responsive
  - Weight: `800` (extrabold)
  - Line Height: `1.1` (tight)
  - Tracking: `tight`

- **H2 (Section)**: 
  - Size: `4xl` (2.25rem) to `5xl` (3rem)
  - Weight: `700` (bold)
  - Line Height: `1.2`

- **H3 (Subsection)**: 
  - Size: `2xl` (1.5rem) to `3xl` (1.875rem)
  - Weight: `700` (bold)
  - Line Height: `1.3`

- **H4 (Card Title)**: 
  - Size: `xl` (1.25rem)
  - Weight: `600` (semibold)
  - Line Height: `1.4`

#### Body Text

- **Large Body**: 
  - Size: `xl` (1.25rem) to `2xl` (1.5rem)
  - Weight: `400` (regular)
  - Line Height: `1.75` (relaxed)

- **Body**: 
  - Size: `base` (1rem)
  - Weight: `400` (regular)
  - Line Height: `1.6`

- **Small**: 
  - Size: `sm` (0.875rem)
  - Weight: `400` (regular)
  - Line Height: `1.5`

#### Special Text

- **Code**: 
  - Font: `monospace`
  - Size: `sm` (0.875rem)
  - Background: `code-bg`
  - Color: `foreground`

### Typography Usage

```tsx
// Hero Heading
<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
               font-extrabold text-foreground leading-[1.1] tracking-tight">

// Section Heading
<h2 className="text-4xl sm:text-5xl font-bold text-foreground">

// Body Text
<p className="text-xl text-muted-foreground leading-relaxed">

// Small Text
<span className="text-sm text-muted-foreground">
```

---

## 📏 Spacing System

The project uses Tailwind's default spacing scale (4px base unit):

### Spacing Scale

- `0`: 0px
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 0.75rem (12px)
- `4`: 1rem (16px)
- `5`: 1.25rem (20px)
- `6`: 1.5rem (24px)
- `8`: 2rem (32px)
- `10`: 2.5rem (40px)
- `12`: 3rem (48px)
- `16`: 4rem (64px)
- `20`: 5rem (80px)
- `24`: 6rem (96px)

### Common Spacing Patterns

```tsx
// Section Padding
py-24 px-4 sm:px-6 lg:px-8

// Card Padding
p-6, p-8, p-10

// Component Gaps
gap-2, gap-4, gap-6, gap-8

// Margins
mb-4, mb-6, mb-8, mb-12, mb-16, mb-20
```

---

## 🔲 Border Radius

### Radius Values

- **Base Radius**: `0.5rem` (8px)
- **Large**: `var(--radius)` = `0.5rem`
- **Medium**: `calc(var(--radius) - 2px)` = `0.375rem` (6px)
- **Small**: `calc(var(--radius) - 4px)` = `0.25rem` (4px)

### Usage

```tsx
// Cards
rounded-lg (0.5rem)

// Buttons
rounded-xl (0.75rem) - for primary actions
rounded-lg (0.5rem) - for secondary

// Badges
rounded-full (pill shape)

// Code blocks
rounded-lg (0.5rem)
```

---

## ✨ Shadows & Effects

### Shadow System

#### Glow Shadow (Primary)
```css
box-shadow: 0 0 40px hsl(199 89% 48% / 0.2);
/* Used for primary buttons, important elements */
```

#### Card Shadow
```css
box-shadow: 0 10px 30px -10px hsl(222 47% 11% / 0.5);
/* Subtle depth for cards */
```

#### Tailwind Shadow Classes

- `shadow-sm`: Small shadow
- `shadow`: Default shadow
- `shadow-md`: Medium shadow
- `shadow-lg`: Large shadow
- `shadow-xl`: Extra large shadow
- `shadow-2xl`: 2X large shadow
- `shadow-primary/25`: Primary color glow

### Backdrop Effects

```tsx
// Backdrop blur
backdrop-blur-sm  // Small blur
backdrop-blur-lg  // Large blur

// Semi-transparent backgrounds
bg-background/50  // 50% opacity
bg-card/80        // 80% opacity
```

### Gradient Overlays

```tsx
// Subtle gradient overlay
bg-gradient-to-br from-primary/10 to-accent/10

// Text gradient
bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent
```

---

## 🎬 Animations

### Animation Keyframes

#### Fade In
```css
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
Duration: 0.5s
Easing: ease-out
```

#### Slide Up
```css
@keyframes slide-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
Duration: 0.5s
Easing: ease-out
```

#### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
Duration: 3s
Easing: ease-in-out
Loop: infinite
```

#### Gradient (Text)
```css
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
Duration: 3s
Easing: ease
Loop: infinite
```

### Animation Usage

```tsx
// Entrance animations
className="animate-fade-in"
className="animate-slide-up"

// Continuous animations
className="animate-float"

// Gradient text
className="animate-gradient"
```

### Transition Patterns

```tsx
// Smooth transitions
transition-all duration-300

// Hover effects
hover:scale-105 transition-transform duration-300
hover:translate-x-1 transition-transform

// Color transitions
hover:text-primary transition-colors
```

---

## 🧩 Components

### Component Library

The project uses **shadcn/ui** components built on Radix UI primitives:

#### Core Components
- `Button` - Primary, secondary, outline, ghost variants
- `Card` - Container with border and shadow
- `Input` - Text input fields
- `Textarea` - Multi-line text input
- `Select` - Dropdown selections
- `Dialog` - Modal dialogs
- `Tabs` - Tab navigation
- `ScrollArea` - Custom scrollable areas
- `Toast` - Notification toasts
- `Tooltip` - Hover tooltips

#### Layout Components
- `ResizablePanel` - Resizable panel groups
- `Separator` - Visual dividers
- `Accordion` - Collapsible content

### Custom Components

#### AiChat
- Chat interface for AI interactions
- Message bubbles (user/assistant)
- Loading states
- Input with send button

#### CodeEditor
- Multi-file code editor
- Tab-based file switching
- Syntax highlighting ready
- Scrollable code view

#### PreviewPanel
- Live HTML preview in iframe
- Responsive view modes (desktop/tablet/mobile)
- Sandboxed for security

#### Navbar
- Fixed navigation bar
- Responsive mobile menu
- Logo and navigation links
- CTA button

#### Footer
- Multi-column layout
- Social links
- Legal pages
- Copyright notice

### Component Patterns

```tsx
// Card Pattern
<Card className="p-6 bg-card border-border hover:border-primary/50 
                 transition-all hover:shadow-xl">
  {/* Content */}
</Card>

// Button Pattern
<Button className="bg-gradient-to-r from-primary to-accent 
                   hover:from-primary/90 hover:to-accent/90">
  Action
</Button>

// Badge Pattern
<div className="inline-flex items-center gap-2 px-4 py-2 
                rounded-full bg-primary/10 border border-primary/20">
  <Icon />
  <span>Label</span>
</div>
```

---

## 📐 Layout & Grid

### Container System

```tsx
// Max width container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Grid Layouts

```tsx
// Feature Grid (3 columns)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Stats Grid (4 columns)
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">

// Two Column Layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
```

### Flexbox Patterns

```tsx
// Centered content
<div className="flex items-center justify-center">

// Space between
<div className="flex items-center justify-between">

// Column layout
<div className="flex flex-col gap-4">
```

---

## 📱 Responsive Design

### Breakpoints

- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (laptops)
- **xl**: 1280px (desktops)
- **2xl**: 1400px (large desktops)

### Responsive Patterns

```tsx
// Text sizing
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"

// Spacing
className="px-4 sm:px-6 lg:px-8"
className="py-16 sm:py-20 lg:py-24"

// Grid columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Visibility
className="hidden md:flex"
className="block sm:hidden"
```

### Mobile-First Approach

- Base styles target mobile
- Progressive enhancement for larger screens
- Touch-friendly targets (min 44x44px)
- Readable text sizes on all devices

---

## ♿ Accessibility

### Color Contrast

- **Primary Text**: WCAG AAA compliant (98% on 11% background)
- **Muted Text**: WCAG AA compliant (65% on 17% background)
- **Interactive Elements**: Minimum 4.5:1 contrast ratio

### Focus States

```tsx
// Focus rings
focus:ring-2 focus:ring-ring focus:ring-offset-2

// Visible focus indicators
outline-none focus:outline-2 focus:outline-primary
```

### Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3)
- Semantic elements (nav, main, section, article)
- ARIA labels where needed
- Alt text for images

### Keyboard Navigation

- All interactive elements keyboard accessible
- Logical tab order
- Skip links for main content
- Escape key closes modals

---

## 🎯 Design Tokens Summary

### Colors (HSL)
```css
--background: 222 47% 11%
--foreground: 210 40% 98%
--primary: 199 89% 48%
--accent: 180 84% 55%
--card: 224 44% 15%
--muted: 217 33% 17%
--border: 217 33% 22%
--destructive: 0 63% 50%
```

### Spacing
- Base unit: 4px (0.25rem)
- Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24

### Typography
- Font: System font stack
- Scale: sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl
- Weights: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)

### Border Radius
- Base: 0.5rem (8px)
- Large: 0.5rem
- Medium: 0.375rem
- Small: 0.25rem
- Full: 9999px (pill)

### Shadows
- Glow: `0 0 40px hsl(199 89% 48% / 0.2)`
- Card: `0 10px 30px -10px hsl(222 47% 11% / 0.5)`

### Animations
- Fade In: 0.5s ease-out
- Slide Up: 0.5s ease-out
- Float: 3s ease-in-out infinite
- Gradient: 3s ease infinite

---

## 📚 Additional Resources

### File Structure
```
src/
├── components/        # React components
│   ├── ui/           # shadcn/ui components
│   ├── AiChat.tsx    # AI chat interface
│   ├── CodeEditor.tsx # Code editor
│   └── PreviewPanel.tsx # Live preview
├── pages/            # Route pages
├── lib/              # Utilities
└── integrations/     # Supabase client
```

### Key Files
- `src/index.css` - Design system CSS variables
- `tailwind.config.ts` - Tailwind configuration
- `components.json` - shadcn/ui configuration

### Design Principles Checklist

- ✅ Consistent spacing system
- ✅ Semantic color usage
- ✅ Accessible contrast ratios
- ✅ Responsive breakpoints
- ✅ Smooth animations
- ✅ Clear visual hierarchy
- ✅ Professional typography
- ✅ Modern gradient accents
- ✅ Dark mode optimized
- ✅ Touch-friendly targets

---

## 🎨 Color Palette Reference

### Primary Palette
```
Primary:    #0EA5E9 (Cyan Blue)
Accent:     #14B8A6 (Turquoise)
Background: #0F172A (Deep Navy)
Foreground: #F8FAFC (Off White)
```

### Semantic Palette
```
Card:       #1E293B (Slate)
Muted:      #1E293B (Slate)
Border:     #475569 (Slate)
Destructive: #EF4444 (Red)
```

### Gradient Examples
```
Primary → Accent: #0EA5E9 → #14B8A6
Card Depth: #1E293B → #1E293B
```

---

**Last Updated**: 2024
**Version**: 1.0.0
**Maintained by**: AI Website Studio Team

