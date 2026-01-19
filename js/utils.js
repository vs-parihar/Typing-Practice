const get = (id) => document.getElementById(id);

const nm = (t) => t ? t.normalize('NFC').replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/ाे/g, 'ो').replace(/ाै/g, 'ौ').trim() : "";

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

const ldC = () => {
    const c = JSON.parse(localStorage.getItem('tp_v41'));
    if (!c) { tp(false); return }
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
    if (c.dark) document.body.classList.add('dark');
    sc = c.sc || 1;
    tfs = c.tfs || 1.1;
    lib = c.lib || [];
    rlb();
    tp(c.pt);
    ui('');
};