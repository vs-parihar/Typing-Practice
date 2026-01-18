const ui = (t) => {
    if (t === 'd') document.body.classList.toggle('dark');
    if (t === 't+') tfs += 0.05;
    if (t === 't-') tfs -= 0.05;
    if (t === 's+') sc += 0.05;
    if (t === 's-') sc -= 0.05;
    document.documentElement.style.setProperty('--tfs', tfs + 'rem');
    document.body.style.setProperty('--sc', sc);
    svC();
};

document.querySelectorAll('.cb').forEach(c => {
    const f = `<button onclick="ui('t+')">A+</button><button onclick="ui('t-')">A-</button>`;
    c.innerHTML = `<button onclick="ui('d')">🌓</button>${c.dataset.type === 'f' ? f : ''}<button onclick="ui('s+')">Z+</button><button onclick="ui('s-')">Z-</button>`
});

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