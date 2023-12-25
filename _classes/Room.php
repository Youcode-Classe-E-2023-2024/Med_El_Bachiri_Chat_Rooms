<?php

class Room
{
    public $id;
    public $name;
    public $creator_id;

    static function creat($creator_id, $room_name)
    {
        global $db;

        $query = "INSERT INTO rooms (creator_id, room_name) VALUES (?, ?)";
        $stm = $db->prepare($query);
        $stm->bind_param('is', $creator_id, $room_name);

        try {
            $execution = $stm->execute();
            if (!$execution) {
                throw new Exception($stm->error);
            }
        }
        catch (Exception $e) {
            return $e->getMessage();
        }
        return true;
    }

    static function getUserRooms($user_id)
    {
        global $db;

        $query = "SELECT * FROM rooms WHERE creator_id = ?";
        $stm = $db->prepare($query);
        $stm->bind_param('i', $user_id);
        $execution = $stm->execute();

        if (!$execution) {
            throw new Exception($stm->error);
        }

        $result = $stm->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);    
    }
}