<?php
$host = "localhost";
$user = "root";
$password = "smith@123";
$database = "voting";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Database connection failed");
}
?>
