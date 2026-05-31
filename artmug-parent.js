(function () {
  'use strict';

  var IFRAME_ORIGIN = 'https://siwol-artmug.netlify.app';
  var IFRAME_SELECTOR = 'section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"], [name="am-root"] iframe[src*="siwol-artmug.netlify.app"], iframe[src*="siwol-artmug.netlify.app"]';
  var QNA_URL = 'qna_write.php?number=41275';

  var STYLE_ID = 'syura-floating-nav-style-v9';
  var NAV_CLASS = 'syura-floating-nav';
  var lastHeight = 0;
  var retryTimer = null;

  var MAIN_ITEMS = [
    { id: 'top', label: '[TOP]' },
    { id: 'intro', label: '[작가 소개]' },
    { id: 'calendar', label: '[예약 현황]' },
    { id: 'process', label: '[진행 방식]' },
    { id: 'notice', label: '[공지사항]' },
    { id: 'usage', label: '[사용 범위]' }
  ];

  var PORTFOLIO_ITEMS = [
    { id: 'portfolio:package', label: '- 구독 패키지' },
    { id: 'portfolio:badge', label: '- 구독 뱃지' },
    { id: 'portfolio:emoji', label: '- 구독티콘' },
    { id: 'portfolio:move_emoji', label: '- 움짤티콘' },
    { id: 'portfolio:ogq', label: '- OGQ' },
    { id: 'portfolio:facial_chart', label: '- 페이셜 차트' },
    { id: 'portfolio:dona_image', label: '- 후원 이미지' },
    { id: 'portfolio:fan_char', label: '- 팬 캐릭터' },
    { id: 'portfolio:gif_talk', label: '- 짚톡' },
    { id: 'portfolio:sd_illust', label: '- SD 일러스트' },
    { id: 'portfolio:ld_illust', label: '- LD 일러스트' },
    { id: 'portfolio:overlay', label: '- 방송 화면' },
    { id: 'portfolio:v_animal', label: '- 멍냥 버츄얼' },
    { id: 'portfolio:v_nyah', label: '- SD 버츄얼' }
  ];

  function injectStyle() {
    // 기존에 삽입했던 메뉴 스타일을 전부 제거해서 예전 디자인이 우선 적용되지 않게 함
    [
      'siwol-artmug-parent-style',
      'syura-floating-nav-style',
      'syura-floating-nav-style-v7',
      'syura-floating-nav-style-v8',
      STYLE_ID
    ].forEach(function (id) {
      var old = document.getElementById(id);
      if (old) old.remove();
    });

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
@font-face{font-family:Atomy;src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/Atomy-Bold.woff') format('woff');font-weight:400;font-display:swap;}

section[name="am-root"],[name="am-root"]{display:block!important;text-align:start!important;padding:0!important;margin:0 auto!important;line-height:normal!important;overflow:visible!important;}
section[name="am-root"] [name="stage"],[name="am-root"] [name="stage"]{display:block!important;width:100%!important;overflow:visible!important;}
section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],iframe[src*="siwol-artmug.netlify.app"]{display:block!important;width:100%!important;max-width:1180px!important;min-height:700px!important;height:700px;margin:0 auto!important;border:0!important;overflow:hidden!important;}

.syura-floating-nav{
  position:fixed!important;
  top:20px!important;
  right:20px!important;
  z-index:2147483000!important;
  width:156px!important;
  font-family:Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;
  color:#8d79db!important;
  letter-spacing:-.055em!important;
  transform:none!important;
  pointer-events:auto!important;
}
.syura-floating-nav *{box-sizing:border-box!important;}
.syura-floating-nav__inner{
  position:relative!important;
  overflow:hidden!important;
  width:100%!important;
  border:2px solid #bea6ff!important;
  border-radius:7px!important;
  background:#f3efff!important;
  padding:9px 8px 8px!important;
  box-shadow:none!important;
  isolation:isolate!important;
}
.syura-floating-nav__pattern{
  position:absolute!important;
  left:8px!important;
  right:8px!important;
  top:72px!important;
  bottom:28px!important;
  z-index:0!important;
  pointer-events:none!important;
  background:
    linear-gradient(180deg,rgba(244,240,255,.72),rgba(232,224,255,.72)),
    url('https://lh3.googleusercontent.com/d/13CvtmqiZi9vvkSVdi8I1RhxLuHEWWzx3') center top/1180px auto repeat-y!important;
  opacity:1!important;
}
.syura-floating-nav__dots{
  position:relative!important;
  z-index:3!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  gap:5px!important;
  width:100%!important;
  height:7px!important;
  margin:0!important;
  padding:0!important;
  pointer-events:none!important;
}
.syura-floating-nav__dots span{
  display:block!important;
  width:4px!important;
  height:4px!important;
  border-radius:999px!important;
  background:#d0c0ff!important;
  margin:0!important;
  padding:0!important;
}
.syura-floating-nav__dots--top{margin-bottom:0!important;}
.syura-floating-nav__dots--bottom{margin-top:6px!important;}
.syura-floating-nav__awning{
  position:relative!important;
  z-index:2!important;
  width:calc(100% + 16px)!important;
  height:60px!important;
  margin:-2px -8px 6px!important;
  background:url('https://lh3.googleusercontent.com/d/1nHKjunygcwk1Nn4lYZ7Eplq199VUPS5B') center top/210px auto no-repeat!important;
  pointer-events:none!important;
}
.syura-floating-nav__menu{
  position:relative!important;
  z-index:3!important;
  display:flex!important;
  flex-direction:column!important;
  gap:7px!important;
  width:100%!important;
  max-height:calc(100vh - 122px)!important;
  overflow-y:auto!important;
  overflow-x:hidden!important;
  padding:0 3px!important;
  margin:0!important;
  scrollbar-width:thin!important;
}
.syura-floating-nav__menu::-webkit-scrollbar{width:4px!important;}
.syura-floating-nav__menu::-webkit-scrollbar-thumb{background:#c9b9ff!important;border-radius:999px!important;}
.syura-floating-nav__button,
.syura-floating-nav__subbutton{
  appearance:none!important;
  -webkit-appearance:none!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  width:100%!important;
  height:31px!important;
  min-height:31px!important;
  max-height:31px!important;
  margin:0!important;
  padding:5px 7px 3px!important;
  border:1px solid #d9cdfb!important;
  border-radius:5px!important;
  background:rgba(255,255,255,.92)!important;
  color:#8d79db!important;
  box-shadow:0 2px 0 rgba(126,99,221,.10),0 0 0 1px rgba(255,255,255,.7) inset!important;
  font:400 13px/1 Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;
  text-align:center!important;
  white-space:nowrap!important;
  cursor:pointer!important;
  transform:none!important;
  transition:background-color .12s ease,border-color .12s ease,color .12s ease!important;
}
.syura-floating-nav__button:hover,
.syura-floating-nav__subbutton:hover,
.syura-floating-nav__button.is-active,
.syura-floating-nav__subbutton.is-active{
  background:#fff!important;
  border-color:#b9a5ff!important;
  color:#725cdb!important;
  transform:none!important;
}
.syura-floating-nav__dropdown-wrap{
  position:relative!important;
  display:flex!important;
  flex-direction:column!important;
  gap:0!important;
  width:100%!important;
  margin:0!important;
  padding:0!important;
}
.syura-floating-nav__button--portfolio{
  position:relative!important;
  justify-content:center!important;
  background:linear-gradient(180deg,#b59dff 0%,#9778ef 100%)!important;
  border-color:#9277e8!important;
  color:#fff!important;
  box-shadow:0 2px 0 rgba(112,91,215,.18)!important;
}
.syura-floating-nav__button--portfolio .syura-floating-nav__arrow{
  position:absolute!important;
  right:9px!important;
  top:50%!important;
  transform:translateY(-50%)!important;
  font-size:9px!important;
  line-height:1!important;
}
.syura-floating-nav.is-open .syura-floating-nav__button--portfolio .syura-floating-nav__arrow{transform:translateY(-50%) rotate(180deg)!important;}
.syura-floating-nav__dropdown{
  display:none!important;
  flex-direction:column!important;
  gap:5px!important;
  width:100%!important;
  margin:6px 0 0!important;
  padding:0!important;
  border:0!important;
  background:transparent!important;
  box-shadow:none!important;
  max-height:none!important;
  overflow:visible!important;
}
.syura-floating-nav.is-open .syura-floating-nav__dropdown{display:flex!important;}
.syura-floating-nav__subbutton{
  height:26px!important;
  min-height:26px!important;
  max-height:26px!important;
  font-size:11px!important;
  padding:4px 5px 2px!important;
  background:rgba(255,255,255,.9)!important;
  color:#8d79db!important;
}
@media(max-height:740px){
  .syura-floating-nav{top:10px!important;right:12px!important;width:148px!important;}
  .syura-floating-nav__inner{padding:8px 7px 7px!important;}
  .syura-floating-nav__awning{height:48px!important;background-size:192px auto!important;margin:-2px -7px 5px!important;}
  .syura-floating-nav__pattern{top:61px!important;bottom:25px!important;left:7px!important;right:7px!important;}
  .syura-floating-nav__menu{gap:5px!important;max-height:calc(100vh - 95px)!important;padding:0 2px!important;}
  .syura-floating-nav__button{height:28px!important;min-height:28px!important;max-height:28px!important;font-size:12px!important;}
  .syura-floating-nav__subbutton{height:23px!important;min-height:23px!important;max-height:23px!important;font-size:10px!important;}
  .syura-floating-nav__dropdown{gap:4px!important;margin-top:5px!important;}
}
`;
    document.head.appendChild(style);
  }

  function getIframe() { return document.querySelector(IFRAME_SELECTOR); }
  function getPageScrollY() { return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; }

  function sendViewport() {
    var iframe = getIframe();
    if (!iframe || !iframe.contentWindow) return;
    var rect = iframe.getBoundingClientRect();
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
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    var iframe = getIframe();
    if (iframe && iframe.contentWindow && sectionId) {
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

    var qna = document.getElementById('cont_qna') || document.querySelector('#cont_qna') || document.querySelector('[id="cont_qna"]');
    if (qna) {
      window.scrollTo({ top: Math.max(0, qna.getBoundingClientRect().top + getPageScrollY() - 100), behavior: 'smooth' });
      return;
    }
    requestChildScroll('form');
  }

  function makeDots(className) {
    var dots = document.createElement('div');
    dots.className = 'syura-floating-nav__dots ' + className;
    for (var i = 0; i < 4; i++) dots.appendChild(document.createElement('span'));
    return dots;
  }

  function makeButton(className, text, onClick, dataName, dataValue) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = className;
    b.textContent = text;
    if (dataName) b.setAttribute(dataName, dataValue);
    b.addEventListener('click', onClick);
    return b;
  }

  function buildNav() {
    // 예전 구조/스타일 제거
    document.querySelectorAll('#siwol-artmug-parent-nav,.syura-floating-nav').forEach(function (old) { old.remove(); });

    var nav = document.createElement('div');
    nav.className = 'syura-floating-nav';

    var inner = document.createElement('div');
    inner.className = 'syura-floating-nav__inner';

    inner.appendChild(makeDots('syura-floating-nav__dots--top'));

    var awning = document.createElement('div');
    awning.className = 'syura-floating-nav__awning';
    inner.appendChild(awning);

    var pattern = document.createElement('div');
    pattern.className = 'syura-floating-nav__pattern';
    inner.appendChild(pattern);

    var menu = document.createElement('div');
    menu.className = 'syura-floating-nav__menu';

    MAIN_ITEMS.forEach(function (item) {
      menu.appendChild(makeButton('syura-floating-nav__button', item.label, function () {
        requestChildScroll(item.id);
      }, 'data-target', item.id));
    });

    var ddWrap = document.createElement('div');
    ddWrap.className = 'syura-floating-nav__dropdown-wrap';

    var portfolioBtn = document.createElement('button');
    portfolioBtn.type = 'button';
    portfolioBtn.className = 'syura-floating-nav__button syura-floating-nav__button--portfolio';
    portfolioBtn.setAttribute('data-dropdown-toggle', '');
    portfolioBtn.innerHTML = '<span>[포트폴리오]</span><span class="syura-floating-nav__arrow">▼</span>';
    portfolioBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      nav.classList.toggle('is-open');
    });
    ddWrap.appendChild(portfolioBtn);

    var dropdown = document.createElement('div');
    dropdown.className = 'syura-floating-nav__dropdown';
    PORTFOLIO_ITEMS.forEach(function (item) {
      dropdown.appendChild(makeButton('syura-floating-nav__subbutton', item.label, function () {
        requestChildScroll(item.id);
      }, 'data-portfolio', item.id.replace('portfolio:', '')));
    });
    ddWrap.appendChild(dropdown);
    menu.appendChild(ddWrap);

    menu.appendChild(makeButton('syura-floating-nav__button', '[신청 양식]', function () { requestChildScroll('form'); }, 'data-target', 'form'));
    menu.appendChild(makeButton('syura-floating-nav__button', '[문의하기]', openInquiry, 'data-target', 'contact'));

    inner.appendChild(menu);
    inner.appendChild(makeDots('syura-floating-nav__dots--bottom'));
    nav.appendChild(inner);
    document.body.appendChild(nav);
  }

  function unlockArtmugDetail() {
    var box = document.querySelector('.detailinfo');
    if (box) {
      box.classList.remove('showstep1');
      box.style.maxHeight = 'none';
      box.style.overflow = 'visible';
    }
    var content = document.querySelector('.detailinfo .showcontent');
    if (content) {
      content.style.maxHeight = 'none';
      content.style.overflow = 'visible';
    }
    document.querySelectorAll('.btn_open_btn,.btn_open,.btn_close').forEach(function (el) { el.remove(); });
  }

  function setIframeHeight(height) {
    var iframe = getIframe();
    if (!iframe) return;
    var next = Math.max(700, Math.ceil(Number(height) || 0));
    iframe.style.height = next + 'px';
    iframe.height = String(next);
    iframe.setAttribute('height', String(next));
    iframe.setAttribute('scrolling', 'no');
    lastHeight = next;
    sendViewport();
  }

  function scrollParentTo(targetY) {
    var iframe = getIframe();
    if (!iframe) return;
    var iframeTop = getPageScrollY() + iframe.getBoundingClientRect().top;
    window.scrollTo({ top: Math.max(0, iframeTop + Number(targetY || 0) - 18), behavior: 'smooth' });
    [80, 300, 800].forEach(function (ms) { setTimeout(sendViewport, ms); });
  }

  function bindMessages() {
    if (window.__syuraFloatingNavMessageBindV9) return;
    window.__syuraFloatingNavMessageBindV9 = true;

    window.addEventListener('message', function (e) {
      if (e.origin !== IFRAME_ORIGIN) return;
      var data = e.data || {};
      if (data.source !== 'syura-css') return;

      if (data.type === 'SYURA_IFRAME_HEIGHT') setIframeHeight(data.height);
      if (data.type === 'SYURA_IFRAME_READY') [50, 200, 600, 1200].forEach(function (ms) { setTimeout(sendViewport, ms); });
      if (data.type === 'SYURA_PARENT_SCROLL_TO') scrollParentTo(data.targetY);
    });

    window.addEventListener('scroll', sendViewport, { passive: true });
    window.addEventListener('resize', sendViewport);
  }

  function prepareIframe() {
    var iframe = getIframe();
    if (!iframe) return false;
    iframe.style.height = Math.max(Number(iframe.getAttribute('height')) || 700, lastHeight || 700) + 'px';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('scrolling', 'no');

    if (!iframe.dataset.siwolParentBoundV9) {
      iframe.dataset.siwolParentBoundV9 = '1';
      iframe.addEventListener('load', function () {
        [80, 250, 700, 1500].forEach(function (ms) { setTimeout(sendViewport, ms); });
      });
    }
    sendViewport();
    return true;
  }

  function neutralize() {
    injectStyle();
    unlockArtmugDetail();
    bindMessages();
    if (!document.querySelector('.syura-floating-nav')) buildNav();
    prepareIframe();
  }

  function watch() {
    if (window.__syuraFloatingNavWatchV9) return;
    window.__syuraFloatingNavWatchV9 = true;

    var mo = new MutationObserver(function (mutations) {
      var onlyNav = mutations.every(function (m) {
        return m.target && (m.target.classList && m.target.classList.contains('syura-floating-nav') || (m.target.closest && m.target.closest('.syura-floating-nav')));
      });
      if (onlyNav) return;
      clearTimeout(retryTimer);
      retryTimer = setTimeout(neutralize, 80);
    });

    mo.observe(document.documentElement, { childList: true, subtree: true });

    var count = 0;
    var iv = setInterval(function () {
      count += 1;
      neutralize();
      if (count > 20) clearInterval(iv);
    }, 700);
  }

  function boot() {
    injectStyle();
    buildNav();
    neutralize();
    watch();
    [300, 1000, 2000, 4000].forEach(function (ms) { setTimeout(neutralize, ms); });
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
