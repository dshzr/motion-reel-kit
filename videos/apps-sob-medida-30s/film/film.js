// Apps sob medida — 30 s, 16:9. Shotlist: docs/shotlist.md (APPROVED). Marks/SFX: timeline.json.
// No brand by brief: no company name, no logo, no client. Every screen is a generic UI built element by element here.
// Pure function of time: no timers, no Math.random, nothing mutated in run().
(() => {
  const { W, H, put, reg, el, scene, sp, spHit, trk, trkObj, seg, lerp, clamp, bt, beatOf, ease, win } = C;
  const { line, rise, type } = TYPE;
  C.fonts = ['700 100px Display', '500 40px UI', '600 40px UI'];
  const P = (wide, tall) => C.pick(wide, wide, tall);
  const TALL = C.FMT === '9x16';
  const PAD = P(140, 80);
  const LATE = -0.1;                                       // a masked word reads ~130 ms into its rise: release it a hair early
  const snapIn = (p) => (p > 0.001 ? 1 : 0);
  const ramp = (p) => clamp(p / 0.9);
  const words = (m, n, st = 0.06) => Array.from({ length: n }, (_, i) => beatOf(m) + LATE + i * st);
  const div = (parent, css, html = '') => el('div', { class: 'abs', style: css }, parent, html);
  const pulse = (t, at) => sp(t, beatOf(at) - 0.03, 'snappy') - sp(t, beatOf(at) + 0.12, 'snappy');   // press dip for clicks
  const hitD = (t, at, pr = 'default') => spHit(t, at, pr, C.leadFor(pr) - 0.06);
  const SNAP = {};
  function snap(src, drop = []) {
    const c = src.cloneNode(true), a = [src, ...src.querySelectorAll('*')], b = [c, ...c.querySelectorAll('*')], m = new Map();
    a.forEach((e, i) => m.set(e, b[i]));
    a.forEach((e, i) => { if (e._skel || drop.includes(e)) b[i].remove(); });
    Object.assign(c.style, { left: '0px', top: '0px', transform: '' });
    return { c, m };
  }
  const GREY = '#E9E7E1', GREY2 = '#EFEDE8';
  const bar = (w, h, c = GREY, extra = '') => `<div style="width:${w}px;height:${h}px;border-radius:${Math.min(8, h / 2)}px;background:${c};${extra}"></div>`;
  // skeleton → content: the grey placeholder is replaced the moment the content starts to land
  const block = (parent, box, skel, body) => ({
    skel: Object.assign(reg(div(parent, box, skel)), { _skel: true }),
    body: reg(div(parent, box, body), { o: 0 }),
  });
  const fill = (t, blk, at, dy = 16) => {
    const p = spHit(t, at, 'snappy', 0.02);
    put(blk.skel, { hide: p > 0.35 });
    put(blk.body, { o: ramp(p), y: dy * (1 - p) });
  };

  // ================================================================ phone (generic agenda app)
  const ROWS = [['09:00', 'Café com cliente', 'Centro'], ['11:30', 'Revisão do projeto', 'Online'], ['16:00', 'Entrega do protótipo', 'Escritório']];
  const TABS = ['Início', 'Agenda', 'Mensagens', 'Perfil'];
  const tabIcon = (i, c) => [
    `<div style="width:22px;height:20px;border:2.5px solid ${c};border-radius:5px 5px 4px 4px;margin:0 auto"></div>`,
    `<div style="width:22px;height:21px;border:2.5px solid ${c};border-top-width:6px;border-radius:5px;margin:0 auto"></div>`,
    `<div style="width:22px;height:20px;border:2.5px solid ${c};border-radius:12px 12px 12px 3px;margin:0 auto"></div>`,
    `<div style="width:12px;height:12px;border:2.5px solid ${c};border-radius:50%;margin:0 auto"></div><div style="width:22px;height:8px;border:2.5px solid ${c};border-bottom:0;border-radius:12px 12px 0 0;margin:2px auto 0"></div>`,
  ][i];
  function phone(parent, x, y, o = {}) {
    const P = {};
    P.frame = div(parent, `left:${x}px;top:${y}px;width:400px;height:820px;border-radius:62px;background:${o.bezel || '#0E1116'};transform-origin:50% 50%;
      box-shadow:0 2px 6px rgba(14,17,22,.08),0 50px 90px -34px rgba(14,17,22,.5)`);
    reg(P.frame, { o: 0 });
    const s = (P.screen = div(P.frame, 'left:12px;top:12px;width:376px;height:796px;border-radius:50px;overflow:hidden;background:#FBFAF7'));
    div(s, 'left:30px;top:18px;width:316px;display:flex;justify-content:space-between;font:600 17px UI;color:var(--ink)',
      `<span>9:41</span><span style="display:flex;gap:6px;align-items:center"><span style="width:18px;height:10px;border-radius:3px;background:var(--ink)"></span><span style="width:26px;height:12px;border-radius:4px;border:2px solid var(--ink)"></span></span>`);
    P.pages = reg(div(s, 'left:0;top:0;width:752px;height:796px'));
    const home = div(P.pages, 'left:0;top:0;width:376px;height:796px');
    P.blocks = [
      block(home, 'left:28px;top:66px;width:320px;height:80px',
        bar(170, 30) + bar(220, 16, GREY2, 'margin-top:14px') + `<div style="position:absolute;right:0;top:2px;width:56px;height:56px;border-radius:28px;background:${GREY}"></div>`,
        `<div style="font:700 34px Display;letter-spacing:-0.03em">Olá, Ana</div><div style="font:500 19px UI;color:var(--ink-3);margin-top:6px">Terça, 4 de novembro</div>
         <div style="position:absolute;right:0;top:2px;width:56px;height:56px;border-radius:28px;background:var(--accent-soft);color:var(--accent);font:700 24px UI;display:flex;align-items:center;justify-content:center">A</div>`),
      block(home, 'left:24px;top:168px;width:328px;height:196px',
        bar(328, 150, GREY, 'border-radius:24px') + bar(70, 18, GREY2, 'margin-top:20px'),
        `<div style="height:150px;border-radius:24px;background:var(--accent);color:#fff;padding:22px 24px;box-sizing:border-box">
           <div style="font:500 17px UI;opacity:.75">Próximo</div><div style="font:600 25px UI;margin-top:8px;letter-spacing:-0.01em">Reunião com a equipe</div>
           <div style="font:500 19px UI;opacity:.85;margin-top:8px">14h30 · Sala 2</div></div>
         <div style="font:700 21px UI;margin-top:18px">Hoje</div>`),
      ...ROWS.map((r, i) => block(home, `left:24px;top:${380 + i * 94}px;width:328px;height:82px`,
        `<div style="height:80px;border-radius:18px;background:#fff;border:1px solid var(--line);display:flex;align-items:center;padding:0 18px;gap:16px">${bar(54, 18)}<div>${bar(150, 18)}${bar(80, 13, GREY2, 'margin-top:8px')}</div></div>`,
        `<div style="height:80px;border-radius:18px;background:#fff;border:1px solid var(--line);display:flex;align-items:center;padding:0 18px;gap:16px">
           <div style="font:600 19px UI;color:var(--accent);width:56px">${r[0]}</div>
           <div><div style="font:600 20px UI">${r[1]}</div><div style="font:500 16px UI;color:var(--ink-3);margin-top:3px">${r[2]}</div></div></div>`)),
    ];
    // agenda page (shown after the tab switch)
    const ag = div(P.pages, 'left:376px;top:0;width:376px;height:796px');
    div(ag, 'left:28px;top:66px', `<div style="font:700 34px Display;letter-spacing:-0.03em">Agenda</div><div style="font:500 19px UI;color:var(--ink-3);margin-top:6px">Novembro</div>`);
    div(ag, 'left:22px;top:156px;width:332px;display:flex;justify-content:space-between', ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) =>
      `<div style="width:42px;height:68px;border-radius:14px;${i === 1 ? 'background:var(--accent);color:#fff' : 'background:#fff;border:1px solid var(--line)'};box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px">
        <span style="font:500 14px UI;${i === 1 ? '' : 'color:var(--ink-3)'}">${d}</span><span style="font:600 20px UI">${3 + i}</span></div>`).join(''));
    for (let h = 8; h <= 17; h += 1) {
      div(ag, `left:22px;top:${250 + (h - 8) * 48}px;width:332px;height:1px;background:var(--line)`);
      if (h % 2 === 0) div(ag, `left:22px;top:${256 + (h - 8) * 48}px;font:500 15px UI;color:var(--ink-3)`, `${String(h).padStart(2, '0')}h`);
    }
    [[9, 'Café com cliente', 0], [11.5, 'Revisão do projeto', 0], [14.5, 'Reunião com a equipe', 1], [16, 'Entrega do protótipo', 0]].forEach(([h, s2, hot]) =>
      div(ag, `left:76px;top:${252 + (h - 8) * 48}px;width:278px;height:42px;border-radius:10px;box-sizing:border-box;padding:0 14px;display:flex;align-items:center;font:600 17px UI;
        ${hot ? 'background:var(--accent);color:#fff' : 'background:var(--accent-soft);color:var(--accent);border-left:4px solid var(--accent)'}`, s2));
    // tab bar
    const tb = div(s, 'left:0;top:700px;width:376px;height:96px;background:#fff;border-top:1px solid var(--line)');
    P.ind = reg(div(tb, 'left:0;top:10px;width:64px;height:36px;border-radius:18px;background:var(--accent-soft)'));
    P.tabs = TABS.map((n, i) => ({
      off: reg(div(tb, `left:${i * 94}px;top:16px;width:94px;text-align:center;color:var(--ink-3)`, tabIcon(i, 'var(--ink-3)') + `<div style="font:500 14px UI;margin-top:8px">${n}</div>`)),
      on: reg(div(tb, `left:${i * 94}px;top:16px;width:94px;text-align:center;color:var(--accent)`, tabIcon(i, 'var(--accent)') + `<div style="font:600 14px UI;margin-top:8px">${n}</div>`), { o: 0 }),
    }));
    // notification banner
    P.notif = reg(div(s, `left:12px;top:12px;width:352px;height:92px;border-radius:24px;background:rgba(255,255,255,.97);border:1px solid var(--line);box-sizing:border-box;
      box-shadow:0 16px 40px -14px rgba(14,17,22,.35);display:flex;align-items:center;gap:14px;padding:0 16px`,
      `<div style="flex:none;width:44px;height:44px;border-radius:12px;background:var(--accent);display:flex;align-items:center;justify-content:center">
         <div style="width:18px;height:17px;border:2.5px solid #fff;border-top-width:6px;border-radius:4px"></div></div>
       <div><div style="font:500 15px UI;color:var(--ink-3)">Lembrete · agora</div><div style="font:600 18px UI;margin-top:3px;line-height:1.2">Reunião com a equipe às 14h30</div></div>`), { o: 0 });
    return P;
  }
  // tab k active: indicator + icon colours (the colour swaps when the indicator is past halfway)
  function tabs(t, P, at) {
    const c = (i) => i * 94 + 47 - 32;
    const ind = Motion.indicator(t, [[0, c(0), c(0) + 64], [bt(at) - C.leadFor('snappy'), c(1), c(1) + 64]]);
    put(P.ind, { x: ind.start, css: { width: ind.size + 'px' } });
    const k = (ind.start + ind.size / 2 - c(0) - 32) / 94 > 0.5 ? 1 : 0;
    P.tabs.forEach((tb, i) => { put(tb.on, { o: i === k ? 1 : 0 }); put(tb.off, { o: i === k ? 0 : 1 }); });
  }

  // ================================================================ 1+2. hook → apps mobile  (b0 → web)
  scene({
    name: 'open', from: 'hook', to: 'web', post: 1,          // stays live under the sheet that covers it on b16
    build(root, S) {
      div(root, `left:0;top:0;width:${W}px;height:${H}px;opacity:.55;background-image:linear-gradient(var(--line) 1.5px, transparent 1.5px),linear-gradient(90deg, var(--line) 1.5px, transparent 1.5px);background-size:60px 60px;background-position:-1px 29px`);
      S.txt = reg(div(root, `width:${W}px;height:${H}px;transform-origin:${PAD}px 540px`));
      S.cam = reg(div(root, `width:${W}px;height:${H}px;transform-origin:${P('1400px 540px', '540px 1050px')}`));
      S.l1 = line(S.txt, 'Sua ideia', { x: PAD, y: P(300, 290), size: P(170, 160) });
      S.l2 = line(S.txt, 'vira app.', { x: PAD, y: P(480, 450), size: P(170, 160), accent: [1] });
      S.eye = line(S.txt, 'iOS e Android', { x: PAD + 6, y: P(342, 290), size: 44, cls: 'eyebrow' });
      S.ttl = line(S.txt, 'Apps', { x: PAD, y: P(412, 340), size: P(150, 140) });
      S.ttl2 = line(S.txt, 'mobile.', { x: PAD, y: P(568, 486), size: P(150, 140), accent: [0] });
      // second platform phone sits behind the first one
      S.back = phone(S.cam, P(1420, 560), P(160, 650), { bezel: '#2A2F3A' });
      S.back.frame.style.transformOrigin = '50% 100%';
      // pencil sketch of the screen, drawn stroke by stroke (pathLength=1 → dashoffset is the progress)
      const pen = `fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1 1"`;
      const sk = `${pen} stroke="#0E1116" stroke-width="4"`, acc = `${pen} stroke="#2F5BFF" stroke-width="5"`;
      S.sketch = reg(div(S.cam, `left:${P(1200, 340)}px;top:${P(130, 660)}px;width:400px;height:820px;transform-origin:50% 50%`, `<svg width="400" height="820" viewBox="0 0 400 820" style="overflow:visible">
        <rect x="3" y="3" width="394" height="814" rx="60" ${sk}/>
        <path d="M44 92 L200 90" ${pen} stroke="#0E1116" stroke-width="9"/><path d="M44 128 L250 127" ${sk}/>
        <circle cx="330" cy="100" r="27" ${sk}/>
        <rect x="36" y="180" width="328" height="150" rx="24" ${sk}/><path d="M64 222 L150 221 M64 262 L290 260" ${sk}/>
        ${[0, 1, 2].map((i) => `<rect x="36" y="${392 + i * 94}" width="328" height="80" rx="18" ${sk}/>`).join('')}
        <path d="M14 712 L386 712" ${sk}/>${[0, 1, 2, 3].map((i) => `<circle cx="${59 + i * 94}" cy="748" r="12" ${sk}/>`).join('')}
        <path d="M200 160 C 320 158, 392 190, 390 252 C 388 320, 300 352, 190 350 C 80 348, 12 318, 14 256 C 16 196, 90 166, 214 168" ${acc}/>
        <path d="M-170 330 C -110 318, -50 292, 6 268" ${acc}/><path d="M-16 252 L8 267 L-12 286" ${acc}/>
      </svg>`));
      S.paths = [...S.sketch.querySelectorAll('rect,path,circle')].map((p) => reg(p));
      S.front = phone(S.cam, P(1200, 340), P(130, 660));
      SNAP.phone = S.front;
    },
    run(t, b, S) {
      // ---- type: hook line on frame 0, then the swap to the mobile title on b8
      rise(t, S.l1, [-0.55, -0.47], 7.45);
      rise(t, S.l2, words('hook_w2', 2), 7.5);
      rise(t, S.eye, words(beatOf('mobile') + 0.05, 3, 0.03), null, { preset: 'snappy' });
      rise(t, S.ttl, words('mobile', 1));
      rise(t, S.ttl2, [beatOf('mobile') + 0.08 + LATE]);
      // ---- sketch draws itself from before frame 0 (so frame 0 already has lines) through b3.6
      const sched = [[-4, -1], [-3.5, -1], [-3.5, -1], [-3, -1], [-3, -1], [-3, -1], [0.2, 0.9], [0.5, 1.2], [0.8, 1.5], [1.2, 1.7], [1.3, 1.8], [1.4, 1.9], [1.5, 2.0], [1.6, 2.1], [0.4, 1.4], [1.3, 1.9], [1.9, 2.2]];
      S.paths.forEach((p, i) => { const [a, z] = sched[i] || [3, 3.8]; put(p, { css: { strokeDashoffset: String(1 - seg(t, a, z)) } }); });
      // ---- the real screen grows out of the sketch on b4, then its blocks build b4.5 → b5.75
      const g = spHit(t, 'sketch_build', 'default');
      put(S.front.frame, { o: snapIn(g), s: 0.9 + 0.1 * g });
      put(S.sketch, { s: 1 + 0.04 * g, hide: g > 0.9 });
      const F = S.front.blocks;
      fill(t, F[0], 4.5); fill(t, F[1], 5.0); fill(t, F[2], 5.5); fill(t, F[3], 5.62); fill(t, F[4], 5.75);
      // ---- b10: the second platform rises behind, its list loads b10.25 → b10.75
      const bk = spHit(t, 10, 'default');
      put(S.back.frame, { o: snapIn(bk), y: 420 * (1 - bk), r: 7 * bk, s: 0.92 });
      const B = S.back.blocks;
      fill(t, B[0], 10.25); fill(t, B[1], 10.25); fill(t, B[2], 10.5); fill(t, B[3], 10.62); fill(t, B[4], 10.75);
      tabs(t, S.back, 999);
      // ---- b12 tab switch on the front phone (pages slide, indicator stretches), b14 notification drops
      tabs(t, S.front, 'mob_tab');
      put(S.front.pages, { x: -376 * hitD(t, 'mob_tab') });
      const n = spHit(t, 'mob_notif', 'default');
      put(S.front.notif, { o: snapIn(n), y: -130 * (1 - n) });
      // ---- camera: push toward the phone on b6, back out on b8, slide left on b10 to frame both phones; parallax under the b16 sheet
      const cover = spHit(t, 'web', 'default');
      put(S.cam, {
        s: trk(t, [[0, 1], ['hook_push', 1.05, 'default'], ['mobile', 1, 'heavy'], [10, 1.06, 'default']]) + 0.015 * seg(t, 'mobile', 'web'),
        x: trk(t, [[0, 0], ['mobile', P(-160, 0), 'heavy'], [10, P(-230, -130), 'default']]),
        y: -180 * cover,
      });
      put(S.txt, { s: 1 + 0.02 * seg(t, 'hook', 'web'), y: -180 * cover });
    },
  });

  // ================================================================ 3. sistemas web  (b16 → dash): a sheet rises and covers the phones
  const ORDERS = [['#1048', 'Padaria Central', '31/10', 'R$ 1.240,00', 0], ['#1047', 'Mercado Bom Preço', '31/10', 'R$ 4.280,00', 0],
    ['#1046', 'Oficina Rota', '30/10', 'R$ 860,00', 1], ['#1045', 'Clínica Vida', '30/10', 'R$ 2.150,00', 2],
    ['#1044', 'Loja Aurora', '29/10', 'R$ 590,00', 1], ['#1043', 'Studio Norte', '29/10', 'R$ 3.020,00', 2],
    ['#1042', 'Ateliê Sol', '28/10', 'R$ 1.780,00', 1], ['#1041', 'Farmácia Boa', '28/10', 'R$ 940,00', 2],
    ['#1040', 'Pet Amigo', '27/10', 'R$ 2.430,00', 0], ['#1039', 'Livraria Rua 7', '27/10', 'R$ 680,00', 1]].slice(0, P(6, 10));
  const PILL = [['Em análise', '#EFEDE8', 'var(--ink-2)', 138], ['Aprovado', 'var(--accent-soft)', 'var(--accent)', 124], ['Enviado', '#E6E8EC', '#3A3F48', 112]];
  // browser geometry (UI px). 9:16 drops the sidebar and the Data column (COLS -1) so the app fills the frame at 100 %
  const BX = 140, BY = 330, SIDE = P(280, 0), MX = BX + SIDE + P(48, 40), COLS = P([0, 150, 560, 760, 990], [0, 120, -1, 420, 640]);
  const BRW = P(1640, 940), BRH = P(840, 940), MW = P(1264, 860), BTN = P(1044, 640), RF = P(21, 24), MOD = P([660, 470], [300, 800]);
  const rowY = (i) => BY + 56 + 196 + i * 66;
  scene({
    name: 'web', from: 'web', to: 'dash', pre: 0.5,
    build(root, S) {
      S.sheet = reg(div(root, `width:${W}px;height:${H + 120}px;background:var(--bg);box-shadow:0 -24px 70px rgba(14,17,22,.22)`), { o: 0 });
      S.eye = line(S.sheet, 'Portais, ERPs, sistemas internos', { x: PAD + 4, y: P(92, 290), size: 44, cls: 'eyebrow' });
      S.ttl = line(S.sheet, 'Sistemas web.', { x: PAD, y: P(158, 344), size: P(124, 112), accent: [1] });
      S.ui = div(S.sheet, `transform-origin:0 0;${TALL ? `transform:translate(${20 - BX}px, ${560 - BY}px)` : ''}`);
      const br = (S.browser = reg(div(S.ui, `left:${BX}px;top:${BY}px;width:${BRW}px;height:${BRH}px;border-radius:22px;overflow:hidden;background:#fff;
        box-shadow:0 2px 6px rgba(14,17,22,.06),0 50px 100px -40px rgba(14,17,22,.35)`)));
      div(br, `left:0;top:0;width:${BRW}px;height:56px;background:#F6F5F2;border-bottom:1px solid var(--line)`,
        `<div style="position:absolute;left:24px;top:21px;display:flex;gap:9px">${'<span style="width:14px;height:14px;border-radius:7px;background:#D9D6CF"></span>'.repeat(3)}</div>
         <div style="position:absolute;left:${P(560, 210)}px;top:12px;width:520px;height:32px;border-radius:16px;background:#fff;border:1px solid var(--line);font:500 17px UI;color:var(--ink-3);display:flex;align-items:center;justify-content:center">painel / pedidos</div>`);
      if (SIDE) div(br, `left:0;top:56px;width:${SIDE}px;height:784px;background:#FAF9F6;border-right:1px solid var(--line)`,
        ['Início', 'Pedidos', 'Clientes', 'Estoque', 'Financeiro', 'Relatórios'].map((n, i) =>
          `<div style="position:absolute;left:18px;top:${30 + i * 58}px;width:244px;height:46px;border-radius:12px;display:flex;align-items:center;gap:14px;padding-left:16px;box-sizing:border-box;
            ${i === 1 ? 'background:var(--accent-soft);color:var(--accent)' : 'color:var(--ink-2)'};font:${i === 1 ? 600 : 500} 21px UI">
            <span style="width:18px;height:18px;border-radius:5px;border:2.5px solid currentColor"></span>${n}</div>`).join(''));
      const main = div(br, `left:${MX - BX}px;top:56px;width:${MW}px;height:${BRH - 56}px`);
      div(main, 'left:0;top:34px', `<div style="font:700 40px Display;letter-spacing:-0.03em">Pedidos</div><div style="font:500 20px UI;color:var(--ink-3);margin-top:6px">128 pedidos este mês</div>`);
      if (!TALL) div(main, 'left:700px;top:40px;width:320px;height:52px;border-radius:14px;border:1px solid var(--line);box-sizing:border-box;font:500 19px UI;color:var(--ink-3);display:flex;align-items:center;padding-left:20px', 'Buscar pedido…');
      S.btn = reg(div(main, `left:${BTN}px;top:40px;width:220px;height:52px;border-radius:14px;background:var(--accent);color:#fff;font:600 20px UI;display:flex;align-items:center;justify-content:center;transform-origin:50% 50%`, '+ Novo pedido'));
      div(main, `left:0;top:150px;width:${MW}px;height:46px;border-bottom:1px solid var(--line)`,
        ['Pedido', 'Cliente', 'Data', 'Valor', 'Status'].map((h, i) => COLS[i] < 0 ? '' : `<span style="position:absolute;left:${COLS[i] + 16}px;top:10px;font:500 18px UI;color:var(--ink-3)">${h}</span>`).join(''));
      S.rows = ORDERS.map((o, i) => {
        const y = 196 + i * 66, R = {};
        R.sel = reg(div(main, `left:0;top:${y}px;width:${MW}px;height:66px;background:var(--accent-soft);transform-origin:0 50%`), { o: 0 });
        R.selBar = reg(div(main, `left:0;top:${y + 12}px;width:5px;height:42px;border-radius:3px;background:var(--accent);transform-origin:50% 50%`), { o: 0 });
        div(main, `left:0;top:${y + 65}px;width:${MW}px;height:1px;background:var(--line)`);
        R.blk = block(main, `left:0;top:${y}px;width:${MW}px;height:66px`,
          [bar(70, 16), bar(220, 16), bar(70, 16), bar(110, 16), bar(110, 28, GREY, 'border-radius:14px')].map((h, k) => COLS[k] < 0 ? '' : `<div style="position:absolute;left:${COLS[k] + 16}px;top:${k === 4 ? 19 : 25}px">${h}</div>`).join(''),
          [o[0], o[1], o[2], o[3]].map((v, k) => COLS[k] < 0 ? '' : `<span style="position:absolute;left:${COLS[k] + 16}px;top:${P(20, 18)}px;font:${k === 1 ? 600 : 500} ${RF}px UI;color:${k === 0 ? 'var(--ink-3)' : 'var(--ink)'}">${v}</span>`).join(''));
        const PL = PILL[o[4]];
        R.pill = reg(div(R.blk.body, `left:${COLS[4] + 16}px;top:17px;width:${PL[3]}px;height:34px;border-radius:17px;background:${PL[1]};transform-origin:0 50%`));
        R.pA = reg(div(R.pill, `left:16px;top:6px;font:600 18px UI;color:${PL[2]};white-space:nowrap`, PL[0]));
        if (i === 1) R.pB = reg(div(R.pill, `left:16px;top:6px;font:600 18px UI;color:var(--accent);white-space:nowrap`, 'Aprovado'), { o: 0 });
        return R;
      });
      // modal: scrim over the app, card with a typed field
      S.scrim = reg(div(br, `left:0;top:56px;width:${BRW}px;height:${BRH - 56}px;background:rgba(14,17,22,.32)`), { o: 0 });
      S.modal = reg(div(S.ui, `left:${MOD[0]}px;top:${MOD[1]}px;width:600px;height:410px;border-radius:24px;background:#fff;transform-origin:50% 50%;
        box-shadow:0 2px 8px rgba(14,17,22,.08),0 60px 120px -40px rgba(14,17,22,.55)`), { o: 0 });
      div(S.modal, 'left:36px;top:32px;font:700 32px Display;letter-spacing:-0.02em', 'Novo pedido');
      div(S.modal, 'left:36px;top:100px;font:500 18px UI;color:var(--ink-3)', 'Cliente');
      S.field = div(S.modal, 'left:36px;top:130px;width:528px;height:60px;border-radius:14px;border:2px solid var(--accent);box-sizing:border-box;padding-left:18px;display:flex;align-items:center;font:500 22px UI');
      S.ftxt = reg(el('span', {}, S.field)); S.caret = reg(el('span', { style: 'display:inline-block;width:2px;height:28px;background:var(--accent);margin-left:2px' }, S.field), { o: 0 });
      div(S.modal, 'left:36px;top:212px;font:500 18px UI;color:var(--ink-3)', 'Valor');
      div(S.modal, 'left:36px;top:242px;width:528px;height:60px;border-radius:14px;border:1px solid var(--line);box-sizing:border-box;padding-left:18px;display:flex;align-items:center;font:500 22px UI;color:var(--ink-3)', 'R$ 0,00');
      div(S.modal, 'left:404px;top:330px;width:160px;height:52px;border-radius:14px;background:var(--accent);color:#fff;font:600 20px UI;display:flex;align-items:center;justify-content:center', 'Salvar');
      SNAP.web = S;
      S.cursor = reg(div(S.ui, 'left:0;top:0;width:34px;height:44px;transform-origin:3px 3px',
        `<svg width="34" height="44" viewBox="0 0 34 44"><path d="M3 3 L3 34 L11 27 L17 40 L23 37 L17 25 L28 25 Z" fill="#0E1116" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/></svg>`), { o: 0 });
    },
    run(t, b, S) {
      const cover = spHit(t, 'web', 'default');
      put(S.sheet, { o: snapIn(cover), y: lerp(H, 0, cover) });
      put(S.browser, { y: 90 * (1 - sp(t, 15.9, 'default')) });
      rise(t, S.eye, words('web', 4, 0.03), null, { preset: 'snappy' });
      rise(t, S.ttl, words('web', 2));
      // rows build b18 → b19.25
      S.rows.forEach((R, i) => fill(t, R.blk, beatOf('web_rows') + i * P(0.25, 0.15), 12));
      // b20 select row 2 · b22 its status morphs to Aprovado
      const s = spHit(t, 'web_sel', 'snappy'), R = S.rows[1];
      put(R.sel, { o: snapIn(s), sx: s });
      put(R.selBar, { o: snapIn(s), sy: s });
      const m = spHit(t, 'web_status', 'snappy', 0.01);
      put(R.pill, { css: { width: lerp(138, 124, m) + 'px', background: m > 0.5 ? '#fff' : '#EFEDE8' }, s: 1 + 0.08 * pulse(t, 'web_status') });
      put(R.pA, { o: clamp(1 - m * 3) });
      put(R.pB, { o: Motion.swapAlpha(t, bt('web_status') - 0.01) });
      // b23.5 button press · b24 modal rises over a scrim · b26 → b27.5 typing
      put(S.btn, { s: 1 - 0.06 * pulse(t, 'web_btn') });
      const md = hitD(t, 'web_modal');
      put(S.scrim, { o: clamp(md) });
      put(S.modal, { o: snapIn(md), y: 140 * (1 - md), s: 0.94 + 0.06 * md });
      type(t, S.ftxt, 'Café da Praça', 'web_type', 'web_type_end', S.caret, 'dash');
      // cursor: enters b19, row b20, pill b22, button b23.5, field b25
      const c = trkObj(t, [[0, P({ x: 1760, y: 1120 }, { x: 1000, y: 1400 })], [19.1, { x: MX + 330, y: rowY(1) + 30 }], [20.8, { x: MX + COLS[4] + 80, y: rowY(1) + 30 }],
        [22.7, { x: MX + BTN + 120, y: BY + 56 + 60 }], [24.6, { x: MOD[0] + 380, y: MOD[1] + 170 }]]);
      const clicks = pulse(t, 'web_sel') + pulse(t, 'web_status') + pulse(t, 'web_btn');
      put(S.cursor, { o: b > 18.8 ? 1 : 0, x: c.x, y: c.y, s: 1 - 0.14 * clicks });
    },
  });

  // ================================================================ 4. dashboards e BI  (b28 → ia): hard cut, camera settles in
  const A = [42, 55, 48, 62, 58, 70, 66, 78, 74, 85, 90, 100], Bq = [58, 61, 57, 66, 70, 68, 75, 79, 77, 88, 93, 97];
  const LA = [38, 44, 46, 52, 55, 58, 63, 66, 70, 74, 79, 86], LB = [50, 52, 55, 58, 60, 63, 66, 69, 72, 75, 78, 82];
  const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const KPI = [['Receita', 1.28, (v) => `R$ ${v.toFixed(2).replace('.', ',')} mi`, '+12%', 3.71], ['Pedidos', 12480, (v) => Math.round(v).toLocaleString('pt-BR'), '+8%', 36920],
    ['Ticket médio', 102.6, (v) => `R$ ${v.toFixed(2).replace('.', ',')}`, '+4%', 100.4]];
  const CX = 800, CY = 110, PX = 40, PW = 900, BASE = 800, PH = 400, BW = 46;
  const barX = (i) => PX + i * ((PW - BW) / 11);
  scene({
    name: 'dash', from: 'dash', to: 'ia',
    build(root, S) {
      S.cam = reg(div(root, `width:${W}px;height:${H}px;transform-origin:${P('1290px 530px', '540px 1050px')}`));
      S.eye = line(S.cam, 'Relatórios e indicadores', { x: PAD + 4, y: P(360, 290), size: 44, cls: 'eyebrow' });
      S.t1 = line(S.cam, 'Dashboards', { x: PAD, y: P(424, 340), size: P(100, 130) });
      S.t2 = line(S.cam, 'e BI.', { x: PAD, y: P(540, 486), size: P(100, 130), accent: [1] });
      const cd = S.card = div(S.cam, `left:${P(CX, 74)}px;top:${P(CY, 680)}px;transform-origin:0 0;${TALL ? 'transform:scale(0.9);' : ''}width:980px;height:860px;border-radius:26px;background:#fff;box-shadow:0 2px 6px rgba(14,17,22,.06),0 50px 100px -40px rgba(14,17,22,.35)`);
      div(cd, 'left:40px;top:38px;font:700 32px Display;letter-spacing:-0.02em', 'Visão geral');
      div(cd, 'left:550px;top:34px;width:390px;height:50px;border-radius:14px;background:#F1EFEA');
      S.seg = reg(div(cd, 'left:0;top:39px;width:124px;height:40px;border-radius:11px;background:#fff;box-shadow:0 2px 6px rgba(14,17,22,.12)'));
      S.segL = ['Mês', 'Trimestre', 'Ano'].map((n, i) => ({
        off: reg(div(cd, `left:${553 + i * 128}px;top:47px;width:128px;text-align:center;font:500 19px UI;color:var(--ink-3)`, n)),
        on: reg(div(cd, `left:${553 + i * 128}px;top:47px;width:128px;text-align:center;font:600 19px UI;color:var(--ink)`, n), { o: 0 }),
      }));
      S.kpi = KPI.map((k, i) => {
        const x = 40 + i * 307, K = {};
        div(cd, `left:${x}px;top:118px;width:286px;height:140px;border-radius:18px;border:1px solid var(--line);box-sizing:border-box`);
        div(cd, `left:${x + 24}px;top:140px;font:500 19px UI;color:var(--ink-3)`, k[0]);
        K.skel = reg(div(cd, `left:${x + 24}px;top:184px`, bar(170, 34)));
        K.val = reg(div(cd, `left:${x + 24}px;top:176px;font:700 40px Display;letter-spacing:-0.03em;white-space:nowrap`, ''), { o: 0 });
        K.chip = reg(div(cd, `left:${x + 24}px;top:226px;font:600 16px UI;color:var(--accent)`, `${k[3]} vs. mês anterior`), { o: 0 });
        return K;
      });
      for (let g = 0; g <= 4; g++) div(cd, `left:${PX}px;top:${BASE - g * 100}px;width:${PW}px;height:1px;background:${g ? '#F0EEE9' : 'var(--line)'}`);
      S.bars = A.map((_, i) => reg(div(cd, `left:${barX(i)}px;top:${BASE}px;width:${BW}px;height:0;border-radius:9px 9px 3px 3px;background:${i === 11 ? 'var(--accent)' : '#C9D5FF'}`)));
      MONTHS.forEach((mo, i) => div(cd, `left:${barX(i) - 10}px;top:${BASE + 14}px;width:${BW + 20}px;text-align:center;font:500 16px UI;color:var(--ink-3)`, mo));
      S.svg = div(cd, `left:0;top:0;width:980px;height:860px`, `<svg width="980" height="860"><path fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>`);
      S.path = reg(S.svg.querySelector('path'));
      SNAP.dash = S;
      S.dot = reg(div(cd, 'left:-9px;top:-9px;width:18px;height:18px;border-radius:9px;background:var(--ink);border:4px solid #fff;box-sizing:border-box;transform-origin:50% 50%'), { o: 0 });
    },
    run(t, b, S) {
      rise(t, S.eye, words('dash', 3, 0.03), null, { preset: 'snappy' });
      rise(t, S.t1, words('dash', 1));
      rise(t, S.t2, words(beatOf('dash') + 0.25, 2));
      // bars grow b28.25 → b29.6, retarget to the quarter view on b34
      S.bars.forEach((e, i) => {
        const h = trk(t, [[0, 0], [28.25 + i * 0.12, A[i] * 4, 'snappy'], [34 + i * 0.03, Bq[i] * 4, 'default']]);
        put(e, { css: { height: Math.max(0, h) + 'px', top: BASE - Math.max(0, h) + 'px' } });
      });
      // line draws b30 → b31.5 and morphs with the filter
      const f = spHit(t, 'dash_filter', 'default');
      const pts = LA.map((v, i) => [barX(i) + BW / 2, BASE - lerp(v, LB[i], f) * 4]);
      const d = 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
      const dr = ease.out(seg(t, 'dash_line', 31.5));
      put(S.path, { css: { d: `path("${d}")`, strokeDashoffset: String(1 - dr) } });
      const end = pts[11], dp = spHit(t, 31.5, 'snappy');
      put(S.dot, { o: snapIn(dp), x: end[0], y: end[1], s: dp });
      // KPIs count up b32 → b33
      const kc = ease.out(seg(t, 'dash_kpi', 33)), kq = ease.out(seg(t, 'dash_filter', 35));
      S.kpi.forEach((K, i) => {
        const p = spHit(t, beatOf('dash_kpi') + i * 0.06, 'snappy');
        put(K.skel, { hide: p > 0.3 });
        put(K.val, { o: ramp(p), y: 12 * (1 - p), text: KPI[i][2](KPI[i][1] * kc + (KPI[i][4] - KPI[i][1]) * kq) });
        const ch = spHit(t, 32.75 + i * 0.1, 'snappy');
        put(K.chip, { o: ramp(ch), y: 8 * (1 - ch), text: `${KPI[i][3]} vs. ${f > 0.5 ? 'trimestre' : 'mês'} anterior` });
      });
      // b34 filter → Trimestre
      const ind = Motion.indicator(t, [[0, 555, 679], [bt('dash_filter') - C.leadFor('snappy'), 683, 807]]);
      put(S.seg, { x: ind.start, css: { width: ind.size + 'px' } });
      const k = ind.start > 619 ? 1 : 0;
      S.segL.forEach((L, i) => { put(L.on, { o: i === k ? 1 : 0 }); put(L.off, { o: i === k ? 0 : 1 }); });
      put(S.cam, { s: trk(t, [[0, 1.12], ['dash', 1, 'heavy']]) + 0.02 * seg(t, 'dash', 'ia') });
    },
  });

  // ================================================================ 5. IA e automações  (b36 → grid): hard cut to night
  const ICONS = [
    '<rect x="6" y="4" width="20" height="24" rx="3"/><path d="M11 11h10M11 16h10M11 21h6"/>',
    '<path d="M16 3 L18.5 13.5 L29 16 L18.5 18.5 L16 29 L13.5 18.5 L3 16 L13.5 13.5 Z"/>',
    '<rect x="4" y="5" width="24" height="22" rx="3"/><path d="M4 12h24M4 19h24M13 5v22"/>',
    '<rect x="4" y="7" width="24" height="18" rx="3"/><path d="M5 9 L16 18 L27 9"/>',
  ];
  const NODES = [['Formulário recebido', 'Gatilho'], ['IA classifica o pedido', 'Agente'], ['Planilha atualizada', 'Integração'], ['E-mail para o cliente', 'Ação']];
  const NX = 1000, NG = P(166, 128), NY = (i) => 330 + i * NG, NH = 108;
  scene({
    name: 'ia', from: 'ia', to: 'grid',
    build(root, S) {
      root.style.background = 'var(--night)';
      S.cam = reg(div(root, `width:${W}px;height:${H}px;transform-origin:0 0`));
      S.eye = line(S.cam, 'Chatbots, agentes, integrações', { x: PAD + 4, y: P(84, 280), size: 44, cls: 'eyebrow', color: '#8B909A' });
      S.ttl = line(S.cam, 'IA e automações.', { x: PAD, y: P(146, 326), size: P(116, 92), color: '#fff', accent: [0] });
      const IK = 0.8;
      S.chatW = div(S.cam, `transform-origin:0 0;${TALL ? `transform:translate(${80 - 140}px, ${440 - 320}px)` : ''}`);
      S.flowW = div(S.cam, `transform-origin:0 0;${TALL ? `transform:translate(${80 - NX}px, ${1000 - NY(0)}px)` : ''}`);
      const ch = div(S.chatW, `left:140px;top:320px;width:760px;height:${P(700, 540)}px;border-radius:28px;background:var(--night-2);border:1px solid var(--night-line);box-sizing:border-box`);
      div(ch, 'left:28px;top:24px;display:flex;align-items:center;gap:12px;font:600 23px UI;color:#fff',
        '<span style="width:12px;height:12px;border-radius:6px;background:var(--accent)"></span>Assistente<span style="font:500 18px UI;color:#8B909A;margin-left:4px">online</span>');
      div(ch, 'left:0;top:76px;width:758px;height:1px;background:var(--night-line)');
      S.user = reg(div(ch, 'left:150px;top:100px;width:580px;box-sizing:border-box;padding:18px 26px;border-radius:24px 24px 6px 24px;background:var(--accent);color:#fff;font:500 32px UI;line-height:1.25;transform-origin:100% 100%',
        'Gera o relatório de vendas de outubro.'), { o: 0 });
      S.ai = reg(div(ch, `left:28px;top:${P(252, 236)}px;width:610px;box-sizing:border-box;padding:18px 26px;border-radius:24px 24px 24px 6px;background:var(--night-line);color:#fff;font:500 32px UI;line-height:1.25;transform-origin:0 100%`,
        'Pronto! Gerei o relatório e enviei para a equipe.'), { o: 0 });
      S.file = reg(div(ch, `left:28px;top:${P(404, 360)}px;width:420px;height:78px;border-radius:18px;background:#1F2430;border:1px solid var(--night-line);box-sizing:border-box;display:flex;align-items:center;gap:16px;padding:0 16px;transform-origin:0 50%`,
        `<div style="width:46px;height:46px;border-radius:10px;background:var(--accent);color:#fff;font:700 13px UI;display:flex;align-items:center;justify-content:center">PDF</div>
         <div><div style="font:600 20px UI;color:#fff">relatorio-outubro.pdf</div><div style="font:500 16px UI;color:#8B909A;margin-top:3px">2 páginas</div></div>`), { o: 0 });
      const inp = div(ch, `left:24px;top:${P(610, 452)}px;width:710px;height:66px;border-radius:33px;background:var(--night);border:1px solid var(--night-line);box-sizing:border-box`);
      S.ph = reg(div(inp, 'left:26px;top:15px;font:500 28px UI;color:#5E6470', 'Pergunte qualquer coisa…'));
      const tx = div(inp, 'left:26px;top:13px;font:500 28px UI;color:#E8EAED;white-space:nowrap;display:flex;align-items:center');
      S.itxt = reg(el('span', {}, tx)); S.icar = reg(el('span', { style: 'display:inline-block;width:2px;height:32px;background:var(--accent);margin-left:2px' }, tx), { o: 0 });
      S.send = reg(div(inp, 'left:654px;top:7px;width:50px;height:50px;border-radius:25px;background:var(--accent);transform-origin:50% 50%',
        '<svg width="50" height="50" viewBox="0 0 50 50"><path d="M25 34 V17 M17 24 L25 16 L33 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'));
      // automation flow: four empty slots are there from the cut, the nodes fill them
      if (!TALL) NODES.forEach((_, i) => div(S.flowW, `left:${NX}px;top:${NY(i)}px;width:700px;height:${NH}px;border-radius:22px;border:2px dashed #3A4150;box-sizing:border-box`));
      S.links = [0, 1, 2].map((i) => reg(div(S.flowW, `left:${NX + 54}px;top:${NY(i) + NH}px;width:3px;height:${NG - NH}px;background:#3A4150;transform-origin:50% 0`), { o: 0 }));
      S.nodes = NODES.map(([a, s2], i) => {
        const N = {};
        N.box = reg(div(S.flowW, `left:${NX}px;top:${NY(i)}px;width:700px;height:${NH}px;border-radius:22px;background:var(--night-2);border:2px solid var(--night-line);box-sizing:border-box;transform-origin:0 50%`), { o: 0 });
        N.ring = reg(div(N.box, 'left:-2px;top:-2px;width:700px;height:108px;border-radius:22px;border:2px solid var(--accent);box-sizing:border-box'), { o: 0 });
        N.ic = div(N.box, 'left:22px;top:22px;width:60px;height:60px;border-radius:16px;background:var(--night-line)');
        N.icOn = reg(div(N.box, 'left:22px;top:22px;width:60px;height:60px;border-radius:16px;background:var(--accent)'), { o: 0 });
        div(N.box, 'left:36px;top:36px', `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[i]}</svg>`);
        div(N.box, 'left:106px;top:22px;font:600 26px UI;color:#fff', a);
        div(N.box, 'left:106px;top:60px;font:500 18px UI;color:#8B909A', s2);
        N.ok = reg(div(N.box, 'left:620px;top:32px;width:42px;height:42px;border-radius:21px;background:var(--accent);transform-origin:50% 50%',
          '<svg width="42" height="42" viewBox="0 0 42 42"><path d="M13 21.5 L18.5 27 L29 16" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'), { o: 0 });
        return N;
      });
      SNAP.ia = S;
      S.chip = reg(div(S.flowW, `left:${NX + P(330, 380)}px;top:${P(NY(3) + NH + 20, NY(3) + 29)}px;height:50px;border-radius:25px;background:var(--accent);color:#fff;font:600 22px UI;
        display:flex;align-items:center;gap:10px;padding:0 22px 0 16px;white-space:nowrap;transform-origin:0 0`,
        '<svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 11.5 L9.5 16 L17 7" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>E-mail enviado'), { o: 0 });
      S.dot = reg(div(S.flowW, `left:${NX + 55.5 - 9}px;top:-9px;width:18px;height:18px;border-radius:9px;background:var(--accent)`), { o: 0 });
    },
    run(t, b, S) {
      rise(t, S.eye, words(39, 3, 0.03), null, { preset: 'snappy' });
      rise(t, S.ttl, words(39.1, 3));
      // typing b36.25 → b37.25, send b37.5 clears the field and drops the bubble into the thread
      const n = type(t, S.itxt, 'Gera o relatório de vendas de outubro.', 36.25, 'ia_typed', S.icar, 'ia_send');
      const sent = t >= bt('ia_send') - C.leadFor('snappy');
      if (sent) put(S.itxt, { text: '' });
      put(S.ph, { o: n === 0 || sent ? 1 : 0 });
      put(S.send, { s: 1 - 0.12 * pulse(t, 'ia_send') });
      const u = spHit(t, 'ia_send', 'snappy');
      put(S.user, { o: snapIn(u), y: 60 * (1 - u), s: 0.9 + 0.1 * u });
      const a = spHit(t, 'ia_reply', 'snappy', 0.02);
      put(S.ai, { o: snapIn(a), y: 40 * (1 - a), s: 0.9 + 0.1 * a });
      const fl = spHit(t, 'ia_file', 'snappy');
      put(S.file, { o: snapIn(fl), y: 30 * (1 - fl), s: 0.92 + 0.08 * fl });
      // nodes b40..b43, each link draws toward the node it brings in
      ['ia_n1', 'ia_n2', 'ia_n3', 'ia_n4'].forEach((m, i) => {
        const p = spHit(t, m, 'default', 0.03);
        put(S.nodes[i].box, { o: snapIn(p), x: 50 * (1 - p), s: 0.94 + 0.06 * p });
        if (i > 0) { const l = sp(t, beatOf(m) - 0.35, 'snappy'); put(S.links[i - 1], { o: snapIn(l), sy: l }); }
      });
      // b44 → b46 a pulse runs the flow; each node lights and ticks as it passes
      const pg = seg(t, 'ia_pulse', 46);
      const y0 = NY(0) + NH / 2, y3 = NY(3) + NH / 2;
      put(S.dot, { o: pg > 0 && pg < 1 ? 1 : 0, y: lerp(y0, y3, pg) });
      S.nodes.forEach((N, i) => {
        const at = beatOf('ia_pulse') + (i / 3) * 2;
        const l = spHit(t, at, 'snappy');
        put(N.ring, { o: snapIn(l) }); put(N.icOn, { o: snapIn(l) });
        put(N.ok, { o: snapIn(l), s: 0.6 + 0.4 * l });
      });
      // build into the drop: slow push b46 → b47.5, then hold in the gap
      // close on the chat (focus 470,720 at 1.6×) from the cut, pull back on b39; then a slow push into the drop
      // the close-up follows the field while typing, then the thread when the request is sent
      const ZK = P(1.6, 1.2), z = trk(t, [[0, 1], [39, 0, 'default']]), zs = 1 + (ZK - 1) * z, fy = trk(t, [[0, P(820, 925)], ['ia_send', P(640, 710), 'default']]), fx = P(470, 480);
      // b46: push into the flow while the e-mail chip pops out of the last node (b46.5) and leaves past the right edge (b47.1)
      const pk = 1 + P(1, 0.35) * (0.015 * seg(t, 39.5, 46) + 0.06 * sp(t, 46, 'default') + 0.05 * ease.expoIn(seg(t, 46.5, 'gap')));
      put(S.cam, { s: zs * pk, x: z * (W / 2 - fx * ZK) * pk + (1 - pk) * P(1350, 540), y: z * (H / 2 - fy * ZK) * pk + (1 - pk) * P(640, 300) });
      const cp = spHit(t, 46.5, 'snappy', 0.02), co = sp(t, 47.1, 'default');
      put(S.chip, { o: snapIn(cp), s: 0.8 + 0.2 * cp, x: 1200 * co, hide: co > 0.99 });
    },
  });

  // ================================================================ 6. payoff grid  (b48 → end)
  // each tile is a clone of the finished screen from its scene (state of its last frame), scaled into the tile
  function tileArt(i) {
    const wrap = (node, k, x, y) => { const w = el('div', { class: 'abs', style: `left:${x}px;top:${y}px;transform:scale(${k})` }); w.appendChild(node); return w; };
    if (i === 0) {
      const P = SNAP.phone, { c, m } = snap(P.frame, [P.notif, P.tabs[0].off, ...P.tabs.slice(1).map((tb) => tb.on)]);
      m.get(P.ind).style.left = '15px';
      return wrap(c, 0.33, 124, 22);
    }
    if (i === 1) {
      const S = SNAP.web, drop = [S.scrim, S.rows[1].pA];
      S.rows.forEach((R, k) => { if (k !== 1) drop.push(R.sel, R.selBar); });
      const { c, m } = snap(S.browser, drop);
      Object.assign(m.get(S.rows[1].pill).style, { background: '#fff', width: '124px' });
      return wrap(c, P(0.21, 0.29), P(18, 54), P(58, 22));
    }
    if (i === 2) {
      const S = SNAP.dash, drop = [S.segL[0].off, S.segL[1].on, S.segL[2].on];
      const { c, m } = snap(S.card, drop);
      S.bars.forEach((e, k) => Object.assign(m.get(e).style, { height: A[k] * 4 + 'px', top: BASE - A[k] * 4 + 'px' }));
      S.kpi.forEach((K, k) => { m.get(K.val).textContent = KPI[k][2](KPI[k][1]); });
      const pts = LA.map((v, k) => [barX(k) + BW / 2, BASE - v * 4]);
      const pe = m.get(S.path); pe.setAttribute('d', 'M' + pts.map((q) => q.join(' ')).join(' L')); pe.setAttribute('stroke-dashoffset', '0');
      m.get(S.dot).style.transform = `translate(${pts[11][0]}px, ${pts[11][1]}px)`;
      Object.assign(m.get(S.seg).style, { left: '555px', width: '124px' });
      c.style.boxShadow = 'none';
      return wrap(c, 0.33, 28, 14);
    }
    const S = SNAP.ia, box = el('div', { class: 'abs', style: 'width:700px;height:610px' });
    S.nodes.forEach((N, k) => { const { c } = snap(N.box); c.style.top = NY(k) - NY(0) + 'px'; box.appendChild(c); });
    S.links.forEach((L, k) => { const { c } = snap(L); Object.assign(c.style, { left: '54px', top: NY(k) - NY(0) + NH + 'px' }); box.appendChild(c); });
    return wrap(box, 0.45, 32, 22);
  }
  const TILE_N = ['Apps mobile', 'Sistemas web', 'Dashboards e BI', 'IA e automações'];
  const GX = P(1000, 80), GY = P(150, 700), TS = 380, GG = 20;
  scene({
    name: 'grid', from: 'grid', to: 'end', post: 1,
    build(root, S) {
      S.cam = reg(div(root, `width:${W}px;height:${H}px;transform-origin:${P('1000px 540px', '540px 1000px')}`));
      S.l1 = line(S.cam, 'Tudo sob', { x: PAD, y: P(300, 286), size: P(150, 140) });
      S.l2 = line(S.cam, 'medida.', { x: PAD, y: P(456, 432), size: P(150, 140), accent: [0] });
      S.l3 = line(S.cam, 'Do jeito do seu negócio.', { x: PAD + 4, y: P(668, 610), size: P(54, 52), accent: [3, 4] });
      S.tiles = TILE_N.map((_, i) => {
        const T = {};
        const x = GX + (i % 2) * (TS + GG), y = GY + Math.floor(i / 2) * (TS + GG);
        T.box = reg(div(S.cam, `left:${x}px;top:${y}px;width:${TS}px;height:${TS}px;border-radius:28px;background:${i === 3 ? 'var(--night)' : '#fff'};overflow:hidden;transform-origin:50% 50%;
          box-shadow:0 2px 6px rgba(14,17,22,.05),0 30px 70px -34px rgba(14,17,22,.35)`), { o: 0 });
        T.box.appendChild(tileArt(i));
        T.ring = reg(div(T.box, `left:0;top:0;width:${TS}px;height:${TS}px;border-radius:28px;box-shadow:inset 0 0 0 4px var(--accent)`), { o: 0 });
        T.lab = div(T.box, `left:30px;top:316px;font:600 28px UI;letter-spacing:-0.01em;color:${i === 3 ? '#fff' : 'var(--ink)'}`, TILE_N[i]);
        T.labOn = reg(div(T.box, 'left:30px;top:316px;font:600 28px UI;letter-spacing:-0.01em;color:var(--accent)', TILE_N[i]), { o: 0 });
        return T;
      });
    },
    run(t, b, S) {
      rise(t, S.l1, words('grid', 2));
      rise(t, S.l2, [beatOf('grid') + 0.5 + LATE]);
      rise(t, S.l3, words('grid_w2', 5, 0.03), null, { preset: 'default' });
      S.tiles.forEach((T, i) => {
        const p = sp(t, beatOf('grid') - 0.15 + i * 0.06, 'default');      // released just before the cut: on the drop frame they are already entering
        const lit = win(t, beatOf('grid_lit') + i * 0.5 - 0.06, i < 3 ? beatOf('grid_lit') + (i + 1) * 0.5 - 0.06 : null);
        put(T.box, { o: snapIn(p), s: 0.96 + 0.04 * p, y: P(i < 2 ? -600 : 600, 1000) * (1 - p) - 12 * lit });   // top row from above, bottom row from below
        put(T.ring, { o: snapIn(lit) }); put(T.labOn, { o: lit > 0.5 ? 1 : 0 });
      });
      put(S.cam, { s: 1 + 0.03 * seg(t, 'grid', 'end') });
    },
  });

  // ================================================================ 7. end card  (b56 → done): a night sheet covers the grid
  scene({
    name: 'end', from: 'end', to: 'done', pre: 0.5,
    build(root, S) {
      S.sheet = reg(div(root, `width:${W}px;height:${H + 120}px;background:var(--night);box-shadow:0 -24px 70px rgba(14,17,22,.3)`), { o: 0 });
      S.push = reg(div(S.sheet, `width:${W}px;height:${H}px;transform-origin:${PAD}px ${P(540, 960)}px`));
      S.l1 = line(S.push, 'Vamos criar', { x: PAD, y: P(300, 330), size: P(170, 140), color: '#fff' });
      S.l2 = line(S.push, 'o seu?', { x: PAD, y: P(480, 478), size: P(170, 140), color: '#fff', accent: [1] });
      S.cta = line(S.push, 'Fale com a gente.', { x: PAD + 4, y: P(730, 690), size: 72, cls: 'ui', color: '#C9CCD2' });
      S.rule = reg(div(S.push, `left:0;top:${P(842, 802)}px;height:8px;border-radius:4px;background:var(--accent)`), { o: 0 });
      S.vr = reg(div(S.push, `left:${P(1190, 80)}px;top:${P(318, 960)}px;width:4px;height:336px;border-radius:2px;background:var(--accent);transform-origin:50% 0`), { o: 0 });
      S.list = TILE_N.map((n, i) => line(S.push, n, { x: P(1240, 124), y: P(318, 960) + i * 86, size: 48, cls: 'ui', color: '#E8EAED' }));
    },
    run(t, b, S) {
      const cover = spHit(t, 'end', 'default');
      put(S.sheet, { o: snapIn(cover), y: lerp(H, 0, cover) });
      put(S.push, { s: 1 + 0.05 * seg(t, 'end', 'done') });
      rise(t, S.l1, words(beatOf('end') + 0.15, 2));
      rise(t, S.l2, words(beatOf('end') + 0.3, 2));
      rise(t, S.cta, words('cta', 4, 0.03), null, { preset: 'snappy' });
      const v = sp(t, 57.1, 'default');
      put(S.vr, { o: snapIn(v), sy: v });
      S.list.forEach((L, i) => rise(t, L, words(57.25 + i * 0.25, L.words.length, 0.02), null, { preset: 'snappy' }));
      const x0 = PAD + 6, w = 600;
      const sw = Motion.indicator(t, [[0, x0, x0], [bt('end_bar') - C.leadFor('snappy'), x0, x0 + w]]);
      put(S.rule, { o: sw.size > 1 ? 1 : 0, x: sw.start, css: { width: sw.size + 'px' } });
    },
  });

  C.start();
})();
