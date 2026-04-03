```
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
```

## Repository Overview

This is a **Jekyll-based GitHub Pages website** for Android tutorials in Chinese. It provides beginner-friendly Android development tutorials with a step-by-step interactive format.

## Key Technologies & Tools

- **Static Site Generator**: Jekyll 4.3
- **CSS Preprocessor**: Sass/SCSS
- **Syntax Highlighting**: Rouge
- **Markdown Processor**: Kramdown
- **Image Processing**: jekyll_picture_tag
- **Analytics**: Busuanzi (site visits)
- **Comments**: Giscus
- **Hosting**: GitHub Pages

## Project Structure

```
android-tutorials/
├── _tutorials/              # Tutorial content files (markdown)
│   ├── set-up-android-studio.md
│   ├── your-first-application.md
│   ├── list-view.md
│   ├── switching-between-activities.md
│   ├── progress-bar.md
│   ├── media-player.md
│   └── color-difference-game.md
├── _layouts/                # Jekyll page layouts
│   ├── default.html        # Default layout
│   └── tutorial.html       # Tutorial-specific layout with progress tracking
├── _includes/               # Reusable components
│   ├── header.html
│   ├── footer.html
│   └── comments.html
├── _sass/                   # SASS stylesheets
│   ├── _variables.scss
│   ├── _responsive.scss
│   └── _components.scss
├── assets/                   # Static assets
│   ├── css/                 # Compiled CSS
│   ├── images/              # Tutorial images
│   └── js/                  # JavaScript files
├── index.md                 # Homepage
├── _config.yml              # Jekyll configuration
├── Gemfile                  # Ruby dependencies
└── .github/workflows/       # GitHub Actions workflows
    └── jekyll.yml          # Build and deploy workflow
```

## Development Workflow

### Install Dependencies

```bash
# Install bundler (if not installed)
gem install bundler

# Install project dependencies
bundle install
```

### Serve Locally for Development

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000/android-tutorials/`

### Build for Production

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

Output will be in the `_site` directory.

## Tutorial Format

Tutorials are written in Markdown and must follow this format:

```markdown
---
layout: tutorial
title: "Tutorial Title"
tutorial_name: unique-tutorial-slug 
difficulty: Beginner/Intermediate/Advanced
duration: X mins
creator: Author Name
date: YYYY-MM-DD
---

## 准备工作 (Prerequisites)
[Content]

## Summary
[Content]

## Step 1: [Title]
[Content]

## Step 2: [Title]
[Content]

...
```

Key layout features:
- Tutorials automatically generate a sidebar with step navigation
- Progress is saved to localStorage
- Print-to-PDF functionality available
- Step completion tracking with visual indicators

## Key Files to Modify

- **Add/Update Tutorials**: Edit files in `_tutorials/`
- **Update Site Styles**: Modify `_sass/` files (compiles to `assets/css/main.css`)
- **Change Layout**: Edit `_layouts/tutorial.html` or `_layouts/default.html`
- **Update Configuration**: Edit `_config.yml`

## Deployment

The site is automatically deployed to GitHub Pages via the `jekyll.yml` workflow when changes are pushed to the `main` branch.
