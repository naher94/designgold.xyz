# Design Gold

A podcast about design and product — what it takes to create great experiences, and what happens when critical details are ignored, overlooked, or misunderstood.

Hosted by [Rehan Butt](https://rehanbutt.com) & [Lily Samuels](https://lilysamuels.com)

[designgold.xyz](https://designgold.xyz)

## Tech Stack

- **Static Site Generator:** Jekyll
- **Grid System:** Foundation XY Grid
- **Styling:** SCSS with a semantic color system supporting light and dark mode
- **Typography:** Space Grotesk
- **Deployment:** GitHub Pages

## Project Structure

```
_config.yml          # Site settings (title, description, host URLs)
index.html           # Homepage — intro, hosts, listen links, episode list
_layouts/            # Page templates (default, page, post)
_includes/           # Partials (header, footer, head, SVG icons)
_data/
  episodes.json      # Episode metadata (title, description, date, links, season)
css/
  designgold.scss    # Main stylesheet
_sass/
  designsystem.scss  # Colors, typography, and design tokens
  header.scss        # Header styles
  footer.scss        # Footer styles
  app.scss           # Foundation imports
img/                 # Images (host photos, platform icons, logos)
```

## Adding a New Episode

Add an entry to `_data/episodes.json` with the following fields:

```json
{
  "title": "Episode Title",
  "description": "Episode description text.",
  "pubDate": "Month Day, Year",
  "rawDate": "YYYY-MM-DDTHH:MM:SS.000Z",
  "duration": "45 MIN",
  "image": "https://...",
  "link": "https://podcasters.spotify.com/...",
  "audioUrl": "https://...",
  "episodeNumber": 1,
  "season": 3
}
```

Episodes with `season >= 3` appear in the main list. Earlier seasons appear under "The early days of Design Gold."

## Design System

The site uses a semantic color system defined in `_sass/designsystem.scss`. Colors are mapped as CSS custom properties and automatically switch between light and dark mode via `prefers-color-scheme`.

Key tokens: `text`, `text-muted`, `background`, `card-hover-bg`, `gold`, `trailer-card-bg`.
