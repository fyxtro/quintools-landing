# QuinTools — Landing Page

A modern, single-page landing site that showcases every tool I build.
Static HTML/CSS/JS — no build step, no dependencies. Just open it or host it.

## ➕ Adding a new tool (the only thing you'll do often)

Open **`projects.js`** and copy an existing block to the **top** of the `PROJECTS` list:

```js
{
  title: "My New Tool",
  description: "One or two sentences about what it does.",
  category: "Security",          // reuse a name to group tools together
  status: "live",                // "live" | "wip" | "planned"
  url: "https://link-to-tool",   // leave "" for "Coming soon"
  repo: "https://github.com/...",// optional — shows a GitHub button
  icon: "🚀",                     // any emoji
  tags: ["Python", "CLI"],       // optional small labels
  featured: false,               // true = wider, highlighted card
},
```

Save → commit → push. The card, filter chip, and stats all update automatically.

### Giving a category its own color

In `projects.js`, add it to `CATEGORIES`:

```js
const CATEGORIES = {
  "GTA V":    { color: "#f5a623", icon: "🎮" },
  "Security": { color: "#3ddc97", icon: "🔒" },
  "Web Apps": { color: "#7aa2ff", icon: "🌐" },
};
```

## 🎨 Reskinning

All colors, fonts and radii live in the `:root { … }` block at the top of
**`styles.css`**. Change `--accent` and `--accent-2` to reskin the whole site.

## 📁 Files

| File          | What it's for                                    |
|---------------|--------------------------------------------------|
| `index.html`  | Page structure (hero, sections, footer).         |
| `projects.js` | **Your project list** — the file you edit most.  |
| `app.js`      | Renders cards/filters/search. Rarely touched.    |
| `styles.css`  | Design tokens + styling.                          |

## 👀 Previewing locally

Just open `index.html` in a browser. Or run a tiny server for clean paths:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## 🚀 Publishing with GitHub Pages

1. Push this repo to GitHub.
2. Repo **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**,
   pick branch **`main`** and folder **`/ (root)`**, then **Save**.
4. Your site goes live at `https://fyxtro.github.io/quintools-landing/`.

> Note: the repo is private. GitHub Pages on private repos requires a paid
> plan — otherwise make the repo public, or deploy free on
> [Netlify](https://netlify.com) / [Vercel](https://vercel.com) / Cloudflare
> Pages by pointing them at this repo (drag-and-drop the folder also works).
