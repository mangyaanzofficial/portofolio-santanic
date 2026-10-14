"""Audit responsif: error console, overflow horizontal, elemen keluar layar, target sentuh kecil.
Jalankan: python3 scripts/audit.py  (server lokal di :8000)"""
import sys, json
from playwright.sync_api import sync_playwright
W=[320,360,375,390,430,768,1024,1440]
URL=sys.argv[1] if len(sys.argv)>1 else "http://localhost:8000/"
JS="""()=>{
 const vw=document.documentElement.clientWidth, out=[];
 const sw=document.documentElement.scrollWidth;
 document.querySelectorAll('body *').forEach(el=>{
   const cs=getComputedStyle(el); if(cs.display==='none'||cs.visibility==='hidden')return;
   const r=el.getBoundingClientRect(); if(!r.width||!r.height)return;
   if(el.closest('.iso,.hero__bg,.stage,.sheet[hidden]'))return;
   if(r.right>vw+1||r.left<-1){ if(!el.closest('.sr')) out.push(['OFFSCREEN',el.tagName+'.'+(el.className&&el.className.baseVal===undefined?el.className:''),Math.round(r.left),Math.round(r.right)]); }
   // teks terpotong
   if(el.scrollWidth>el.clientWidth+2 && ['hidden','clip'].includes(cs.overflowX) && el.children.length===0 && !el.matches('.sr') && !el.closest('.ph,.sr')) out.push(['CLIPPED',el.tagName+'.'+el.className,el.scrollWidth,el.clientWidth]);
 });
 const small=[];
 document.querySelectorAll('button,a[href],summary,input,textarea').forEach(el=>{
   const r=el.getBoundingClientRect(),cs=getComputedStyle(el); if(cs.display==='none'||!r.width||el.closest('.sr,.skip'))return;
   if(r.height<40||r.width<40) small.push([el.tagName,(el.textContent||el.id).trim().slice(0,20),Math.round(r.width),Math.round(r.height)]);
 });
 return {vw,sw,out:out.slice(0,12),small:small.slice(0,12)};
}"""
bad=0
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in W:
        ctx=b.new_context(viewport={'width':w,'height':800 if w<1024 else 900},device_scale_factor=1,has_touch=w<1024,is_mobile=w<1024)
        pg=ctx.new_page(); errs=[]
        pg.on('console',lambda m: errs.append(m.text) if m.type in('error','warning') else None)
        pg.on('pageerror',lambda e: errs.append(str(e)))
        pg.on('requestfailed',lambda r: errs.append('REQFAIL '+r.url))
        pg.on('response',lambda r: errs.append(f'HTTP {r.status} {r.url}') if r.status>=400 and 'favicon' not in r.url else None)
        pg.goto(URL,wait_until='networkidle'); pg.wait_for_timeout(1500)
        r=pg.evaluate(JS)
        flag = r['sw']>r['vw'] or r['out'] or errs
        print(f"[{w}] vw={r['vw']} scrollW={r['sw']} {'FAIL' if flag else 'ok'}")
        if r['sw']>r['vw']: print('   HORIZONTAL OVERFLOW'); bad+=1
        for o in r['out']: print('   ',o); bad+=1
        for s in r['small']: print('    small-target',s)
        for e in errs[:6]: print('    console:',e); bad+=1
        ctx.close()
    b.close()
print('PROBLEMS:',bad)
