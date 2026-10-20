/* 全ページ共通オープニング。初回アクセスとページ更新時に再生し、ページ移動時は再生しません。 */
(() => {
  const start = () => {
    // 更新（Ctrl+R / F5 / 更新ボタン）は毎回再生する。
    // 通常のページ間移動は同じタブで初回再生済みならスキップする。
    const key = 'sakuna-opening-played';
    const nav = performance.getEntriesByType('navigation')[0];
    const isReload = nav?.type === 'reload' ||
      (!nav && performance.navigation?.type === 1);
    try {
      if (!isReload && sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '1');
    } catch (e) {
      // ストレージが使えない環境では通常どおり再生
    }
    if (document.getElementById('sakuna-opening')) return;
    const opening = document.createElement('div');
    opening.id = 'sakuna-opening';
    opening.className = 'sakuna-opening';
    opening.setAttribute('aria-label', 'サイトのオープニング演出');
    opening.innerHTML = `
      <div class="sakuna-opening__glow"></div>
      <div class="sakuna-opening__ornaments" aria-hidden="true">
        <span>✦</span><span>♡</span><span>✧</span><span>♡</span><span>✦</span><span>✧</span><span>♡</span><span>✦</span>
      </div>
      <div class="sakuna-opening__center">
        <div class="sakuna-opening__crown" aria-hidden="true">✧ ♡ ✧</div>
        <p class="sakuna-opening__eyebrow">WELCOME TO THE SWEET WORLD</p>
        <p class="sakuna-opening__title">結城さくな</p>
        <p class="sakuna-opening__subtitle">きらめく時間を、あなたと一緒に。</p>
        <div class="sakuna-opening__progress" aria-hidden="true"><span></span></div>
      </div>`;
    document.body.prepend(opening);
    document.body.classList.add('is-intro-playing');
    const finish = () => {
      opening.classList.add('is-finished');
      document.body.classList.remove('is-intro-playing');
      window.setTimeout(() => opening.remove(), 1000);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else window.setTimeout(finish, 2900);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
