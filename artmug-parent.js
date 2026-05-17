(function () {
  const IFRAME_ORIGIN = 'https://siwol-artmug.netlify.app';

  let lastHeight = 0;

  function injectStyle() {
    if (document.getElementById('syura-artmug-style')) return;

    const style = document.createElement('style');
    style.id = 'syura-artmug-style';

    style.textContent = `
#detailViews [name="am-root"]{
  text-align:start!important;
  padding:0!important;
  line-height:normal!important;
}

#detailViews [name="am-root"] *{
  padding:0;
  margin:0;
  box-sizing:border-box;
}

#detailViews [name="stage"]{
  width:100%;
  overflow:visible;
}

#detailViews [name="am-root"] iframe,
[name="am-root"] iframe{
  display:block;
  width:100%!important;
  max-width:1180px;
  min-height:700px;
  height:700px;
  margin:0 auto;
  border:0;
  overflow:hidden;
}
`;

    document.head.appendChild(style);
  }

  function killButtons(root = document) {
    root
      .querySelectorAll('.btn_open_btn,.btn_open,.btn_close')
      .forEach(el => el.remove());
  }

  function unlockDetail() {
    const box = document.querySelector('.detailinfo');
    if (!box) return;

    box.classList.remove('showstep1');
    box.style.maxHeight = 'none';
    box.style.overflow = 'visible';

    const content = box.querySelector('.showcontent');
    if (content) {
      content.style.maxHeight = 'none';
      content.style.overflow = 'visible';
    }
  }

  function stripListeners() {
    document
      .querySelectorAll('.btn_open_btn,.btn_open,.btn_close')
      .forEach(btn => {
        const clone = btn.cloneNode(true);
        if (btn.parentNode) btn.parentNode.replaceChild(clone, btn);
      });
  }

  function hardBlockClicks() {
    if (window.__syuraHardBlockClicks) return;
    window.__syuraHardBlockClicks = true;

    document.addEventListener(
      'click',
      e => {
        const bad = e.target.closest('.btn_open_btn,.btn_open,.btn_close');
        if (bad) {
          e.stopImmediatePropagation();
          e.stopPropagation();
          e.preventDefault();
        }
      },
      true
    );
  }

  function getIframe() {
    return document.querySelector(
      '#detailViews [name="am-root"] iframe,[name="am-root"] iframe'
    );
  }

  function resizeIframe(height) {
    const iframe = getIframe();
    if (!iframe) return;

    const nextHeight = Math.max(700, Math.ceil(Number(height) || 0));

    if (Math.abs(nextHeight - lastHeight) < 4) return;

    lastHeight = nextHeight;
    iframe.style.height = nextHeight + 'px';

    requestAnimationFrame(sendViewportToIframe);
    setTimeout(sendViewportToIframe, 80);
  }

  function sendViewportToIframe() {
    const iframe = getIframe();
    if (!iframe || !iframe.contentWindow) return;

    const rect = iframe.getBoundingClientRect();

    iframe.contentWindow.postMessage(
      {
        source: 'syura-artmug-parent',
        type: 'SYURA_PARENT_VIEWPORT',
        iframeTop: rect.top,
        iframeHeight: rect.height,
        viewportHeight:
          window.innerHeight ||
          document.documentElement.clientHeight ||
          0,
        scrollY:
          window.scrollY ||
          window.pageYOffset ||
          0
      },
      IFRAME_ORIGIN
    );
  }

  function scrollParentTo(targetY, navHeight) {
    const iframe = getIframe();
    if (!iframe) return;

    const rect = iframe.getBoundingClientRect();
    const iframePageTop =
      (window.scrollY || window.pageYOffset || 0) + rect.top;

    const y = Math.max(
      0,
      iframePageTop +
        Number(targetY || 0) -
        Number(navHeight || 0) -
        12
    );

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });

    setTimeout(sendViewportToIframe, 80);
    setTimeout(sendViewportToIframe, 360);
    setTimeout(sendViewportToIframe, 900);
  }

  function bindMessages() {
    if (window.__syuraArtmugMessageBind) return;
    window.__syuraArtmugMessageBind = true;

    window.addEventListener('message', e => {
      if (e.origin !== IFRAME_ORIGIN) return;

      const data = e.data || {};
      if (data.source !== 'syura-css') return;

      if (data.type === 'SYURA_IFRAME_HEIGHT') {
        resizeIframe(data.height);
      }

      if (data.type === 'SYURA_IFRAME_READY') {
        setTimeout(sendViewportToIframe, 50);
        setTimeout(sendViewportToIframe, 300);
        setTimeout(sendViewportToIframe, 1000);
      }

      if (data.type === 'SYURA_PARENT_SCROLL_TO') {
        scrollParentTo(data.targetY, data.navHeight);
      }
    });

    window.addEventListener('scroll', sendViewportToIframe, { passive: true });
    window.addEventListener('resize', sendViewportToIframe);
    window.addEventListener('orientationchange', () => {
      setTimeout(sendViewportToIframe, 300);
    });
  }

  function neutralize() {
    injectStyle();
    killButtons();
    stripListeners();
    unlockDetail();
    hardBlockClicks();
    bindMessages();
    sendViewportToIframe();
  }

  if (document.readyState !== 'loading') {
    neutralize();
  } else {
    document.addEventListener('DOMContentLoaded', neutralize);
  }

  setTimeout(neutralize, 300);
  setTimeout(neutralize, 1000);
  setTimeout(neutralize, 2000);
})();