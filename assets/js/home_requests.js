const button_room = document.querySelector('#button_room');
const room_name = document.querySelector('#room_name');
const x = document.querySelector('#creat_room_form');
const rooms_div = document.querySelector('#display_rooms_here');

displayRooms();

// add room section
button_room.addEventListener('click', () => {
    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            room_name: room_name.value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data[data.length - 1]);
            room_name.value = '';
            x.style.display = 'none';
            rooms_div.innerHTML = '';
            displayRooms();
        })
});


// display rooms function
function displayRooms()
{
    fetch('index.php?page=home',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            displayRooms: true,
        }),
    })
        .then(response => response.json())
        .then(data =>
        {
            console.log(data);
            data.forEach((room, i) =>
            {
                rooms_div.innerHTML += `
                    <button value="${room.room_id}" class="rooms flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                            <p>${room.room_id}</p>
                        </div>
                        <div class="ml-2 text-sm font-semibold flex flex-col items-start">
                            ${room.room_name}
                            <p style="font-size: 10px">${room.created_at}</p>
                        </div>
                    </button>
                `;
            })
        });
}


// fetch users after clicking the "add members" button
const display_users_here = document.querySelector('#display_users_here');
const am_btn = document.querySelector('#add_members_btn');

am_btn.addEventListener('click', ()=>{
    display_users_here.innerHTML = '';
    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            displayUsers: true,
        })
    })

        .then(response => response.json())
        .then(data => {
            console.log(data)

            data.forEach(elm => {
                display_users_here.innerHTML += `
                    <option value="${elm.user_id}" class="flex rounded-sm justify-center items-center border">
                        ${elm.username}
                    </option>
                    `;
            })
        })
});

// add group members section
const save_members = document.querySelector('#save_members');

save_members.addEventListener('click', ()=>{
    let u = [];
    let op = display_users_here.selectedOptions;

    for (let i = 0; i < op.length; i++) {
        u.push(op[i].value)
    }

    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            AddUsersToRoom: true,
            users: u,
        })
    })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            amd.style.display = 'none';
            displayGroupMembers();
        })
})

// display group members

const group_members_div = document.querySelector('#group_members_div');

function displayGroupMembers() {
    group_members_div.innerHTML = '';
    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            displayGroupMembers: true,
        })
    })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach((member) => {
                group_members_div.innerHTML += `
                        <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                            <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                <img src="assets/img/${member.image}" class="rounded-full" alt="">
                            </div>
                            <div class="ml-2 text-sm font-semibold">${member.username}</div>
                        </button>
                `;

            })
        })
}

displayGroupMembers();


/////

let rooms = document.querySelectorAll('.rooms');

rooms.forEach((room) => {
    room.addEventListener('click', () => {
        alert(room.getAttribute('value'));
        // or
        // alert(room.dataset.value);
    });
});
