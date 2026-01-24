let cm = "", stT, tmr, plist = {}, bsc = 0, pn = "", lib = [], editIdx = -1;
let imeS = {wI: false, dK: false, pK: '', nI: false};

const src = [
    {t: "Registry", u: "https://gist.githubusercontent.com/vs-parihar/80a61d62dd93b9e496a8db28ad9eee5c/raw/registry.json", m: 0},
    {t: "English", u: "https://api.github.com/gists/f5bf18c404ac6c4649b207a2cb83aefd", m: 1},
    {t: "Hindi", u: "https://api.github.com/gists/8e9911bc62761d6fb5407d8b76d67c97", m: 1}
];

const svC = () => localStorage.setItem('tp_v42', JSON.stringify({
    un: get('un').value, tl: get('tl').value, ime: get('ime').value, ip: get('ip').value,
    pt: get('pt').checked, bk: get('bk').checked, hi: get('hi').checked, as: get('as').checked,
    wl: get('wl').checked, wv: get('wv').value, dark: document.body.classList.contains('dark'),
    sc, tfs, lib, ps_val: get('ps').value, ms_idx: get('ms').selectedIndex, cms_idx: get('cms').selectedIndex
}));

const rlb = () => {
    const s = get('cms'), l = get('ll');
    s.innerHTML = ''; l.innerHTML = '';
    lib.forEach((m, i) => {
        s.innerHTML += `<option value="${i}">${m.t}</option>`;
        l.innerHTML += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--bd)"><span style="font-size:0.85rem">${m.t}</span><div style="display:flex;gap:4px"><button class="bs" onclick="edl(${i})">Edit</button><button class="bs" onclick="rml(${i})" style="color:#ef4444">X</button></div></div>`
    })
};

const al = () => {
    const t = get('ct').value, x = get('cx').value;
    if (!x.trim()) return;
    if (editIdx > -1) {
        lib[editIdx] = {t: t || (x.slice(0, 12) + '...'), x: x.trim()};
        editIdx = -1;
        get('lib-save-btn').textContent = "Add to Library"
    } else {
        lib.push({t: t || (x.slice(0, 12) + '...'), x: x.trim()})
    }
    get('ct').value = ''; get('cx').value = ''; rlb(); svC()
};

const edl = (i) => {
    editIdx = i;
    get('ct').value = lib[i].t;
    get('cx').value = lib[i].x;
    get('lib-save-btn').textContent = "Update Matter"
};

const rml = (i) => {
    if (confirm("Delete this matter?")) {
        lib.splice(i, 1); rlb(); svC()
    }
};

const lp = (n) => {
    const s = get('ms');
    s.innerHTML = ''; pn = n;
    if (plist[n]) plist[n].forEach((m, i) => s.innerHTML += `<option value="${i}">${m.title}</option>`)
};

async function st() {
    svC();
    const b = get('sb'), ot = b.textContent;
    let mName = "";
    b.disabled = true; b.textContent = "Wait...";
    if (get('pt').checked) {
        if (!lib.length) { b.textContent = ot; return (b.disabled = false) }
        const sel = lib[get('cms').value];
        cm = sel.x; mName = sel.t; pn = "Library"
    } else {
        const m = plist[pn] ? plist[pn][get('ms').value] : null;
        mName = m ? m.title : "Matter";
        try {
            if (m && m.matter) cm = await (await fetch(m.matter)).text();
            else if (m && m.raw_url) cm = await (await fetch(m.raw_url)).text();
            else if (m && m.url) {
                const d = await (await fetch(`https://archive.org/metadata/${m.url.split('/').pop()}`)).json();
                cm = (d.metadata.description || m.title).replace(/<[^>]*>/g, '')
            } else cm = m ? m.title : ""
        } catch (e) { cm = m ? m.title : "" }
    }
    setup(cm, mName);
    b.disabled = false; b.textContent = ot
}

function setup(txt, mName) {
    let w = txt.split(/\s+/).filter(x => x);
    if (get('wl').checked) w = w.slice(0, parseInt(get('wv').value));
    const fT = w.join(' ');
    const tt = get('tt');
    tt.scrollTop = 0;
    tt.classList.toggle('as-on', get('as').checked);
    tt.innerHTML = w.map(x => `<span>${x}</span>`).join('');
    const iS = get('ime'), kName = iS.options[iS.selectedIndex].text, trunc = (s, l) => s.length > l ? s.slice(0, l) + '...' : s;
    get('typing-info').textContent = `${kName} • ${trunc(mName, 15)}`;
    const i = get('ia');
    i.value = ''; bsc = 0; sm('typ'); i.focus();
    imeS = {wI: false, dK: false, pK: '', nI: false};
    stT = new Date();
    const lim = get('tl').value * 60;
    clearInterval(tmr);
    tmr = setInterval(() => {
        const e = Math.floor((new Date() - stT) / 1000), r = lim - e;
        if (r <= 0) ft();
        get('lt').textContent = `${Math.floor(r / 60)}:${(r % 60).toString().padStart(2, '0')}`
    }, 1000);

    i.onkeydown = (e) => {
        const mod = get('ime').value;
        if (mod !== 'e' && e.code.startsWith('Numpad') && /[0-9]/.test(e.key)) {
            imeS.nI = true; const c = get('ia'), s = c.selectionStart, v = c.value, k = e.key;
            const num = e.getModifierState('CapsLock') ? RM[k] : LM[k];
            e.preventDefault(); c.value = v.slice(0, s) + num + v.slice(c.selectionEnd);
            c.setSelectionRange(s + num.length, s + num.length); c.dispatchEvent(new Event('input')); return
        } else if (mod !== 'e' && /[0-9]/.test(e.key) && !e.ctrlKey && !e.altKey) {
            imeS.nI = true; const c = get('ia'), s = c.selectionStart, v = c.value, k = e.key;
            const num = LM[k];
            e.preventDefault(); c.value = v.slice(0, s) + num + v.slice(c.selectionEnd);
            c.setSelectionRange(s + num.length, s + num.length); c.dispatchEvent(new Event('input')); return
        } else { imeS.nI = false }
        if (mod === 'i' && e.ctrlKey && e.shiftKey) {
            if (e.key === '!') { e.preventDefault(); insC('\u200D') }
            if (e.key === '@') { e.preventDefault(); insC('\u200C') }
        }
        if (e.key === 'Backspace') {
            imeS.wI = false; imeS.pK = ''; const v = i.value, s = i.selectionStart;
            if (mod === 'g' || mod === 'c') {
                if (v.slice(s - 2, s) === '\u25cc\u093f') { e.preventDefault(); i.value = v.slice(0, s - 2) + v.slice(s); i.setSelectionRange(s - 2, s - 2); i.dispatchEvent(new Event('input')); return }
                if (v.charAt(s - 1) === '\u093f') { e.preventDefault(); i.value = v.slice(0, s - 2) + v.slice(s); i.setSelectionRange(s - 2, s - 2); i.dispatchEvent(new Event('input')); return }
            }
            bsc++; if (!get('bk').checked) e.preventDefault()
        }
    };

    i.onbeforeinput = (v) => {
        if (imeS.nI) { v.preventDefault(); return }
        const mod = get('ime').value;
        if (mod === 'e' || v.inputType.includes('delete')) return;
        if (!v.data || v.data === ' ') { imeS.dK = false; imeS.wI = false; imeS.pK = ''; return }
        if (v.data.length > 1) return;
        v.preventDefault();
        let k = v.data, m = IM[mod][k] || k, char = m, st = i.selectionStart, en = i.selectionEnd, val = i.value;
        if (mod !== 'e') {
            let prv = val.slice(0, st);
            if (prv.endsWith('्')) {
                if (VM[char] !== undefined) { val = prv.slice(0, -1); st-- }
                else if (char === 'ा') { val = prv.slice(0, -1); st--; char = '' }
            }
        }
        if (mod === 'g' || mod === 'c') {
            let p = val[st - 1];
            if (k === 'f') { char = '\u25cc\u093f'; imeS.wI = true }
            else if (imeS.wI) { if (val.slice(st - 2, st) === '\u25cc\u093f') { val = val.slice(0, st - 2); st -= 2; char = char + '\u093f'; imeS.wI = false } }
            if (k === 'k') { if (p === 'अ') char = (val = val.slice(0, -1), st--, 'आ'); else if (p === 'आ') char = (val = val.slice(0, -1), st--, 'ओ'); else if (p === 'ा') char = (val = val.slice(0, -1), st--, 'ो') }
            if (k === 's') { if (p === 'आ') char = (val = val.slice(0, -1), st--, 'ओ'); else if (p === 'ा') char = (val = val.slice(0, -1), st--, 'ो'); else if (p === 'ए') char = (val = val.slice(0, -1), st--, 'ऐ') }
            if (k === 'S') { if (p === 'आ') char = (val = val.slice(0, -1), st--, 'औ'); else if (p === 'ा') char = (val = val.slice(0, -1), st--, 'ौ') }
            if (k === 'W') { if (p === 'आ') char = (val = val.slice(0, -1), st--, 'ऑ'); else if (p === 'ा') char = (val = val.slice(0, -1), st--, 'ॉ'); else if (p === 'ए') char = (val = val.slice(0, -1), st--, 'ऍ') }
            if (k === 'a' && p === 'ॉ') char = (val = val.slice(0, -1), st--, 'ँ');
            if (k === 'Q') { if (p === 'उ') char = (val = val.slice(0, -1), st--, 'ऊ'); else if (p === 'प') char = (val = val.slice(0, -1), st--, 'फ'); else if (p === 'र') char = (val = val.slice(0, -1), st--, 'रु') }
        }
        if (mod === 'p') { let prev = val[st - 1]; if (prev && VM[char] !== undefined && !/\s/.test(prev)) char = VM[char] }
        i.value = val.slice(0, st) + char + val.slice(en);
        i.setSelectionRange(st + char.length, st + char.length);
        imeS.pK = k; i.dispatchEvent(new Event('input'))
    };

    i.oninput = () => {
        const v = i.value, vW = v.split(/\s+/).filter(x => x), tW = fT.split(/\s+/), idxCur = vW.length ? vW.length - (v.endsWith(' ') ? 0 : 1) : 0;
        let cw = 0;
        get('tt').querySelectorAll('span').forEach((s, idx) => {
            s.className = ''; s.style.background = ''; const u = v.split(/\s+/)[idx] || "";
            if (idx < v.split(/\s+/).length - 1) {
                const isC = nm(u) === nm(tW[idx] || ""); if (isC) cw++;
                if (get('hi').checked) s.classList.add(isC ? 'cor' : 'inc')
            }
            if (idx === idxCur) {
                if (get('hi').checked) s.style.background = 'rgba(79,70,229,0.3)';
                if (get('as').checked) s.scrollIntoView({block: 'center', behavior: 'smooth'})
            }
        });
        const m = Math.max((new Date() - stT) / 60000, 0.01), gw = (v.length / 5) / m;
        get('ls').textContent = `${Math.round(gw)} | ${Math.round(Math.max(0, gw - ((vW.length - cw) / m)))}`;
        get('la').textContent = `${Math.round(vW.length ? cw / vW.length * 100 : 0)}% | ${vW.length}`
    }
}

function ft() {
    clearInterval(tmr);
    const v = get('ia').value.trim(), tW = cm.trim().split(/\s+/).filter(x => x), vW = v.split(/\s+/).filter(x => x), dur = Math.max((new Date() - stT) / 60000, 0.1), iP = parseFloat(get('ip').value) || 0;
    let cw = 0, err = 0, dv = "";
    tW.forEach((w, i) => { const u = vW[i] || ""; if (i < vW.length) { if (nm(u) !== nm(w)) { err++; dv += `<span class="inc">${w} </span>` } else { cw++; dv += `<span class="cor">${w} </span>` } } });
    const gW = (v.length / 5) / dur, gK = v.length * (60 / dur), ac = vW.length ? (cw / vW.length) * 100 : 0, m1N = Math.max(0, gW - (err / dur)), p2 = err * 10, m2N = Math.max(0, gW - (p2 / dur)), ign = Math.floor(tW.length * iP / 100), ne3 = Math.max(0, err - ign), p3 = ne3 * 10, m3N = Math.max(0, gW - (p3 / dur));
    const gKDPH = Math.round(gK), nKDPH = Math.round(m1N * 5 * (60 / dur));
    let h = `<div class="sg"><div class="mh">1. Method 1: ${pn} [net speed formula M2]</div><div class="ms">${m1N.toFixed(2)} WPM | ${nKDPH} KDPH</div><div class="rl"><span>Net Speed</span><span>${m1N.toFixed(2)} WPM</span></div><div class="rl"><span>Gross Speed</span><span>${gW.toFixed(2)} WPM | ${gKDPH} KDPH</span></div><div class="rl"><span>Accuracy</span><span>${ac.toFixed(2)} %</span></div><div class="rl"><span>Total Entries</span><span>${vW.length}</span></div><div class="rl"><span>Total Errors</span><span>${err}</span></div><div class="rl"><span>Error Rate</span><span>${(err/dur).toFixed(2)} WPM</span></div><div class="rl"><span>Backspace Pressed</span><span>${bsc}</span></div><div class="rl"><span>Duration</span><span>${Math.ceil(dur)} Min</span></div></div>`;
    h += `<div class="sg"><div class="mh">2. Method 2: ${pn} [gross speed formula M1]</div><div class="ms">${m2N.toFixed(2)} WPM | ${Math.round(m2N * 5 * (60 / dur))} KDPH</div><div class="rl"><span>Net Speed</span><span>${m2N.toFixed(2)} WPM</span></div><div class="rl"><span>Gross Speed</span><span>${gW.toFixed(2)} WPM | ${gKDPH} KDPH</span></div><div class="rl"><span>Accuracy</span><span>${m2N > 0 ? ac.toFixed(2) : '0.00'} %</span></div><div class="rl"><span>Total Entries</span><span>${vW.length}</span></div><div class="rl"><span>Total Mistakes</span><span>${err}</span></div><div class="rl"><span>Penalty</span><span>${p2}</span></div><div class="rl"><span>Error %</span><span>${(vW.length ? err / vW.length * 100 : 0).toFixed(2)} %</span></div></div>`;
    h += `<div class="sg"><div class="mh">3. ${iP}% Mistakes are ignorable</div><div class="ms">${m3N.toFixed(2)} WPM | ${Math.round(m3N * 5 * (60 / dur))} KDPH</div><div class="rl"><span>Net Speed</span><span>${m3N.toFixed(2)} WPM</span></div><div class="rl"><span>Gross Speed</span><span>${gW.toFixed(2)} WPM | ${gKDPH} KDPH</span></div><div class="rl"><span>Accuracy</span><span>${m3N > 0 ? ac.toFixed(2) : '0.00'} %</span></div><div class="rl"><span>Ignorable Mistakes</span><span>${ign}</span></div><div class="rl"><span>Net Mistakes</span><span>${ne3}</span></div><div class="rl"><span>Penalty</span><span>${p3}</span></div><div class="rl"><span>Error %</span><span>${(vW.length ? err / vW.length * 100 : 0).toFixed(2)} %</span></div></div>`;
    get('rc').innerHTML = h; get('dv').innerHTML = dv; sm('res')
}