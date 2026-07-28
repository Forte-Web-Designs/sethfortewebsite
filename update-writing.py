#!/usr/bin/env python3
"""
update-writing.py — keep the writing lists in sync with what's actually published.

Reads every file in articles/, pulls its title and publish date straight from the
markup, sorts newest-first, and rewrites:

  * index.html    — the three latest, with dates
  * sitemap.xml   — <lastmod> for each article

writing.html is left alone on purpose: it is a hand-curated list of featured
pieces with written blurbs, not a feed.

Run it after publishing an article:

    python3 update-writing.py            # rewrite the files
    python3 update-writing.py --check    # report drift, change nothing (exit 1 if stale)

No build step, no dependencies, no framework — it just edits the HTML in place,
which keeps the links real <a> tags in the source (SEO, no-JS, instant paint).

Articles are read for two things only:
    <h1 class="article-title">Title</h1>
    <p class="article-meta">Mon D, YYYY</p>
An article missing either is reported and skipped rather than guessed at.
"""

import glob
import os
import re
import sys
from datetime import datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
HOMEPAGE_COUNT = 3

TITLE_RE = re.compile(r'<h1 class="article-title[^"]*">(.*?)</h1>', re.S)
META_RE = re.compile(r'<p class="article-meta[^"]*">(.*?)</p>', re.S)
TAG_RE = re.compile(r'<[^>]+>')


def text(fragment):
    """Strip tags and collapse whitespace, leaving the entity refs as authored."""
    return ' '.join(TAG_RE.sub('', fragment).split())


def read_articles():
    """Every article with a title and a parseable date, newest first."""
    found, skipped = [], []
    for path in sorted(glob.glob(os.path.join(ROOT, 'articles', '*.html'))):
        name = os.path.basename(path)
        if name.startswith('_') or ' ' in name:
            continue  # drafts and stray duplicates are not the published site
        html = open(path, encoding='utf-8').read()
        t, m = TITLE_RE.search(html), META_RE.search(html)
        if not (t and m):
            skipped.append((name, 'no article-title/article-meta'))
            continue
        raw = text(m.group(1))
        try:
            when = datetime.strptime(raw, '%b %d, %Y')
        except ValueError:
            skipped.append((name, f'unparseable date {raw!r}'))
            continue
        found.append({
            'href': f'/articles/{name}',
            'title': text(t.group(1)),
            'date': raw,
            'iso': when.strftime('%Y-%m-%d'),
            'when': when,
        })
    # newest first; ties broken by filename so the order is stable run to run
    found.sort(key=lambda a: (a['when'], a['href']), reverse=True)
    return found, skipped


def replace_block(html, start_pat, end_pat, new_inner, label):
    """Swap what sits between two markers, keeping the markers themselves."""
    m = re.search(start_pat + r'(.*?)' + end_pat, html, re.S)
    if not m:
        raise SystemExit(f'! could not find the {label} block — aborting, nothing written')
    return html[:m.start(1)] + new_inner + html[m.end(1):]


def homepage_markup(articles, indent='                    '):
    out = []
    for a in articles[:HOMEPAGE_COUNT]:
        out.append(
            f'{indent}<li><a href="{a["href"]}">'
            f'<span class="writing-preview-title">{a["title"]}</span>'
            f'<span class="writing-preview-date">{a["date"]}</span>'
            f'<span class="writing-preview-cta">Read &rarr;</span></a></li>'
        )
    return '\n' + '\n'.join(out) + '\n' + indent[:-4]




def update_sitemap(articles, check):
    path = os.path.join(ROOT, 'sitemap.xml')
    if not os.path.exists(path):
        return False
    xml = original = open(path, encoding='utf-8').read()
    for a in articles:
        # only touch entries already present; adding URLs is a routing decision
        pat = re.compile(
            r'(<loc>[^<]*' + re.escape(a['href']) + r'</loc>\s*<lastmod>)([^<]*)(</lastmod>)')
        xml = pat.sub(lambda m: m.group(1) + a['iso'] + m.group(3), xml)
    if xml != original and not check:
        open(path, 'w', encoding='utf-8').write(xml)
    return xml != original


def main():
    check = '--check' in sys.argv
    articles, skipped = read_articles()
    if not articles:
        raise SystemExit('! no articles found — aborting')

    for name, why in skipped:
        print(f'  skipped {name}: {why}')

    changed = []

    # --- homepage: the three latest ---
    home_path = os.path.join(ROOT, 'index.html')
    home = original_home = open(home_path, encoding='utf-8').read()
    home = replace_block(
        home,
        r'<ul class="writing-preview[^"]*">', r'</ul>',
        homepage_markup(articles), 'homepage writing-preview')
    if home != original_home:
        changed.append('index.html')
        if not check:
            open(home_path, 'w', encoding='utf-8').write(home)

    # writing.html is deliberately NOT touched: it is a hand-curated list of
    # featured pieces with written blurbs, not a feed. Regenerating it would
    # throw those blurbs away. Publishing flow stays: curate writing.html by
    # hand, let this script keep the homepage's "latest" honest.

    if update_sitemap(articles, check):
        changed.append('sitemap.xml')

    print(f'\n{len(articles)} articles, newest first:')
    for a in articles[:HOMEPAGE_COUNT]:
        print(f'  • {a["date"]:>13}  {a["title"]}')

    if check:
        if changed:
            print(f'\nSTALE — these would change: {", ".join(changed)}')
            print('Run: python3 update-writing.py')
            sys.exit(1)
        print('\nup to date ✓')
    else:
        print(f'\nwrote: {", ".join(changed) if changed else "nothing (already current)"}')


if __name__ == '__main__':
    main()
