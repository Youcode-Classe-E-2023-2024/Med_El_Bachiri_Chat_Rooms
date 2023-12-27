<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['getMyFriends']) && $data['getMyFriends'] === true)
    {
        try {
            echo json_encode(Friend::getMyFriends($_SESSION['user_id']));
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        exit();
    }
}