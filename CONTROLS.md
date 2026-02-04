# Timeline Controls & Interactions

## Mouse Controls

### Navigation

- **Scroll Wheel Up/Down** - Zoom in/out (centered on cursor)
- **Click + Drag** - Pan timeline left/right
- **Click Event Marker** - Open event details
- **Hover Event Marker** - Show tooltip preview

### Event Drawer

- **Click X Button** - Close drawer
- **Click Outside** (mobile) - Close drawer
- **ESC Key** - Close drawer

## Touch Controls (Mobile/Tablet)

### Timeline

- **Pinch Gesture** - Zoom in/out
- **Swipe Left/Right** - Pan timeline
- **Tap Event Marker** - Open event details
- **Long Press** - Show tooltip (if supported)

### Drawer

- **Tap X Button** - Close
- **Tap Backdrop** - Close
- **Swipe Down** - Close (if implemented)

## Keyboard Controls

- **ESC** - Close event drawer
- **Tab** - Navigate to next interactive element
- **Shift + Tab** - Navigate to previous element
- **Enter/Space** - Activate focused element

## Zoom Behavior

### Zoom Levels

1. **Year Level** (Most zoomed out)
   - Shows year markers: 1919, 1920, 1921...
   - Events grouped by year
   - Best for overview

2. **Month Level** (Medium zoom)
   - Shows month markers: Jan 1933, Feb 1933...
   - Events grouped by month
   - Good for browsing

3. **Day Level** (Most zoomed in)
   - Shows day/week markers: Jan 1, Jan 7, Jan 14...
   - Individual day precision
   - Best for detailed analysis

### Zoom Controls

- Continuous zoom with smooth transitions
- Zoom centers on cursor position
- Timeline automatically redraws scale
- Hard limits prevent over-zoom

## Event Clustering

When multiple events are too close to display:

1. **Stacking** (First strategy)
   - Events stack vertically in sublanes
   - Up to 4 sublanes per country
   - Each sublane offset by 20px

2. **Clustering** (Fallback strategy)
   - When stacking exceeds limit
   - Shows "+N" badge on cluster marker
   - Click cluster to zoom in or see list
   - Clusters form when 3+ events overlap

## URL Patterns

### Base Timeline

```
http://localhost:5173/
```

Shows timeline without any event selected.

### Event Detail

```
http://localhost:5173/germany/beer-hall-putsch
http://localhost:5173/usa/madison-square-garden-rally
```

Shows timeline with specific event drawer open.

### URL Structure

```
/:country/:slug

country: "germany" or "usa" (lowercase)
slug: filename without .md extension
```

## State Management

### What's Preserved

- ✅ Zoom level (during event selection)
- ✅ Pan position (during event selection)
- ✅ Timeline state (when drawer opens)

### What Resets

- ❌ Zoom/pan when page refreshes
- ❌ Scroll position in drawer

### URL State

- Event selection → Updates URL
- Close drawer → Returns to `/`
- Direct URL → Opens event + positions timeline

## Responsive Breakpoints

### Desktop (≥768px)

- Drawer: 33.33% width (1/3 viewport)
- Timeline: Remains visible (66.67% width)
- Side-by-side layout

### Mobile (<768px)

- Drawer: 100% width with backdrop
- Timeline: Behind drawer
- Full-screen modal behavior

## Accessibility

### Focus Management

- Interactive elements are keyboard-accessible
- Focus visible on all controls
- Tab order follows visual flow
- ESC key works consistently

### Visual Feedback

- Hover states on all interactive elements
- Active state for selected event
- Focus rings for keyboard navigation
- Loading states (if applicable)

### Screen Readers

- Alt text on all images
- Semantic HTML structure
- ARIA labels where needed
- Descriptive button text

## Performance Tips

### For Best Experience

1. **Use modern browser** (Chrome, Firefox, Safari, Edge)
2. **Enable JavaScript** (required for React)
3. **Use mouse/trackpad** for precise zoom control
4. **Start zoomed out** to see full timeline
5. **Zoom in gradually** to explore details

### Known Limitations

- Very large datasets may slow rendering
- Extreme zoom levels may reduce performance
- Mobile pinch-zoom requires touch-capable device

## Common Actions

### "I want to see all events"

1. Zoom out to year level (scroll wheel down)
2. Pan left/right to browse timeline
3. Look for event markers in both lanes

### "I want to read about a specific event"

1. Locate event marker on timeline
2. Click marker to open drawer
3. Read content, view images, check sources

### "I want to share a specific event"

1. Click event to open drawer
2. Copy URL from browser address bar
3. Share URL - it will open that specific event

### "I want to compare two events"

1. Note their positions on timeline
2. Zoom to appropriate level to see both
3. Click each to read details
4. Use browser back/forward to switch

### "I want to add a new event"

See [QUICKSTART.md](QUICKSTART.md) for instructions.

## Troubleshooting

### Timeline won't zoom

- Check if mouse is over timeline area
- Try using trackpad if mouse wheel doesn't work
- Refresh page if controls become unresponsive

### Event drawer won't open

- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page

### Images not loading

- Check file path in frontmatter
- Ensure images exist in `public/media/`
- Verify image file extensions match

### URL sharing doesn't work

- Check URL format: `/:country/:slug`
- Ensure slug matches filename exactly
- Verify event file exists

---

For technical documentation, see [README.md](README.md)
