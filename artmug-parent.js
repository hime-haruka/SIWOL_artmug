(function () {
  const IFRAME_ORIGIN = 'https://siwol-artmug.netlify.app';
  const IFRAME_SELECTOR = 'section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"], [name="am-root"] iframe[src*="siwol-artmug.netlify.app"], iframe[src*="siwol-artmug.netlify.app"]';
  const QNA_URL = 'qna_write.php?number=41275';

  let lastHeight = 0;
  let retryTimer = null;
  let navTopTarget = 320;
  let navAnimating = false;

  function injectStyle() {
    if (document.getElementById('siwol-artmug-parent-style')) return;
    const style = document.createElement('style');
    style.id = 'siwol-artmug-parent-style';
    style.textContent = `
@font-face{font-family:Atomy;src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/Atomy-Bold.woff') format('woff');font-weight:400;font-display:swap;}
section[name="am-root"],[name="am-root"]{display:block!important;text-align:start!important;padding:0!important;margin:0 auto!important;line-height:normal!important;overflow:visible!important;}
section[name="am-root"] [name="stage"],[name="am-root"] [name="stage"]{display:block!important;width:100%!important;overflow:visible!important;}
section[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],[name="am-root"] iframe[src*="siwol-artmug.netlify.app"],iframe[src*="siwol-artmug.netlify.app"]{display:block!important;width:100%!important;max-width:1180px!important;min-height:700px!important;height:700px;margin:0 auto!important;border:0!important;overflow:hidden!important;}
#siwol-artmug-parent-nav{position:absolute!important;right:max(14px,calc((100vw - 1180px)/2 - 238px))!important;top:320px;z-index:999999!important;width:208px!important;display:none;font-family:Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;letter-spacing:-.05em!important;pointer-events:auto!important;color:#8d79db!important;}
#siwol-artmug-parent-nav.is-visible{display:block!important;}
#siwol-artmug-parent-nav .siwol-nav-frame{position:relative;overflow:hidden;border:2px solid #bda8ff!important;border-radius:7px!important;background:#eeeaff!important;box-shadow:0 8px 20px rgba(105,79,206,.12)!important;padding:82px 22px 18px!important;}
#siwol-artmug-parent-nav .siwol-nav-frame:before{content:'';position:absolute;left:0;right:0;top:0;height:70px;background:linear-gradient(90deg,#ded7ff 0 18%,#aa91ef 18% 38%,#ded7ff 38% 58%,#aa91ef 58% 78%,#ded7ff 78% 100%);border-bottom-left-radius:20px;border-bottom-right-radius:20px;box-shadow:0 2px 0 rgba(126,99,221,.12);z-index:1;}
#siwol-artmug-parent-nav .siwol-nav-frame:after{content:'';position:absolute;inset:72px 8px 30px;background:linear-gradient(135deg,transparent 0 46%,rgba(255,255,255,.62) 47% 52%,transparent 53% 100%) 0 0/58px 58px,linear-gradient(45deg,transparent 0 46%,rgba(255,255,255,.5) 47% 52%,transparent 53% 100%) 0 0/58px 58px;opacity:.95;pointer-events:none;}
#siwol-artmug-parent-nav .siwol-nav-dots,#siwol-artmug-parent-nav .siwol-nav-dots-bottom{position:absolute;left:0;right:0;text-align:center;color:#c8bbff;font-size:18px;line-height:1;letter-spacing:4px;z-index:2;}
#siwol-artmug-parent-nav .siwol-nav-dots{top:5px;}#siwol-artmug-parent-nav .siwol-nav-dots-bottom{bottom:3px;}
#siwol-artmug-parent-nav .siwol-nav-list{position:relative;z-index:3;display:flex!important;flex-direction:column!important;gap:10px!important;}
#siwol-artmug-parent-nav button{appearance:none!important;-webkit-appearance:none!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:42px!important;border:1px solid #d8cdfc!important;border-radius:6px!important;background:rgba(255,255,255,.92)!important;color:#8d79db!important;box-shadow:0 2px 0 rgba(126,99,221,.12),0 0 0 1px rgba(255,255,255,.65) inset!important;padding:7px 8px 5px!important;font:400 18px/1.05 Atomy,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;text-align:center!important;cursor:pointer!important;transition:transform .18s ease,background .18s ease,color .18s ease,border-color .18s ease,box-shadow .18s ease!important;white-space:nowrap!important;}
#siwol-artmug-parent-nav button:hover,#siwol-artmug-parent-nav button.is-active{transform:translateY(-2px)!important;background:#fff!important;border-color:#b39bff!important;color:#705bd7!important;box-shadow:0 4px 0 rgba(126,99,221,.15),0 0 0 1px rgba(255,255,255,.85) inset!important;}
#siwol-artmug-parent-nav .siwol-nav-portfolio{position:relative;}
#siwol-artmug-parent-nav .siwol-nav-sub{display:grid!important;grid-template-rows:0fr;transition:grid-template-rows .24s ease,opacity .18s ease,margin .18s ease;opacity:0;margin-top:0;}
#siwol-artmug-parent-nav .siwol-nav-portfolio:hover .siwol-nav-sub,#siwol-artmug-parent-nav .siwol-nav-portfolio:focus-within .siwol-nav-sub{grid-template-rows:1fr;opacity:1;margin-top:8px;}
#siwol-artmug-parent-nav .siwol-nav-sub-inner{overflow:hidden;display:flex;flex-direction:column;gap:7px;padding:0 4px;}
#siwol-artmug-parent-nav .siwol-nav-sub button{min-height:31px!important;font-size:14px!important;border-radius:5px!important;background:rgba(255,255,255,.82)!important;color:#927ce5!important;}
#siwol-artmug-parent-nav .siwol-nav-inquiry{background:#a892ef!important;color:#fff!important;border-color:#967ce6!important;}
#siwol-artmug-parent-nav .siwol-nav-inquiry:hover{background:#967ce6!important;color:#fff!important;}
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
  function requestNavItems(){ const iframe=getIframe(); if(iframe&&iframe.contentWindow) iframe.contentWindow.postMessage({source:'syura-artmug-parent',type:'SYURA_PARENT_REQUEST_NAV'}, IFRAME_ORIGIN); }
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

  function makeButton(title, sectionId, className){
    const b=document.createElement('button'); b.type='button'; b.textContent=title;
    if(sectionId) b.dataset.sectionId=sectionId;
    if(className) b.className=className;
    b.addEventListener('click',()=> sectionId ? requestChildScroll(sectionId) : null);
    return b;
  }

  function renderParentNav(items){
    let nav=document.getElementById('siwol-artmug-parent-nav');
    if(!nav){ nav=document.createElement('nav'); nav.id='siwol-artmug-parent-nav'; nav.setAttribute('aria-label','시월 포트폴리오 빠른 메뉴'); document.body.appendChild(nav); }
    const main=(items||[]).filter(x=>x&&!x.parent);
    const subs=(items||[]).filter(x=>x&&x.parent==='portfolio');
    const frame=document.createElement('div'); frame.className='siwol-nav-frame';
    const dots=document.createElement('div'); dots.className='siwol-nav-dots'; dots.textContent='•••'; frame.appendChild(dots);
    const list=document.createElement('div'); list.className='siwol-nav-list';
    const top=makeButton('TOP',''); top.addEventListener('click',()=>{ const iframe=getIframe(); if(!iframe)return; const y=getPageScrollY()+iframe.getBoundingClientRect().top; window.scrollTo({top:Math.max(0,y-18),behavior:'smooth'}); }); list.appendChild(top);
    main.forEach(item=>{
      if(item.id==='portfolio'){
        const wrap=document.createElement('div'); wrap.className='siwol-nav-portfolio';
        wrap.appendChild(makeButton(item.title,item.id));
        const sub=document.createElement('div'); sub.className='siwol-nav-sub';
        const inner=document.createElement('div'); inner.className='siwol-nav-sub-inner';
        subs.forEach(s=>inner.appendChild(makeButton(s.title,s.id)));
        sub.appendChild(inner); wrap.appendChild(sub); list.appendChild(wrap);
      } else list.appendChild(makeButton(item.title,item.id));
    });
    const inquiry=makeButton('문의하기','', 'siwol-nav-inquiry'); inquiry.addEventListener('click', openInquiry); list.appendChild(inquiry);
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
    window.addEventListener('resize',()=>{sendViewport(); requestNavItems(); updateNavPosition(true);});
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
    const mo=new MutationObserver(()=>{clearTimeout(retryTimer); retryTimer=setTimeout(neutralize,50);});
    mo.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src','height','style','class']});
    let count=0; const iv=setInterval(()=>{count++; neutralize(); if(count>80)clearInterval(iv);},500);
  }
  function boot(){neutralize(); watch(); [300,1000,2000,4000].forEach(ms=>setTimeout(neutralize,ms)); [500,1500,3000,5000].forEach(ms=>setTimeout(requestNavItems,ms));}
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
})();
