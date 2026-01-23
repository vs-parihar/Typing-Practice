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

const setupUIButtons = () => {
    document.querySelectorAll('.cb').forEach(c => {
        const f = `<button onclick="ui('t+')">A+</button><button onclick="ui('t-')">A-</button>`;
        c.innerHTML = `<button onclick="ui('d')">🌓</button>${c.dataset.type !== 'n' ? f : ''}<button onclick="ui('s+')">Z+</button><button onclick="ui('s-')">Z-</button>`;
    });
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

const tp = (v) => {
    document.querySelectorAll('.du').forEach(e => e.style.display = v ? 'none' : 'flex');
    document.querySelectorAll('.cu').forEach(e => e.style.display = v ? 'flex' : 'none');
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

const lp = (n) => {
    const s = get('ms');
    s.innerHTML = '';
    pn = n;
    if (plist[n]) plist[n].forEach((m, i) => s.innerHTML += `<option value="${i}">${m.title}</option>`);
};