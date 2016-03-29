<?php
    $DB_HOST = 'db619557913.db.1and1.com';
    $DB_NAME = 'db619557913';
    $DB_USER = 'dbo619557913';
    $DB_PASS = 'Sirius|2016|';

// Create connection
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}