<?php

class User
{
    public $id;
    public $email;
    public $username;
    public $image;
    private $password;

    public function __construct($id)
    {
        global $db;

        $query = "SELECT * FROM users WHERE user_id = ?";
        $stm = $db->prepare($query);
        $stm->bind_param('i', $id);
        $stm->execute();
        $result = $stm->get_result();
        $user = $result->fetch_assoc();

        if ($result->num_rows > 0) {
            $this->id = $user['user_id'];
            $this->email = $user['email'];
            $this->username = $user['username'];
            $this->image = $user['image'];
            $this->password = $user['password'];
        }
    }

    static function getAll()
    {
        global $db;
        $result = $db->query("SELECT * FROM users");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function edit()
    {
        global $db;
        $query = "UPDATE users SET username = ?, email = ?, password = ?, image = ? WHERE user_id = ?";
        $stm = $db->prepare($query);
        $stm->bind_param('ssssi', $this->username, $this->email, $this->password, $this->image, $this->id);
        return $stm->execute();
    }


    public function setPassword($pwd)
    {
        $this->password = password_hash($pwd, PASSWORD_DEFAULT);
    }


    /**
     * @throws Exception
     */
    static function register($username, $email, $password)
    {
        global $db;

        if (self::checkIfUserExist($email))
        {
            return false;
        }

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, 'default_profile.png')";
        $stm = $db->prepare($query);
        $stm->bind_param('sss', $username, $email, $hashed_password);

        try {
            $execution = $stm->execute();
            if (!$execution) {
                throw new Exception($stm->error);
            }
        }
        catch (Exception $e) {
            $x = strpos($e->getMessage(), 'Duplicate entry'); // returns the position of "Duplicate entry" if exists
            if ($x !== false) {
                return false;
            }
        }
        return true;
    }


    static function checkIfUserExist($email)
    {
        global $db;
        $query = "SELECT * FROM users WHERE email = ?";
        $stm = $db->prepare($query);
        $stm->bind_param('s', $email);
        $exe = $stm->execute();
        $result = $stm->get_result();

        if (!$exe) {
            throw new Exception($stm->error);
        }
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            return false;
        }
    }


    /**
     * @throws Exception
     */
    static function login($email, $password){
        $user = self::checkIfUserExist($email);
        if ($user !== false) {
            if (password_verify($password, $user['password'])) {
                return $user['user_id'];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    static function block($blocker, $blocked_user)
    {
        global $db;

        $query = "insert into block(blocker, blocked_user) values (?, ?)";

        $stm = $db->prepare($query);
        $stm->bind_param('ii', $blocker,$blocked_user);

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

}