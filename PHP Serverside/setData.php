<?php
    include ('connection.php');

    $list_ID = mt_rand(10000000, 99999999);
    $list_URL = $_POST['addList'];

    $sql = "INSERT INTO whitelist (`list_ID`, `list_URL`) VALUE ('". $list_ID."', '".$list_URL."')";
    $result = mysqli_query($conn, $sql) or die("Error: " . mysqli_error($conn));
    mysqli_close($conn);