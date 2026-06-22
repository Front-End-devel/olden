const week = [
"DOMINGO",
"SEGUNDA",
"TERÇA",
"QUARTA",
"QUINTA",
"SEXTA",
"SÁBADO"
];

function createDigit(id){

const container=document.getElementById(id);

const card=document.createElement("div");
card.className="card";

const top=document.createElement("div");
top.className="face top";

const bottom=document.createElement("div");
bottom.className="face bottom";

card.appendChild(top);
card.appendChild(bottom);

container.appendChild(card);

return {
card,
top,
bottom,
value:null
};
}

const digits=[
createDigit("h1"),
createDigit("h2"),
createDigit("m1"),
createDigit("m2"),
createDigit("s1"),
createDigit("s2")
];

function flipDigit(obj,newValue){

if(obj.value===newValue) return;

obj.top.textContent=newValue;
obj.bottom.textContent=newValue;

obj.card.classList.remove("flip");

void obj.card.offsetWidth;

obj.card.classList.add("flip");

obj.value=newValue;
}

function updateClock(){

const now=new Date();

const h=String(now.getHours()).padStart(2,"0");
const m=String(now.getMinutes()).padStart(2,"0");
const s=String(now.getSeconds()).padStart(2,"0");

const values=(h+m+s).split("");

values.forEach((v,i)=>{
flipDigit(digits[i],v);
});

document.getElementById("weekday").innerText=
week[now.getDay()];
}

updateClock();

setInterval(updateClock,1000);
