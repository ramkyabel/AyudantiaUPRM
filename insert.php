<?php
#ejemplo de insertar
include_once "connect.php";

if($_POST)
{
	print_r($_POST);

	$firstName = mysqli_escape_string ($conn, $_POST ['firstName']);
	$lastName = mysqli_escape_string ($conn, $_POST ['lastName']);
	$id = (int) mysqli_escape_string ($conn, $_POST ['idAdd']);
	$salary = (int) mysqli_escape_string ($conn, $_POST['salary']);  
	
	$anyclass = false;


	for ($i = 0; $i < count ($_POST ['class']); $i++)
	{
		if ($_POST ['class'][$i]['name'] != '')
		{
			$anyclass = true;
			break;
		}

	} 


	if ($firstName != '' AND $lastName != '' AND $id != '' AND $anyclass AND $salary != '')
	{
		$checkid = "INSERT INTO `students` (`id`) VALUES ($id)";
		if (mysqli_query ($conn, $checkid))
		{
			
			$queryaddstudent = "UPDATE `students` SET `firstName` = '$firstName', `lastName` = '$lastName', `salary`='$salary' WHERE `id`=$id";

			if (mysqli_query($conn,$queryaddstudent))
			{
				foreach ($_POST['class'] as $class)
			    {
			    	if ($class ['name'] != '')
			    	{
				    	$tempclass = $class ['name'];
				    	$tempcredits = (int) $class['credits'];
			    		$queryaddclass = "INSERT INTO `students_classes` (`class`,`id`,`credit`) VALUES ('$tempclass', $id, '$tempcredits');";
						$querysumcredits = "UPDATE `students` SET `credits` = `credits`+'$tempcredits' WHERE `students`.`id` = '$id';";
			      
						if (mysqli_query($conn,$queryaddclass))
						{
							mysqli_query($conn, $querysumcredits);
							header('Location:success.html');
						}
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

