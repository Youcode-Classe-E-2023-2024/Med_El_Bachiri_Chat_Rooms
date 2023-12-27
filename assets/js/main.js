const creat_room_btn = document.querySelector('#creat_room_btn');
const creat_room_form = document.querySelector('#creat_room_form');
const close_form = document.querySelector('#close_form');
const add_members_div = document.querySelector('#add_members_div');
const add_members_btn = document.querySelector('#add_members_btn');
const sm = document.querySelector('#save_members');
const add_friends_btn = document.querySelector('#add_friends_btn');
const add_friend_form = document.querySelector('#add_friend_form');
const close_friends_form = document.querySelector('#close_friends_form');
const friend_requests = document.querySelector('#friend_requests');
const requested_friends_form = document.querySelector('#requested_friends_form');
const cls = document.querySelector('#cls');


creat_room_btn.addEventListener('click', () => {
    creat_room_form.style.display = creat_room_form.style.display === 'none' ? 'block' : 'none';
});

close_form.addEventListener('click', ()=>{
    creat_room_form.style.display = 'none';
});

add_members_btn.addEventListener('click', ()=>{
    add_members_div.style.display = add_members_div.style.display === 'none' ? 'block' : 'none';

});

save_members.addEventListener('click', () => {
    sm.style.display = 'none';
});

add_friends_btn.addEventListener('click', () => {
    add_friend_form.style.display = add_friend_form.style.display === 'none' ? 'block' : 'none';
});
close_friends_form.addEventListener('click', () => {
    add_friend_form.style.display = 'none';
});

friend_requests.addEventListener('click', () => {
    requested_friends_form.style.display = add_friend_form.style.display === 'none' ? 'block' : 'none';
});

cls.addEventListener('click', () => {
    requested_friends_form.style.display = 'none';
});