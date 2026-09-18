(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const p=(t="home")=>`
  <a class="skip-link" href="#main">本文へ移動</a>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="八乃ぺんた 3D Studio Home">
      <span class="brand-mark" aria-hidden="true"></span>
      <span>八乃ぺんた <small>3D MODEL STUDIO</small></span>
    </a>
    <button class="menu-button" aria-label="メニューを開く" aria-expanded="false">☰</button>
    <nav class="main-nav" aria-label="メインナビゲーション">
      <a href="index.html" ${t==="home"?'aria-current="page"':""}>Home</a>
      <a href="index.html#about">About</a>
      <a href="news.html" ${t==="news"?'aria-current="page"':""}>News</a>
      <a href="works.html" ${t==="works"?'aria-current="page"':""}>Works</a>
      <a href="portfolio.html" ${t==="portfolio"?'aria-current="page"':""}>Portfolio</a>
      <a href="index.html#profile">Profile</a>
      <a class="nav-cta" href="contact.html" ${t==="contact"?'aria-current="page"':""}>Contact</a>
    </nav>
  </header>`,v=()=>`
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <div class="footer-brand">八乃ぺんた 👻🔥</div>
        <div class="footer-links">
          <a href="news.html">News</a><a href="works.html">Works</a><a href="portfolio.html">Portfolio</a><a href="contact.html">Contact</a>
        </div>
      </div>
      <div>© 2026 HACHINO PENTA. OFFICIAL SITE.</div>
    </div>
  </footer>`,g=t=>{document.querySelector("#site-header").innerHTML=p(t),document.querySelector("#site-footer").innerHTML=v()},f=document.querySelector(".menu-button"),m=document.querySelector(".main-nav");f?.addEventListener("click",()=>{const t=m.classList.toggle("open");f.setAttribute("aria-expanded",String(t))});m?.querySelectorAll("a").forEach(t=>{t.addEventListener("click",()=>{m.classList.remove("open"),f?.setAttribute("aria-expanded","false")})});const h=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),h.unobserve(a.target))})},{threshold:.12});document.querySelectorAll(".reveal").forEach(t=>h.observe(t));document.querySelectorAll(".filter-button").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".filter-button").forEach(o=>o.classList.remove("active")),t.classList.add("active");const a=t.dataset.filter;document.querySelectorAll("[data-category]").forEach(o=>{o.hidden=a!=="all"&&o.dataset.category!==a})})});const c=document.querySelector("#project-planner");if(c){const t=document.querySelector("#method-recommendation"),a=document.querySelector("#request-summary"),o=document.querySelector("#copy-status"),s=()=>{const e=new FormData(c),r=e.get("use"),n=e.get("change"),d=e.get("detail");let i="まずは相談で整理",l="用途と必要機能を確認して、費用が膨らまない方式を一緒に決めます。";r==="vrchat"&&(d==="high"||n==="rare")?(i="フルスクラッチがおすすめ",l="体型・造形へのこだわりやVRChat向け最適化を優先しやすい条件です。"):n==="often"||r==="stream"?(i="VRoid＋Blenderがおすすめ",l="衣装展開や配信運用のしやすさと、見た目の作り込みを両立しやすい条件です。"):(r||n||d)&&(i="どちらも比較可能",l="優先順位によって費用対効果が変わるため、見積時に2方式を比較できます。"),t.innerHTML=`<small>現在の回答から</small><strong>${i}</strong><br>${l}`;const u={stream:"配信・VTuber",vrchat:"VRChat",video:"映像・MV",event:"イベント・ライブ",often:"衣装替えを頻繁にしたい",sometimes:"年に数回",rare:"ほぼ固定",balanced:"品質と予算のバランス",high:"造形・体型を最優先",speed:"公開時期を最優先"};a.value=["【3Dモデル制作 相談メモ】",`用途：${u[r]||"未選択"}`,`衣装展開：${u[n]||"未選択"}`,`優先事項：${u[d]||"未選択"}`,`希望時期：${e.get("timing")||"未入力"}`,`予算目安：${e.get("budget")||"未選択"}`,`補足：${e.get("note")||"なし"}`,`判定：${i}`].join(`
`)};c.addEventListener("input",s),c.addEventListener("change",s),c.addEventListener("submit",async e=>{e.preventDefault(),s();try{await navigator.clipboard.writeText(a.value),o.textContent="相談メモをコピーしました。DMやメールに貼り付けて使えます。"}catch{a.focus(),a.select(),o.textContent="メモを選択しました。コピーしてお使いください。"}}),s()}export{g as b};
