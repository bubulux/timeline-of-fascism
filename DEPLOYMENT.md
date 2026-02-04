# Deployment Guide

This guide covers deploying the Timeline of Fascism project to various hosting platforms.

## Build for Production

Before deploying, create a production build:

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers zero-config deployment for Vite projects.

#### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Method 2: GitHub Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

**Configuration**: No configuration needed - Vercel auto-detects Vite.

### Option 2: Netlify

#### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Method 2: Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy"

**Configuration** (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

#### Using gh-pages package

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Important**: Update `vite.config.ts` for GitHub Pages:

```typescript
export default defineConfig({
  base: "/your-repo-name/", // Add your repository name
  plugins: [react()],
  // ... rest of config
});
```

### Option 4: Static Hosting (Any Provider)

For traditional static hosts (AWS S3, DigitalOcean Spaces, etc.):

1. Build the project:

   ```bash
   npm run build
   ```

2. Upload the `dist/` folder contents to your hosting

3. Configure your server to:
   - Serve `index.html` for all routes (SPA fallback)
   - Set proper MIME types
   - Enable gzip compression

#### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Option 5: Docker

Create a `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
  listen 80;
  server_name localhost;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

Build and run:

```bash
docker build -t timeline-of-fascism .
docker run -p 8080:80 timeline-of-fascism
```

## Environment Configuration

### Base URL

If deploying to a subdirectory, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/subdirectory/",
  // ... rest of config
});
```

### Custom Domain

After deployment, configure your custom domain:

1. **Vercel/Netlify**: Add domain in dashboard
2. **GitHub Pages**: Add CNAME file with your domain
3. **Custom hosting**: Configure DNS A/CNAME records

## Post-Deployment Checklist

- [ ] Test all routes work (/, /germany/_, /usa/_)
- [ ] Verify images load correctly
- [ ] Check event drawer opens/closes
- [ ] Test zoom and pan functionality
- [ ] Confirm responsive behavior on mobile
- [ ] Validate deep links work (share URLs)
- [ ] Check browser console for errors
- [ ] Test on multiple browsers
- [ ] Verify performance (Lighthouse score)

## Performance Optimization

### Already Included

✅ Vite's automatic code splitting
✅ CSS minification
✅ Tree shaking
✅ Asset optimization

### Additional Optimizations

#### 1. Enable Compression

Most hosts enable this automatically. Verify gzip/brotli is active.

#### 2. CDN Configuration

Use a CDN for the `dist/assets/` folder for global distribution.

#### 3. Image Optimization

Replace SVG placeholders with optimized images:

- Use WebP format for photos
- Compress images (70-80% quality)
- Provide responsive sizes if needed

#### 4. Service Worker (Future)

Consider adding a service worker for offline support:

```bash
npm install -D vite-plugin-pwa
```

## Monitoring

### Error Tracking

Consider adding error tracking:

```bash
npm install @sentry/react
```

### Analytics

Add analytics if desired:

- Google Analytics
- Plausible (privacy-focused)
- Fathom Analytics

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm run deploy # or deploy to your platform
```

## Troubleshooting

### Routes Return 404

**Problem**: Direct URLs like `/germany/event-slug` return 404

**Solution**: Configure SPA fallback (see provider-specific instructions above)

### Images Not Loading

**Problem**: Images show as broken

**Solutions**:

- Verify files exist in `public/media/`
- Check paths start with `/media/`
- Ensure case-sensitive paths match

### Base URL Issues

**Problem**: Assets fail to load when deployed to subdirectory

**Solution**: Set `base` in `vite.config.ts`

### Build Fails

**Problem**: Build command fails

**Solutions**:

- Run `npm ci` instead of `npm install`
- Clear `node_modules` and reinstall
- Check Node version (18+ required)

## Security Considerations

### Content Security Policy

Add CSP headers if needed:

```
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'
```

### HTTPS

Always use HTTPS in production:

- Most platforms provide automatic HTTPS
- Use Let's Encrypt for custom servers

## Scaling

For high traffic:

1. Use a CDN (Cloudflare, CloudFront)
2. Enable edge caching
3. Consider serverless hosting
4. Monitor performance metrics

## Cost Estimate

- **Vercel/Netlify**: Free tier sufficient for most use
- **GitHub Pages**: Free
- **Custom hosting**: $5-20/month for VPS
- **CDN**: Usually free tier available

## Support

- Check build logs for errors
- Review browser console in production
- Test locally with `npm run preview`
- Verify all environment variables are set

---

**Recommended for this project**: Vercel or Netlify for simplicity and zero-config deployment.
