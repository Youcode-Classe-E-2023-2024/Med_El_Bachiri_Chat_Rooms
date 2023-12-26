const creat_room_btn = document.querySelector('#creat_room_btn');
const creat_room_form = document.querySelector('#creat_room_form');
const close_form = document.querySelector('#close_form');
const add_members_div = document.querySelector('#add_members_div');
const add_members_btn = document.querySelector('#add_members_btn');
const x = document.querySelector('#save_members');


creat_room_btn.addEventListener('click', () => {
    creat_room_form.style.display = creat_room_form.style.display === 'none' ? 'block' : 'none';
});

close_form.addEventListener('click', ()=>{
    creat_room_form.style.display = 'none';
});

add_members_btn.addEventListener('click', ()=>{
    add_members_div.style.display = add_members_div.style.display === 'none' ? 'block' : 'none';

});

save_members.addEventListener('click', ()=>{
    x.style.display = 'none';
})