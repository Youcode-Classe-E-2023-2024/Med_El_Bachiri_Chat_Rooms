<?php

if (isset($_SESSION['user_id'])) {
    header('location: index.php?page=home');
}

if (isset($user) && $user){
    header('location: index.php?page=login');
}