const ldC = () => {
    const c = JSON.parse(localStorage.getItem('tp_v42'));
    if (!c) { tp(false); return; }
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
    ui('');
};

async function init() {
    setupUIButtons();
    ldC();
    for (let s of src) {
        try {
            const r = await fetch(s.u), d = await r.json();
            if (s.m === 0) {
                for (let p of d) {
                    const rI = p.id.split('/').pop(), pr = await fetch(`https://gist.githubusercontent.com/vs-parihar/${rI}/raw/playlist.json`), pl = await pr.json();
                    if (!plist[p.title]) plist[p.title] = [];
                    plist[p.title].push(...pl);
                }
            } else {
                if (!plist[s.t]) plist[s.t] = [];
                Object.values(d.files).forEach(f => plist[s.t].push({title: f.filename, matter: f.raw_url}));
            }
        } catch (e) { console.error("Load error", e); }
    }
    const pS = get('ps');
    Object.keys(plist).forEach(k => pS.innerHTML += `<option value="${k}">${k}</option>`);
    const c = JSON.parse(localStorage.getItem('tp_v42'));
    if (c) {
        if(c.ps_val) pS.value = c.ps_val;
        lp(pS.value);
        if(c.ms_idx !== undefined) get('ms').selectedIndex = c.ms_idx;
        if(c.cms_idx !== undefined) get('cms').selectedIndex = c.cms_idx;
    } else if (pS.options.length) {
        lp(pS.value);
    }
}

window.onload = init;