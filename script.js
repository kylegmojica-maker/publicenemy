/* =========================================
   PUBLIC ENEMY WEBSITE
   ========================================= */


/* =========================================
   DISCORD PEOPLE
   ========================================= */

const godfather = [

    {
        name: "Sal",
        username: "@salvatore.am",
        id: "1045740438147051541",
        status: "online",

        // Replace this with their actual avatar URL
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },

    {
        name: "Jinu",
        username: "@usjrjinu",
        id: "516925138407653386",
        status: "online",

        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },

    {
        name: "Yole",
        username: "@noki202",
        id: "1162109122242691082",
        status: "online",

        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },

    {
        name: "Toshi",
        username: "@yoshiiixzz",
        id: "1393821550142296145",
        status: "online",

        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },

    {
        name: "$",
        username: "@leywannafck",
        id: "695588470348972082",
        status: "online",

        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
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

        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },

    {
        name: "Johnrey",
        username: "@johnrey103",
        id: "1492561000782893088",
        status: "online",

        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },

    {
        name: "wayne",
        username: "@diablo058_39987",
        id: "1512087904715800629",
        status: "online",

        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    }

];


/* =========================================
   STATUS COLORS
   ========================================= */

function getStatusClass(status) {

    const statuses = {

        online: "online",

        idle: "idle",

        dnd: "dnd",

        offline: "offline"

    };

    return statuses[status] || "offline";

}


function getStatusText(status) {

    const names = {

        online: "Online",

        idle: "Idle",

        dnd: "Do Not Disturb",

        offline: "Offline"

    };

    return names[status] || "Offline";

}


/* =========================================
   CREATE PERSON CARD
   ========================================= */

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
        () => openProfile(person)
    );


    return card;

}


/* =========================================
   LOAD PEOPLE
   ========================================= */

function loadPeople() {

    const godfatherList =
        document.getElementById(
            "godfather-list"
        );


    const highcouncilList =
        document.getElementById(
            "highcouncil-list"
        );


    godfather.forEach(person => {

        godfatherList.appendChild(
            createPersonCard(person)
        );

    });


    highcouncil.forEach(person => {

        highcouncilList.appendChild(
            createPersonCard(person)
        );

    });

}


/* =========================================
   PROFILE MODAL
   ========================================= */

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
        `status-dot ${getStatusClass(person.status)}`;


    modalDiscordId.textContent =
        person.id;


    modal.classList.remove(
        "hidden"
    );

}


document
    .getElementById("close-modal")
    .addEventListener(
        "click",
        () => {

            modal.classList.add(
                "hidden"
            );

        }
    );


modal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === modal
        ) {

            modal.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================
   CLICK TO ENTER
   ========================================= */

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


const music =
    document.getElementById(
        "background-music"
    );


enterButton.addEventListener(
    "click",
    () => {

        enterScreen.classList.add(
            "hidden"
        );


        website.classList.add(
            "visible"
        );


        music.volume = 0.25;


        music.play().catch(
            error => {

                console.log(
                    "Music could not start:",
                    error
                );

            }
        );

    }
);


/* =========================================
   VISITOR COUNTER
   ========================================= */

/*
   This is a local demo counter.

   It counts visits from this browser.

   For a real global visitor counter
   shared between everyone, you need
   an external counter service or backend.
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


/* =========================================
   CUSTOM CURSOR
   ========================================= */

const cursor =
    document.querySelector(
        ".cursor"
    );


document.addEventListener(
    "mousemove",
    (event) => {

        cursor.style.left =
            `${event.clientX}px`;


        cursor.style.top =
            `${event.clientY}px`;

    }
);


/* =========================================
   PARTICLES
   ========================================= */

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
                Math.random()
                *
                canvas.width,

            y:
                Math.random()
                *
                canvas.height,

            size:
                Math.random()
                *
                1.5
                +
                0.5,

            speed:
                Math.random()
                *
                0.2
                +
                0.05

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
        particle => {

            ctx.beginPath();


            ctx.arc(

                particle.x,

                particle.y,

                particle.size,

                0,

                Math.PI * 2

            );


            ctx.fillStyle =
                "rgba(255,255,255,0.3)";


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


/* =========================================
   START
   ========================================= */

loadPeople();
