<?php

#ejemplo de printear

include_once "connect.php";

$query = "SELECT * FROM `students` ORDER BY `id` ASC";

$infouser = mysqli_query ($conn,$query);


while($student = mysqli_fetch_assoc($infouser)) 
{
	echo '<tr>';
		//<td>ID</td>
    	echo '<th scope = "row">'.$student['id'].'</th>';
    	//<td>first</td>
		echo '<td>'.$student['firstName'].'</td>';
		//<td>last</td>
		echo '<td>'.$student['lastName'].'</td>';
		echo '<td>$'.$student ['salary'].'</td>';

		echo '<td>';
			echo '<table class="table" >';
				echo '<thead>';
        			echo '<th>Name</th>';
        			echo '<th>Credit</th>';
				echo '</thead>';
			$id = $student['id'];

			$query2 = "SELECT class,credit FROM `students_classes` WHERE `id`='$id'";
			$infoclases = mysqli_query ($conn,$query2);
	
			while ($class = mysqli_fetch_assoc ($infoclases))
			{
				echo '<tr>';
					echo '<td>'.$class ['class'].'</td>';
					echo '<td>'.$class ['credit']."</td>";
				echo '</tr>';
			}
				echo '<tr>';
				echo '<th>Total Credits</th>';
				echo '<th scope = "row">'.$student['credits'].'</th>';
				echo '</tr>';
			echo '</table>';
		echo '</td>';

		//Save current Student info to extract from jQuery and print to edit modal.
		echo '<td class = "hidden edit-action">
			  	<button data-toggle="modal" data-target="#insertStudentModal" type="button" class="editStudent btn btn-sm btn-success">
					<span class="glyphicon glyphicon-pencil"></span>
					<div class="hidden firstName">'.$student['firstName'].'</div>
					<div class="hidden lastName">'.$student['lastName'].'</div>
					<div class="hidden idOld">'.$student['id'].'</div>
					<div class="hidden salary">'.$student['salary'].'</div>';
					
					$infoclases = mysqli_query ($conn,$query2);
					$i = 0;
					while ($class = mysqli_fetch_assoc ($infoclases))
					{

						echo '<div class="hidden class'.$i.'">'.$class ['class'].'</div>';
						echo '<div class="hidden credit'.$i.'">'.$class ['credit'].'</div>';
						$i++;
					}
					echo '<div class = "hidden classNum">'.$i.'</div>';

				echo '</button>';
			 
		echo '<button data-toggle="modal" data-target="#deleteStudentModal" type="button" class="deleteStudent btn btn-sm btn-danger">
				<span class="glyphicon glyphicon-remove"></span>
				<div class="hidden idDelete">'.$student['id'].'</div>
				</button>
			 </td>';
	echo '</tr>';
	
}


?>