const svC = () => localStorage.setItem('tp_v42', JSON.stringify({un: get('un').value, tl: get('tl').value, ime: get('ime').value, ip: get('ip').value, pt: get('pt').checked, bk: get('bk').checked, hi: get('hi').checked, as: get('as').checked, wl: get('wl').checked, wv: get('wv').value, dark: document.body.classList.contains('dark'), sc, tfs, lib, ps_val: get('ps').value, ms_idx: get('ms').selectedIndex, cms_idx: get('cms').selectedIndex}));

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

const rlb = () => {
    const s = get('cms'), l = get('ll');
    s.innerHTML = '';
    l.innerHTML = '';
    lib.forEach((m, i) => {
        s.innerHTML += `<option value="${i}">${m.t}</option>`;
        l.innerHTML += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--bd)">
        <span style="font-size:0.85rem">${m.t}</span>
        <div style="display:flex;gap:4px">
        <button class="bs" onclick="edl(${i})">Edit</button>
        <button class="bs" onclick="rml(${i})" style="color:#ef4444">X</button>
        </div>
        </div>`;
    });
};

const al = () => {
    const t = get('ct').value, x = get('cx').value;
    if (!x.trim()) return;
    if(editIdx > -1) {
        lib[editIdx] = {t: t || (x.slice(0, 12) + '...'), x: x.trim()};
        editIdx = -1;
        get('lib-save-btn').textContent = "Add to Library";
    } else {
        lib.push({t: t || (x.slice(0, 12) + '...'), x: x.trim()});
    }
    get('ct').value = '';
    get('cx').value = '';
    rlb();
    svC();
};

const edl = (i) => {
    editIdx = i;
    get('ct').value = lib[i].t;
    get('cx').value = lib[i].x;
    get('lib-save-btn').textContent = "Update Matter";
};

const rml = (i) => {
    if(confirm("Delete this matter?")) {
        lib.splice(i, 1);
        rlb();
        svC();
    }
};

function ft() {
    clearInterval(tmr);
    const v = get('ia').value.trim(), tW = cm.trim().split(/\s+/).filter(x => x), vW = v.split(/\s+/).filter(x => x), dur = Math.max((new Date() - stT) / 60000, 0.1), iP = parseFloat(get('ip').value) || 0;
    let cw = 0, err = 0, dv = "";
    tW.forEach((w, i) => {
        const u = vW[i] || "";
        if (i < vW.length) {
            if (nm(u) !== nm(w)) { err++; dv += `<span class="inc">${w} </span>` } 
            else { cw++; dv += `<span class="cor">${w} </span>` }
        }
    });
    const gW = (v.length / 5) / dur, gK = v.length * (60 / dur), ac = vW.length ? (cw / vW.length) * 100 : 0, m1N = Math.max(0, gW - (err / dur)), p2 = err * 10, m2N = Math.max(0, gW - (p2 / dur)), ign = Math.floor(tW.length * iP / 100), ne3 = Math.max(0, err - ign), p3 = ne3 * 10, m3N = Math.max(0, gW - (p3 / dur));
    const gKDPH = Math.round(gK), nKDPH = Math.round(m1N * 5 * (60 / dur));
    let h = `<div class="sg"><div class="mh">1. Method 1: ${pn} [net speed formula M2]</div><div class="ms">${m1N.toFixed(2)} WPM | ${nKDPH} KDPH</div><div class="rl"><span>Net Speed</span><span>${m1N.toFixed(2)} WPM</span></div><div class="rl"><span>Gross Speed</span><span>${gW.toFixed(2)} WPM | ${gKDPH} KDPH</span></div><div class="rl"><span>Accuracy</span><span>${ac.toFixed(2)} %</span></div><div class="rl"><span>Total Entries</span><span>${vW.length}</span></div><div class="rl"><span>Total Errors</span><span>${err}</span></div><div class="rl"><span>Error Rate</span><span>${(err / dur).toFixed(2)} WPM</span></div><div class="rl"><span>Backspace Pressed</span><span>${bsc}</span></div><div class="rl"><span>Duration</span><span>${Math.ceil(dur)} Min</span></div></div>`;
    h += `<div class="sg"><div class="mh">2. Method 2: ${pn} [gross speed formula M1]</div><div class="ms">${m2N.toFixed(2)} WPM | ${Math.round(m2N * 5 * (60 / dur))} KDPH</div><div class="rl"><span>Net Speed</span><span>${m2N.toFixed(2)} WPM</span></div><div class="rl"><span>Gross Speed</span><span>${gW.toFixed(2)} WPM | ${gKDPH} KDPH</span></div><div class="rl"><span>Accuracy</span><span>${m2N > 0 ? ac.toFixed(2) : '0.00'} %</span></div><div class="rl"><span>Total Entries</span><span>${vW.length}</span></div><div class="rl"><span>Total Mistakes</span><span>${err}</span></div><div class="rl"><span>Penalty</span><span>${p2}</span></div><div class="rl"><span>Error %</span><span>${(vW.length ? err / vW.length * 100 : 0).toFixed(2)} %</span></div></div>`;
    h += `<div class="sg"><div class="mh">3. ${iP}% Mistakes are ignorable</div><div class="ms">${m3N.toFixed(2)} WPM | ${Math.round(m3N * 5 * (60 / dur))} KDPH</div><div class="rl"><span>Net Speed</span><span>${m3N.toFixed(2)} WPM</span></div><div class="rl"><span>Gross Speed</span><span>${gW.toFixed(2)} WPM | ${gKDPH} KDPH</span></div><div class="rl"><span>Accuracy</span><span>${m3N > 0 ? ac.toFixed(2) : '0.00'} %</span></div><div class="rl"><span>Ignorable Mistakes</span><span>${ign}</span></div><div class="rl"><span>Net Mistakes</span><span>${ne3}</span></div><div class="rl"><span>Penalty</span><span>${p3}</span></div><div class="rl"><span>Error %</span><span>${(vW.length ? err / vW.length * 100 : 0).toFixed(2)} %</span></div></div>`;
    get('rc').innerHTML = h;
    get('dv').innerHTML = dv;
    sm('res');
}