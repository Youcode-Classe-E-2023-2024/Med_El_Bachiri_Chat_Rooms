const request_friends = document.querySelector('#request_friends');
const current_id = document.querySelector('#current_id');
const botona = document.querySelector('#add_friends_btn');


request_friends.innerHTML = '';
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
            if (elm.user_id !== current_id.value) {
                request_friends.innerHTML += `
                    <div class="flex justify-between items-center p-2 bg-white rounded-lg shadow-xl my-2">
                        <img class="h-10 w-10 rounded-full" src="assets/img/${elm.image}"/>
                        <div class="ml-5">
                            <h4 class="text-lg font-semibold leading-tight text-gray-900">${elm.username}</h4>
                        </div>
                        <div class="flex flex-col">
                            <span id="add_btn" class="text-xs font-bold uppercase px-2 py-2 shadow-xl cursor-pointer hover:opacity-90 hover:text-white transition-all ml-4 flex justify-center text-green-900 bg-green-400 border rounded-full">add</span>
                            <input class="friend_id" type="hidden" value="${elm.user_id}">
                        </div>
                    </div>
                `;
            }

        })
    });
