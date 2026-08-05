/* ==========================================
   PUBLIC ENEMY
   WEBSITE JAVASCRIPT
========================================== */


/* ==========================================
   DISCORD USERS
========================================== */


/*
    IMPORTANT:

    These are currently placeholder avatars.

    Your Discord bot can later replace these
    with real avatars and live statuses.

    Status options:

    online
    idle
    dnd
    offline
*/


const godfather = [

    {
        name: "Sal",
        username: "@salvatore.am",
        id: "1045740438147051541",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },


    {
        name: "Jinu",
        username: "@usjrjinu",
        id: "516925138407653386",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png"
    },


    {
        name: "Yole",
        username: "@noki202",
        id: "1162109122242691082",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/2.png"
    },


    {
        name: "Toshi",
        username: "@yoshiiixzz",
        id: "1393821550142296145",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/3.png"
    },


    {
        name: "$",
        username: "@leywannafck",
        id: "695588470348972082",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/4.png"
    }

];



const highcouncil = [

    {
        name: "Hudas",
        username: "@anescheese",
        id: "1473659382800584855",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },


    {
        name: "taygs",
        username: "@drix08522",
        id: "1450026770186240080",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png"
    },


    {
        name: "Johnrey",
        username: "@johnrey103",
        id: "1492561000782893088",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/2.png"
    },


    {
        name: "wayne",
        username: "@diablo058_39987",
        id: "1512087904715800629",
        status: "online",
        avatar: "https://cdn.discordapp.com/embed/avatars/3.png"
    }

];



/* ==========================================
   STATUS
========================================== */


function getStatusClass(status) {

    if (status === "online") {

        return "online";

    }

    if (status === "idle") {

        return "idle";

    }

    if (status === "dnd") {

        return "dnd";

    }

    return "offline";

}



function getStatusText(status) {

    if (status === "online") {

        return "Online";

    }

    if (status === "idle") {

        return "Idle";

    }

    if (status === "dnd") {

        return "Do Not Disturb";

    }

    return "Offline";

}



/* ==========================================
   CREATE PERSON CARD
========================================== */


function createPersonCard(person) {


    const card =
        document.createElement("div");


    card.className =
        "person-card";


    card.innerHTML = `

        <div class="person-avatar-wrapper">

            <img

                class="person-avatar"

                src="${person.avatar}"

                alt="${person.name}"

            >


            <span

                class="person-status status-dot ${getStatusClass(person.status)}"

            ></span>

        </div>


        <div class="person-name">

            ${person.name}

        </div>


        <div class="person-username">

            ${person.username}

        </div>

    `;



    card.addEventListener(

        "click",

        function () {

            openProfile(person);

        }

    );



    return card;

}



/* ==========================================
   LOAD USERS
========================================== */


function loadPeople() {


    const godfatherList =

        document.getElementById(

            "godfather-list"

        );



    const highcouncilList =

        document.getElementById(

            "highcouncil-list"

        );



    godfather.forEach(

        function (person) {

            godfatherList.appendChild(

                createPersonCard(person)

            );

        }

    );



    highcouncil.forEach(

        function (person) {

            highcouncilList.appendChild(

                createPersonCard(person)

            );

        }

    );

}



/* ==========================================
   MODAL
========================================== */


const modal =

    document.getElementById(

        "profile-modal"

    );



const modalAvatar =

    document.getElementById(

        "modal-avatar"

    );



const modalName =

    document.getElementById(

        "modal-name"

    );



const modalUsername =

    document.getElementById(

        "modal-username"

    );



const modalStatus =

    document.getElementById(

        "modal-status"

    );



const modalStatusDot =

    document.getElementById(

        "modal-status-dot"

    );



const modalDiscordId =

    document.getElementById(

        "modal-discord-id"

    );



function openProfile(person) {


    modalAvatar.src =

        person.avatar;



    modalName.textContent =

        person.name;



    modalUsername.textContent =

        person.username;



    modalStatus.textContent =

        getStatusText(

            person.status

        );



    modalStatusDot.className =

        "status-dot " +

        getStatusClass(

            person.status

        );



    modalDiscordId.textContent =

        person.id;



    modal.classList.remove(

        "hidden"

    );

}



/* CLOSE MODAL */


document

    .getElementById(

        "close-modal"

    )

    .addEventListener(

        "click",

        function () {

            modal.classList.add(

                "hidden"

            );

        }

    );



/* CLICK OUTSIDE MODAL */


modal.addEventListener(

    "click",

    function (event) {


        if (

            event.target === modal

        ) {


            modal.classList.add(

                "hidden"

            );


        }

    }

);



/* ==========================================
   CLICK TO ENTER
========================================== */


const enterScreen =

    document.getElementById(

        "enter-screen"

    );



const enterButton =

    document.getElementById(

        "enter-button"

    );



const website =

    document.getElementById(

        "website"

    );



enterButton.addEventListener(

    "click",

    function () {


        enterScreen.classList.add(

            "hidden"

        );


        website.classList.add(

            "visible"

        );


    }

);



/* ==========================================
   VIEW COUNTER
========================================== */


/*
    This is a local browser counter.

    It is NOT a global counter.

    A real global counter requires
    an external database or service.
*/


let views =

    localStorage.getItem(

        "publicEnemyViews"

    );



if (!views) {


    views = 1;


} else {


    views =

        parseInt(views) + 1;


}



localStorage.setItem(

    "publicEnemyViews",

    views

);



document

    .getElementById(

        "view-count"

    )

    .textContent =

    views;



/* ==========================================
   CUSTOM CURSOR
========================================== */


const cursor =

    document.querySelector(

        ".cursor"

    );



document.addEventListener(

    "mousemove",

    function (event) {


        cursor.style.left =

            event.clientX + "px";


        cursor.style.top =

            event.clientY + "px";


    }

);



/* ==========================================
   PARTICLES
========================================== */


const canvas =

    document.getElementById(

        "particles"

    );



const ctx =

    canvas.getContext(

        "2d"

    );



let particles = [];



function resizeCanvas() {


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



function createParticles() {


    particles = [];



    for (

        let i = 0;

        i < 45;

        i++

    ) {


        particles.push({


            x:

                Math.random() *

                canvas.width,


            y:

                Math.random() *

                canvas.height,


            size:

                Math.random() *

                1.5 + 0.5,


            speed:

                Math.random() *

                0.2 + 0.05


        });


    }

}



createParticles();



function animateParticles() {


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    particles.forEach(

        function (particle) {


            ctx.beginPath();



            ctx.arc(

                particle.x,

                particle.y,

                particle.size,

                0,

                Math.PI * 2

            );



            ctx.fillStyle =

                "rgba(255,255,255,0.25)";



            ctx.fill();



            particle.y -=

                particle.speed;



            if (

                particle.y < 0

            ) {


                particle.y =

                    canvas.height;


            }


        }

    );



    requestAnimationFrame(

        animateParticles

    );

}



animateParticles();

/* ==========================================
   DISCORD BOT LIVE DATA
========================================== */


const DISCORD_API = "YOUR_RENDER_URL/stats";


fetch(DISCORD_API)

.then(response => response.json())

.then(data => {

    const botStatus = document.getElementById(
        "bot-status"
    );

    const serverMembers = document.getElementById(
        "server-members"
    );


    if (data.online) {

        if (botStatus) {
            botStatus.textContent = "🟢 Online";
        }


        if (serverMembers) {
            serverMembers.textContent =
            `${data.members} Members`;
        }

    }

})

.catch(error => {

    console.log(
        "Discord API Error:",
        error
    );

});


/* ==========================================
   START WEBSITE
========================================== */


loadPeople();

/* ==========================================
   START WEBSITE
========================================== */


loadPeople();
