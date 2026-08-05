/* ==========================================
   PUBLIC ENEMY
   WEBSITE JAVASCRIPT
========================================== */


/* ==========================================
   STATUS FUNCTIONS
========================================== */

function getStatusClass(status){

    if(status === "online") return "online";
    if(status === "idle") return "idle";
    if(status === "dnd") return "dnd";

    return "offline";
}


function getStatusText(status){

    if(status === "online") return "Online";
    if(status === "idle") return "Idle";
    if(status === "dnd") return "Do Not Disturb";

    return "Offline";
}



/* ==========================================
   PROFILE MODAL
========================================== */

const modal = document.getElementById("profile-modal");

const modalAvatar = document.getElementById("modal-avatar");
const modalName = document.getElementById("modal-name");
const modalUsername = document.getElementById("modal-username");
const modalStatus = document.getElementById("modal-status");
const modalStatusDot = document.getElementById("modal-status-dot");
const modalDiscordId = document.getElementById("modal-discord-id");


function openProfile(member){

    if(!modal) return;


    modalAvatar.src = member.avatar;

    modalName.textContent = member.username;

    modalUsername.textContent =
    "@" + member.username;


    modalStatus.textContent =
    getStatusText("online");


    modalStatusDot.className =
    "status-dot online";


    modalDiscordId.textContent =
    member.id;


    modal.classList.remove("hidden");

}



const closeModal =
document.getElementById("close-modal");


if(closeModal){

    closeModal.onclick = () => {

        modal.classList.add("hidden");

    };

}



if(modal){

    modal.onclick = (e)=>{

        if(e.target === modal){

            modal.classList.add("hidden");

        }

    };

}




/* ==========================================
   ENTER SCREEN
========================================== */

const enterButton =
document.getElementById("enter-button");


const enterScreen =
document.getElementById("enter-screen");


const website =
document.getElementById("website");



if(enterButton){

    enterButton.onclick = ()=>{

        enterScreen.classList.add("hidden");

        website.classList.add("visible");

    };

}




/* ==========================================
   VIEW COUNTER
========================================== */


let views =
localStorage.getItem("publicEnemyViews");


if(!views){

    views = 1;

}else{

    views = parseInt(views) + 1;

}


localStorage.setItem(
    "publicEnemyViews",
    views
);



const viewCount =
document.getElementById("view-count");


if(viewCount){

    viewCount.textContent = views;

}




/* ==========================================
   CUSTOM CURSOR
========================================== */


const cursor =
document.querySelector(".cursor");


if(cursor){

document.addEventListener("mousemove",(event)=>{

    cursor.style.left =
    event.clientX + "px";


    cursor.style.top =
    event.clientY + "px";

});

}




/* ==========================================
   PARTICLES
========================================== */


const canvas =
document.getElementById("particles");


if(canvas){

const ctx =
canvas.getContext("2d");


let particles = [];


function resizeCanvas(){

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

}


resizeCanvas();


window.addEventListener(
"resize",
resizeCanvas
);



function createParticles(){

particles=[];


for(let i=0;i<45;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*1.5+.5,

speed:Math.random()*.2+.05

});

}

}


createParticles();



function animateParticles(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach(p=>{


ctx.beginPath();


ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);


ctx.fillStyle =
"rgba(255,255,255,0.25)";


ctx.fill();


p.y -= p.speed;


if(p.y < 0){

p.y = canvas.height;

}


});


requestAnimationFrame(
animateParticles
);


}


animateParticles();

}




/* ==========================================
   DISCORD LIVE STATS
========================================== */


fetch("https://public-enemy-bot-cw8m.onrender.com/stats")

.then(res=>res.json())

.then(data=>{


const botStatus =
document.getElementById("bot-status");


const serverMembers =
document.getElementById("server-members");



if(data.online){


if(botStatus){

botStatus.textContent =
"🟢 Online";

}


if(serverMembers){

serverMembers.textContent =
`${data.members} Members`;

}


}


})

.catch(err=>{

console.log(
"Discord API Error:",
err
);

});

