(function () {
  const IFRAME_ORIGIN = 'https://siwol-artmug.netlify.app';
  const IFRAME_SELECTOR = 'section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"], [name="am-root"] iframe[src*="siwol-artmug.netlify.app"], iframe[src*="siwol-artmug.netlify.app"]';

  let lastHeight = 0;
  let retryTimer = null;

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
`;
    document.head.appendChild(style);
  }

  function getIframe() {
    return document.querySelector(IFRAME_SELECTOR);
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
      }

      if (data.type === 'SYURA_PARENT_SCROLL_TO') {
        scrollParentTo(data.targetY, data.navHeight);
      }
    });

    window.addEventListener('scroll', sendViewport, { passive: true });
    window.addEventListener('resize', sendViewport);
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
    return true;
  }

  function neutralize() {
    injectStyle();
    unlockArtmugDetail();
    bindMessages();
    prepareIframe();
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
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();