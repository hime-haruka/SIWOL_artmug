(function () {
  const IFRAME_ORIGIN = 'https://siwol-artmug.netlify.app';
  const IFRAME_SELECTOR = 'section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"], [name="am-root"] iframe[src*="siwol-artmug.netlify.app"], iframe[src*="siwol-artmug.netlify.app"]';
  const QNA_URL = 'qna_write.php?number=41275';

  const NAV_ITEMS = [
    { id: 'top', title: '[TOP]' },
    { id: 'intro', title: '[작가 소개]' },
    { id: 'calendar', title: '[예약 현황]' },
    { id: 'process', title: '[진행 방식]' },
    { id: 'notice', title: '[공지사항]' },
    { id: 'usage', title: '[사용 범위]' },
    { id: 'portfolio', title: '[포트폴리오]', dropdown: true },
    { id: 'form', title: '[신청 양식]' },
    { id: 'contact', title: '[문의하기]' }
  ];

  const PORTFOLIO_ITEMS = [
    { id: 'portfolio:package', title: '구독 패키지' },
    { id: 'portfolio:badge', title: '구독 뱃지' },
    { id: 'portfolio:emoji', title: '구독티콘' },
    { id: 'portfolio:move_emoji', title: '움짤티콘' },
    { id: 'portfolio:ogq', title: 'OGQ' },
    { id: 'portfolio:facial_chart', title: '페이셜 차트' },
    { id: 'portfolio:dona_image', title: '후원 이미지' },
    { id: 'portfolio:fan_char', title: '팬 캐릭터' },
    { id: 'portfolio:gif_talk', title: '짚톡' },
    { id: 'portfolio:sd_illust', title: 'SD 일러스트' },
    { id: 'portfolio:ld_illust', title: 'LD 일러스트' },
    { id: 'portfolio:overlay', title: '방송 화면' },
    { id: 'portfolio:v_animal', title: '멍냥 버츄얼' },
    { id: 'portfolio:v_nyah', title: 'SD 버츄얼' }
  ];

  let lastHeight = 0;
  let retryTimer = null;

  function injectStyle() {
    const old = document.getElementById('siwol-artmug-parent-style');
    if (old) old.remove();

    const style = document.createElement('style');
    style.id = 'siwol-artmug-parent-style';
    style.textContent = `
@font-face{font-family:Atomy;src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/Atomy-Bold.woff') format('woff');font-weight:400;font-display:swap;}
section[name="am-root"],[name="am-root"]{display:block!important;text-align:start!important;padding:0!important;margin:0 auto!important;line-height:normal!important;overflow:visible!important;}
section[name="am-root"] [name="stage"],[name="am-root"] [name="stage"]{display:block!important;width:100%!important;overflow:visible!important;}
section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],iframe[src*="siwol-artmug.netlify.app"]{display:block!important;width:100%!important;max-width:1180px!important;min-height:700px!important;height:700px;margin:0 auto!important;border:0!important;overflow:hidden!important;}

.syura-floating-nav{position:fixed!important;top:20px!important;right:20px!important;z-index:2147483000!important;width:174px!important;font-family:Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;color:#8d79db!important;letter-spacing:-.055em!important;pointer-events:auto!important;contain:layout paint style!important;}
.syura-floating-nav,.syura-floating-nav *{box-sizing:border-box!important;}
.syura-floating-nav__inner{position:relative!important;overflow:hidden!important;border:2px solid #c7b4ff!important;border-radius:8px!important;background:linear-gradient(180deg,#ffffff 0%,#eee9ff 45%,#ffffff 100%)!important;box-shadow:0 8px 20px rgba(105,79,206,.12)!important;padding:13px 10px 12px!important;max-height:calc(100vh - 40px)!important;}
.syura-floating-nav__inner:before{content:''!important;position:absolute!important;left:50%!important;top:12px!important;width:861px!important;height:188px!important;transform:translateX(-50%) scale(.20)!important;transform-origin:top center!important;background:url('https://lh3.googleusercontent.com/d/1nHKjunygcwk1Nn4lYZ7Eplq199VUPS5B') center top/861px auto no-repeat!important;z-index:2!important;pointer-events:none!important;}
.syura-floating-nav__pattern{position:absolute!important;left:9px!important;right:9px!important;top:80px!important;bottom:28px!important;z-index:0!important;pointer-events:none!important;background:linear-gradient(180deg,rgba(243,240,255,.82),rgba(235,229,255,.78)),url('https://lh3.googleusercontent.com/d/13CvtmqiZi9vvkSVdi8I1RhxLuHEWWzx3') center top/1180px auto repeat-y!important;}
.syura-floating-nav__dots{position:relative!important;z-index:3!important;display:flex!important;justify-content:center!important;gap:5px!important;height:7px!important;padding:0!important;margin:0 auto!important;pointer-events:none!important;}
.syura-floating-nav__dots span{display:block!important;width:4px!important;height:4px!important;border-radius:999px!important;background:#ccbfff!important;}
.syura-floating-nav__dots--top{margin-bottom:9px!important;}
.syura-floating-nav__dots--bottom{margin-top:9px!important;}
.syura-floating-nav__awning{position:relative!important;z-index:2!important;height:62px!important;margin:-7px -10px 7px!important;pointer-events:none!important;}
.syura-floating-nav__menu{position:relative!important;z-index:3!important;display:flex!important;flex-direction:column!important;gap:7px!important;max-height:calc(100vh - 128px)!important;overflow-y:auto!important;overflow-x:hidden!important;padding:0 3px!important;scrollbar-width:thin!important;}
.syura-floating-nav__menu::-webkit-scrollbar{width:4px!important;}
.syura-floating-nav__menu::-webkit-scrollbar-thumb{background:#c7b4ff!important;border-radius:999px!important;}
.syura-floating-nav__button,.syura-floating-nav__subbutton{appearance:none!important;-webkit-appearance:none!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;height:35px!important;min-height:35px!important;border:1px solid #ddd2ff!important;border-radius:6px!important;background:rgba(255,255,255,.92)!important;color:#8d79db!important;box-shadow:0 2px 0 rgba(126,99,221,.10),0 0 0 1px rgba(255,255,255,.70) inset!important;font:400 15px/1 Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;text-align:center!important;white-space:nowrap!important;padding:5px 6px 3px!important;margin:0!important;cursor:pointer!important;transition:background-color .12s ease,border-color .12s ease,color .12s ease!important;transform:none!important;}
.syura-floating-nav__button:hover,.syura-floating-nav__subbutton:hover,.syura-floating-nav__button.is-active,.syura-floating-nav__subbutton.is-active{background:#fff!important;border-color:#b49cff!important;color:#735ed8!important;transform:none!important;}
.syura-floating-nav__dropdown-wrap{display:flex!important;flex-direction:column!important;gap:0!important;margin:0!important;}
.syura-floating-nav__button--portfolio{position:relative!important;background:linear-gradient(180deg,#b69cff 0%,#9a80ee 100%)!important;color:#fff!important;border-color:#967ce6!important;box-shadow:0 2px 0 rgba(112,91,215,.18)!important;}
.syura-floating-nav__button--portfolio:hover{background:linear-gradient(180deg,#bba4ff 0%,#9f87f1 100%)!important;color:#fff!important;}
.syura-floating-nav__arrow{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;font-size:10px!important;line-height:1!important;}
.syura-floating-nav.is-open .syura-floating-nav__arrow{transform:translateY(-50%) rotate(180deg)!important;}
.syura-floating-nav__dropdown{display:none!important;flex-direction:column!important;gap:4px!important;margin:4px 0 0!important;padding:0!important;background:transparent!important;border:0!important;max-height:none!important;overflow:visible!important;}
.syura-floating-nav.is-open .syura-floating-nav__dropdown{display:flex!important;}
.syura-floating-nav__subbutton{height:27px!important;min-height:27px!important;font-size:12px!important;border-radius:5px!important;background:rgba(255,255,255,.92)!important;color:#8d79db!important;padding:3px 5px 2px!important;box-shadow:0 1px 0 rgba(126,99,221,.08),0 0 0 1px rgba(255,255,255,.72) inset!important;}
@media(max-height:760px){.syura-floating-nav{width:166px!important;right:14px!important;top:14px!important;}.syura-floating-nav__inner{padding:12px 9px 11px!important;}.syura-floating-nav__inner:before{transform:translateX(-50%) scale(.19)!important;}.syura-floating-nav__awning{height:58px!important;}.syura-floating-nav__menu{gap:5px!important;max-height:calc(100vh - 118px)!important;}.syura-floating-nav__button{height:31px!important;min-height:31px!important;font-size:14px!important;}.syura-floating-nav__subbutton{height:23px!important;min-height:23px!important;font-size:11px!important;}.syura-floating-nav__dropdown{gap:3px!important;}}
@media(max-width:860px){.syura-floating-nav{right:10px!important;top:10px!important;width:160px!important;transform:scale(.94)!important;transform-origin:top right!important;}.syura-floating-nav__inner{max-height:calc(100vh - 20px)!important;}}
`;
    document.head.appendChild(style);
  }

  function getIframe() {
    return document.querySelector(IFRAME_SELECTOR);
  }

  function getPageScrollY() {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
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
      scrollY: getPageScrollY()
    }, IFRAME_ORIGIN);
  }

  function requestChildScroll(sectionId) {
    if (!sectionId) return;
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const iframe = getIframe();
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        source: 'syura-artmug-parent',
        type: 'SYURA_PARENT_NAV_TO',
        sectionId: sectionId,
        navHeight: 0
      }, IFRAME_ORIGIN);
    }
  }

  function openInquiry() {
    try {
      if (window.pLightBox && typeof window.pLightBox.show === 'function') {
        window.pLightBox.show('php/' + QNA_URL, 'iframe_w', '1080', '500', '문의하기', '0');
        if (typeof window.qnaAlert === 'function') window.qnaAlert();
        return;
      }
    } catch (e) {}

    const qna = document.getElementById('cont_qna') || document.querySelector('#cont_qna') || document.querySelector('[id="cont_qna"]');
    if (qna) {
      window.scrollTo({ top: Math.max(0, qna.getBoundingClientRect().top + getPageScrollY() - 100), behavior: 'smooth' });
      return;
    }
    requestChildScroll('form');
  }

  function button(label, className, onClick) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = className;
    b.textContent = label;
    b.addEventListener('click', onClick);
    return b;
  }

  function renderNav() {
    if (document.querySelector('.syura-floating-nav')) return;

    const nav = document.createElement('nav');
    nav.className = 'syura-floating-nav';
    nav.setAttribute('aria-label', '시월 포트폴리오 빠른 메뉴');

    const inner = document.createElement('div');
    inner.className = 'syura-floating-nav__inner';

    const dotsTop = document.createElement('div');
    dotsTop.className = 'syura-floating-nav__dots syura-floating-nav__dots--top';
    dotsTop.innerHTML = '<span></span><span></span><span></span><span></span>';

    const awning = document.createElement('div');
    awning.className = 'syura-floating-nav__awning';

    const pattern = document.createElement('div');
    pattern.className = 'syura-floating-nav__pattern';

    const menu = document.createElement('div');
    menu.className = 'syura-floating-nav__menu';

    NAV_ITEMS.forEach(function (item) {
      if (item.id === 'portfolio') {
        const wrap = document.createElement('div');
        wrap.className = 'syura-floating-nav__dropdown-wrap';

        const main = document.createElement('button');
        main.type = 'button';
        main.className = 'syura-floating-nav__button syura-floating-nav__button--portfolio';
        main.innerHTML = '<span>[포트폴리오]</span><span class="syura-floating-nav__arrow">⌄</span>';
        main.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          nav.classList.toggle('is-open');
        });

        const dropdown = document.createElement('div');
        dropdown.className = 'syura-floating-nav__dropdown';
        PORTFOLIO_ITEMS.forEach(function (sub) {
          const subButton = button(sub.title, 'syura-floating-nav__subbutton', function () {
            requestChildScroll(sub.id);
          });
          subButton.dataset.sectionId = sub.id;
          dropdown.appendChild(subButton);
        });

        wrap.appendChild(main);
        wrap.appendChild(dropdown);
        menu.appendChild(wrap);
        return;
      }

      if (item.id === 'contact') {
        menu.appendChild(button(item.title, 'syura-floating-nav__button', openInquiry));
        return;
      }

      const normalButton = button(item.title, 'syura-floating-nav__button', function () {
        requestChildScroll(item.id);
      });
      normalButton.dataset.sectionId = item.id;
      menu.appendChild(normalButton);
    });

    const dotsBottom = document.createElement('div');
    dotsBottom.className = 'syura-floating-nav__dots syura-floating-nav__dots--bottom';
    dotsBottom.innerHTML = '<span></span><span></span><span></span><span></span>';

    inner.appendChild(dotsTop);
    inner.appendChild(awning);
    inner.appendChild(pattern);
    inner.appendChild(menu);
    inner.appendChild(dotsBottom);
    nav.appendChild(inner);
    document.body.appendChild(nav);
  }

  function setActiveNav(sectionId) {
    document.querySelectorAll('.syura-floating-nav [data-section-id]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.sectionId === sectionId);
    });
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

    document.querySelectorAll('.btn_open_btn,.btn_open,.btn_close').forEach(function (el) {
      el.remove();
    });
  }

  function setIframeHeight(height) {
    const iframe = getIframe();
    if (!iframe) return;

    const next = Math.max(700, Math.ceil(Number(height) || 0));
    iframe.style.height = next + 'px';
    iframe.height = String(next);
    iframe.setAttribute('height', String(next));
    iframe.setAttribute('scrolling', 'no');
    lastHeight = next;
    sendViewport();
  }

  function scrollParentTo(targetY) {
    const iframe = getIframe();
    if (!iframe) return;

    const iframeTop = getPageScrollY() + iframe.getBoundingClientRect().top;
    window.scrollTo({
      top: Math.max(0, iframeTop + Number(targetY || 0) - 18),
      behavior: 'smooth'
    });

    [80, 300, 800].forEach(function (ms) {
      setTimeout(sendViewport, ms);
    });
  }

  function bindMessages() {
    if (window.__siwolParentMessageBind) return;
    window.__siwolParentMessageBind = true;

    window.addEventListener('message', function (e) {
      if (e.origin !== IFRAME_ORIGIN) return;
      const data = e.data || {};
      if (data.source !== 'syura-css') return;

      if (data.type === 'SYURA_IFRAME_HEIGHT') setIframeHeight(data.height);
      if (data.type === 'SYURA_IFRAME_READY') [50, 200, 600, 1200].forEach(function (ms) { setTimeout(sendViewport, ms); });
      if (data.type === 'SYURA_ACTIVE_SECTION') setActiveNav(data.sectionId);
      if (data.type === 'SYURA_PARENT_SCROLL_TO') scrollParentTo(data.targetY);
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
      iframe.addEventListener('load', function () {
        [80, 250, 700, 1500].forEach(function (ms) { setTimeout(sendViewport, ms); });
      });
    }

    sendViewport();
    return true;
  }

  function neutralize() {
    injectStyle();
    renderNav();
    unlockArtmugDetail();
    bindMessages();
    prepareIframe();
  }

  function watch() {
    if (window.__siwolParentWatch) return;
    window.__siwolParentWatch = true;

    const mo = new MutationObserver(function (mutations) {
      if (mutations.every(function (m) {
        return m.target && m.target.closest && m.target.closest('.syura-floating-nav');
      })) return;

      clearTimeout(retryTimer);
      retryTimer = setTimeout(neutralize, 120);
    });

    mo.observe(document.documentElement, { childList: true, subtree: true });

    let count = 0;
    const iv = setInterval(function () {
      count += 1;
      neutralize();
      if (count > 40) clearInterval(iv);
    }, 700);
  }

  function boot() {
    neutralize();
    watch();
    [300, 1000, 2000, 4000].forEach(function (ms) { setTimeout(neutralize, ms); });
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
