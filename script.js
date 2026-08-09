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
        avatar: "https://cdn.discordapp.com/avatars/1393821550142296145/2736dd55a6f4452ab9e89ed5f99aee9e.png?size=256"
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
        avatar: "https://cdn.discordapp.com/avatars/1473659382800584855/2ef3e43a4309d3f464453f6121ef0fd7.png?size=256"
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
   DEFAULT AVATAR
========================================== */

const DEFAULT_AVATAR =
    "https://cdn.discordapp.com/embed/avatars/0.png";


/* ==========================================
   CREATE PROFILE CARD
========================================== */

function createPersonCard(person) {

    const card = document.createElement("div");

    card.className = "person-card";

    const avatar =
        person.avatar || DEFAULT_AVATAR;

    card.innerHTML = `
        <img
            class="person-avatar"
            src="${avatar}"
            alt="${person.username || "Discord User"}"
            draggable="false"
        >

        <h3>
            ${person.username || "Unknown"}
        </h3>
    `;

    card.addEventListener("click", function () {

        document
            .querySelectorAll(".person-card")
            .forEach(function (item) {
                item.classList.remove("active");
            });

        card.classList.add("active");

        openProfile(person);
    });

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

        godfatherList.innerHTML = "";

        godfather.forEach(function (person) {

            godfatherList.appendChild(
                createPersonCard(person)
            );

        });
    }


    if (highcouncilList) {

        highcouncilList.innerHTML = "";

        highcouncil.forEach(function (person) {

            highcouncilList.appendChild(
                createPersonCard(person)
            );

        });
    }
}


/* ==========================================
   LOAD MEMBERS
========================================== */

async function loadMembers() {

    const membersList =
        document.getElementById("members-list");

    if (!membersList) {
        return;
    }


    membersList.innerHTML = "";


    let finalMembers = memberIds.map(function (person) {

        return {
            username: person.username,
            id: person.id,
            avatar: DEFAULT_AVATAR,
            status: "Offline",
            activity: ""
        };

    });


    /* ======================================
       GET LIVE MEMBER DATA
    ====================================== */

    try {

        const response = await fetch(
            "https://public-enemy-bot-cw8m.onrender.com/members",
            {
                method: "GET",
                cache: "no-store"
            }
        );


        if (response.ok) {

            const data =
                await response.json();

            const apiMembers =
                Array.isArray(data)
                    ? data
                    : data.members;


            if (Array.isArray(apiMembers)) {

                finalMembers =
                    memberIds.map(function (requested) {

                        const found =
                            apiMembers.find(function (member) {

                                return String(
                                    member.id ||
                                    member.userId ||
                                    member.discordId
                                ) === requested.id;

                            });


                        if (!found) {

                            return {
                                username: requested.username,
                                id: requested.id,
                                avatar: DEFAULT_AVATAR,
                                status: "Offline",
                                activity: ""
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
                                DEFAULT_AVATAR,

                            status:
                                found.status ||
                                "Offline",

                            activity:
                                found.activity ||
                                found.game ||
                                ""
                        };

                    });

            }

        }

    } catch (error) {

        console.warn(
            "Members API unavailable. Using saved member list.",
            error
        );

    }


    /* ======================================
       CREATE ROWS
    ====================================== */

    membersList.innerHTML = "";

    const row1 =
        document.createElement("div");

    row1.className =
        "member-scroll-row member-row-1";


    const row2 =
        document.createElement("div");

    row2.className =
        "member-scroll-row member-row-2";


    finalMembers.forEach(function (person, index) {

        if (index % 2 === 0) {

            const card =
                createPersonCard(person);

            card.classList.add("scroll-member");

            row1.appendChild(card);

        }

    });


    finalMembers.forEach(function (person, index) {

        if (index % 2 !== 0) {

            const card =
                createPersonCard(person);

            card.classList.add("scroll-member");

            row2.appendChild(card);

        }

    });


    /* ======================================
       DUPLICATE FOR LOOPING
    ====================================== */

    finalMembers.forEach(function (person, index) {

        if (index % 2 === 0) {

            const card =
                createPersonCard(person);

            card.classList.add("scroll-member");

            row1.appendChild(card);

        }

    });


    finalMembers.forEach(function (person, index) {

        if (index % 2 !== 0) {

            const card =
                createPersonCard(person);

            card.classList.add("scroll-member");

            row2.appendChild(card);

        }

    });


    membersList.appendChild(row1);
    membersList.appendChild(row2);


    /* ======================================
       PAUSE SCROLLING
    ====================================== */

    membersList.addEventListener(
        "mouseenter",
        function () {

            membersList.classList.add(
                "scroll-paused"
            );

        }
    );


    membersList.addEventListener(
        "mouseleave",
        function () {

            membersList.classList.remove(
                "scroll-paused"
            );

        }
    );
}


/* ==========================================
   PROFILE MODAL
========================================== */

function openProfile(person) {

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

    const modalActivity =
        document.getElementById("modal-activity");

    const modalDiscordId =
        document.getElementById("modal-discord-id");


    if (!modal) {
        return;
    }


    if (modalAvatar) {

        modalAvatar.src =
            person.avatar || DEFAULT_AVATAR;

    }


    if (modalName) {

        modalName.textContent =
            person.username || "Discord User";

    }


    if (modalUsername) {

        modalUsername.textContent =
            "@" +
            (person.username || "username");

    }


    if (modalStatus) {

        const status =
            person.status || "Offline";

        modalStatus.innerHTML = `
            <span class="status-dot ${String(status).toLowerCase()}"></span>

            <span>
                ${status}
            </span>
        `;

    }


    if (modalActivity) {

        modalActivity.textContent =
            person.activity || "";

    }


    if (modalDiscordId) {

        modalDiscordId.textContent =
            person.id || "-";

    }


    modal.classList.remove("hidden");
}


/* ==========================================
   CLOSE PROFILE MODAL
========================================== */

function closeProfileModal() {

    const modal =
        document.getElementById("profile-modal");


    if (modal) {

        modal.classList.add("hidden");

    }


    document
        .querySelectorAll(".person-card.active")
        .forEach(function (card) {

            card.classList.remove("active");

        });
}


/* ==========================================
   DOM READY
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ==================================
           ENTER SCREEN
        ================================== */

        const enterButton =
            document.getElementById("enter-button");

        const enterScreen =
            document.getElementById("enter-screen");

        const website =
            document.getElementById("main-site");

        const music =
            document.getElementById("background-music");


        /* ==================================
           MUSIC SOURCE
           
           ONLY THIS PART WAS CHANGED
        ================================== */

        if (music) {

            music.src =
                "https://raw.githubusercontent.com/pbe-wrld/publicenemy/main/lv_0_20260809194350.mp4";

        }


        if (enterButton) {

            enterButton.addEventListener(
                "click",
                function () {

                    console.log(
                        "ENTER BUTTON CLICKED"
                    );


                    if (enterScreen) {

                        enterScreen.classList.add(
                            "hidden"
                        );


                        setTimeout(
                            function () {

                                enterScreen.style.display =
                                    "none";

                            },
                            700
                        );

                    }


                    if (website) {

                        website.style.opacity =
                            "1";

                        website.style.visibility =
                            "visible";

                        website.style.pointerEvents =
                            "auto";

                    }


                    if (music) {

                        music.volume =
                            0.35;

                        music.play().catch(
                            function (error) {

                                console.log(
                                    "Music playback blocked:",
                                    error
                                );

                            }
                        );

                    }

                }
            );

        }


        /* ==================================
           CLOSE MODAL
        ================================== */

        const closeButton =
            document.getElementById(
                "close-profile"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeProfileModal
            );

        }


        const modal =
            document.getElementById(
                "profile-modal"
            );


        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (event.target === modal) {

                        closeProfileModal();

                    }

                }
            );

        }


        /* ==================================
           LOAD PROFILES
        ================================== */

        loadPeople();

        loadMembers();


        /* ==================================
           VIEW COUNTER
        ================================== */

        let views =
            localStorage.getItem(
                "publicEnemyViews"
            );


        if (!views) {

            views = 1;

        } else {

            views =
                parseInt(views, 10) + 1;

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


        /* ==================================
           CUSTOM CURSOR
        ================================== */

        const cursor =
            document.querySelector(".cursor");


        if (cursor) {

            document.addEventListener(
                "mousemove",
                function (event) {

                    cursor.style.left =
                        event.clientX + "px";

                    cursor.style.top =
                        event.clientY + "px";

                }
            );

        }


        /* ==================================
           PARTICLES
        ================================== */

        const canvas =
            document.getElementById("particles");


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


            function animateParticles() {

                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                particles.forEach(
                    function (p) {

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


            resizeCanvas();

            createParticles();

            animateParticles();


            window.addEventListener(
                "resize",
                function () {

                    resizeCanvas();

                    createParticles();

                }
            );

        }


        /* ==================================
           DISCORD BOT STATS
        ================================== */

        fetch(
            "https://public-enemy-bot-cw8m.onrender.com/stats",
            {
                method: "GET",
                cache: "no-store"
            }
        )

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Stats API returned " +
                    response.status
                );

            }

            return response.json();

        })

        .then(function (data) {

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

        })

        .catch(function (error) {

            console.log(
                "Discord API Error:",
                error
            );

        });

    }
);
