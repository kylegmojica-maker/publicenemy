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

/* ==========================================
   DISCORD PROFILE DATA
========================================== */

const godfather = [
    {
        username:"salvatore.am",
        id:"1045740438147051541",
        avatar:"https://cdn.discordapp.com/avatars/1045740438147051541/f2298f75cf637c0197ffcecc443ce921.png?size=256"
    },
    {
        username:"usjrjinu",
        id:"516925138407653386",
        avatar:"https://cdn.discordapp.com/avatars/516925138407653386/a086c15746cc5cfa3285bb2e8d3ca403.png?size=256"
    },
    {
        username:"noki202",
        id:"1162109122242691082",
        avatar:"https://cdn.discordapp.com/avatars/1162109122242691082/3d11fa292643af5f888526580479dc11.png?size=256"
    },
    {
        username:"yoshiiixzz",
        id:"1393821550142296145",
        avatar:"https://cdn.discordapp.com/embed/avatars/0.png"
    },
    {
        username:"leywannafck",
        id:"695588470348972082",
        avatar:"https://cdn.discordapp.com/avatars/695588470348972082/dc06c598b1a468f72a3d87a15f286a8b.png?size=256"
    }
];


const highcouncil = [
    {
        username:"anescheese",
        id:"1473659382800584855",
        avatar:"https://cdn.discordapp.com/avatars/1473659382800584855/a4188f0f67fc0f897828e8cf2e842d02.png?size=256"
    },
    {
        username:"drix08522",
        id:"1450026770186240080",
        avatar:"https://cdn.discordapp.com/avatars/1450026770186240080/a2108ca9b5a2877c3134ab1eed0adcd3.png?size=256"
    },
    {
        username:"johnrey103",
        id:"1492561000782893088",
        avatar:"https://cdn.discordapp.com/avatars/1492561000782893088/eda39fb35fdcfeaf07c7750f35d08120.png?size=256"
    },
    {
        username:"diablo058_39987",
        id:"1512087904715800629",
        avatar:"https://cdn.discordapp.com/embed/avatars/1.png"
    }
];



/* ==========================================
   CREATE PROFILE CARD
========================================== */


function createPersonCard(member){

    const card = document.createElement("div");

    card.className = "person-card";


    card.innerHTML = `

    <img 
    class="person-avatar"
    src="${member.avatar}">


    <h3>
    ${member.username}
    </h3>

    `;


    card.onclick = ()=>{

        document.querySelectorAll(".person-card")
        .forEach(x=>x.classList.remove("active"));


        card.classList.add("active");


        openProfile(member);

    };


    return card;

}




/* ==========================================
   LOAD PROFILES
========================================== */


function loadPeople(){


    const godfatherList =
    document.getElementById("godfather-list");


    const highcouncilList =
    document.getElementById("highcouncil-list");



    godfather.forEach(member=>{

        godfatherList.appendChild(
            createPersonCard(member)
        );

    });



    highcouncil.forEach(member=>{

        highcouncilList.appendChild(
            createPersonCard(member)
        );

    });


}

/* START WEBSITE */

loadPeople();