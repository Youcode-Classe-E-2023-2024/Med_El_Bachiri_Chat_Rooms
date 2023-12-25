<?php

if (empty($_SESSION['user_id'])) {
    header('location: index.php?page=login');
}


if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    header('Content-Type: application/json');
    try {
        $rooms = Room::getUserRooms($_SESSION['user_id']);
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['room_name']) && !empty($data['room_name']))
    {
        $room = Room::creat($_SESSION['user_id'], $data['room_name']);
        if ($room)
        {
            $rooms[] = ['message' => 'the room added successfully'];
            echo json_encode($rooms);
            exit();
        }
    }
    else
    {
        $rooms[] = ['message' => 'the input is empty'];
        echo json_encode($rooms);
        exit();
    }
}
