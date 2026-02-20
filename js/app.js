async function init(){ldC();for(let s of src){try{if(s.m===2){for(let i=1;i<=10;i++){const pN=`Playlist ${i}`,u=`${s.u}/${pN}/matter.txt`;try{const r=await fetch(u);if(r.ok){if(!plist[pN])plist[pN]=[];plist[pN].push({title:`Matter ${i}`,matter:u})}}catch(e){}}}else{const r=await fetch(s.u),d=await r.json();if(s.m===0){for(let p of d){const rI=p.id.split('/').pop(),pr=await fetch(`https://gist.githubusercontent.com/vs-parihar/${rI}/raw/playlist.json`),pl=await pr.json();if(!plist[p.title])plist[p.title]=[];plist[p.title].push(...pl)}}else{if(!plist[s.t])plist[s.t]=[];Object.values(d.files).forEach(f=>plist[s.t].push({title:f.filename,matter:f.raw_url}))}}}catch(e){}}const pS=get('ps');
    Object.keys(plist).forEach(k => pS.innerHTML += `<option value="${k}">${k}</option>`);
    const c = JSON.parse(localStorage.getItem('tp_v42'));
    if (c) {
        if (c.ps_val) pS.value = c.ps_val;
        lp(pS.value);
        if (c.ms_idx !== undefined) get('ms').selectedIndex = c.ms_idx;
        if (c.cms_idx !== undefined) get('cms').selectedIndex = c.cms_idx
    } else if (pS.options.length) {
        lp(pS.value)
    }

    // Initialize Control Buttons
    document.querySelectorAll('.cb').forEach(c => {
        const f = `<button onclick="ui('t+')">A+</button><button onclick="ui('t-')">A-</button>`;
        c.innerHTML = `<button onclick="ui('d')">🌓</button>${c.dataset.type !== 'n' ? f : ''}<button onclick="ui('s+')">Z+</button><button onclick="ui('s-')">Z-</button>`
    });
}

window.onload = init;