// const save_profile_btn = document.querySelector('#save_profile_btn');
// const profile_pc = document.querySelector('#profile_picture');
//
// save_profile_btn.addEventListener('click', () => {
//     // Extract the filename from the fake path
//     const filename = profile_pc.value.split('\\').pop();
//
//     alert(filename);
//
//     fetch('index.php?page=profile', {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             image: profile_pc.value,
//         }),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
// });
