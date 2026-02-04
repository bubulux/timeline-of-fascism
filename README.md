# Timeline of Fascism

An interactive dual-country timeline visualization exploring historical events in Germany and the USA. Built with React, TypeScript, and Vite, featuring a Git-based content management system.

## Features

- **Dual-lane timeline**: Parallel visualization of Germany and USA events on a shared time axis
- **Zoom & pan controls**: Navigate from year-level (most zoomed out) to day-level (most zoomed in)
- **Smart event clustering**: Automatic stacking and clustering of overlapping events
- **Interactive event markers**: Hover for previews, click for detailed view
- **Deep linking**: Shareable URLs for specific events
- **Dark mode**: Beautiful dark theme with reddish accents
- **Responsive design**: Works on desktop and mobile devices
- **Git-based CMS**: All content stored as Markdown files with YAML frontmatter

## Getting Started

### Prerequisites

- Node.js 18+
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
```

The application will be available at `http://localhost:5173`

## Adding Events

### File Location & Naming

Events are stored as Markdown files in:

- **Germany**: `src/content/events/DE/`
- **USA**: `src/content/events/US/`

**File naming convention**: Use kebab-case for filenames (e.g., `weimar-republic-established.md`). The filename becomes the event's slug used in URLs.

### Event File Structure

Each event file must have YAML frontmatter at the top, followed by Markdown content:

```markdown
---
title: "Event Title"
country: "Germany" # or "USA"
date: "1933-01-30" # See date formats below
summary: "Short summary (optional)"
cover:
  src: "/media/covers/example.jpg"
  alt: "Alt text for accessibility"
  credit: "Photo credit (REQUIRED)"
  creditUrl: "https://source-url.com"
media:
  - type: "image"
    src: "/media/events/image1.jpg"
    alt: "Alt text"
    caption: "Optional caption"
    credit: "Image credit (REQUIRED)"
    creditUrl: "https://source-url.com"
---

## Main Content

Write your article content here using Markdown.

### Subsection

Use standard Markdown formatting:

- Lists
- **Bold** and _italic_ text
- [Links](https://example.com)
- etc.

### Sources

- Source 1
- Source 2
```

### Required Fields

- `title`: Event title (string)
- `country`: Either `"Germany"` or `"USA"`
- `date`: Date string (see formats below)

### Optional Fields

- `summary`: Short description for future use
- `cover`: Cover image object (if included, must have `credit`)
- `media`: Array of media items (each must have `credit`)

### Date Formats

The timeline supports three levels of precision:

| Format       | Precision      | Example        | Display          |
| ------------ | -------------- | -------------- | ---------------- |
| `YYYY`       | Year only      | `"1933"`       | 1933             |
| `YYYY-MM`    | Year and month | `"1933-01"`    | January 1933     |
| `YYYY-MM-DD` | Full date      | `"1933-01-30"` | January 30, 1933 |

**How it works**:

- The system converts all dates to a comparable timestamp for sorting and positioning
- Year-only dates are treated as January 1st internally
- Month-only dates are treated as the 1st of that month internally
- The original precision is preserved and shown in the UI

### Media & Images

#### Image Storage

Place images in the `public/media/` directory:

- **Cover images**: `public/media/covers/`
- **Event media**: `public/media/events/`

#### Image Paths

Reference images using paths starting with `/media/`:

```yaml
cover:
  src: "/media/covers/my-image.jpg"
```

#### Credit Requirements

**All images MUST include a credit line**. This is required for both cover images and media items:

```yaml
cover:
  src: "/media/covers/example.jpg"
  alt: "Description for accessibility"
  credit: "Bundesarchiv, Bild 146-1972-026-11" # REQUIRED
  creditUrl: "https://source-url.com" # Optional but recommended
```

Credits are displayed beneath images with links (if `creditUrl` is provided).

### Media Array

For additional images beyond the cover:

```yaml
media:
  - type: "image"
    src: "/media/events/image1.jpg"
    alt: "Alt text"
    caption: "Optional explanatory text"
    credit: "Source name / archive" # REQUIRED
    creditUrl: "https://source.com" # Optional
  - type: "image"
    src: "/media/events/image2.jpg"
    alt: "Alt text"
    credit: "Another source"
```

Currently only `"image"` type is supported.

## Example Events

The project includes sample events demonstrating different features:

### Germany

- **weimar-republic-established.md** - Year-only date (1919)
- **beer-hall-putsch.md** - Year-month date (1923-11)
- **hitler-appointed-chancellor.md** - Full date (1933-01-30) with cover and media

### USA

- **first-red-scare.md** - Year-only date (1919)
- **great-depression-begins.md** - Year-month date (1929-10)
- **madison-square-garden-rally.md** - Full date (1939-02-20) with cover

## Timeline Controls

### Navigation

- **Mouse wheel / trackpad**: Zoom in and out
- **Click and drag**: Pan left and right
- **Touch gestures**: Pinch to zoom, drag to pan (mobile)

### Zoom Levels

- **Most zoomed out**: Year precision (years shown on axis)
- **Medium zoom**: Month precision (months shown on axis)
- **Most zoomed in**: Day precision (days/weeks shown on axis)

### Event Interaction

- **Hover**: Shows tooltip with date, title, and cover thumbnail (if available)
- **Click**: Opens detailed drawer view
- **Clustered events**: Shows "+N" badge; click to see all events

### Drawer

- **Desktop**: Appears as 1/3 width drawer on right side
- **Mobile**: Appears as full-screen overlay
- **Close**: Click X button, press Escape, or click outside (mobile)
- **URL**: Opening an event updates the URL for sharing

## Routing

- **Base route**: `/` - Timeline view
- **Event route**: `/:country/:slug` - Timeline with event drawer open
  - Example: `/germany/hitler-appointed-chancellor`
  - Country is lowercase: `germany` or `usa`
  - Slug matches the filename

## Project Structure

```
timeline-of-fascism/
├── public/
│   └── media/
│       ├── covers/          # Cover images
│       └── events/          # Event media
├── src/
│   ├── components/
│   │   ├── Timeline.tsx     # Main timeline component
│   │   ├── TimeAxis.tsx     # Time ruler/scale
│   │   ├── EventMarker.tsx  # Event markers with tooltips
│   │   └── EventDrawer.tsx  # Event detail drawer
│   ├── content/
│   │   └── events/
│   │       ├── DE/          # Germany events
│   │       └── US/          # USA events
│   ├── lib/
│   │   ├── events.ts        # Event loading & parsing
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   └── event.ts         # TypeScript types
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling with dark mode support
- **React Router**: Routing and deep linking
- **gray-matter**: YAML frontmatter parsing
- **react-markdown**: Markdown rendering
- **date-fns**: Date formatting

## Development

### Linting

```bash
npm run lint
```

### Adding Dependencies

```bash
npm install <package-name>
```

### Modifying Styles

The project uses Tailwind CSS with a custom theme in `tailwind.config.js`. The dark mode color scheme is defined in `src/index.css` using CSS custom properties.

**Key colors**:

- Primary: Reddish accent (`hsl(0, 72.2%, 50.6%)`)
- Accent: Lighter red (`hsl(0, 84.2%, 60.2%)`)
- Background: Dark (`hsl(0, 0%, 7%)`)

## Contributing

1. Add event markdown files to appropriate country folder
2. Include cover images in `public/media/covers/`
3. Include additional media in `public/media/events/`
4. Always provide image credits
5. Use appropriate date precision
6. Write clear, factual content
7. Include sources at the bottom of markdown content

## Future Enhancements

Potential features not currently implemented:

- Search functionality
- Tag/category filtering
- Video embeds
- Export/print functionality
- Multiple language support
- Admin UI for content editing

## License

This project is for educational purposes.

---

**Note on Historical Content**: This timeline deals with sensitive historical topics. All content should be factual, well-sourced, and presented with appropriate historical context.
