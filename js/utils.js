const get = (id) => document.getElementById(id);

const nm = (t) => t ? t.normalize('NFC').replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/ाे/g, 'ो').replace(/ाै/g, 'ौ').trim() : "";

const insC = (c) => {
    const i = get('ia');
    const st = i.selectionStart, v = i.value;
    i.value = v.slice(0, st) + c + v.slice(i.selectionEnd);
    i.setSelectionRange(st + c.length, st + c.length);
    i.dispatchEvent(new Event('input'))
};