(function () {
  const IFRAME_ORIGIN = 'https://siwol-artmug.netlify.app';
  const IFRAME_SELECTOR = 'section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"], [name="am-root"] iframe[src*="siwol-artmug.netlify.app"], iframe[src*="siwol-artmug.netlify.app"]';

  let lastHeight = 0;
  let retryTimer = null;
  let navItems = [];
  let navTopTarget = 320;
  let navAnimating = false;

  function injectStyle() {
    if (document.getElementById('siwol-artmug-parent-style')) return;

    const style = document.createElement('style');
    style.id = 'siwol-artmug-parent-style';
    style.textContent = `
section[name="am-root"],
[name="am-root"]{
  display:block!important;
  text-align:start!important;
  padding:0!important;
  margin:0 auto!important;
  line-height:normal!important;
  overflow:visible!important;
}

section[name="am-root"] [name="stage"],
[name="am-root"] [name="stage"]{
  display:block!important;
  width:100%!important;
  overflow:visible!important;
}

section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],
[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],
iframe[src*="siwol-artmug.netlify.app"]{
  display:block!important;
  width:100%!important;
  max-width:1180px!important;
  min-height:700px!important;
  height:700px;
  margin:0 auto!important;
  border:0!important;
  overflow:hidden!important;
}


#siwol-artmug-parent-nav{
  position:absolute!important;
  left:max(16px,calc((100vw - 1180px)/2 - 216px))!important;
  top:320px;
  z-index:999999!important;
  width:190px!important;
  display:none;
  font-family:'Paperozi','Pretendard','SUIT','Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;
  letter-spacing:-.02em!important;
  pointer-events:auto!important;
}
#siwol-artmug-parent-nav.is-visible{display:block!important;}
#siwol-artmug-parent-nav .siwol-parent-nav-box{
  overflow:hidden!important;
  border:1px solid rgba(137,118,213,.28)!important;
  border-radius:14px!important;
  background:rgba(255,255,255,.94)!important;
  box-shadow:0 14px 34px rgba(89,72,154,.14)!important;
  backdrop-filter:blur(10px)!important;
  -webkit-backdrop-filter:blur(10px)!important;
}
#siwol-artmug-parent-nav .siwol-parent-nav-head{
  padding:13px 14px 12px!important;
  background:linear-gradient(90deg,#8d79db,#b2a3ef)!important;
  color:#fff!important;
  text-align:center!important;
  font-size:11px!important;
  font-weight:800!important;
  letter-spacing:.14em!important;
  line-height:1!important;
}
#siwol-artmug-parent-nav .siwol-parent-nav-list{
  display:flex!important;
  flex-direction:column!important;
  gap:7px!important;
  padding:10px!important;
}
#siwol-artmug-parent-nav button{
  appearance:none!important;
  -webkit-appearance:none!important;
  display:block!important;
  width:100%!important;
  border:1px solid #ddd4ff!important;
  border-radius:9px!important;
  background:#fff!important;
  color:#705bd7!important;
  padding:11px 12px 10px!important;
  font:700 13px/1.15 'Paperozi','Pretendard','SUIT','Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;
  text-align:left!important;
  cursor:pointer!important;
  transition:transform .18s ease, background .18s ease, color .18s ease, border-color .18s ease!important;
}
#siwol-artmug-parent-nav button:hover,
#siwol-artmug-parent-nav button.is-active{
  transform:translateX(4px)!important;
  background:#8d79db!important;
  border-color:#8d79db!important;
  color:#fff!important;
}
#siwol-artmug-parent-nav .siwol-parent-nav-divider{
  height:1px!important;
  margin:3px 0!important;
  background:#e5ddff!important;
}
#siwol-artmug-parent-nav .siwol-parent-nav-top{
  text-align:center!important;
  background:#f4f1ff!important;
  color:#7a67d1!important;
}
@media(max-width:1439px){
  #siwol-artmug-parent-nav{display:none!important;}
}
`;
    document.head.appendChild(style);
  }

  function getIframe() {
    return document.querySelector(IFRAME_SELECTOR);
  }

  function getPageScrollY() {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function requestNavItems() {
    const iframe = getIframe();
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage({
      source: 'syura-artmug-parent',
      type: 'SYURA_PARENT_REQUEST_NAV'
    }, IFRAME_ORIGIN);
  }

  function requestChildScroll(sectionId) {
    const iframe = getIframe();
    if (!iframe || !iframe.contentWindow || !sectionId) return;
    iframe.contentWindow.postMessage({
      source: 'syura-artmug-parent',
      type: 'SYURA_PARENT_NAV_TO',
      sectionId: sectionId,
      navHeight: getNavHeight()
    }, IFRAME_ORIGIN);
  }

  function getNavHeight() {
    const nav = document.getElementById('siwol-artmug-parent-nav');
    return nav ? nav.getBoundingClientRect().height : 0;
  }

  function setActiveNav(sectionId) {
    document.querySelectorAll('#siwol-artmug-parent-nav button[data-section-id]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.sectionId === sectionId);
    });
  }

  function buildNavButton(item) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = item.title || item.id;
    button.dataset.sectionId = item.id;
    button.addEventListener('click', () => requestChildScroll(item.id));
    return button;
  }

  function renderParentNav(items) {
    navItems = (items || []).filter(item => item && item.id && item.title);

    let nav = document.getElementById('siwol-artmug-parent-nav');
    if (!nav) {
      nav = document.createElement('nav');
      nav.id = 'siwol-artmug-parent-nav';
      nav.setAttribute('aria-label', '시월 포트폴리오 빠른 메뉴');
      document.body.appendChild(nav);
    }

    if (!navItems.length) {
      nav.classList.remove('is-visible');
      nav.innerHTML = '';
      return;
    }

    const box = document.createElement('div');
    box.className = 'siwol-parent-nav-box';

    const head = document.createElement('div');
    head.className = 'siwol-parent-nav-head';
    head.textContent = 'QUICK MENU';
    box.appendChild(head);

    const list = document.createElement('div');
    list.className = 'siwol-parent-nav-list';
    navItems.forEach(item => list.appendChild(buildNavButton(item)));

    const divider = document.createElement('div');
    divider.className = 'siwol-parent-nav-divider';
    list.appendChild(divider);

    const top = document.createElement('button');
    top.type = 'button';
    top.className = 'siwol-parent-nav-top';
    top.textContent = 'TOP';
    top.addEventListener('click', () => {
      const iframe = getIframe();
      if (!iframe) return;
      const rect = iframe.getBoundingClientRect();
      const iframeTop = getPageScrollY() + rect.top;
      window.scrollTo({ top: Math.max(0, iframeTop - 20), behavior: 'smooth' });
      setActiveNav(navItems[0] && navItems[0].id);
      [80, 300, 800].forEach(ms => setTimeout(sendViewport, ms));
    });
    list.appendChild(top);

    box.appendChild(list);
    nav.innerHTML = '';
    nav.appendChild(box);
    nav.classList.add('is-visible');
    updateNavPosition(true);
  }

  function updateNavPosition(force) {
    const nav = document.getElementById('siwol-artmug-parent-nav');
    const iframe = getIframe();
    if (!nav || !iframe || window.innerWidth < 1440) return;

    const rect = iframe.getBoundingClientRect();
    const scrollY = getPageScrollY();
    const iframeTop = scrollY + rect.top;
    const iframeBottom = iframeTop + rect.height;
    const navHeight = getNavHeight() || 220;

    let target = scrollY + 150;
    target = Math.max(iframeTop + 34, target);
    target = Math.min(Math.max(iframeTop + 34, iframeBottom - navHeight - 34), target);
    navTopTarget = target;

    if (force) {
      nav.style.top = navTopTarget + 'px';
      return;
    }

    if (navAnimating) return;
    navAnimating = true;

    function loop() {
      const current = parseFloat(nav.style.top) || navTopTarget;
      const gap = navTopTarget - current;
      if (Math.abs(gap) < 0.6) {
        nav.style.top = navTopTarget + 'px';
        navAnimating = false;
        return;
      }
      nav.style.top = (current + gap * 0.11) + 'px';
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }


  function unlockArtmugDetail() {
    const box = document.querySelector('.detailinfo');
    if (box) {
      box.classList.remove('showstep1');
      box.style.maxHeight = 'none';
      box.style.overflow = 'visible';
    }

    const content = document.querySelector('.detailinfo .showcontent');
    if (content) {
      content.style.maxHeight = 'none';
      content.style.overflow = 'visible';
    }

    document
      .querySelectorAll('.btn_open_btn,.btn_open,.btn_close')
      .forEach(el => el.remove());
  }

  function setIframeHeight(height) {
    const iframe = getIframe();
    if (!iframe) return;

    const next = Math.max(700, Math.ceil(Number(height) || 0));

    iframe.style.height = next + 'px';
    iframe.height = String(next);
    iframe.setAttribute('height', String(next));
    iframe.setAttribute('scrolling', 'no');

    if (Math.abs(next - lastHeight) >= 4) {
      lastHeight = next;
    }

    sendViewport();
  }

  function sendViewport() {
    const iframe = getIframe();
    if (!iframe || !iframe.contentWindow) return;

    const rect = iframe.getBoundingClientRect();

    iframe.contentWindow.postMessage({
      source: 'syura-artmug-parent',
      type: 'SYURA_PARENT_VIEWPORT',
      iframeTop: rect.top,
      iframeHeight: rect.height,
      viewportHeight: window.innerHeight || document.documentElement.clientHeight || 0,
      scrollY: window.scrollY || window.pageYOffset || 0
    }, IFRAME_ORIGIN);
  }

  function scrollParentTo(targetY, navHeight) {
    const iframe = getIframe();
    if (!iframe) return;

    const rect = iframe.getBoundingClientRect();
    const iframeTop = (window.scrollY || window.pageYOffset || 0) + rect.top;

    window.scrollTo({
      top: Math.max(0, iframeTop + Number(targetY || 0) - Number(navHeight || 0) - 12),
      behavior: 'smooth'
    });

    [80, 300, 800].forEach(ms => setTimeout(sendViewport, ms));
  }

  function bindMessages() {
    if (window.__siwolParentMessageBind) return;
    window.__siwolParentMessageBind = true;

    window.addEventListener('message', e => {
      if (e.origin !== IFRAME_ORIGIN) return;

      const data = e.data || {};
      if (data.source !== 'syura-css') return;

      if (data.type === 'SYURA_IFRAME_HEIGHT') {
        setIframeHeight(data.height);
      }

      if (data.type === 'SYURA_IFRAME_READY') {
        [50, 200, 600, 1200].forEach(ms => setTimeout(sendViewport, ms));
        [80, 260, 700, 1300].forEach(ms => setTimeout(requestNavItems, ms));
      }

      if (data.type === 'SYURA_NAV_ITEMS') {
        renderParentNav(data.items);
      }

      if (data.type === 'SYURA_ACTIVE_SECTION') {
        setActiveNav(data.sectionId);
      }

      if (data.type === 'SYURA_PARENT_SCROLL_TO') {
        scrollParentTo(data.targetY, data.navHeight);
      }
    });

    window.addEventListener('scroll', () => { sendViewport(); updateNavPosition(); }, { passive: true });
    window.addEventListener('resize', () => { sendViewport(); requestNavItems(); updateNavPosition(true); });
  }

  function prepareIframe() {
    const iframe = getIframe();

    if (!iframe) return false;

    iframe.style.height = Math.max(Number(iframe.getAttribute('height')) || 700, lastHeight || 700) + 'px';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('scrolling', 'no');

    if (!iframe.dataset.siwolParentBound) {
      iframe.dataset.siwolParentBound = '1';
      iframe.addEventListener('load', () => {
        [80, 250, 700, 1500].forEach(ms => setTimeout(sendViewport, ms));
      });
    }

    sendViewport();
    requestNavItems();
    updateNavPosition(true);
    return true;
  }

  function neutralize() {
    injectStyle();
    unlockArtmugDetail();
    bindMessages();
    prepareIframe();
    updateNavPosition();
  }

  function watch() {
    if (window.__siwolParentWatch) return;
    window.__siwolParentWatch = true;

    const mo = new MutationObserver(() => {
      clearTimeout(retryTimer);
      retryTimer = setTimeout(neutralize, 50);
    });

    mo.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'height', 'style', 'class']
    });

    let count = 0;
    const iv = setInterval(() => {
      count += 1;
      neutralize();
      if (count > 80) clearInterval(iv);
    }, 500);
  }

  function boot() {
    neutralize();
    watch();
    [300, 1000, 2000, 4000].forEach(ms => setTimeout(neutralize, ms));
    [500, 1500, 3000, 5000].forEach(ms => setTimeout(requestNavItems, ms));
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();