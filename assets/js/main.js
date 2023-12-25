const creat_room_btn = document.querySelector('#creat_room_btn');
const creat_room_form = document.querySelector('#creat_room_form');
const close_form = document.querySelector('#close_form');

creat_room_btn.addEventListener('click', () => {
    creat_room_form.style.display = creat_room_form.style.display === 'none' ? 'block' : 'none';
});

close_form.addEventListener('click', ()=>{
    creat_room_form.style.display = 'none';
})