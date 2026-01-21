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
                Object.values(d.files).forEach(f => plist[s.t].push({title: f.filename, matter: f.raw_url}))
            }
        } catch (e) {}
    }
    const pS = get('ps');
    Object.keys(plist).forEach(k => pS.innerHTML += `<option value="${k}">${k}</option>`);
    if (pS.options.length) lp(pS.value)
}

async function st() {
    svC();
    const b = get('sb'), ot = b.textContent;
    b.disabled = true;
    b.textContent = "Wait...";
    if (get('pt').checked) {
        if (!lib.length) {
            b.textContent = ot;
            return (b.disabled = false);
        }
        cm = lib[get('cms').value].x;
        pn = "Library"
    } else {
        const m = plist[pn] ? plist[pn][get('ms').value] : null;
        try {
            if (m && m.matter) cm = await (await fetch(m.matter)).text(); 
            else if (m && m.raw_url) cm = await (await fetch(m.raw_url)).text(); 
            else if (m && m.url) {
                const d = await (await fetch(`https://archive.org/metadata/${m.url.split('/').pop()}`)).json();
                cm = (d.metadata.description || m.title).replace(/<[^>]*>/g, '')
            } else cm = m ? m.title : ""
        } catch (e) {
            cm = m ? m.title : ""
        }
    }
    setup(cm);
    b.disabled = false;
    b.textContent = ot
}

window.onload = init;