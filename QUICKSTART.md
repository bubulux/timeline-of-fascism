# Quick Start Guide

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Adding Your First Event

1. Create a new `.md` file in `src/content/events/DE/` or `src/content/events/US/`
2. Use kebab-case for the filename (e.g., `my-event-1945.md`)
3. Add YAML frontmatter:

```markdown
---
title: "Your Event Title"
country: "Germany"
date: "1945-05-08"
---

## Content

Write your event description here using Markdown.

### Sources

- Source 1
- Source 2
```

4. Save the file and the timeline will automatically update

## Date Formats

- **Year only**: `"1933"`
- **Year and month**: `"1933-01"`
- **Full date**: `"1933-01-30"`

## Adding Images

1. Place images in `public/media/covers/` or `public/media/events/`
2. Reference them in frontmatter:

```yaml
cover:
  src: "/media/covers/my-image.jpg"
  alt: "Image description"
  credit: "Source name"
  creditUrl: "https://source.url"
```

**Remember**: All images must include a credit!

## Project Structure

- `src/content/events/DE/` - Germany events
- `src/content/events/US/` - USA events
- `public/media/` - Images and media files
- `src/components/` - React components
- `src/lib/` - Utility functions

For full documentation, see [README.md](README.md)
