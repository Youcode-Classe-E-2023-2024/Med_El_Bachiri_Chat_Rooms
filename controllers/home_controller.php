<?php

if (empty($_SESSION['user_id'])) {
    header('location: index.php?page=login');
}


if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    header('Content-Type: application/json');
    $rooms = Room::getUserRooms($_SESSION['user_id']);
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['room_name']) && !empty($data['room_name']))
    {
        $room = Room::creat($_SESSION['user_id'], $data['room_name']);
        if ($room)
        {
            array_push($rooms,['sucsess' => 'hey the room added succ']);
            echo json_encode($rooms);
            exit();
        }
    }
    else
    {
        array_push($rooms,['hamid' => 'the input is empty']);
        echo json_encode($rooms);
        exit();
    }
}
