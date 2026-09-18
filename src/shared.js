import './styles.css';

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-category]').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

const form = document.querySelector('#project-planner');
if (form) {
  const recommendation = document.querySelector('#method-recommendation');
  const summary = document.querySelector('#request-summary');
  const status = document.querySelector('#copy-status');

  const updateRecommendation = () => {
    const data = new FormData(form);
    const use = data.get('use');
    const change = data.get('change');
    const detail = data.get('detail');
    let method = 'まずは相談で整理';
    let reason = '用途と必要機能を確認して、費用が膨らまない方式を一緒に決めます。';

    if (use === 'vrchat' && (detail === 'high' || change === 'rare')) {
      method = 'フルスクラッチがおすすめ';
      reason = '体型・造形へのこだわりやVRChat向け最適化を優先しやすい条件です。';
    } else if (change === 'often' || use === 'stream') {
      method = 'VRoid＋Blenderがおすすめ';
      reason = '衣装展開や配信運用のしやすさと、見た目の作り込みを両立しやすい条件です。';
    } else if (use || change || detail) {
      method = 'どちらも比較可能';
      reason = '優先順位によって費用対効果が変わるため、見積時に2方式を比較できます。';
    }

    recommendation.innerHTML = `<small>現在の回答から</small><strong>${method}</strong><br>${reason}`;

    const labels = {
      stream: '配信・VTuber', vrchat: 'VRChat', video: '映像・MV', event: 'イベント・ライブ',
      often: '衣装替えを頻繁にしたい', sometimes: '年に数回', rare: 'ほぼ固定',
      balanced: '品質と予算のバランス', high: '造形・体型を最優先', speed: '公開時期を最優先',
    };
    summary.value = [
      '【3Dモデル制作 相談メモ】',
      `用途：${labels[use] || '未選択'}`,
      `衣装展開：${labels[change] || '未選択'}`,
      `優先事項：${labels[detail] || '未選択'}`,
      `希望時期：${data.get('timing') || '未入力'}`,
      `予算目安：${data.get('budget') || '未選択'}`,
      `補足：${data.get('note') || 'なし'}`,
      `判定：${method}`,
    ].join('\n');
  };

  form.addEventListener('input', updateRecommendation);
  form.addEventListener('change', updateRecommendation);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    updateRecommendation();
    try {
      await navigator.clipboard.writeText(summary.value);
      status.textContent = '相談メモをコピーしました。DMやメールに貼り付けて使えます。';
    } catch {
      summary.focus();
      summary.select();
      status.textContent = 'メモを選択しました。コピーしてお使いください。';
    }
  });
  updateRecommendation();
}
