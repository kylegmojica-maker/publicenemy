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
   DEFAULT AVATAR
========================================== */

const DEFAULT_AVATAR =
    "https://cdn.discordapp.com/embed/avatars/0.png";


/* ==========================================
   CREATE PROFILE CARD
========================================== */

function createPersonCard(person) {

    const card =
        document.createElement("div");

    card.className =
        "person-card";


    card.innerHTML = `

        <img
            class="person-avatar"
            src="${person.avatar || DEFAULT_AVATAR}"
            alt="${person.username}"
        >

        <h3>
            ${person.username}
        </h3>

    `;


    card.addEventListener(
        "click",
        function () {

            document
                .querySelectorAll(".person-card")
                .forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


            card.classList.add(
                "active"
            );


            openProfile(person);

        }
    );


    return card;

}


/* ==========================================
   LOAD GODFATHER
========================================== */

function loadGodfather() {

    const list =
        document.getElementById(
            "godfather-list"
        );


    if (!list) return;


    list.innerHTML = "";


    godfather.forEach(
        function (person) {

            list.appendChild(
                createPersonCard(person)
            );

        }
    );

}


/* ==========================================
   LOAD HIGHCOUNCIL
========================================== */

function loadHighcouncil() {

    const list =
        document.getElementById(
            "highcouncil-list"
        );


    if (!list) return;


    list.innerHTML = "";


    highcouncil.forEach(
        function (person) {

            list.appendChild(
                createPersonCard(person)
            );

        }
    );

}


/* ==========================================
   GET MEMBER ID
========================================== */

function getMemberId(member) {

    return String(
        member.id ||
        member.userId ||
        member.discordId ||
        ""
    );

}


/* ==========================================
   LOAD MEMBERS
========================================== */

async function loadMembers() {

    const membersList =
        document.getElementById(
            "members-list"
        );


    if (!membersList) {

        console.error(
            "MEMBERS LIST NOT FOUND"
        );

        return;

    }


    try {

        const response =
            await fetch(
                "https://public-enemy-bot-cw8m.onrender.com/members"
            );


        if (!response.ok) {

            throw new Error(
                "API returned " +
                response.status
            );

        }


        const data =
            await response.json();


        let apiMembers;


        if (Array.isArray(data)) {

            apiMembers =
                data;

        } else if (
            data &&
            Array.isArray(data.members)
        ) {

            apiMembers =
                data.members;

        } else {

            throw new Error(
                "Invalid API response"
            );

        }


        /*
            Match the IDs from your list
            with the members returned by
            the Discord bot.
        */

        const finalMembers =
            memberIds.map(
                function (requested) {

                    const found =
                        apiMembers.find(
                            function (member) {

                                return (
                                    getMemberId(member)
                                    ===
                                    requested.id
                                );

                            }
                        );


                    /*
                        If the API has the member,
                        use the live Discord data.
                    */

                    if (found) {

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

                    }


                    /*
                        If the API doesn't return
                        the member, still display
                        the member instead of
                        making them disappear.
                    */

                    return {

                        username:
                            requested.username,

                        id:
                            requested.id,

                        avatar:
                            DEFAULT_AVATAR,

                        status:
                            "Offline",

                        activity:
                            ""

                    };

                }
            );


        /*
            Clear old members.
        */

        membersList.innerHTML = "";


        /*
            Make it a scrolling container.
        */

        membersList.classList.add(
            "members-scroller"
        );


        /*
            Create row 1.
        */

        const row1 =
            document.createElement("div");

        row1.className =
            "member-scroll-row member-row-1";


        /*
            Create row 2.
        */

        const row2 =
            document.createElement("div");

        row2.className =
            "member-scroll-row member-row-2";


        /*
            Put members into rows.
        */

        finalMembers.forEach(
            function (person, index) {

                const card =
                    createPersonCard(person);

                card.classList.add(
                    "scroll-member"
                );


                if (index % 2 === 0) {

                    row1.appendChild(
                        card
                    );

                } else {

                    row2.appendChild(
                        card
                    );

                }

            }
        );


        /*
            Duplicate the cards for
            seamless scrolling.
        */

        finalMembers.forEach(
            function (person, index) {

                const card =
                    createPersonCard(person);

                card.classList.add(
                    "scroll-member"
                );


                if (index % 2 === 0) {

                    row1.appendChild(
                        card
                    );

                } else {

                    row2.appendChild(
                        card
                    );

                }

            }
        );


        /*
            Add both rows.
        */

        membersList.appendChild(
            row1
        );

        membersList.appendChild(
            row2
        );


        /*
            Pause scrolling when hovering.
        */

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


        console.log(
            "Members loaded:",
            finalMembers
        );


    } catch (error) {

        console.error(
            "Members API Error:",
            error
        );


        /*
            IMPORTANT:
            Even if Render is offline,
            show the members from your
            list instead of leaving the
            section completely empty.
        */

        membersList.innerHTML = "";

        membersList.classList.add(
            "members-scroller"
        );


        const row =
            document.createElement("div");

        row.className =
            "member-scroll-row member-row-1";


        memberIds.forEach(
            function (person) {

                const card =
                    createPersonCard({

                        username:
                            person.username,

                        id:
                            person.id,

                        avatar:
                            DEFAULT_AVATAR,

                        status:
                            "Offline",

                        activity:
                            ""

                    });


                card.classList.add(
                    "scroll-member"
                );


                row.appendChild(
                    card
                );

            }
        );


        membersList.appendChild(
            row
        );

    }

}


/* ==========================================
   PROFILE MODAL
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


const modalActivity =
    document.getElementById(
        "modal-activity"
    );


const modalDiscordId =
    document.getElementById(
        "modal-discord-id"
    );


/* ==========================================
   OPEN PROFILE
========================================== */

function openProfile(person) {

    if (!modal) return;


    if (modalAvatar) {

        modalAvatar.src =
            person.avatar ||
            DEFAULT_AVATAR;

    }


    if (modalName) {

        modalName.textContent =
            person.username ||
            "Discord User";

    }


    if (modalUsername) {

        modalUsername.textContent =
            "@" +
            (
                person.username ||
                "username"
            );

    }


    if (modalStatus) {

        const status =
            person.status ||
            "Offline";


        modalStatus.innerHTML = `

            <span class="status-dot"></span>

            <span>
                ${status}
            </span>

        `;

    }


    if (modalActivity) {

        modalActivity.textContent =
            person.activity ||
            "";

    }


    if (modalDiscordId) {

        modalDiscordId.textContent =
            person.id ||
            "-";

    }


    modal.classList.remove(
        "hidden"
    );

}


/* ==========================================
   CLOSE PROFILE
========================================== */

const closeProfile =
    document.getElementById(
        "close-profile"
    );


if (closeProfile) {

    closeProfile.addEventListener(
        "click",
        function () {

            if (modal) {

                modal.classList.add(
                    "hidden"
                );

            }


            document
                .querySelectorAll(
                    ".person-card"
                )
                .forEach(
                    function (card) {

                        card.classList.remove(
                            "active"
                        );

                    }
                );

        }
    );

}


/* ==========================================
   CLOSE MODAL BY CLICKING BACKGROUND
========================================== */

if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                modal.classList.add(
                    "hidden"
                );


                document
                    .querySelectorAll(
                        ".person-card"
                    )
                    .forEach(
                        function (card) {

                            card.classList.remove(
                                "active"
                            );

                        }
                    );

            }

        }
    );

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
        parseInt(
            views,
            10
        ) + 1;

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
   DISCORD BOT LIVE STATS
========================================== */

fetch(
    "https://public-enemy-bot-cw8m.onrender.com/stats"
)

.then(
    function (res) {

        if (!res.ok) {

            throw new Error(
                "Stats API returned " +
                res.status
            );

        }

        return res.json();

    }
)

.then(
    function (data) {

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
    function (error) {

        console.log(
            "Discord Stats Error:",
            error
        );

    }
);


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
        function (event) {

            cursor.style.left =
                event.clientX +
                "px";

            cursor.style.top =
                event.clientY +
                "px";

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
                    1.5 +
                    0.5,

                speed:
                    Math.random() *
                    0.2 +
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


    animateParticles();

}


/* ==========================================
   START WEBSITE
========================================== */

loadGodfather();

loadHighcouncil();

loadMembers();
```
