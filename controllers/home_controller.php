<?php

if (empty($_SESSION['user_id'])) {
    header('location: index.php?page=login');
}


if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $data = json_decode(file_get_contents('php://input'), true);


    if (isset($data['room_name']) && !empty($data['room_name'])) // check if request related to creating room
    {
        $room = Room::creat($_SESSION['user_id'], $data['room_name']);
        if ($room)
        {
            echo json_encode(['message' => 'the room added successfully']);
            exit();
        }
    }


    if (isset($data['displayRooms']) && $data['displayRooms'] === true) // check if the request is to display rooms
    {
        header('Content-Type: application/json');
        try {
            $rooms = Room::getUserRooms($_SESSION['user_id']);
            echo json_encode($rooms);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        exit();
    }


    if (isset($data['displayUsers']) && $data['displayUsers'] === true) {
        echo json_encode(User::getAll());
        exit();
    }

    if (isset($data['AddUsersToRoom']) && $data['AddUsersToRoom'] === true) {
        foreach ($data['users'] as $u) {
            try {
                Room::addMember($u, 91);
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
        exit();
    }

    if (isset($data['displayGroupMembers']) && $data['displayGroupMembers'] === true) {

        try {
            $members = Room::getRoomMembers(91);
            echo json_encode($members);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        exit();
    }
}
