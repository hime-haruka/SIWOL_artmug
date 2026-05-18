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

  function injectStyle() {
    if (document.getElementById('siwol-artmug-parent-style')) return;
    const style = document.createElement('style');
    style.id = 'siwol-artmug-parent-style';
    style.textContent = `
@font-face{font-family:Atomy;src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/Atomy-Bold.woff') format('woff');font-weight:400;font-display:swap;}
section[name="am-root"],[name="am-root"]{display:block!important;text-align:start!important;padding:0!important;margin:0 auto!important;line-height:normal!important;overflow:visible!important;}
section[name="am-root"] [name="stage"],[name="am-root"] [name="stage"]{display:block!important;width:100%!important;overflow:visible!important;}
section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],iframe[src*="siwol-artmug.netlify.app"]{display:block!important;width:100%!important;max-width:1180px!important;min-height:700px!important;height:700px;margin:0 auto!important;border:0!important;overflow:hidden!important;}
#siwol-artmug-parent-nav{position:absolute!important;right:max(10px,calc((100vw - 1180px)/2 - 240px))!important;top:320px;z-index:999999!important;width:218px!important;display:none;font-family:Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;letter-spacing:-.055em!important;pointer-events:auto!important;color:#8d79db!important;will-change:top!important;contain:layout paint style!important;}
#siwol-artmug-parent-nav.is-visible{display:block!important;}
#siwol-artmug-parent-nav *{box-sizing:border-box!important;}
#siwol-artmug-parent-nav .siwol-nav-frame{position:relative;overflow:hidden;border:2px solid #bea9ff!important;border-radius:8px!important;background:linear-gradient(180deg,rgba(255,255,255,.96) 0%,rgba(246,242,255,.94) 48%,rgba(255,255,255,.96) 100%)!important;box-shadow:0 10px 28px rgba(105,79,206,.14)!important;padding:82px 15px 24px!important;isolation:isolate;}
#siwol-artmug-parent-nav .siwol-nav-frame:before{content:'';position:absolute;left:50%;top:12px;width:861px;height:62px;transform:translateX(-50%);background:url('https://lh3.googleusercontent.com/d/1nHKjunygcwk1Nn4lYZ7Eplq199VUPS5B') center top/861px auto no-repeat;z-index:2;pointer-events:none;}
#siwol-artmug-parent-nav .siwol-nav-frame:after{content:'';position:absolute;inset:74px 8px 34px;background-image:linear-gradient(180deg,rgba(255,255,255,.38),rgba(226,218,255,.22)),url('https://lh3.googleusercontent.com/d/13CvtmqiZi9vvkSVdi8I1RhxLuHEWWzx3');background-size:100% 100%,1180px auto;background-position:0 0,center top;background-repeat:no-repeat,repeat-y;opacity:.72;pointer-events:none;z-index:0;}
#siwol-artmug-parent-nav .siwol-nav-dots,#siwol-artmug-parent-nav .siwol-nav-dots-bottom{position:absolute;left:0;right:0;text-align:center;z-index:3;pointer-events:none;height:10px;font-size:0;}
#siwol-artmug-parent-nav .siwol-nav-dots{top:8px;}#siwol-artmug-parent-nav .siwol-nav-dots-bottom{bottom:8px;}
#siwol-artmug-parent-nav .siwol-nav-dots:before,#siwol-artmug-parent-nav .siwol-nav-dots-bottom:before{content:'';display:inline-block;width:5px;height:5px;border-radius:50%;background:#cabdff;box-shadow:12px 0 0 #cabdff,24px 0 0 #cabdff,36px 0 0 #cabdff;opacity:.9;}
#siwol-artmug-parent-nav .siwol-nav-list{position:relative;z-index:4;display:flex!important;flex-direction:column!important;gap:8px!important;}
#siwol-artmug-parent-nav button{appearance:none!important;-webkit-appearance:none!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:38px!important;border:1px solid #d8cdfc!important;border-radius:6px!important;background:rgba(255,255,255,.9)!important;color:#8d79db!important;box-shadow:0 2px 0 rgba(126,99,221,.10),0 0 0 1px rgba(255,255,255,.58) inset!important;padding:7px 7px 5px!important;font:400 17px/1 Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;text-align:center!important;cursor:pointer!important;white-space:nowrap!important;transition:background-color .12s ease,color .12s ease,border-color .12s ease!important;transform:none!important;}
#siwol-artmug-parent-nav button:hover,#siwol-artmug-parent-nav button.is-active{background:rgba(255,255,255,.96)!important;border-color:#b39bff!important;color:#705bd7!important;box-shadow:0 2px 0 rgba(126,99,221,.10),0 0 0 1px rgba(255,255,255,.7) inset!important;transform:none!important;}
#siwol-artmug-parent-nav .siwol-nav-portfolio{position:relative;}
#siwol-artmug-parent-nav .siwol-nav-portfolio-main{position:relative;background:#a892ef!important;color:#fff!important;border-color:#967ce6!important;box-shadow:0 2px 0 rgba(112,91,215,.18)!important;}
#siwol-artmug-parent-nav .siwol-nav-portfolio-main:after{content:'⌄';position:absolute;right:13px;top:50%;transform:translateY(-50%);font-size:14px;line-height:1;transition:transform .12s ease;}
#siwol-artmug-parent-nav .siwol-nav-portfolio.is-open .siwol-nav-portfolio-main:after{transform:translateY(-50%) rotate(180deg);}
#siwol-artmug-parent-nav .siwol-nav-sub{display:grid!important;grid-template-rows:0fr;opacity:0;margin-top:0;transition:grid-template-rows .14s ease,opacity .10s ease;}
#siwol-artmug-parent-nav .siwol-nav-portfolio.is-open .siwol-nav-sub{grid-template-rows:1fr;opacity:1;margin-top:0;}
#siwol-artmug-parent-nav .siwol-nav-sub-inner{overflow:hidden;display:flex;flex-direction:column;gap:0;padding:0 5px 1px;background:rgba(255,255,255,.42);border:1px solid rgba(216,205,252,.62);border-top:0;border-radius:0 0 6px 6px;}
#siwol-artmug-parent-nav .siwol-nav-sub button{min-height:23px!important;font-size:13px!important;line-height:1!important;border:0!important;border-bottom:1px solid rgba(216,205,252,.55)!important;border-radius:0!important;background:rgba(255,255,255,.58)!important;color:#927ce5!important;box-shadow:none!important;padding:4px 4px 3px!important;}
#siwol-artmug-parent-nav .siwol-nav-sub button:last-child{border-bottom:0!important;}
#siwol-artmug-parent-nav .siwol-nav-sub button:before{content:'-';margin-right:2px;}
#siwol-artmug-parent-nav .siwol-nav-sub button:hover{background:rgba(255,255,255,.86)!important;color:#705bd7!important;box-shadow:none!important;}
#siwol-artmug-parent-nav .siwol-nav-inquiry{background:rgba(255,255,255,.9)!important;color:#8d79db!important;border-color:#d8cdfc!important;}
#siwol-artmug-parent-nav .siwol-nav-inquiry:hover{background:rgba(255,255,255,.96)!important;color:#705bd7!important;}
@media(max-height:860px){#siwol-artmug-parent-nav{width:208px!important;}#siwol-artmug-parent-nav .siwol-nav-frame{padding:78px 13px 22px!important;}#siwol-artmug-parent-nav .siwol-nav-list{gap:6px!important;}#siwol-artmug-parent-nav button{min-height:34px!important;font-size:15px!important;padding:6px 6px 4px!important;}#siwol-artmug-parent-nav .siwol-nav-sub button{min-height:21px!important;font-size:12px!important;padding:3px 4px 2px!important;}}
@media(max-width:1439px){#siwol-artmug-parent-nav{display:none!important;}}
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
    const dots=document.createElement('div'); dots.className='siwol-nav-dots'; dots.textContent='•••'; frame.appendChild(dots);
    const list=document.createElement('div'); list.className='siwol-nav-list';
    const top=makeButton('[TOP]',''); top.addEventListener('click',()=>{ const iframe=getIframe(); if(!iframe)return; const y=getPageScrollY()+iframe.getBoundingClientRect().top; window.scrollTo({top:Math.max(0,y-18),behavior:'smooth'}); }); list.appendChild(top);
    main.forEach(item=>{
      if(item.id==='portfolio'){
        const wrap=document.createElement('div'); wrap.className='siwol-nav-portfolio';
        const portfolioButton=makeButton('['+item.title+']',item.id,'siwol-nav-portfolio-main',true);
        portfolioButton.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();wrap.classList.toggle('is-open');updateNavPosition(true);requestChildScroll(item.id);});
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
    const nav=document.getElementById('siwol-artmug-parent-nav'); const iframe=getIframe();
    if(!nav||!iframe||window.innerWidth<1440) return;
    const rect=iframe.getBoundingClientRect(); const scrollY=getPageScrollY(); const iframeTop=scrollY+rect.top; const iframeBottom=iframeTop+rect.height; const navHeight=getNavHeight()||500;
    let target=scrollY+96; target=Math.max(iframeTop+18,target); target=Math.min(Math.max(iframeTop+18,iframeBottom-navHeight-18),target); navTopTarget=target;
    if(force){nav.style.top=navTopTarget+'px'; return;}
    if(navAnimating) return; navAnimating=true;
    function loop(){ const current=parseFloat(nav.style.top)||navTopTarget; const gap=navTopTarget-current; if(Math.abs(gap)<0.6){nav.style.top=navTopTarget+'px'; navAnimating=false; return;} nav.style.top=(current+gap*0.085)+'px'; requestAnimationFrame(loop); }
    requestAnimationFrame(loop);
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
  function neutralize(){injectStyle(); unlockArtmugDetail(); bindMessages(); prepareIframe(); updateNavPosition();}
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
