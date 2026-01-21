const ui = (t) => {
    if (t === 'd') document.body.classList.toggle('dark');
    if (t === 't+') tfs += 0.05;
    if (t === 't-') tfs -= 0.05;
    if (t === 's+') sc += 0.05;
    if (t === 's-') sc -= 0.05;
    document.documentElement.style.setProperty('--tfs', tfs + 'rem');
    document.body.style.setProperty('--sc', sc);
    svC()
}

document.querySelectorAll('.cb').forEach(c => {
    const f = `<button onclick="ui('t+')">A+</button><button onclick="ui('t-')">A-</button>`;
    c.innerHTML = `<button onclick="ui('d')">🌓</button>${c.dataset.type !== 'n' ? f : ''}<button onclick="ui('s+')">Z+</button><button onclick="ui('s-')">Z-</button>`
});

const svC = () => localStorage.setItem('tp_v41', JSON.stringify({un: get('un').value, tl: get('tl').value, ime: get('ime').value, ip: get('ip').value, pt: get('pt').checked, bk: get('bk').checked, hi: get('hi').checked, as: get('as').checked, wl: get('wl').checked, wv: get('wv').value, dark: document.body.classList.contains('dark'), sc, tfs, lib}));

const ldC = () => {
    const c = JSON.parse(localStorage.getItem('tp_v41'));
    if (!c) {
        tp(false);
        return
    }
    get('un').value = c.un;
    get('tl').value = c.tl;
    get('ime').value = c.ime || 'e';
    get('ip').value = c.ip || 5;
    get('pt').checked = c.pt;
    get('bk').checked = c.bk;
    get('hi').checked = c.hi;
    get('as').checked = c.as;
    get('wl').checked = c.wl;
    get('wv').value = c.wv;
    get('wv').style.display = c.wl ? 'inline' : 'none';
    if (c.dark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
    sc = c.sc || 1;
    tfs = c.tfs || 1.1;
    lib = c.lib || [];
    rlb();
    tp(c.pt);
    ui('')
};

const rlb = () => {
    const s = get('cms'), l = get('ll');
    s.innerHTML = '';
    l.innerHTML = '';
    lib.forEach((m, i) => {
        s.innerHTML += `<option value="${i}">${m.t}</option>`;
        l.innerHTML += `<div style="display:flex;justify-content:space-between;padding:8px;border-bottom:1px solid var(--bd)"><span>${m.t}</span><button class="bs" onclick="rml(${i})">X</button></div>`
    })
};

const al = () => {
    const t = get('ct').value, x = get('cx').value;
    if (!x.trim()) return;
    lib.push({t: t || (x.slice(0, 12) + '...'), x: x.trim()});
    get('ct').value = '';
    get('cx').value = '';
    rlb();
    svC()
};

const rml = (i) => {
    lib.splice(i, 1);
    rlb();
    svC()
};

const tp = (v) => {
    document.querySelectorAll('.du').forEach(e => e.style.display = v ? 'none' : 'flex');
    document.querySelectorAll('.cu').forEach(e => e.style.display = v ? 'flex' : 'none')
};

const lp = (n) => {
    const s = get('ms');
    s.innerHTML = '';
    pn = n;
    if (plist[n]) plist[n].forEach((m, i) => s.innerHTML += `<option value="${i}">${m.title}</option>`)
};