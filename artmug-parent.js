(function () {
  const IFRAME_ORIGIN = 'https://siwol-artmug.netlify.app';
  const IFRAME_SELECTOR = 'section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"], [name="am-root"] iframe[src*="siwol-artmug.netlify.app"], iframe[src*="siwol-artmug.netlify.app"]';
  const QNA_URL = 'qna_write.php?number=41275';

  let lastHeight = 0;
  let retryTimer = null;
  let navTopTarget = 320;
  let navAnimating = false;
  let lastNavRequestAt = 0;
  let navItemsSignature = '';
  const DEFAULT_NAV_ITEMS = [
    {id:'intro', title:'작가 소개'},
    {id:'calendar', title:'예약 현황'},
    {id:'process', title:'진행 방식'},
    {id:'notice', title:'공지사항'},
    {id:'usage', title:'사용 범위'},
    {id:'portfolio', title:'포트폴리오'},
    {id:'portfolio:package', title:'구독 패키지', parent:'portfolio'},
    {id:'portfolio:badge', title:'구독 뱃지', parent:'portfolio'},
    {id:'portfolio:emoji', title:'구독티콘', parent:'portfolio'},
    {id:'portfolio:move_emoji', title:'움짤티콘', parent:'portfolio'},
    {id:'portfolio:ogq', title:'OGQ', parent:'portfolio'},
    {id:'portfolio:facial_chart', title:'페이셜 차트', parent:'portfolio'},
    {id:'portfolio:dona_image', title:'후원 이미지', parent:'portfolio'},
    {id:'portfolio:fan_char', title:'팬 캐릭터', parent:'portfolio'},
    {id:'portfolio:gif_talk', title:'짚톡', parent:'portfolio'},
    {id:'portfolio:sd_illust', title:'SD 일러스트', parent:'portfolio'},
    {id:'portfolio:ld_illust', title:'LD 일러스트', parent:'portfolio'},
    {id:'portfolio:overlay', title:'방송 화면', parent:'portfolio'},
    {id:'portfolio:v_animal', title:'멍냥 버츄얼', parent:'portfolio'},
    {id:'portfolio:v_nyah', title:'SD 버츄얼', parent:'portfolio'},
    {id:'form', title:'신청 양식'}
  ];

  function injectStyle() {
    if (document.getElementById('siwol-artmug-parent-style')) return;
    const style = document.createElement('style');
    style.id = 'siwol-artmug-parent-style';
    style.textContent = `
@font-face{font-family:Atomy;src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/Atomy-Bold.woff') format('woff');font-weight:400;font-display:swap;}
section[name="am-root"],[name="am-root"]{display:block!important;text-align:start!important;padding:0!important;margin:0 auto!important;line-height:normal!important;overflow:visible!important;}
section[name="am-root"] [name="stage"],[name="am-root"] [name="stage"]{display:block!important;width:100%!important;overflow:visible!important;}
section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],iframe[src*="siwol-artmug.netlify.app"]{display:block!important;width:100%!important;max-width:1180px!important;min-height:700px!important;height:700px;margin:0 auto!important;border:0!important;overflow:hidden!important;}
#siwol-artmug-parent-nav{position:fixed!important;right:24px!important;top:24px!important;left:auto!important;bottom:auto!important;z-index:2147483000!important;width:216px!important;display:block!important;font-family:Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;letter-spacing:-.055em!important;pointer-events:auto!important;color:#8d79db!important;contain:layout paint style!important;}
#siwol-artmug-parent-nav.is-visible{display:block!important;}
#siwol-artmug-parent-nav *{box-sizing:border-box!important;}
#siwol-artmug-parent-nav .siwol-nav-frame{position:relative;overflow:hidden;border:2px solid #bea9ff!important;border-radius:8px!important;background:linear-gradient(180deg,#fff 0%,#f7f4ff 44%,#fff 100%)!important;box-shadow:0 10px 28px rgba(105,79,206,.14)!important;padding:78px 14px 24px!important;isolation:isolate;max-height:calc(100vh - 48px)!important;}
#siwol-artmug-parent-nav .siwol-nav-frame:before{content:'';position:absolute;left:50%;top:10px;width:861px;height:240px;transform:translateX(-50%) scale(.248);transform-origin:top center;background:url('https://lh3.googleusercontent.com/d/1nHKjunygcwk1Nn4lYZ7Eplq199VUPS5B') center top/861px auto no-repeat;z-index:2;pointer-events:none;}
#siwol-artmug-parent-nav .siwol-nav-frame:after{content:'';position:absolute;inset:72px 8px 34px;background:linear-gradient(180deg,rgba(255,255,255,.72),rgba(238,232,255,.68));z-index:0;pointer-events:none;}
#siwol-artmug-parent-nav .siwol-nav-pattern{position:absolute;inset:72px 8px 34px;background:url('https://lh3.googleusercontent.com/d/13CvtmqiZi9vvkSVdi8I1RhxLuHEWWzx3') center top/1180px auto repeat-y;opacity:.9;z-index:1;pointer-events:none;}
#siwol-artmug-parent-nav .siwol-nav-dots,#siwol-artmug-parent-nav .siwol-nav-dots-bottom{position:absolute;left:50%;transform:translateX(-50%);display:block;z-index:3;pointer-events:none;width:42px;height:6px;font-size:0;background:radial-gradient(circle,#cabdff 0 2.3px,transparent 2.6px) 0 0/10px 6px repeat-x;}
#siwol-artmug-parent-nav .siwol-nav-dots{top:8px;}#siwol-artmug-parent-nav .siwol-nav-dots-bottom{bottom:8px;}
#siwol-artmug-parent-nav .siwol-nav-dots:before,#siwol-artmug-parent-nav .siwol-nav-dots-bottom:before{content:none!important;}
#siwol-artmug-parent-nav .siwol-nav-list{position:relative;z-index:4;display:flex!important;flex-direction:column!important;gap:6px!important;max-height:calc(100vh - 150px)!important;overflow-y:auto!important;overflow-x:hidden!important;padding:0 2px!important;scrollbar-width:thin;}
#siwol-artmug-parent-nav .siwol-nav-list::-webkit-scrollbar{width:4px;}#siwol-artmug-parent-nav .siwol-nav-list::-webkit-scrollbar-thumb{background:#c7b7ff;border-radius:999px;}
#siwol-artmug-parent-nav button{appearance:none!important;-webkit-appearance:none!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:35px!important;border:1px solid #d8cdfc!important;border-radius:6px!important;background:rgba(255,255,255,.96)!important;color:#8d79db!important;box-shadow:0 2px 0 rgba(126,99,221,.10),0 0 0 1px rgba(255,255,255,.70) inset!important;padding:6px 7px 4px!important;font:400 15px/1 Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;text-align:center!important;cursor:pointer!important;white-space:nowrap!important;transition:background-color .12s ease,color .12s ease,border-color .12s ease!important;transform:none!important;}
#siwol-artmug-parent-nav button:hover,#siwol-artmug-parent-nav button.is-active{background:#fff!important;border-color:#b39bff!important;color:#705bd7!important;box-shadow:0 2px 0 rgba(126,99,221,.10),0 0 0 1px rgba(255,255,255,.78) inset!important;transform:none!important;}
#siwol-artmug-parent-nav .siwol-nav-portfolio{position:relative;}
#siwol-artmug-parent-nav .siwol-nav-portfolio-main{position:relative;background:#a892ef!important;color:#fff!important;border-color:#967ce6!important;box-shadow:0 2px 0 rgba(112,91,215,.18)!important;}
#siwol-artmug-parent-nav .siwol-nav-portfolio-main:after{content:'⌄';position:absolute;right:13px;top:50%;transform:translateY(-50%);font-size:12px;line-height:1;transition:transform .12s ease;}
#siwol-artmug-parent-nav .siwol-nav-portfolio.is-open .siwol-nav-portfolio-main:after{transform:translateY(-50%) rotate(180deg);}
#siwol-artmug-parent-nav .siwol-nav-sub{display:grid!important;grid-template-rows:0fr;opacity:0;margin:0!important;transition:grid-template-rows .14s ease,opacity .10s ease;}
#siwol-artmug-parent-nav .siwol-nav-portfolio.is-open .siwol-nav-sub{grid-template-rows:1fr;opacity:1;margin:0!important;}
#siwol-artmug-parent-nav .siwol-nav-sub-inner{overflow:hidden;display:flex;flex-direction:column;gap:0;padding:0;background:#fff!important;border:1px solid rgba(179,155,255,.80);border-top:0;border-radius:0 0 6px 6px;box-shadow:0 8px 18px rgba(105,79,206,.10)!important;}
#siwol-artmug-parent-nav .siwol-nav-sub button{min-height:21px!important;font-size:12px!important;line-height:1!important;border:0!important;border-bottom:1px solid rgba(216,205,252,.72)!important;border-radius:0!important;background:#fff!important;color:#927ce5!important;box-shadow:none!important;padding:3px 4px 2px!important;}
#siwol-artmug-parent-nav .siwol-nav-sub button:last-child{border-bottom:0!important;}
#siwol-artmug-parent-nav .siwol-nav-sub button:before{content:'-';margin-right:2px;}
#siwol-artmug-parent-nav .siwol-nav-sub button:hover{background:#f4f0ff!important;color:#705bd7!important;box-shadow:none!important;}
#siwol-artmug-parent-nav .siwol-nav-inquiry{background:rgba(255,255,255,.96)!important;color:#8d79db!important;border-color:#d8cdfc!important;}
#siwol-artmug-parent-nav .siwol-nav-inquiry:hover{background:#fff!important;color:#705bd7!important;}
@media(max-height:820px){#siwol-artmug-parent-nav{top:14px!important;right:16px!important;width:206px!important;}#siwol-artmug-parent-nav .siwol-nav-frame{padding:72px 12px 21px!important;max-height:calc(100vh - 28px)!important;}#siwol-artmug-parent-nav .siwol-nav-frame:before{transform:translateX(-50%) scale(.238);}#siwol-artmug-parent-nav .siwol-nav-list{gap:5px!important;max-height:calc(100vh - 142px)!important;}#siwol-artmug-parent-nav button{min-height:31px!important;font-size:14px!important;padding:5px 6px 3px!important;}#siwol-artmug-parent-nav .siwol-nav-sub button{min-height:19px!important;font-size:11px!important;padding:2px 4px 1px!important;}}
@media(max-width:860px){#siwol-artmug-parent-nav{right:10px!important;top:10px!important;width:190px!important;transform:scale(.92)!important;transform-origin:top right!important;}#siwol-artmug-parent-nav .siwol-nav-frame{max-height:calc(100vh - 20px)!important;}}
`;
    document.head.appendChild(style);
  }

  function getIframe(){ return document.querySelector(IFRAME_SELECTOR); }
  function getPageScrollY(){ return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; }
  function sendViewport(){
    const iframe = getIframe(); if (!iframe || !iframe.contentWindow) return;
    const rect = iframe.getBoundingClientRect();
    iframe.contentWindow.postMessage({source:'syura-artmug-parent',type:'SYURA_PARENT_VIEWPORT',iframeTop:rect.top,iframeHeight:rect.height,viewportHeight:window.innerHeight||document.documentElement.clientHeight||0,scrollY:getPageScrollY()}, IFRAME_ORIGIN);
  }
  function requestNavItems(force){
    const now=Date.now();
    if(!force && now-lastNavRequestAt<900) return;
    lastNavRequestAt=now;
    const iframe=getIframe();
    if(iframe&&iframe.contentWindow) iframe.contentWindow.postMessage({source:'syura-artmug-parent',type:'SYURA_PARENT_REQUEST_NAV'}, IFRAME_ORIGIN);
  }
  function getNavHeight(){ const nav=document.getElementById('siwol-artmug-parent-nav'); return nav ? nav.getBoundingClientRect().height : 0; }
  function requestChildScroll(sectionId){ const iframe=getIframe(); if(iframe&&iframe.contentWindow&&sectionId) iframe.contentWindow.postMessage({source:'syura-artmug-parent',type:'SYURA_PARENT_NAV_TO',sectionId,navHeight:0}, IFRAME_ORIGIN); }
  function setActiveNav(sectionId){ document.querySelectorAll('#siwol-artmug-parent-nav button[data-section-id]').forEach(btn=>btn.classList.toggle('is-active', btn.dataset.sectionId===sectionId)); }

  function openInquiry(){
    try{
      if(window.pLightBox && typeof window.pLightBox.show === 'function'){
        window.pLightBox.show('php/'+QNA_URL,'iframe_w','1080','500','문의하기','0');
        if(typeof window.qnaAlert === 'function') window.qnaAlert();
        return;
      }
    }catch(e){}
    const qna=document.getElementById('cont_qna')||document.querySelector('#cont_qna')||document.querySelector('[id="cont_qna"]');
    if(qna){ window.scrollTo({top:Math.max(0,qna.getBoundingClientRect().top+getPageScrollY()-100),behavior:'smooth'}); return; }
    requestChildScroll('form');
  }

  function makeButton(title, sectionId, className, skipDefaultClick){
    const b=document.createElement('button'); b.type='button'; b.textContent=title;
    if(sectionId) b.dataset.sectionId=sectionId;
    if(className) b.className=className;
    if(!skipDefaultClick) b.addEventListener('click',()=> sectionId ? requestChildScroll(sectionId) : null);
    return b;
  }

  function renderParentNav(items){
    const nextSignature=JSON.stringify((items||[]).map(x=>({id:x&&x.id,title:x&&x.title,parent:x&&x.parent})));
    let nav=document.getElementById('siwol-artmug-parent-nav');
    if(nav && navItemsSignature===nextSignature){ nav.classList.add('is-visible'); updateNavPosition(true); return; }
    navItemsSignature=nextSignature;
    if(!nav){ nav=document.createElement('nav'); nav.id='siwol-artmug-parent-nav'; nav.setAttribute('aria-label','시월 포트폴리오 빠른 메뉴'); document.body.appendChild(nav); }
    const main=(items||[]).filter(x=>x&&!x.parent);
    const subs=(items||[]).filter(x=>x&&x.parent==='portfolio');
    const frame=document.createElement('div'); frame.className='siwol-nav-frame';
    const pattern=document.createElement('div'); pattern.className='siwol-nav-pattern'; frame.appendChild(pattern);
    const dots=document.createElement('div'); dots.className='siwol-nav-dots'; dots.textContent='•••'; frame.appendChild(dots);
    const list=document.createElement('div'); list.className='siwol-nav-list';
    const top=makeButton('[TOP]',''); top.addEventListener('click',()=>{ window.scrollTo({top:0,behavior:'smooth'}); }); list.appendChild(top);
    main.forEach(item=>{
      if(item.id==='portfolio'){
        const wrap=document.createElement('div'); wrap.className='siwol-nav-portfolio';
        const portfolioButton=makeButton('['+item.title+']',item.id,'siwol-nav-portfolio-main',true);
        portfolioButton.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();wrap.classList.toggle('is-open');updateNavPosition(true);});
        wrap.appendChild(portfolioButton);
        const sub=document.createElement('div'); sub.className='siwol-nav-sub';
        const inner=document.createElement('div'); inner.className='siwol-nav-sub-inner';
        subs.forEach(s=>inner.appendChild(makeButton(s.title,s.id)));
        sub.appendChild(inner); wrap.appendChild(sub); list.appendChild(wrap);
      } else list.appendChild(makeButton('['+item.title+']',item.id));
    });
    const inquiry=makeButton('[문의하기]','', 'siwol-nav-inquiry'); inquiry.addEventListener('click', openInquiry); list.appendChild(inquiry);
    frame.appendChild(list);
    const dotsBottom=document.createElement('div'); dotsBottom.className='siwol-nav-dots-bottom'; dotsBottom.textContent='•••'; frame.appendChild(dotsBottom);
    nav.innerHTML=''; nav.appendChild(frame); nav.classList.add('is-visible'); updateNavPosition(true);
  }

  function updateNavPosition(force){
    const nav=document.getElementById('siwol-artmug-parent-nav');
    if(!nav) return;
    nav.style.top = '';
  }

  function unlockArtmugDetail(){
    const box=document.querySelector('.detailinfo'); if(box){box.classList.remove('showstep1'); box.style.maxHeight='none'; box.style.overflow='visible';}
    const content=document.querySelector('.detailinfo .showcontent'); if(content){content.style.maxHeight='none'; content.style.overflow='visible';}
    document.querySelectorAll('.btn_open_btn,.btn_open,.btn_close').forEach(el=>el.remove());
  }
  function setIframeHeight(height){
    const iframe=getIframe(); if(!iframe)return; const next=Math.max(700,Math.ceil(Number(height)||0));
    iframe.style.height=next+'px'; iframe.height=String(next); iframe.setAttribute('height',String(next)); iframe.setAttribute('scrolling','no'); lastHeight=next; sendViewport(); updateNavPosition();
  }
  function scrollParentTo(targetY){
    const iframe=getIframe(); if(!iframe)return; const iframeTop=getPageScrollY()+iframe.getBoundingClientRect().top;
    window.scrollTo({top:Math.max(0,iframeTop+Number(targetY||0)-18),behavior:'smooth'});
    [80,300,800].forEach(ms=>setTimeout(sendViewport,ms));
  }
  function bindMessages(){
    if(window.__siwolParentMessageBind)return; window.__siwolParentMessageBind=true;
    window.addEventListener('message',e=>{ if(e.origin!==IFRAME_ORIGIN)return; const data=e.data||{}; if(data.source!=='syura-css')return;
      if(data.type==='SYURA_IFRAME_HEIGHT') setIframeHeight(data.height);
      if(data.type==='SYURA_IFRAME_READY'){[50,200,600,1200].forEach(ms=>setTimeout(sendViewport,ms)); [80,260,700,1300].forEach(ms=>setTimeout(requestNavItems,ms));}
      if(data.type==='SYURA_NAV_ITEMS') renderParentNav(data.items);
      if(data.type==='SYURA_ACTIVE_SECTION') setActiveNav(data.sectionId);
      if(data.type==='SYURA_PARENT_SCROLL_TO') scrollParentTo(data.targetY);
    });
    window.addEventListener('scroll',()=>{sendViewport(); updateNavPosition();},{passive:true});
    window.addEventListener('resize',()=>{sendViewport(); requestNavItems(true); updateNavPosition(true);});
  }
  function prepareIframe(){
    const iframe=getIframe(); if(!iframe)return false;
    iframe.style.height=Math.max(Number(iframe.getAttribute('height'))||700,lastHeight||700)+'px'; iframe.style.overflow='hidden'; iframe.setAttribute('scrolling','no');
    if(!iframe.dataset.siwolParentBound){iframe.dataset.siwolParentBound='1'; iframe.addEventListener('load',()=>{[80,250,700,1500].forEach(ms=>setTimeout(sendViewport,ms)); [120,500,1200].forEach(ms=>setTimeout(requestNavItems,ms));});}
    sendViewport(); requestNavItems(); updateNavPosition(true); return true;
  }
  function neutralize(){injectStyle(); unlockArtmugDetail(); bindMessages(); if(!navItemsSignature) renderParentNav(DEFAULT_NAV_ITEMS); prepareIframe(); updateNavPosition();}
  function watch(){
    if(window.__siwolParentWatch)return; window.__siwolParentWatch=true;
    const mo=new MutationObserver((mutations)=>{
      if(mutations.every(m=>m.target && (m.target.id==='siwol-artmug-parent-nav' || (m.target.closest && m.target.closest('#siwol-artmug-parent-nav'))))) return;
      clearTimeout(retryTimer); retryTimer=setTimeout(neutralize,80);
    });
    mo.observe(document.documentElement,{childList:true,subtree:true});
    let count=0; const iv=setInterval(()=>{count++; neutralize(); if(count>80)clearInterval(iv);},500);
  }
  function boot(){neutralize(); watch(); [300,1000,2000,4000].forEach(ms=>setTimeout(neutralize,ms)); [500,1500,3000,5000].forEach(ms=>setTimeout(requestNavItems,ms));}
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
})();
