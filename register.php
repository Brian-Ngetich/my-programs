<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $full_name = mysqli_real_escape_string($conn, $_POST['full_name']);
    $national_id = mysqli_real_escape_string($conn, $_POST['national_id']);
    $dob = mysqli_real_escape_string($conn, $_POST['dob']);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $county = mysqli_real_escape_string($conn, $_POST['county']);
    $constituency = mysqli_real_escape_string($conn, $_POST['constituency']);
    $ward = mysqli_real_escape_string($conn, $_POST['ward']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);

    // Check for duplicate National ID
    $checkSql = "SELECT * FROM voters WHERE national_id='$national_id'";
    $checkResult = mysqli_query($conn, $checkSql);

    if (mysqli_num_rows($checkResult) > 0) {
        header("Location: index.html?status=error");
        exit();
    }

    $sql = "INSERT INTO voters 
    (full_name, national_id, dob, gender, county, constituency, ward, phone)
    VALUES 
    ('$full_name', '$national_id', '$dob', '$gender', '$county', '$constituency', '$ward', '$phone')";

    if (mysqli_query($conn, $sql)) {
        header("Location: index.html?status=success");
        exit();
    } else {
        header("Location: index.html?status=error");
        exit();
    }
}
?>
