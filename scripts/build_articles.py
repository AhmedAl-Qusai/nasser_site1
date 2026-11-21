import re, json, html
from html.parser import HTMLParser
src=open('/home/claude/site/bunyan_website/decorations.html',encoding='utf8').read()
slugs=['decorations-alahsa','marble-alternative-alahsa','interior-paint-alahsa','gypsum-board-alahsa','wallpaper-alahsa','tv-wall-decor-alahsa','home-renovation-alahsa','wood-alternative-alahsa','exterior-paint-alahsa','painter-alahsa']
clean=lambda t: re.sub(r'\s+',' ',html.unescape(t)).strip()
heading=lambda t: re.sub(r'^[^\w\u0600-\u06FF]+','',clean(t))
out=[]
for n in range(1,11):
    m=re.search(r'<div class="article-card-large[^"]*" id="article%d">(.*?)(?=<!-- المقال %d|</div>\s*</section>)'%(n,n+1),src,re.S)
    b=m.group(1)
    img=re.search(r'src="images/([^"]+)\.jpg" alt="([^"]*)"',b)
    title=clean(re.search(r'<h2 class="article-title">(.*?)</h2>',b,re.S).group(1))
    exc=clean(re.search(r'<div class="article-excerpt">(.*?)</div>',b,re.S).group(1))
    full=re.search(r'id="text%d">(.*?)(?=<div class="internal-links"|$)'%n,b,re.S).group(1)
    blocks=[]
    for tm in re.finditer(r'<(p|h3|ul)[^>]*>(.*?)</\1>',full,re.S):
        k,c=tm.groups()
        if k=='p': blocks.append({'t':'p','x':clean(re.sub('<[^>]+>','',c))})
        elif k=='h3': blocks.append({'t':'h','x':heading(re.sub('<[^>]+>','',c))})
        else: blocks.append({'t':'ul','x':[clean(re.sub('<[^>]+>','',li)) for li in re.findall(r'<li[^>]*>(.*?)</li>',c,re.S)]})
    out.append({'slug':slugs[n-1],'title':title,'excerpt':exc,'image':'/images/gallery/%s.webp'%img.group(1),'alt':clean(img.group(2)),'blocks':blocks})
    print(n,title[:60],len(blocks),img.group(1))
ts="export type Block = { t: 'p' | 'h' | 'ul'; x: string | string[] };\nexport type Article = { slug: string; title: string; excerpt: string; image: string; alt: string; blocks: Block[] };\nexport const articles: Article[] = "+json.dumps(out,ensure_ascii=False,indent=1)+";\n"
open('src/data/articles.ts','w',encoding='utf8').write(ts)
a=open('/home/claude/site/bunyan_website/about.html',encoding='utf8').read()
a=a[a.find('page-header'):a.find('<footer')]
print(clean(re.sub(r'<(script|style).*?</\1>','',re.sub(r'<[^>]+>',' ',a),flags=re.S))[:1800])
