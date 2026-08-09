```javascript
/* ==========================================
   PUBLIC ENEMY
   WEBSITE JAVASCRIPT
========================================== */


/* ==========================================
   DISCORD PROFILE DATA
========================================== */

const godfather = [

    {
        username: "salvatore.am",
        id: "1045740438147051541",
        avatar: "https://cdn.discordapp.com/avatars/1045740438147051541/f2298f75cf637c0197ffcecc443ce921.png?size=256"
    },

    {
        username: "usjrjinu",
        id: "516925138407653386",
        avatar: "https://cdn.discordapp.com/avatars/516925138407653386/a086c15746cc5cfa3285bb2e8d3ca403.png?size=256"
    },

    {
        username: "noki202",
        id: "1162109122242691082",
        avatar: "https://cdn.discordapp.com/avatars/1162109122242691082/3d11fa292643af5f888526580479dc11.png?size=256"
    },

    {
        username: "yoshiiixzz",
        id: "1393821550142296145",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    },

    {
        username: "leywannafck",
        id: "695588470348972082",
        avatar: "https://cdn.discordapp.com/avatars/695588470348972082/dc06c598b1a468f72a3d87a15f286a8b.png?size=256"
    }

];


const highcouncil = [

    {
        username: "anescheese",
        id: "1473659382800584855",
        avatar: "https://cdn.discordapp.com/avatars/1473659382800584855/a4188f0f67fc0f897828e8cf2e842d02.png?size=256"
    },

    {
        username: "drix08522",
        id: "1450026770186240080",
        avatar: "https://cdn.discordapp.com/avatars/1450026770186240080/a2108ca9b5a2877c3134ab1eed0adcd3.png?size=256"
    },

    {
        username: "johnrey103",
        id: "1492561000782893088",
        avatar: "https://cdn.discordapp.com/avatars/1492561000782893088/eda39fb35fdcfeaf07c7750f35d08120.png?size=256"
    },

    {
        username: "diablo058_39987",
        id: "1512087904715800629",
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png"
    }

];


/* ==========================================
   MEMBERS
========================================== */

const memberIds = [

    {
        username: "Lebwak",
        id: "543782681796804629"
    },

    {
        username: "Makijames",
        id: "1376577430499627079"
    },

    {
        username: "Sainty",
        id: "1333235917259014248"
    },

    {
        username: "Sin",
        id: "1462993266227154954"
    },

    {
        username: "Tyler",
        id: "1407329376063979550"
    },

    {
        username: "Nonoy",
        id: "1313118367439130624"
    },

    {
        username: "Garfield",
        id: "1417155995460829246"
    },

    {
        username: "Stro",
        id: "719895356338602054"
    }

];


/* ==========================================
   CREATE PROFILE CARD
========================================== */

function createPersonCard(person) {

    const card = document.createElement("div");

    card.className = "person-card";

    card.innerHTML = `

        <img
            class="person-avatar"
            src="${person.avatar || "https://cdn.discordapp.com/embed/avatars/0.png"}"
            alt="${person.username}"
        >

        <h3>
            ${person.username}
        </h3>

    `;


    card.onclick = () => {

        document.querySelectorAll(".person-card")
            .forEach(item => {

                item.classList.remove("active");

            });


        card.classList.add("active");


        openProfile(person);

    };


    return card;

}


/* ==========================================
   LOAD GODFATHER + HIGHCOUNCIL
========================================== */

function loadPeople() {

    const godfatherList =
        document.getElementById("godfather-list");


    const highcouncilList =
        document.getElementById("highcouncil-list");


    if (godfatherList) {

        godfather.forEach(person => {

            godfatherList.appendChild(
                createPersonCard(person)
            );

        });

    }


    if (highcouncilList) {

        highcouncil.forEach(person => {

            highcouncilList.appendChild(
                createPersonCard(person)
            );

        });

    }

}


/* ==========================================
   LOAD MEMBERS FROM DISCORD BOT
========================================== */

async function loadMembers() {

    const membersList =
        document.getElementById("members-list");


    if (!membersList) return;


    try {

        const response = await fetch(
            "https://public-enemy-bot-cw8m.onrender.com/members"
        );


        if (!response.ok) {

            throw new Error(
                "Members API returned " +
                response.status
            );

        }


        const data =
            await response.json();


        /*
            The API can return either:

            [
                {...},
                {...}
            ]

            OR

            {
                members: [...]
            }
        */

        let apiMembers =
            Array.isArray(data)
                ? data
                : data.members;


        if (!Array.isArray(apiMembers)) {

            throw new Error(
                "Invalid members API format"
            );

        }


        /*
            Only show the members we specified.
        */

        const allowedIds =
            memberIds.map(member => member.id);


        const members =
            apiMembers.filter(member =>
                allowedIds.includes(
                    String(
                        member.id ||
                        member.userId ||
                        member.discordId
                    )
                )
            );


        /*
            Keep our chosen names if the API
            doesn't provide them.
        */

        const finalMembers =
            memberIds.map(requested => {

                const found =
                    members.find(member =>
                        String(
                            member.id ||
                            member.userId ||
                            member.discordId
                        ) === requested.id
                    );


                if (!found) {

                    return {

                        username:
                            requested.username,

                        id:
                            requested.id,

                        avatar:
                            "https://cdn.discordapp.com/embed/avatars/0.png",

                        status:
                            "Offline"

                    };

                }


                return {

                    username:
                        found.username ||
                        found.name ||
                        requested.username,

                    id:
                        requested.id,

                    avatar:
                        found.avatar ||
                        found.avatarUrl ||
                        found.avatarURL ||
                        "https://cdn.discordapp.com/embed/avatars/0.png",

                    status:
                        found.status ||
                        "Offline",

                    activity:
                        found.activity ||
                        found.game ||
                        ""

                };

            });


        /*
            Create two rows.
        */

        const row1 =
            document.createElement("div");

        row1.className =
            "member-scroll-row member-row-1";


        const row2 =
            document.createElement("div");

        row2.className =
            "member-scroll-row member-row-2";


        /*
            Split members between rows.
        */

        finalMembers.forEach(
            (person, index) => {

                const card =
                    createPersonCard(person);

                card.classList.add(
                    "scroll-member"
                );


                if (index % 2 === 0) {

                    row1.appendChild(card);

                } else {

                    row2.appendChild(card);

                }

            }
        );


        /*
            Duplicate the rows so the
            scrolling animation loops.
        */

        finalMembers.forEach(
            (person, index) => {

                const card =
                    createPersonCard(person);

                card.classList.add(
                    "scroll-member"
                );


                if (index % 2 === 0) {

                    row1.appendChild(card);

                } else {

                    row2.appendChild(card);

                }

            }
        );


        membersList.innerHTML = "";


        membersList.classList.add(
            "members-scroller"
        );


        membersList.appendChild(row1);

        membersList.appendChild(row2);


        /*
            Pause when cursor enters
            the member section.
        */

        membersList.addEventListener(
            "mouseenter",
            () => {

                membersList.classList.add(
                    "scroll-paused"
                );

            }
        );


        membersList.addEventListener(
            "mouseleave",
            () => {

                membersList.classList.remove(
                    "scroll-paused"
                );

            }
        );


    } catch (error) {

        console.error(
            "Members API Error:",
            error
        );

    }

}


/* ==========================================
   PROFILE MODAL
========================================== */

const modal =
    document.getElementById("profile-modal");

const modalAvatar =
    document.getElementById("modal-avatar");

const modalName =
    document.getElementById("modal-name");

const modalUsername =
    document.getElementById("modal-username");

const modalStatus =
    document.getElementById("modal-status");

const modalDiscordId =
    document.getElementById("modal-discord-id");


function openProfile(person) {

    if (!modal) return;


    if (modalAvatar) {

        modalAvatar.src =
            person.avatar ||
            "https://cdn.discordapp.com/embed/avatars/0.png";

    }


    if (modalName) {

        modalName.textContent =
            person.username;

    }


    if (modalUsername) {

        modalUsername.textContent =
            "@" + person.username;

    }


    if (modalStatus) {

        const status =
            person.status || "Offline";


        modalStatus.innerHTML = `

            <span class="status-dot ${status.toLowerCase()}"></span>

            <span>
                ${status}
            </span>

        `;

    }


    if (modalDiscordId) {

        modalDiscordId.textContent =
            person.id;

    }


    modal.classList.remove("hidden");

}


/* ==========================================
   CLOSE PROFILE MODAL
========================================== */

const closeProfile =
    document.getElementById("close-profile");


if (closeProfile) {

    closeProfile.onclick = () => {

        if (modal) {

            modal.classList.add("hidden");

        }

    };

}


if (modal) {

    modal.onclick = (event) => {

        if (event.target === modal) {

            modal.classList.add("hidden");

        }

    };

}


/* ==========================================
   ENTER SCREEN
========================================== */

const enterButton = document.getElementById("enter-button");
const enterScreen = document.getElementById("enter-screen");
const website = document.getElementById("main-site");

if (enterButton && enterScreen && website) {

    enterButton.addEventListener("click", function () {

        enterScreen.classList.add("hidden");

        website.classList.add("visible");

        const music = document.getElementById("background-music");

        if (music) {
            music.volume = 0.35;

            music.play().catch(function () {
                console.log("Music could not autoplay.");
            });
        }

    });

}


/* ==========================================
   VIEW COUNTER
========================================== */

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


const viewCount =
    document.getElementById(
        "view-count"
    );


if (viewCount) {

    viewCount.textContent =
        views;

}


/* ==========================================
   CUSTOM CURSOR
========================================== */

const cursor =
    document.querySelector(
        ".cursor"
    );


if (cursor) {

    document.addEventListener(
        "mousemove",
        (event) => {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";

        }
    );

}


/* ==========================================
   PARTICLES
========================================== */

const canvas =
    document.getElementById(
        "particles"
    );


if (canvas) {

    const ctx =
        canvas.getContext("2d");


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
            p => {

                ctx.beginPath();


                ctx.arc(
                    p.x,
                    p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    "rgba(255,255,255,0.25)";


                ctx.fill();


                p.y -= p.speed;


                if (p.y < 0) {

                    p.y =
                        canvas.height;

                }

            }
        );


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();

}


/* ==========================================
   DISCORD BOT LIVE STATS
========================================== */

fetch(
    "https://public-enemy-bot-cw8m.onrender.com/stats"
)

.then(
    res =>
        res.json()
)

.then(
    data => {

        const botStatus =
            document.getElementById(
                "bot-status"
            );


        const serverMembers =
            document.getElementById(
                "server-members"
            );


        if (data.online) {

            if (botStatus) {

                botStatus.textContent =
                    "🟢 Online";

            }


            if (serverMembers) {

                serverMembers.textContent =
                    `${data.members} Members`;

            }

        }

    }
)

.catch(
    err => {

        console.log(
            "Discord API Error:",
            err
        );

    }
);


/* ==========================================
   START WEBSITE
========================================== */

loadPeople();

loadMembers();
```
