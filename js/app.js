async function init(){
ldC();
for(let s of src){
try{
const r=await fetch(s.u),d=await r.json();
if(s.m===0){
for(let p of d){
const rI=p.id.split('/').pop(),pr=await fetch(`https://gist.githubusercontent.com/vs-parihar/${rI}/raw/playlist.json`),pl=await pr.json();
if(!plist[p.title])plist[p.title]=[];
plist[p.title].push(...pl)}}else{
if(!plist[s.t])plist[s.t]=[];
Object.values(d.files).forEach(f=>plist[s.t].push({title:f.filename,matter:f.raw_url}))}}catch(e){}}
const pS=get('ps');
pS.innerHTML='';
Object.keys(plist).forEach(k=>pS.innerHTML+=`<option value="${k}">${k}</option>`);
const c=JSON.parse(localStorage.getItem('tp_v42'));
if(c&&c.ps_val&&plist[c.ps_val]){
pS.value=c.ps_val;
lp(pS.value);
if(c.ms_idx!==undefined)get('ms').selectedIndex=c.ms_idx;
if(c.cms_idx!==undefined)get('cms').selectedIndex=c.cms_idx}
else if(pS.options.length){
pS.selectedIndex=0;
lp(pS.value)}
ui('')}
async function st(){
svC();
const b=get('sb'),ot=b.textContent;
let mName="";
b.disabled=true;
b.textContent="Wait...";
if(get('pt').checked){
if(!lib.length){b.textContent=ot;return(b.disabled=false)}
const sel=lib[get('cms').value];
cm=sel.x;
mName=sel.t;
pn="Library"}else{
const m=plist[pn]?plist[pn][get('ms').value]:null;
mName=m?m.title:"Matter";
try{
if(m&&m.matter)cm=await(await fetch(m.matter)).text();
else if(m&&m.raw_url)cm=await(await fetch(m.raw_url)).text();
else if(m&&m.url){
const d=await(await fetch(`https://archive.org/metadata/${m.url.split('/').pop()}`)).json();
cm=(d.metadata.description||m.title).replace(/<[^>]*>/g,'')}else cm=m?m.title:""}catch(e){cm=m?m.title:""}}
setup(cm,mName);
b.disabled=false;
b.textContent=ot}
function setup(txt,mName){
let w=txt.split(/\s+/).filter(x=>x);
if(get('wl').checked)w=w.slice(0,parseInt(get('wv').value));
const fT=w.join(' ');
const tt=get('tt');
tt.scrollTop=0;
tt.classList.toggle('as-on',get('as').checked);
tt.innerHTML=w.map(x=>`<span>${x}</span>`).join('');
const iS=get('ime'),kName=iS.options[iS.selectedIndex].text;
get('typing-info').textContent=`${kName} • ${mName}`;
const i=get('ia');
i.value='';
bsc=0;
sm('typ');
i.focus();
imeS={wI:false,dK:false,pK:'',nI:false};
stT=new Date();
const lim=get('tl').value*60;
clearInterval(tmr);
tmr=setInterval(()=>{
const e=Math.floor((new Date()-stT)/1000),r=lim-e;
if(r<=0)ft();
get('lt').textContent=`${Math.floor(r/60)}:${(r%60).toString().padStart(2,'0')}`},1000);
i.onkeydown=(e)=>{
const mod=get('ime').value;
if(mod!=='e'&&e.code.startsWith('Numpad')&&/[0-9]/.test(e.key)){
imeS.nI=true;
const c=get('ia'),s=c.selectionStart,v=c.value,k=e.key;
const num=e.getModifierState('CapsLock')?RM[k]:LM[k];
e.preventDefault();
c.value=v.slice(0,s)+num+v.slice(c.selectionEnd);
c.setSelectionRange(s+num.length,s+num.length);
c.dispatchEvent(new Event('input'));
return}else if(mod!=='e'&&/[0-9]/.test(e.key)&&!e.ctrlKey&&!e.altKey){
imeS.nI=true;
const c=get('ia'),s=c.selectionStart,v=c.value,k=e.key;
const num=LM[k];
e.preventDefault();
c.value=v.slice(0,s)+num+v.slice(c.selectionEnd);
c.setSelectionRange(s+num.length,s+num.length);
c.dispatchEvent(new Event('input'));
return}else{imeS.nI=false}
if(mod==='i'&&e.ctrlKey&&e.shiftKey){
if(e.key==='!'){e.preventDefault();insC('\u200D')}
if(e.key==='@'){e.preventDefault();insC('\u200C')}}
if(e.key==='Backspace'){
imeS.wI=false;
imeS.pK='';
const v=i.value,s=i.selectionStart;
if(mod==='g'||mod==='c'){
if(v.slice(s-2,s)==='\u25cc\u093f'){e.preventDefault();i.value=v.slice(0,s-2)+v.slice(s);i.setSelectionRange(s-2,s-2);i.dispatchEvent(new Event('input'));return}
if(v.charAt(s-1)==='\u093f'){e.preventDefault();i.value=v.slice(0,s-2)+v.slice(s);i.setSelectionRange(s-2,s-2);i.dispatchEvent(new Event('input'));return}}
bsc++;
if(!get('bk').checked)e.preventDefault()}};
const insC=(c)=>{
const st=i.selectionStart,v=i.value;
i.value=v.slice(0,st)+c+v.slice(i.selectionEnd);
i.setSelectionRange(st+c.length,st+c.length);
i.dispatchEvent(new Event('input'))};
i.onbeforeinput=(v)=>{
if(imeS.nI){v.preventDefault();return}
const mod=get('ime').value;
if(mod==='e'||v.inputType.includes('delete'))return;
if(!v.data||v.data===' '){imeS.dK=false;imeS.wI=false;imeS.pK='';return}
if(v.data.length>1)return;
v.preventDefault();
let k=v.data,m=IM[mod][k]||k,char=m,st=i.selectionStart,en=i.selectionEnd,val=i.value;
if(mod!=='e'){
let prv=val.slice(0,st);
if(prv.endsWith('्')){
if(VM[char]!==undefined){val=prv.slice(0,-1);st--}else if(char==='ा'){val=prv.slice(0,-1);st--;char=''}}}
if(mod==='g'||mod==='c'){
let p=val[st-1];
if(k==='f'){char='\u25cc\u093f';imeS.wI=true}
else if(imeS.wI){
if(val.slice(st-2,st)==='\u25cc\u093f'){val=val.slice(0,st-2);st-=2;char=char+'\u093f';imeS.wI=false}}
if(k==='k'){if(p==='अ')char=(val=val.slice(0,-1),st--,'आ');else if(p==='आ')char=(val=val.slice(0,-1),st--,'ओ');else if(p==='ा')char=(val=val.slice(0,-1),st--,'ो')}
if(k==='s'){if(p==='आ')char=(val=val.slice(0,-1),st--,'ओ');else if(p==='ा')char=(val=val.slice(0,-1),st--,'ो');else if(p==='ए')char=(val=val.slice(0,-1),st--,'ऐ')}
if(k==='S'){if(p==='आ')char=(val=val.slice(0,-1),st--,'औ');else if(p==='ा')char=(val=val.slice(0,-1),st--,'ौ')}
if(k==='W'){if(p==='आ')char=(val=val.slice(0,-1),st--,'ऑ');else if(p==='ा')char=(val=val.slice(0,-1),st--,'ॉ');else if(p==='ए')char=(val=val.slice(0,-1),st--,'ऍ')}
if(k==='a'&&p==='ॉ')char=(val=val.slice(0,-1),st--,'ँ');
if(k==='Q'){if(p==='उ')char=(val=val.slice(0,-1),st--,'ऊ');else if(p==='प')char=(val=val.slice(0,-1),st--,'फ');else if(p==='र')char=(val=val.slice(0,-1),st--,'रु')}}
if(mod==='p'){
let prev=val[st-1];
if(prev&&VM[char]!==undefined&&!/\s/.test(prev))char=VM[char]}
i.value=val.slice(0,st)+char+val.slice(en);
i.setSelectionRange(st+char.length,st+char.length);
imeS.pK=k;
i.dispatchEvent(new Event('input'))};
i.oninput=()=>{
const v=i.value,vW=v.split(/\s+/).filter(x=>x),tW=fT.split(/\s+/),idxCur=vW.length?vW.length-(v.endsWith(' ')?0:1):0;
let cw=0;
get('tt').querySelectorAll('span').forEach((s,idx)=>{
s.className='';s.style.background='';
const u=v.split(/\s+/)[idx]||"";
if(idx<v.split(/\s+/).length-1||(idx===v.split(/\s+/).length-1&&v.endsWith(' '))){
const isC=nm(u)===nm(tW[idx]||"");
if(isC)cw++;
if(get('hi').checked)s.classList.add(isC?'cor':'inc')}
if(idx===idxCur){
if(get('hi').checked)s.style.background='rgba(79,70,229,0.3)';
if(get('as').checked)s.scrollIntoView({block:'center',behavior:'smooth'})}});
const m=Math.max((new Date()-stT)/60000,0.01),gw=(v.length/5)/m;
get('ls').textContent=`${Math.round(gw)} | ${Math.round(Math.max(0,gw-((vW.length-cw)/m)))}`;
get('la').textContent=`${Math.round(vW.length?cw/vW.length*100:0)}% | ${vW.length}`}}
window.onload=init;