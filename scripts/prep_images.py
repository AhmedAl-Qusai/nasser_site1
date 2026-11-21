import numpy as np, glob, os
from PIL import Image
SRC='/home/claude/site/bunyan_website/images'; OUT='/home/claude/bunyan-next/public/images'
def span(mask):
    best=(0,len(mask)); s=None
    for i,v in enumerate(list(mask)+[False]):
        if v and s is None: s=i
        if not v and s is not None:
            if i-s>best[1]-best[0] or best==(0,len(mask)): best=(s,i)
            s=None
    return best
for t in range(1,5):
    for p in range(1,5):
        n=f't{t}pro{p}'; im=Image.open(f'{SRC}/{n}.jpg').convert('RGB'); W,H=im.size
        g=np.array(im.convert('L').resize((W//8,H//8))).astype(float)
        mid=int(np.argmax(g[:, int(g.shape[1]*.4):int(g.shape[1]*.6)].mean(axis=0)))+int(g.shape[1]*.4)
        m=4; halves=[(0,mid-m),(mid+m+1,g.shape[1])]
        r0,r1=span(np.concatenate([g[:,:mid-8],g[:,mid+9:]],axis=1).mean(axis=1)>22); r0+=3; r1-=3
        crops=[]
        for a,b in halves:
            c0,c1=span(g[r0:r1,a:b].mean(axis=0)>22); crops.append((a+c0+2,a+c1-2))
        w=min(c1-c0 for c0,c1 in crops)
        for name,(c0,c1) in zip(('before','after'),crops):
            box=(c0*8,r0*8,(c0+w)*8,r1*8)
            o=im.crop(box); o=o.resize((900,round(900*o.height/o.width)),Image.LANCZOS)
            o.save(f'{OUT}/work/{n}-{name}.webp','WEBP',quality=78)
for f in glob.glob(f'{SRC}/*.jpg'):
    b=os.path.basename(f)[:-4]
    if b[0]=='t' and 'pro' in b and b[1].isdigit(): continue
    if b in ('inst','tiktok','whatsapp','phone','map'): continue
    im=Image.open(f).convert('RGB'); im.thumbnail((1200,1200)); im.save(f'{OUT}/gallery/{b}.webp','WEBP',quality=76)
import shutil
for l in ('logo.png','logo2.png'):
    im=Image.open(f'{SRC}/{l}'); im.thumbnail((400,400)); im.save(f'{OUT}/{l}',optimize=True)
