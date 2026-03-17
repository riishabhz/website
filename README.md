# Rishabh Bhardwaj — Portfolio Website

A LinkedIn-style personal portfolio website for **Rishabh Bhardwaj**, Analytics Consultant based in London, UK.

🔗 **Live site:** [riishabhz.github.io/website](https://riishabhz.github.io/website/)
🔗 **LinkedIn:** [linkedin.com/in/rishabh-data-analytics](https://www.linkedin.com/in/rishabh-data-analytics/)

---

## Features

- LinkedIn-inspired UI — profile card with banner, two-column layout, card-based sections
- Dark / light mode toggle (persisted via `localStorage`)
- Smooth scroll navigation with active link highlighting
- Scroll-triggered card animations (IntersectionObserver)
- Animated skill counters
- Typing effect on name and title
- Reading progress bar
- Responsive — collapses to single column on mobile
- Contact form with clipboard copy + mailto fallback

---

## Project Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # All styles (LinkedIn design tokens, dark mode, responsive)
├── script.js           # JS — animations, dark mode, nav, counters, contact form
│
├── images/             # Portfolio & profile images
│   ├── dp.jpg                  # Profile photo
│   ├── testcricket.jpg         # Cricbuzz Scraper + Tableau project
│   ├── dbt.jpg                 # dbt + Snowflake project
│   ├── cryptodashboard.jpg     # Crypto Dashboard project
│   ├── sql.jpg                 # SQL project
│   ├── kpi.png                 # Power BI KPI Card project
│   ├── trump.png               # Trump Visit Wordcloud project
│   └── N8N Telegram.jpg        # AI Snowflake Telegram Bot project
│
└── logos/              # Company & university logos (stored locally — never use CDN URLs)
    ├── ondata.png              # ON-DATA
    ├── ey.png                  # Ernst & Young
    ├── fiserv.png              # Fiserv
    ├── benetton.png            # United Colors of Benetton
    ├── amity.png               # Amity University
    ├── birkbeck.ico            # Birkbeck, University of London
    └── linkedinbg.jpg          # Profile banner background
```

---

## Local Development

No build step needed — pure HTML/CSS/JS.

```bash
# Open directly in browser
open index.html

# Or serve locally
npx serve .
# then visit http://localhost:3000
```

---

## Sections

| Section | Description |
|---|---|
| About | Short bio, open to work badge |
| Skills | Animated proficiency counters (Power BI, SQL, Python, Snowflake…) |
| Experience | ON-DATA · EY · Fiserv · Benetton with company logos |
| Education | Birkbeck MSc · Amity BCA |
| Portfolio | GitHub project cards with screenshots |
| Contact | Email copy + direct email link |

---

## Image Policy

**Never use LinkedIn CDN URLs** — they expire monthly (`?e=TIMESTAMP`).
All images are stored locally under `images/` and `logos/`.

---

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- IntersectionObserver API for scroll animations
- CSS Grid & Flexbox for layout
- CSS custom properties for theming
