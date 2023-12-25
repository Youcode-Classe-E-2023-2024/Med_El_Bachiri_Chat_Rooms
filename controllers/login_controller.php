<?php

if (isset($_SESSION['user_id'])) {
    header('location: index.php?page=home');
}

if (isset($_SESSION['user_id']) && isset($_POST['logout_btn'])) {
    session_destroy();
}