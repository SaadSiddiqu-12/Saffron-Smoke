const dishes = [
  {n:"Charcoal Chicken Tikka",p:14,c:"Grill",e:"🍗",d:"Overnight yoghurt marinade, grilled over charcoal, served with mint chutney.",t:"Bestseller"},
  {n:"Seekh Kebab Platter",p:16,c:"Grill",e:"🍢",d:"Minced beef with hand-ground spices, naan and salad.",t:"Spicy"},
  {n:"Lamb Chops",p:22,c:"Grill",e:"🥩",d:"Four tender chops, smoked and finished with garlic butter.",t:""},
  {n:"Slow-cooked Karahi",p:18,c:"Mains",e:"🍲",d:"Tomato, ginger and green chilli, cooked in a traditional wok.",t:"Chef's pick"},
  {n:"Dum Biryani",p:15,c:"Mains",e:"🍛",d:"Layered basmati rice sealed and steamed with saffron and tender meat.",t:"Bestseller"},
  {n:"Butter Daal Fry",p:9,c:"Mains",e:"🥘",d:"Slow-simmered lentils with smoked garlic tadka.",t:"Vegetarian"},
  {n:"Garlic Naan",p:3,c:"Sides",e:"🫓",d:"Fresh from the tandoor, brushed with garlic butter.",t:"Vegetarian"},
  {n:"Crispy Samosas",p:6,c:"Sides",e:"🥟",d:"Golden pastry stuffed with spiced potato and peas.",t:"Vegetarian"},
  {n:"Mint Raita",p:4,c:"Sides",e:"🥣",d:"Cool yoghurt with cucumber and fresh mint.",t:"Vegetarian"},
  {n:"Gulab Jamun",p:6,c:"Desserts",e:"🍮",d:"Warm milk dumplings soaked in cardamom syrup.",t:""},
  {n:"Kheer with Pistachio",p:6,c:"Desserts",e:"🍚",d:"Creamy rice pudding, slow-cooked with saffron.",t:"Chef's pick"},
  {n:"Masala Chai",p:3,c:"Desserts",e:"🍵",d:"Strong tea brewed with cardamom, ginger and milk.",t:""}
];
const cats = ["All","Grill","Mains","Sides","Desserts"];
const tabs = document.getElementById("tabs"), grid = document.getElementById("menuGrid");
let active = "All";

function renderTabs(){
  tabs.innerHTML = cats.map(c=>`<button class="tab ${c===active?'active':''}" data-c="${c}" role="tab">${c}</button>`).join("");
}
function renderMenu(){
  const list = active==="All" ? dishes : dishes.filter(d=>d.c===active);
  grid.innerHTML = list.map(d=>`
    <article class="dish">
      <div class="emoji" aria-hidden="true">${d.e}</div>
      <div>
        <h3>${d.n}<b>$${d.p}</b></h3>
        <p>${d.d}</p>
        ${d.t?`<span class="tag">${d.t}</span>`:""}
      </div>
    </article>`).join("");
}
tabs.addEventListener("click",e=>{
  const b = e.target.closest(".tab"); if(!b) return;
  active = b.dataset.c; renderTabs(); renderMenu();
});
renderTabs(); renderMenu();

const header = document.getElementById("header");
const links = document.getElementById("links");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>30));
document.getElementById("toggle").onclick = ()=>links.classList.toggle("open");
links.addEventListener("click",e=>{ if(e.target.tagName==="A") links.classList.remove("open"); });

const io = new IntersectionObserver(es=>es.forEach(x=>{ if(x.isIntersecting){x.target.classList.add("in"); io.unobserve(x.target);} }),{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

const form = document.getElementById("reserveForm");
const success = document.getElementById("success");
const dateInput = form.elements.date;
const today = new Date().toISOString().split("T")[0];
dateInput.min = today;
document.getElementById("year").textContent = new Date().getFullYear();

function setErr(name,msg){ form.querySelector(`[data-for="${name}"]`).textContent = msg; }
form.addEventListener("submit",e=>{
  e.preventDefault();
  let ok = true;
  ["name","phone","date","time"].forEach(k=>setErr(k,""));
  const f = form.elements;
  if(f.name.value.trim().length<2){ setErr("name","Please enter your name"); ok=false; }
  if(!/^[0-9+\s-]{9,15}$/.test(f.phone.value.trim())){ setErr("phone","Enter a valid phone number"); ok=false; }
  if(!f.date.value || f.date.value<today){ setErr("date","Choose a valid date"); ok=false; }
  if(!f.time.value){ setErr("time","Select a time"); ok=false; }
  if(!ok) return;
  document.getElementById("successMsg").textContent =
    `Thank you ${f.name.value.trim()}! Table for ${f.guests.value} on ${f.date.value} at ${f.time.value}. We'll confirm by phone shortly.`;
  form.style.display="none"; success.style.display="block";
});
document.getElementById("again").onclick = ()=>{ form.reset(); form.style.display="grid"; success.style.display="none"; };
