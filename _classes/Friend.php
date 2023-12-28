<?php

class Friend
{
    public $id;
    public $status;

    function __construct($id)
    {
        $this->id = $id;
    }

    function edit()
    {
        global $db;
        $query = "update friend_request set status = ? where request_id = ?";
        $stm = $db->prepare($query);
        $stm->bind_param('s', $this->status);
        return $stm->execute();
    }

    static function makeRequest($creator, $requested)
    {
        global $db;

        $query = "insert into friend_request set status = 'request', request_creator = ?, requested_user = ?";

        $stm = $db->prepare($query);
        $stm->bind_param('ii', $creator,$requested);

        try {
            $execution = $stm->execute();
            if (!$execution) {
                throw new Exception($stm->error);
            }
        } catch (Exception $e) {
            return $e->getMessage();
        }
        return true;
    }

    /**
     * @throws Exception
     */
    static function getRequests($user_id)
    {
        global $db;
        $query = "select friend_request.request_id, friend_request.status, users.user_id, users.username, users.image
        from friend_request
        join users on users.user_id = friend_request.request_creator
        where friend_request.requested_user = ?
        ";

        $stm = $db->prepare($query);
        $stm->bind_param('i', $user_id);
        $execution = $stm->execute();

        if (!$execution) {
            throw new Exception($stm->error);
        }

        $result = $stm->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * @throws Exception
     */
    static function refuseRequest($request_id)
    {
        global $db;
        $query = "delete from friend_request where request_id = ?";

        $stm = $db->prepare($query);
        $stm->bind_param('i', $request_id);
        $execution = $stm->execute();

        if (!$execution) {
            throw new Exception($stm->error);
        }

        return $execution;
    }


    /**
     * @throws Exception
     */
    static function acceptRequest($request_id)
    {

        global $db;
        $query = "update friend_request set status = 'friend' where request_id = ?";

        $stm = $db->prepare($query);
        $stm->bind_param('i', $request_id);
        $execution = $stm->execute();

        if (!$execution) {
            throw new Exception($stm->error);
        }

        return $execution;
    }


    /**
     * @throws Exception
     */
    static function getMyFriends($user_id)
    {
        global $db;

        $query = "
        select
            users.user_id,
            users.username,
            users.image,
            users.email,
            friend_request.request_id
        from
            friend_request
                join
            users on (friend_request.request_creator = users.user_id or friend_request.requested_user = users.user_id)
        where
            (? in (friend_request.request_creator, friend_request.requested_user))
          and friend_request.status = 'friend';
        ";

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