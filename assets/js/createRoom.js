const button_room = document.querySelector('#button_room');
const room_name = document.querySelector('#room_name');
const x = document.querySelector('#creat_room_form');

button_room.addEventListener('click', ()=>{
    fetch('index.php?page=home', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            room_name: room_name.value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log();
            // hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            room_name.value = '';
            x.style.display = 'none';
            alert('added succ !');
        })
})