<?php
if (isset($_POST['register_btn'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $user = User::register($username, $email, $password);

}
