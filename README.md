# Academic Website for Qian Li (李倩)

A modern, responsive academic website built with Jekyll featuring content-presentation separation. This website showcases academic achievements, publications, news, and recruitment information in a professional, user-friendly interface.

## 🎯 Features

- **Content-Presentation Separation**: All content managed through YAML/Markdown files
- **Modern Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Built-in theme toggle with user preference persistence
- **Interactive Navigation**: Smooth scrolling with active section highlighting
- **Publication Management**: Advanced filtering by year, venue type, and CCF ranking
- **News & Updates**: Blog-style news posts with featured content
- **Academic Services**: Comprehensive service history display
- **Student Mentorship**: Dedicated section for current students and achievements
- **Recruitment Portal**: Dynamic openings with application process
- **Performance Optimized**: Lazy loading, CSS/JS minification, and caching
- **SEO Ready**: Built-in SEO tags, sitemap, and social sharing optimization

## 📁 Project Structure

```
├── _config.yml                 # Jekyll configuration & site settings
├── _data/                      # Content data files (YAML)
│   ├── author.yml             # Personal information & bio
│   ├── publications.yml       # Publication list with metadata
│   ├── awards.yml             # Awards and honors
│   ├── services.yml           # Academic & social services
│   ├── mentorship.yml         # Current students & achievements
│   └── openings.yml           # Recruitment information
├── _layouts/                   # HTML templates
│   ├── default.html           # Main site layout
│   └── post.html              # News post layout
├── _posts/                     # News & announcements (Markdown)
│   ├── 2025-01-25-acm-mm-papers.md
│   ├── 2025-01-20-postdoc-program.md
│   └── ...
├── assets/                     # Static assets
│   ├── css/main.css           # Comprehensive styling (1850+ lines)
│   ├── js/main.js             # Interactive features (590+ lines)
│   ├── images/qian_li.jpg     # Profile photo
│   └── publications.bib       # BibTeX file (80 entries)
├── index.html                  # Homepage template
├── info.md                     # Additional content information
├── Gemfile                     # Ruby dependencies
└── README.md                   # This documentation
```

## 🚀 Quick Start

### Prerequisites

- Ruby 2.7 or higher
- Bundler gem

### Installation

1. **Clone this repository:**
   ```bash
   git clone <your-repo-url>
   cd personal_page
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Run the development server:**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser** and visit `http://localhost:4000`

## ✏️ Content Management

All content is managed through YAML data files - **no HTML editing required** for content updates.

### Personal Information (`_data/author.yml`)

```yaml
name: "Qian Li"
name_chinese: "李倩"
title: "Postdoc. in Knowledge Graph"
affiliation: "Beijing University of Posts and Telecommunications (BUPT)"
location: "Beijing, China"

contact:
  email: "li.qian@bupt.edu.cn"
  github: "https://github.com/xiaoqian19940510"
  google_scholar: "https://scholar.google.com/citations?user=AHg-JGIAAAAJ"

research_interests:
  - "Natural Language Processing"
  - "Knowledge Graph"
  - "Multi-modal Machine Learning"

bio: |
  Your detailed biography here...

education:
  - degree: "Ph.D. in Computer Science"
    institution: "Beihang University (BUAA)"
    year: "2024"
```

### Publications (`_data/publications.yml`)

```yaml
papers:
  - title: "Your Paper Title"
    authors: ["Qian Li", "Co-author 1", "Co-author 2"]
    venue: "IJCAI"
    venue_full: "International Joint Conference on Artificial Intelligence"
    year: 2025
    type: "conference"
    ccf_rank: "A"
    featured: true
    first_author: true
    url: "https://paper-url.com"
    esi_highly_cited: true

stats:
  total_papers: 36
  first_author_papers: 15
  ccf_a_papers: 16
```

### News Posts (`_posts/`)

Create new Markdown files with this format:

```markdown
---
layout: post
title: "Your News Title"
date: 2025-01-25
categories: [news, publications]
featured: true
---

Your news content here...
```

### Academic Services (`_data/services.yml`)

```yaml
conference_journal_reviewer:
  leadership_roles:
    - role: "Area Chair"
      venues: ["NeurIPS", "ACL Rolling", "CCL"]
  
  workshop_chairs:
    - role: "SIGIR 2025 Workshop Program Chair"
      year: "2025"
```

### Student Mentorship (`_data/mentorship.yml`)

```yaml
students:
  - name: "Student Name"
    name_en: "Student Name EN"
    affiliation: "Institution"
    level: "Ph.D. Student"
    achievement: "Paper published in IJCAI 2025"
    avatar_color: "#4F46E5"
```

### Recruitment (`_data/openings.yml`)

```yaml
recruiting: true
recruiting_message: "I am actively looking for motivated students!"

positions:
  - type: "Ph.D. Students"
    available: 2
    description: "Seeking candidates with strong NLP background"

research_directions:
  - title: "Knowledge Graph Construction"
    description: "Developing automatic KG construction methods"
    icon: "🧠"
```

## 🎨 Design Features

### Responsive Layout
- **Mobile-first design** with breakpoints at 768px and 1024px
- **Touch-friendly navigation** with hamburger menu
- **Optimized typography** across all screen sizes

### Interactive Elements
- **Dynamic publication filtering** by year, CCF rank, and type
- **Smooth scrolling navigation** with active section highlighting
- **Hover effects** and transitions throughout
- **Dark mode toggle** with preference persistence

### Performance
- **Lazy loading** for images and non-critical content
- **CSS/JS minification** in production
- **Intersection Observer** for efficient scroll tracking
- **Debounced/throttled** event handlers

## 🔧 Advanced Features

### Publication System
- **Advanced filtering** with real-time updates
- **CCF ranking badges** (A/B/Other)
- **ESI highly cited** indicators
- **Featured publication** highlighting
- **BibTeX integration** for easy import

### Theme System
- **CSS custom properties** for easy customization
- **Automatic dark mode** detection
- **Smooth theme transitions**
- **Local storage** preference saving

### SEO & Analytics
- **Jekyll SEO plugin** integration
- **Structured data** for search engines
- **Social media** meta tags
- **Sitemap** auto-generation
- **Fast loading** optimization

## 🎯 Customization

### Colors
Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #f59e0b;
  --accent-color: #10b981;
  /* 50+ more variables available */
}
```

### Adding New Sections
1. Create data file in `_data/` (if needed)
2. Add HTML section to `index.html`
3. Add corresponding CSS styles
4. Update navigation in `_config.yml`

### Publication Filters
Modify filter options in `assets/js/main.js`:

```javascript
// Add new filter categories
const filters = {
  year: ['all', '2025', '2024', '2023'],
  ccf: ['all', 'A', 'B', 'other'],
  type: ['all', 'conference', 'journal']
};
```

## 🚢 Deployment

### GitHub Pages (Recommended)

1. **Configure repository:**
   - Repository name: `username.github.io` (for user page)
   - Enable GitHub Pages in Settings

2. **Update `_config.yml`:**
   ```yaml
   url: "https://username.github.io"
   ```

3. **Push changes:**
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin master
   ```

### Custom Domain
1. Add `CNAME` file with your domain
2. Configure DNS records
3. Enable HTTPS in GitHub Pages settings

### Other Hosting
```bash
bundle exec jekyll build
# Upload _site/ folder to your hosting provider
```

## 🔄 Maintenance Tasks

### Adding Publications
1. **Update** `_data/publications.yml` with new papers
2. **Add** corresponding BibTeX entries to `assets/publications.bib`
3. **Create** news post announcing the publication
4. **Update** statistics in publications.yml

### Managing Students
1. **Update** `_data/mentorship.yml` with current students
2. **Add** student achievements and publications
3. **Update** recruitment status in `_data/openings.yml`

### Content Updates
1. **Personal info**: Edit `_data/author.yml`
2. **Awards**: Update `_data/awards.yml`
3. **Services**: Modify `_data/services.yml`
4. **News**: Add new posts to `_posts/`

## 🆘 Troubleshooting

### Common Issues

**Build failures:**
- Check YAML syntax in data files
- Verify Jekyll and plugin versions
- Run `bundle update` to update gems

**Styling issues:**
- Clear browser cache
- Check CSS variable names
- Verify media query breakpoints

**JavaScript errors:**
- Check browser console for errors
- Ensure DOM elements exist before manipulation
- Verify event listener attachments

### Performance Issues
- **Large images**: Compress and optimize images
- **Slow loading**: Enable GitHub Pages caching
- **Mobile performance**: Test on actual devices

## 📊 Site Statistics

- **Total Files**: 20+ content files
- **CSS Lines**: 1,850+ lines of optimized styles  
- **JavaScript**: 590+ lines of interactive features
- **Publications**: 36 papers with full metadata
- **News Posts**: 6 recent announcements
- **Data Files**: 6 YAML content files

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions welcome:
- **Bug reports** via GitHub issues
- **Feature suggestions**
- **Pull requests** for improvements
- **Documentation** updates

---

**Built with ❤️ for the academic community**

For questions or support, please open an issue on GitHub. 