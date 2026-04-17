/* 星を動的生成 */
(() => {
  const container = document.getElementById('bg-stars');
  if (!container) return;

  const COUNT = 120;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'star';

    const size = Math.random() < 0.15 ? (Math.random() * 2 + 2) : (Math.random() * 1.5 + 0.5);
    const x = Math.random() * 100;
    const y = Math.random() * 65; // 空の上65%に配置
    const delay = (Math.random() * 5).toFixed(2);
    const dur   = (2 + Math.random() * 4).toFixed(2);
    const op    = (0.4 + Math.random() * 0.6).toFixed(2);

    s.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${x}%;
      top:${y}%;
      --d:${dur}s;
      --o:${op};
      animation-delay:-${delay}s;
    `;
    frag.appendChild(s);
  }

  container.appendChild(frag);
})();
