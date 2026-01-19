let cm = "", stT, tmr, plist = {}, sc = 1, tfs = 1.1, bsc = 0, pn = "", lib = [], imeS = { wI: false, dK: false, pK: '' };
const src = [
    { t: "Registry", u: "https://gist.githubusercontent.com/vs-parihar/80a61d62dd93b9e496a8db28ad9eee5c/raw/registry.json", m: 0 },
    { t: "English", u: "https://api.github.com/gists/f5bf18c404ac6c4649b207a2cb83aefd", m: 1 },
    { t: "Hindi", u: "https://api.github.com/gists/8e9911bc62761d6fb5407d8b76d67c97", m: 1 }
];

async function init() {
    ldC();
    for (let s of src) {
        try {
            const r = await fetch(s.u), d = await r.json();
            if (s.m === 0) {
                for (let p of d) {
                    const rI = p.id.split('/').pop(), pr = await fetch(`https://gist.githubusercontent.com/vs-parihar/${rI}/raw/playlist.json`), pl = await pr.json();
                    if (!plist[p.title]) plist[p.title] = [];
                    plist[p.title].push(...pl)
                }
            } else {
                if (!plist[s.t]) plist[s.t] = [];
                Object.values(d.files).forEach(f => plist[s.t].push({ title: f.filename, matter: f.raw_url }))
            }
        } catch (e) { }
    }
    const pS = get('ps');
    Object.keys(plist).forEach(k => pS.innerHTML += `<option value="${k}">${k}</option>`);
    if (pS.options.length) lp(pS.value)
}

window.onload = init;