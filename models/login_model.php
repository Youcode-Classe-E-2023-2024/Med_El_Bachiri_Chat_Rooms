<?php
if(isset($_POST['login_btn'])){
    $email = $_POST['email'];
    $password = $_POST['password'];
    $user = User::login($email, $password);
    if (isset($user) && $user !== false){
        header('location: index.php?page=home');
        $_SESSION['user_id'] = $user;
    } else {
        header('location: index.php?page=login');
    }
}