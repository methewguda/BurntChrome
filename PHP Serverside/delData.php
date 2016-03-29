<?php
    include ('connection.php');
    $list_ID = $_POST['del'];

    $sql = "DELETE FROM whitelist WHERE list_ID=" . $list_ID;
    $result = mysqli_query($conn, $sql) or die("Error: " . mysqli_error($conn));
    mysqli_close($conn);