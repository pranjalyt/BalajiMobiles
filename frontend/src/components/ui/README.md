# UI Components

This directory contains new UI components added to enhance the Home page with a black + white minimal theme and dark mode support.

## Components Added

### 1. WhyBuySection.jsx
**Location**: Between "New Drops" and "Featured Phones" sections

**Description**: Displays "We Don't Sell Used Phones. We Sell Certified Ones." with four feature cards:
- 32-Point Inspection
- Original Parts Only
- Real Images & Honest Grades
- 7-Day Peace of Mind

**Features**:
- Staggered fade-up animations on scroll
- Responsive grid layout
- Dark mode support

### 2. TestingTimeline.jsx
**Location**: Between "Why Buy From Us" and "Promise Bar" sections

**Description**: Shows "Our Testing Process" with 6 testing steps:
1. Physical Body Check
2. Display & Touch Test
3. Battery & Performance Scan
4. Camera & Mic Check
5. Network & SIM Test
6. Final Clean & Pack

**Features**:
- Horizontal timeline on desktop
- Vertical stack on mobile
- Left/right slide animations on scroll
- Dark mode support

### 3. PromiseBar.jsx
**Location**: Between "Testing Timeline" and "Trust Carousel" sections

**Description**: Full-width rounded pill card with:
- "Our Promise. Your Peace Of Mind."
- "Each phone is checked, verified, and graded honestly."

**Features**:
- Soft one-time pulse animation
- Dark mode support

### 4. TrustCarousel.jsx
**Location**: Between "Promise Bar" and "Featured Phones" sections

**Description**: Combines trust badges and testimonial carousel:
- Three trust badges: Warranty, Certified Graded, Secure Checkout
- Auto-rotating testimonial carousel (5-second intervals)
- Simple React-only implementation (no heavy libraries)

**Features**:
- Auto-rotate testimonials
- Manual navigation dots
- Dark mode support

## Theme System

### How to Switch Theme
The theme toggle is located in the navbar:
- **Desktop**: Icon button in the top-right menu
- **Mobile**: Text link in the mobile menu

The theme preference is saved to localStorage and persists across page reloads.

### Default Theme
- **Default**: Dark mode
- The app starts in dark mode unless a saved preference exists

### Theme Colors
- **Light Mode**: White backgrounds, black/gray text
- **Dark Mode**: Black/gray backgrounds, white/gray text
- **No colors**: Only grayscale palette (black, white, gray)

## Disabling Animations

To disable animations for users who prefer reduced motion:

1. The app respects `prefers-reduced-motion` media query
2. Animations are automatically disabled when the user's system preference is set to reduce motion
3. All animations use CSS/Tailwind transitions for smooth performance

## Component Integration

All components are imported and inserted in `frontend/src/pages/Home.jsx` between the "New Drops" section and the "Featured Phones" section, in this exact order:

1. WhyBuySection
2. TestingTimeline
3. PromiseBar
4. TrustCarousel

## Styling

- **Rounded corners**: 12-16px (rounded-2xl, rounded-3xl)
- **Shadows**: Soft shadows with hover lift effects
- **Transitions**: 300ms duration for smooth color/state changes
- **Hover effects**: Cards lift on hover (translate-y)
- **Responsive**: Full mobile support with appropriate breakpoints

## Notes

- All components are **visual-only** - no backend logic changes
- All existing functionality is preserved
- Components use Intersection Observer for scroll-triggered animations
- No external animation libraries required

