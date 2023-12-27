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
            console.log(data);
            room_name.value = '';
            x.style.display = 'none';
            rooms_div.innerHTML = '';
            displayRooms();
            displayRoomsImIN();
        })
});
////



// display rooms function
function displayRooms() {
    rooms_div.innerHTML = '';
    fetch('index.php?page=home',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            displayRooms: true,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach((room, i) => {
                rooms_div.innerHTML += `
                <button room-id="${room.room_id}" class="roomsShort flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
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
//////



let ROOM_ID = 0; // id of the current / clicked room GLOBAL VARIABLE
rooms_div.addEventListener('click', function(event) {
    am_btn.style.display = 'flex';
    const targetButton = event.target.closest('.roomsShort');
    rooms_div.querySelectorAll('.roomsShort').forEach(button => {
        button.style.backgroundColor = 'white';
    });
    targetButton.style.backgroundColor = 'rgba(62,13,208,0.4)';

    if (targetButton) {
        ROOM_ID = targetButton.getAttribute('room-id');
        console.log('Clicked Room ID:', ROOM_ID);
        displayGroupMembers();
        displayMessages();
    }
});
/////


// display group members
const group_members_div = document.querySelector('#group_members_div');
function displayGroupMembers() {
    group_members_div.innerHTML = '';
    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            displayGroupMembers: true,
            currentRoomId: ROOM_ID,
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
/////



displayGroupMembers();


// fetch users after clicking the "add members" button
const display_users_here = document.querySelector('#display_users_here');
const am_btn = document.querySelector('#add_members_btn');
const this_id = document.querySelector('#current_id');

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
////



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
            current_room_id: ROOM_ID,
        })
    })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            display_users_here.style.display = 'none';
            displayGroupMembers();
        })
})
////


///// add message section
let send_message_btn = document.querySelector('#send_message_btn');
let message_input = document.querySelector('#message_input');

send_message_btn.addEventListener('click', () => {
    if (message_input.value !== '' && ROOM_ID !== 0) {

        fetch('index.php?page=home', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                addMessage: true,
                roomId: ROOM_ID,
                content: message_input.value,
            })
        })

            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        message_input.value = '';
    } else {
        message_input.value = '';
        message_input.placeholder = 'try again ... ';
    }
});
////


// display messages section
let display_messages_here = document.querySelector('#display_messages_here');
function displayMessages() {
    display_messages_here.innerHTML = '';
    fetch('index.php?page=', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            room_messages: true,
            ri: ROOM_ID,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(message => {
                display_messages_here.innerHTML += `
                            <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                                <div class="flex flex-row items-center">
                                    <div class="flex flex-col items-center justify-center h-10 w-10 flex-shrink-0 mt-2">
                                        <img src="assets/img/${message.image}" alt="" style="border-radius: 100px; border-color: black; border-width: 1px;">
                                        <p style="font-size: 8px;">${message.username}</p>
                                    </div>
                                    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                        <div>${message.content}</div>
                                    </div>
                                </div>
                            </div>
                `;
            });
        });
}
////


// rooms im in section
const rooms_im_in_here = document.querySelector('#rooms_im_in_here');
function displayRoomsImIN() {
    rooms_im_in_here.innerHTML = '';
    fetch('index.php?page=home',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            roomsImIN: true,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach((room, i) => {
                rooms_im_in_here.innerHTML += `
                <button room-id="${room.room_id}" class="roomsShort flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
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
////
displayRoomsImIN();

///////
rooms_im_in_here.addEventListener('click', function(event) {
    am_btn.style.display = 'none';
    const targetButton = event.target.closest('.roomsShort');
    rooms_im_in_here.querySelectorAll('.roomsShort').forEach(button => {
        button.style.backgroundColor = 'white';
    });
    targetButton.style.backgroundColor = 'rgba(62,13,208,0.4)';

    if (targetButton) {
        ROOM_ID = targetButton.getAttribute('room-id');
        console.log('Clicked Room ID:', ROOM_ID);
        displayGroupMembers();
        displayMessages();
    }
});
//////