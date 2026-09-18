export const header = (current = 'home') => `
  <a class="skip-link" href="#main">本文へ移動</a>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="HANO PENTA 3D Model Studio Home">
      <img class="brand-logo" src="/hano-logo.png" alt="HANO PENTA">
    </a>
    <button class="menu-button" aria-label="メニューを開く" aria-expanded="false">☰</button>
    <nav class="main-nav" aria-label="メインナビゲーション">
      <a href="index.html" ${current === 'home' ? 'aria-current="page"' : ''}>Home</a>
      <a href="index.html#about">About</a>
      <a href="service.html" ${current === 'service' ? 'aria-current="page"' : ''}>Service</a>
      <a href="news.html" ${current === 'news' ? 'aria-current="page"' : ''}>News</a>
      <a href="works.html" ${current === 'works' ? 'aria-current="page"' : ''}>Works</a>
      <a href="index.html#profile">Profile</a>
      <a class="nav-cta" href="contact.html" ${current === 'contact' ? 'aria-current="page"' : ''}>Contact</a>
    </nav>
  </header>`;

export const footer = () => `
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <div class="footer-brand">八乃ぺんた 👻🔥</div>
        <div class="footer-links">
          <a href="service.html">Service</a><a href="news.html">News</a><a href="works.html">Works</a><a href="contact.html">Contact</a>
        </div>
      </div>
      <div>© 2026 HANO PENTA. OFFICIAL SITE.</div>
    </div>
  </footer>`;

export const boot = (current) => {
  document.querySelector('#site-header').innerHTML = header(current);
  document.querySelector('#site-footer').innerHTML = footer();
};
