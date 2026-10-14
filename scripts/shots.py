import sys
from playwright.sync_api import sync_playwright
W=int(sys.argv[1]); H=int(sys.argv[2]); out=sys.argv[3]; full=len(sys.argv)>4 and sys.argv[4]=='full'
with sync_playwright() as p:
    b=p.chromium.launch(); c=b.new_context(viewport={'width':W,'height':H},device_scale_factor=1.5 if W<700 else 1,has_touch=W<1024,is_mobile=W<1024)
    pg=c.new_page(); pg.goto('http://localhost:8000/',wait_until='networkidle'); pg.wait_for_timeout(1800)
    pg.screenshot(path=out,full_page=full); b.close()
