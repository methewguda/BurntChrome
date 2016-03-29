<?php
    include('connection.php');


    $sql = "select * from whitelist";
    $result = mysqli_query($conn, $sql) or die("Error: " . mysqli_error($conn));
    $myArray = array();

    while($row = mysqli_fetch_assoc($result)){
        $myArray[] = $row;
    }

    mysqli_close($conn);


    header('Content-Type: application/json');
    //$json = file_get_contents('JSONData/lists.json');
    $json = json_encode($myArray, JSON_UNESCAPED_SLASHES);

    echo $json;