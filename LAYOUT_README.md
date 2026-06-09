# Flowiq Layout Architecture

Production-ready layout system for Flowiq - AI Business Operator.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Framer Motion**
- **Lucide Icons**

## Structure

```
flowiq-frontend/
├── app/
│   ├── layout.tsx              # Root layout with dark theme
│   ├── page.tsx                # Dashboard page
│   ├── analytics/              # Analytics page
│   ├── chat/                   # AI Chat interface
│   ├── forecasts/              # Business forecasts
│   ├── reports/                # Reports management
│   ├── integrations/           # Integration hub
│   └── settings/               # Settings page
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Fixed navigation sidebar
│   │   ├── TopNav.tsx          # Top navigation bar
│   │   ├── MainLayout.tsx      # Main layout wrapper
│   │   └── index.ts            # Barrel exports
│   └── ui/                     # shadcn/ui components
└── app/globals.css             # Global styles & theme
```

## Design System

### Colors (Dark Theme)

- **Background**: Graphite (`oklch(0.12 0.01 270)`)
- **Card**: Darker graphite with blur (`oklch(0.16 0.01 270)`)
- **Primary**: Electric violet (`oklch(0.65 0.25 270)`)
- **Accent**: Blue (`oklch(0.60 0.20 240)`)
- **Border radius**: 20-24px (2xl)

### Typography

- **Fonts**: Geist Sans & Geist Mono
- **Scale**: Modern, generous spacing
- **Weight**: Medium to Bold for headings

### Components

All components use:
- Rounded 2xl corners (20-24px)
- Glass morphism effects
- Smooth animations via Framer Motion
- Backdrop blur
- Subtle gradients

## Layout Components

### Sidebar

**Location**: `components/layout/Sidebar.tsx`

- Fixed position
- 256px width
- Active state with animated indicator
- Bottom AI assistant status
- Smooth hover states

**Navigation Items**:
1. Dashboard
2. Analytics
3. AI Chat
4. Forecasts
5. Reports
6. Integrations
7. Settings

### TopNav

**Location**: `components/layout/TopNav.tsx`

- Sticky position with backdrop blur
- Global search bar
- Notification bell with badge
- User dropdown menu
- Responsive design

### MainLayout

**Location**: `components/layout/MainLayout.tsx`

- Combines Sidebar + TopNav
- Manages content area
- Page transition animations
- Background gradient effects

## Usage

### Basic Page Template

```tsx
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";

export default function MyPage() {
  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Title</h1>
          <p className="text-muted-foreground">Description</p>
        </div>

        <Card className="rounded-2xl border-border/50 bg-card/50 p-6 backdrop-blur-sm">
          {/* Your content */}
        </Card>
      </div>
    </MainLayout>
  );
}
```

### Card Styles

Standard card styling for consistency:

```tsx
<Card className="rounded-2xl border-border/50 bg-card/50 p-6 backdrop-blur-sm">
  {/* Content */}
</Card>
```

### Stat Cards

```tsx
<Card className="rounded-2xl border-border/50 bg-card/50 p-6 backdrop-blur-sm">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-muted-foreground">Label</p>
      <h3 className="mt-2 text-2xl font-bold">$45,231</h3>
      <div className="mt-1 flex items-center gap-1 text-sm text-emerald-500">
        <TrendingUp className="h-4 w-4" />
        <span>+20.1%</span>
      </div>
    </div>
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
      <Icon className="h-6 w-6 text-emerald-500" />
    </div>
  </div>
</Card>
```

## Animation Patterns

### Page Transitions

Pages use fade-in with slight upward motion:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### Sidebar Active State

Animated layout indicator follows active item:

```tsx
<motion.div
  layoutId="sidebar-indicator"
  className="absolute inset-0 rounded-2xl bg-sidebar-accent"
  transition={{
    type: "spring",
    stiffness: 350,
    damping: 30,
  }}
/>
```

## Theme

Dark theme is enabled by default in root layout:

```tsx
<html className="dark">
```

All colors are defined in `app/globals.css` using OKLCH color space for better perceptual uniformity.

## Best Practices

1. **Always use MainLayout** for authenticated pages
2. **Consistent spacing**: `space-y-6` and `p-6` for page containers
3. **Card styling**: Always include `rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm`
4. **Icons**: Use Lucide React, 16-24px size
5. **Typography**: 
   - Page title: `text-3xl font-bold tracking-tight`
   - Subtitle: `text-muted-foreground`
6. **Buttons**: Always use `rounded-xl` or higher
7. **Animations**: Keep duration < 500ms for snappy feel

## Responsive Design

- Sidebar is fixed on desktop
- Mobile sidebar (to be implemented)
- Grid layouts use responsive breakpoints: `md:grid-cols-2 lg:grid-cols-4`

## Performance

- Client components marked with "use client"
- Framer Motion animations are GPU-accelerated
- Layout shift prevented with fixed sidebar width
- Images optimized with Next.js Image component

## Future Enhancements

- [ ] Mobile sidebar with sheet/drawer
- [ ] Theme switcher (light/dark toggle)
- [ ] Sidebar collapse/expand
- [ ] Breadcrumb navigation
- [ ] Command palette (CMD+K)
- [ ] Page loading states
- [ ] Error boundaries

## Design References

The layout is inspired by:
- **Stripe Dashboard** - Clean, professional fintech UI
- **Linear** - Modern SaaS aesthetic
- **Mercury** - Premium banking interface
- **Ramp** - Business-focused design
- **OpenAI** - AI-first product design
