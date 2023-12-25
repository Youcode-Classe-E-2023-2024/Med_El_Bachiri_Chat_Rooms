const button_room = document.querySelector('#button_room');
const room_name = document.querySelector('#room_name');
const x = document.querySelector('#creat_room_form');
const rooms_div = document.querySelector('#display_rooms_here');

displayRooms();

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
            alert(data[data.length - 1].message);
            displayRooms();
        })
});

function displayRooms()
{
    fetch('index.php?page=home',{
        method: "POST", // Specify the method as GET
        headers: {"Content-Type": "application/json"},
    })
        .then(response => response.json())
        .then(data =>
        {
            console.log(data);
            data.forEach((room, i) =>
            {
                if (i < data.length - 1)
                {
                    rooms_div.innerHTML += `
                        <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                            <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                <p>${room.room_id}</p>
                            </div>
                            <div class="ml-2 text-sm font-semibold flex flex-col items-start">
                                ${room.room_name}
                                <p style="font-size: 10px">${room.created_at}</p>
                            </div>
                        </button>
                    `;
                }
            })
        });
}
