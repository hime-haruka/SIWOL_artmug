(function () {
  'use strict';

  var IFRAME_ORIGIN = 'https://siwol-artmug.netlify.app';
  var IFRAME_SELECTOR = 'section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"], [name="am-root"] iframe[src*="siwol-artmug.netlify.app"], iframe[src*="siwol-artmug.netlify.app"]';
  var QNA_URL = 'qna_write.php?number=41275';
  var STYLE_ID = 'syura-floating-nav-style-v12';
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
    { id: 'portfolio:package', label: '- 구독 패키지', key: 'package' },
    { id: 'portfolio:badge', label: '- 구독 뱃지', key: 'badge' },
    { id: 'portfolio:emoji', label: '- 구독티콘', key: 'emoji' },
    { id: 'portfolio:move_emoji', label: '- 움짤티콘', key: 'move_emoji' },
    { id: 'portfolio:ogq', label: '- OGQ', key: 'ogq' },
    { id: 'portfolio:facial_chart', label: '- 페이셜 차트', key: 'facial_chart' },
    { id: 'portfolio:dona_image', label: '- 후원 이미지', key: 'donation' },
    { id: 'portfolio:fan_char', label: '- 팬 캐릭터', key: 'fan_character' },
    { id: 'portfolio:gif_talk', label: '- 짚톡', key: 'ziptalk' },
    { id: 'portfolio:sd_illust', label: '- SD 일러스트', key: 'sd_illust' },
    { id: 'portfolio:ld_illust', label: '- LD 일러스트', key: 'ld_illust' },
    { id: 'portfolio:overlay', label: '- 방송 화면', key: 'overlay' },
    { id: 'portfolio:v_animal', label: '- 멍냥 버츄얼', key: 'virtual_animal' },
    { id: 'portfolio:v_nyah', label: '- SD 버츄얼', key: 'virtual_sd' }
  ];

  function injectStyle() {
    [
      'siwol-artmug-parent-style',
      'syura-floating-nav-style',
      'syura-floating-nav-style-v7',
      'syura-floating-nav-style-v8',
      'syura-floating-nav-style-v9',
      'syura-floating-nav-style-v10',
      'syura-floating-nav-style-v11',
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
  width:210px!important;
  font-family:Atomy,'Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif!important;
  color:#8d79db!important;
  letter-spacing:-.055em!important;
  pointer-events:auto!important;
  transform:none!important;
  opacity:1!important;
  visibility:visible!important;
  display:block!important;
}
.syura-floating-nav,
.syura-floating-nav *{box-sizing:border-box!important;}

.syura-floating-nav__inner{
  position:relative!important;
  overflow:hidden!important;
  width:100%!important;
  border:2px solid #c7b4ff!important;
  border-radius:12px!important;
  background:#efeaff!important;
  padding:8px!important;
  box-shadow:none!important;
  isolation:isolate!important;
}

.syura-floating-nav__pattern{
  position:absolute!important;
  inset:74px 8px 28px 8px!important;
  z-index:0!important;
  pointer-events:none!important;
  background-image:linear-gradient(180deg,rgba(244,242,255,.64),rgba(244,242,255,.64)),url('https://lh3.googleusercontent.com/d/13CvtmqiZi9vvkSVdi8I1RhxLuHEWWzx3')!important;
  background-repeat:repeat,repeat!important;
  background-position:center top,center top!important;
  background-size:cover,1180px auto!important;
  opacity:1!important;
}

.syura-floating-nav__dots{
  position:relative!important;
  z-index:3!important;
  display:flex!important;
  justify-content:center!important;
  align-items:center!important;
  gap:6px!important;
  width:100%!important;
  height:8px!important;
  margin:0!important;
  padding:0!important;
  pointer-events:none!important;
}
.syura-floating-nav__dots span{
  display:block!important;
  width:5px!important;
  height:5px!important;
  border-radius:999px!important;
  background:#cdbdfd!important;
  margin:0!important;
  padding:0!important;
}
.syura-floating-nav__dots--top{margin-bottom:0!important;}
.syura-floating-nav__dots--bottom{margin-top:8px!important;}

.syura-floating-nav__awning{
  position:relative!important;
  z-index:2!important;
  width:calc(100% + 16px)!important;
  height:72px!important;
  margin:-1px -8px 8px!important;
  background-image:url('https://lh3.googleusercontent.com/d/1nHKjunygcwk1Nn4lYZ7Eplq199VUPS5B')!important;
  background-repeat:no-repeat!important;
  background-position:center top!important;
  background-size:400px auto!important;
  pointer-events:none!important;
}

.syura-floating-nav__menu{
  position:relative!important;
  z-index:2!important;
  display:flex!important;
  flex-direction:column!important;
  gap:8px!important;
  width:100%!important;
  margin:0!important;
  padding:0!important;
  max-height:calc(100vh - 125px)!important;
  overflow-y:auto!important;
  overflow-x:hidden!important;
  scrollbar-width:thin!important;
}
.syura-floating-nav__menu::-webkit-scrollbar{width:4px!important;}
.syura-floating-nav__menu::-webkit-scrollbar-thumb{background:#c7b4ff!important;border-radius:999px!important;}

.syura-floating-nav__button,
.syura-floating-nav__subbutton{
  appearance:none!important;
  -webkit-appearance:none!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  width:100%!important;
  height:36px!important;
  min-height:36px!important;
  max-height:36px!important;
  margin:0!important;
  padding:6px 8px 4px!important;
  border:1px solid #d9cdfb!important;
  border-radius:8px!important;
  background:rgba(255,255,255,.94)!important;
  color:#8d79db!important;
  box-shadow:0 1px 2px rgba(0,0,0,.06)!important;
  font:400 13px/1.2 Atomy,'Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif!important;
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
  background:linear-gradient(180deg,#b49bff 0%,#9678f0 100%)!important;
  border-color:#9277e8!important;
  color:#fff!important;
  box-shadow:0 1px 2px rgba(0,0,0,.08)!important;
}
.syura-floating-nav__button--portfolio:hover{color:#fff!important;background:linear-gradient(180deg,#bda8ff 0%,#9d80f2 100%)!important;}
.syura-floating-nav__button--portfolio .syura-floating-nav__arrow{
  position:absolute!important;
  right:10px!important;
  top:50%!important;
  transform:translateY(-50%)!important;
  font-size:10px!important;
  line-height:1!important;
}
.syura-floating-nav.is-open .syura-floating-nav__button--portfolio .syura-floating-nav__arrow{transform:translateY(-50%) rotate(180deg)!important;}

.syura-floating-nav__dropdown{
  display:none!important;
  flex-direction:column!important;
  gap:6px!important;
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
  height:30px!important;
  min-height:30px!important;
  max-height:30px!important;
  font-size:12px!important;
  padding:5px 8px 3px!important;
  background:rgba(255,255,255,.92)!important;
  color:#8d79db!important;
}

@media(max-height:760px){
  .syura-floating-nav{top:10px!important;right:12px!important;width:180px!important;}
  .syura-floating-nav__inner{padding:7px!important;}
  .syura-floating-nav__awning{height:58px!important;margin:-1px -7px 7px!important;background-size:330px auto!important;}
  .syura-floating-nav__pattern{inset:62px 7px 25px 7px!important;}
  .syura-floating-nav__menu{gap:6px!important;max-height:calc(100vh - 105px)!important;}
  .syura-floating-nav__button{height:31px!important;min-height:31px!important;max-height:31px!important;font-size:12px!important;}
  .syura-floating-nav__subbutton{height:25px!important;min-height:25px!important;max-height:25px!important;font-size:10.5px!important;}
  .syura-floating-nav__dropdown{gap:4px!important;margin-top:5px!important;}
}

@media(max-width:900px){
  .syura-floating-nav{right:10px!important;top:10px!important;width:174px!important;}
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
    for (var i = 0; i < 4; i += 1) dots.appendChild(document.createElement('span'));
    return dots;
  }

  function makeButton(className, text, onClick, dataName, dataValue) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = text;
    if (dataName) button.setAttribute(dataName, dataValue);
    button.addEventListener('click', onClick);
    return button;
  }

  function removeOldNavs() {
    document.querySelectorAll('#siwol-artmug-parent-nav,.syura-floating-nav').forEach(function (old) {
      old.remove();
    });
  }

  function buildNav() {
    removeOldNavs();

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
      }, 'data-portfolio', item.key));
    });
    ddWrap.appendChild(dropdown);
    menu.appendChild(ddWrap);

    menu.appendChild(makeButton('syura-floating-nav__button', '[신청 양식]', function () {
      requestChildScroll('form');
    }, 'data-target', 'form'));

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
    document.querySelectorAll('.btn_open_btn,.btn_open,.btn_close').forEach(function (el) {
      el.remove();
    });
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
    [80, 300, 800].forEach(function (ms) {
      setTimeout(sendViewport, ms);
    });
  }

  function bindMessages() {
    if (window.__syuraFloatingNavMessageBindV12) return;
    window.__syuraFloatingNavMessageBindV12 = true;

    window.addEventListener('message', function (e) {
      if (e.origin !== IFRAME_ORIGIN) return;
      var data = e.data || {};
      if (data.source !== 'syura-css') return;

      if (data.type === 'SYURA_IFRAME_HEIGHT') setIframeHeight(data.height);
      if (data.type === 'SYURA_IFRAME_READY') {
        [50, 200, 600, 1200].forEach(function (ms) { setTimeout(sendViewport, ms); });
      }
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

    if (!iframe.dataset.siwolParentBoundV12) {
      iframe.dataset.siwolParentBoundV12 = '1';
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
    if (window.__syuraFloatingNavWatchV12) return;
    window.__syuraFloatingNavWatchV12 = true;

    var mo = new MutationObserver(function (mutations) {
      var onlyNav = mutations.every(function (m) {
        return m.target && (
          (m.target.classList && m.target.classList.contains('syura-floating-nav')) ||
          (m.target.closest && m.target.closest('.syura-floating-nav'))
        );
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
    unlockArtmugDetail();
    bindMessages();
    prepareIframe();
    watch();
    [300, 1000, 2000, 4000].forEach(function (ms) { setTimeout(neutralize, ms); });
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
