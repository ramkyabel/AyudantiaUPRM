<?php
#ejemplo de borrar
include_once "connect.php";


$id = mysqli_escape_string ($conn, $_POST ['id']);

$query = "DELETE FROM `students` WHERE `id`='$id';";
if (mysqli_query ($conn,$query))
{
	header ('Location:deletesuccess.html');
}

?>