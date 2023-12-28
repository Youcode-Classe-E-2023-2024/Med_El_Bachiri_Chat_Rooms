<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['getAllOfMyFriends']) && $data['getAllOfMyFriends'] === true)
    {
        try {
            echo json_encode(Friend::getMyFriends($_SESSION['user_id']));
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        exit();
    }


    if (isset($data['refuseRequest']) && $data['refuseRequest'] === true && isset($data['request_id']))
    {
        try {
            echo json_encode(Friend::refuseRequest($data['request_id']));
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        exit();
    }

}