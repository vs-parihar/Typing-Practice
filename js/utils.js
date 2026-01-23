let cm = "", stT, tmr, plist = {}, sc = 1, tfs = 1.1, bsc = 0, pn = "", lib = [], imeS = {wI: false, dK: false, pK: '', nI: false}, editIdx = -1;
const src = [{t: "Registry", u: "https://gist.githubusercontent.com/vs-parihar/80a61d62dd93b9e496a8db28ad9eee5c/raw/registry.json", m: 0}, {t: "English", u: "https://api.github.com/gists/f5bf18c404ac6c4649b207a2cb83aefd", m: 1}, {t: "Hindi", u: "https://api.github.com/gists/8e9911bc62761d6fb5407d8b76d67c97", m: 1}];

const get = (id) => document.getElementById(id);

const nm = (t) => t ? t.normalize('NFC').replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/ाे/g, 'ो').replace(/ाै/g, 'ौ').trim() : "";

const sm = (id) => {
    document.querySelectorAll('.m').forEach(m => m.classList.remove('active'));
    get(id).classList.add('active');
};