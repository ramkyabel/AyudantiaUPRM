<?php
#ejemplo de insertar
include_once "connect.php";
//MAKE THE EDIT TO MATCH THE $_POST, ADD UPDATED CLASSES 
if($_POST)
{
	$firstName = mysqli_escape_string ($conn, $_POST ['firstName']);
	$lastName = mysqli_escape_string ($conn, $_POST ['lastName']);
	$idOld = (int) mysqli_escape_string ($conn, $_POST ['idAdd']);
	$idNew = (int) mysqli_escape_string ($conn, $_POST ['idEdit']);
	$salary = (int) mysqli_escape_string ($conn, $_POST['salary']);  

	print_r($_POST);
	
	$anyclass = false;


	foreach ($_POST['class'] as $class)
	{
		if ($class['name'] != '')
		{
			$anyclass = true;
			break;
		}

	}

	if ($firstName != '' AND $lastName != '' AND $idOld != '' AND $idNew != '' 
		AND $anyclass AND $salary != '')
	{
		$checkid = "UPDATE `students` SET `id` = '$idNew', `credits`=0,
		`firstName` = '$firstName',`lastName` = '$lastName', `salary` = '$salary'
		 WHERE `id`= '$idOld'";
		
		if (mysqli_query ($conn, $checkid))
		{
			$resetclasses = "DELETE FROM `students_classes` WHERE `id`=$idNew";
			mysqli_query ($conn, $resetclasses);
			
			foreach ($_POST['class'] as $class)
		    {
			    	if ($class ['name'] != '')
			    	{
				    	$tempclass = $class ['name'];
				    	$tempcredits = (int) $class['credits'];
			    		$queryaddclass = "INSERT INTO `students_classes` (`class`,`id`,`credit`)
			    		 VALUES ('$tempclass', $idNew, '$tempcredits');";
						$querysumcredits = "UPDATE `students` SET `credits` = `credits`+'$tempcredits'
						 WHERE `id` = '$idNew';";
			      
						if (mysqli_query($conn,$queryaddclass))
						{
							mysqli_query($conn, $querysumcredits);
							header('Location:updated.html');
						}
			    	}

				}
					
			
		}
		else
			header('Location:userindb.html');
	}
	else
		header('Location:inputempty.html');
	
}	

