const get = (id) => document.getElementById(id);

const sm = (id) => {
    document.querySelectorAll('.m').forEach(m => m.classList.remove('active'));
    get(id).classList.add('active');
};

const nm = (t) => t ? t.normalize('NFC').replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/़/g, '').replace(/ाे/g, 'ो').replace(/ाै/g, 'ौ').trim() : "";

const svC = () => localStorage.setItem('tp_v41', JSON.stringify({
    un: get('un').value,
    tl: get('tl').value,
    ime: get('ime').value,
    ip: get('ip').value,
    pt: get('pt').checked,
    bk: get('bk').checked,
    hi: get('hi').checked,
    as: get('as').checked,
    wl: get('wl').checked,
    wv: get('wv').value,
    dark: document.body.classList.contains('dark'),
    sc,
    tfs,
    lib
}));

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
    lib.push({ t: t || (x.slice(0, 12) + '...'), x: x.trim() });
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