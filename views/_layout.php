<?php isset($_SESSION['user_id']) ? $user = new User($_SESSION['user_id']) : $user = null; ?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= ucfirst($page) ?></title>
    <?php if($page === 'login' || $page === 'register') { ?><link rel="stylesheet" href="<?= PATH ?>/assets/css/register.css"> <?php } ?>
    <link rel="stylesheet" href="<?= PATH ?>/assets/css/<?= $page ?>.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        /* Custom styles for scrollbar */
        ::webkit-scrollbar {
            width: 3px;
        }

        ::webkit-scrollbar-track {
            background-color: white; /* White background */
        }

        ::webkit-scrollbar-thumb {
            background-color: #ddd; /* Grey thumb color */
            border-radius: 3px;
        }

        ::webkit-scrollbar-thumb:hover {
            background-color: white; /* Light grey thumb color on hover */
        }
    </style>

</head>
<body class="bg-gray-100">

    <?php if (isset($_SESSION['user_id'])) { ?>

        <!-- component -->
        <nav class="bg-white border w-100 px-8 md:px-auto">
            <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                <!-- Logo -->
                <a href="index.php?page=home" class="text-indigo-500 md:order-1">
                    <img src="<?= PATH . 'assets/img/logo.png' ?>" class="h-8" alt="">
                </a>
                <div class="order-2 md:order-3 flex">
                    <form action="index.php?page=login" method="post">
                        <button name="logout_btn" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </form>
                    <a href="index.php?page=profile" class="flex justify-center items-center">
                        <img src="<?= PATH . 'assets/img/' . $user->image ?>" class="rounded-full h-10 ml-4 shadow-xl cursor-pointer border border-black">
                    </a>
                </div>
            </div>
        </nav>


    <?php } ?>


    <main>
        <?php include_once 'views/' . $page . '_view.php'; ?>
    </main>

    <footer></footer>
    <script src="<?= PATH ?>assets/js/main.js"></script>
    <script src="<?= PATH ?>assets/js/createRoom.js"></script>
</body>
</html>