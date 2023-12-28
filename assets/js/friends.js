const request_friends = document.querySelector('#request_friends');
const current_id = document.querySelector('.current_id');
const currentForm = document.querySelector('#add_friend_form');

displayFriendsList();

function displayFriendsList() {
    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            displayUsers: true,
        })
    })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            request_friends.innerHTML = '';
            data.forEach(elm => {
                if (elm.user_id !== current_id.value) {
                    request_friends.innerHTML += `
                    <div class="flex justify-between items-center p-2 bg-white rounded-lg shadow-xl my-2">
                        <img class="h-10 w-10 rounded-full" src="assets/img/${elm.image}"/>
                        <div class="ml-5">
                            <h4 class="text-lg font-semibold leading-tight text-gray-900">${elm.username}</h4>
                        </div>
                        
                        
                        <div class="flex flex-col">
                            <span id="" onclick="blockUser(this)" class="text-xs font-bold uppercase px-2 py-2 shadow-xl cursor-pointer hover:opacity-90 hover:text-red-700 hover:bg-white hover:border-black transition-all ml-4 flex justify-center text-white bg-red-600 border rounded-full">block</span>
                            <input class="" type="hidden" value="${elm.user_id}">
                        </div>
                        
                        <div class="flex flex-col">
                            <span id="add_btn" onclick="addFriend(this)" class="text-xs font-bold uppercase px-2 py-2 shadow-xl cursor-pointer hover:opacity-90 hover:text-white transition-all ml-4 flex justify-center text-green-900 bg-green-400 border rounded-full">add</span>
                            <input class="friend_id" type="hidden" value="${elm.user_id}">
                        </div>
                             
                    </div>
                `;
                }

            })
        });
}
//////


/// block a user function
function blockUser(button){
    let blocked_user = button.nextElementSibling;
    console.log(blocked_user); // Check what element is selected


    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            blockingUserCheck: true,
            userToBlock: blocked_user.value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                button.textContent = 'Blocked';
                button.style.backgroundColor = 'rgba(112,0,0,0.73)';
            }
        });
}
/////





// add friend function
function addFriend(button) {
    const friendIdInput = button.nextElementSibling;

    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            addFriend: true,
            requested_user: friendIdInput.value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                button.textContent = 'Request Sent';
                button.style.backgroundColor = 'rgba(117,78,241,0.73)';
            }
        });

}
//////





// display requests function
const box = document.querySelector('#box');
function displayRequests() {
    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            requestedFriends: true,
        })
    })
        .then(response => response.json())
        .then(data => {
            box.innerHTML = '';
            data.forEach(elm => {
                if (elm.status !== 'friend') {
                    box.innerHTML += `
                        <div class="flex justify-between items-center p-2 bg-white rounded-lg shadow-xl my-2">
                            <img class="h-10 w-10 rounded-full" src="assets/img/${elm.image}"/>
                            <div class="ml-5">
                                <h4 class="text-lg font-semibold leading-tight text-gray-900">${elm.username}</h4>
                            </div>
        
        
                            <div>
                                <span id="add_btn" onclick="ignoreFriend(this)" class="text-xs font-bold uppercase px-2 py-2 shadow-xl cursor-pointer hover:opacity-90 hover:text-white transition-all ml-4 flex justify-center text-green-900 bg-red-600 border rounded-full">Ignore</span>
                                <input class="friend_id" type="hidden" value="${elm.request_id}">
                            </div>
        
                            
                            <div class="flex flex-col">
                                <span id="add_btn" onclick="acceptFriend(this)" class="text-xs font-bold uppercase px-2 py-2 shadow-xl cursor-pointer hover:opacity-90 hover:text-white transition-all ml-4 flex justify-center text-green-900 bg-green-400 border rounded-full">Accept</span>
                                <input class="friend_id" type="hidden" value="${elm.request_id}">
                            </div>
        
                        </div>`;
                }
            });
        });
}
////

displayRequests();



/// refuse or ignore friend request function
function ignoreFriend(button) {
    const ignore = button.nextElementSibling;

    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            refuseRequest: true,
            request_id: ignore.value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                displayRequests();
            }
        });

}
/////



/// accept friend request function
function acceptFriend(button) {
    const accept = button.nextElementSibling;

    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            acceptRequest: true,
            request_ID: accept.value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                displayRequests();
            }
        });

}
/////


// display current user friends function
const display_ur_friends_here = document.querySelector('#display_ur_friends_here');
let current_email = document.querySelector('#current_email');
function displayMyFriends() {
    display_ur_friends_here.innerHTML = '';
    fetch('index.php?page=profile', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            getAllOfMyFriends: true,
        })
    })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].email !== current_email.textContent) { // doing it email cuz id opted not to
                    display_ur_friends_here.innerHTML += `
                        <button value="${data[i].request_id}" onclick="show_to_delete(this)" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
                            <img src="assets/img/${data[i].image}" class="w-16 rounded-full">
                            <p class="text-center font-bold text-sm mt-1">${data[i].username}</p>
                        </button>
                    `;
                }
            }
        });
}
/////



/// show delete little pop up function
let user_to_delete_id = 0;
function show_to_delete(btn) {
    user_to_delete_id = btn.value;
    btn.innerHTML += `<p onclick="delete_friend()" class="absolute bg-red-200 shadow-xl rounded-xl w-20 flex justify-center" style="bottom: 4%;">Delete</p>`;
}
/////



/// delete friend function
function delete_friend() {
    fetch('index.php?page=profile', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            refuseRequest: true,
            request_id: user_to_delete_id,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                displayMyFriends();
            }
        });
}
/////


displayMyFriends();
