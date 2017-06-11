var rh = rh || {};
rh.mq = rh.mq || {}; 

rh.mq.editing = false;
//ADD SPECIFIC CREDITS CLASSES ON .EDITSTUDENT

rh.mq.attachEventHandlers = function ()
{
    $("#insertStudentModal").on ('shown.bs.modal', function (){
        $("input[name=firstName]").focus ();
    });
};

rh.mq.enableButtons = function () { 
    $("#toggle-edit").click (function () {
    if (rh.mq.editing) {
        rh.mq.editing = false;
        $(".edit-action").addClass("hidden");
        $(this).html ("<span class='glyphicon glyphicon-edit'></span> Edit");
    }
    else {
        rh.mq.editing = true;
        $(".edit-action").removeClass("hidden");
        $(this).html ("<span class='glyphicon glyphicon-ok'></span> Done");
    }   
    });

    $("#addStudent").click (function () {
        //Removes the classes added in Edit functionality.
        $(".classAdded").remove();
        $(".creditAdd").removeClass ("hidden");
        $(".creditEdit").addClass ("hidden");
        $("#form_students").attr ('action', "insert.php");
        $(".id-add").removeClass("hidden");
        $(".id-add").find ("input[name='idAdd']").attr ("required", true);
        $(".id-edit").find ("input[name='idEdit']").attr ("required", false);
        $(".id-edit").addClass("hidden");
        $("#insertStudentModal .modal-title").html ("Add Student");
        $("#insertStudentModal button[type=submit]").html ("Submit");
    
        $("#insertStudentModal input[name=firstName]").val ("");
        $("#insertStudentModal input[name=lastName]").val ("");
        $("#insertStudentModal input[name=salary]").val ("");
        $("#insertStudentModal input[name=idAdd]").val ("");
        $("#insertStudentModal input[name='class[0][name]']").val ("");

    });


    $(".editStudent").click (function () {
        //Resets previous added classes.
        $(".classAdded").remove();
        $(".creditAdd").addClass ("hidden");
        $(".creditEdit").remove ();

        $("#form_students").attr ('action', "edit.php");
        $(".id-edit").removeClass("hidden");
        $(".id-edit").find ("input[name='idEdit']").attr ("required", true);
        $(".id-add").find ("input[name='idAdd']").attr ("required", false);
        $(".id-add").addClass("hidden");
        $("#insertStudentModal .modal-title").html ("Edit Student");
        $("#insertStudentModal button[type=submit]").html ("Edit Student");

        //Looks for current hidden Student info on HTML.
        firstName = $(this).find (".firstName").html ();
        lastName = $(this).find (".lastName").html ();
        id = $(this).find (".idOld").html ();
        salary = $(this).find (".salary").html ();
        numClasses = $ (this).find (".classNum").html ();
        
        //Inserts Info into inputs.
        $("#insertStudentModal input[name=firstName]").val (firstName);
        $("#insertStudentModal input[name=lastName]").val (lastName);
        $("#insertStudentModal input[name=salary]").val (salary);
        $("#insertStudentModal input[name=idEdit]").val (id);
        $("#insertStudentModal input[name=idAdd]").val (id);

        classCredit0 = $(this).find (".credit0").html ();

        //Change the selected option to the speficic one depending on class. 
        $(".addButtonReference").before ('<div class = "col-sm-2 creditEdit">'
                    +'<select type ="int" class="form-control" id="optionSelection0" name ="class[0][credits]">'
                        +'<option id="option1">1</option>'
                        +'<option id="option2">2</option>'
                        +'<option id="option3">3</option>'
                        +'<option id="option4">4</option>'
                        +'<option id="option5">5</option>'
                        +'<option id="option6">6</option>'
                    +'</select>'
                +'</div>');

        $('#optionSelection0').children ("#option"+classCredit0).attr ("selected", true);

        className0 = $(this).find (".class0").html ();
        $("#insertStudentModal input[name='class[0][name]'").val (className0);
       
        for (var i = 1; i < numClasses; i++) {
            $('#meter').before ('<div class="form-group classAdded">'
                +'<div class="col-sm-4 col-sm-offset-2">'
                    +'<input class="form-control" list="clases" name="class['+ i + 0 + 0 +'][name]" placeholder="Matexxxx">'
                    +'<datalist id="clases">'
                        +'<option value="MATE"></option>'
                        +'<option value="COMP"></option>'
                    +'</datalist>'
                +'</div>'
                +'<div class = "col-sm-2">'
                    +'<select type ="int" class="form-control" id="optionSelection'+i+ '" name ="class['+ i + 0 + 0 +'][credits]">'
                    +'<option id="option1">1</option>'
                    +'<option id="option2">2</option>'
                    +'<option id="option3">3</option>'
                    +'<option id="option4">4</option>'
                    +'<option id="option5">5</option>'
                    +'<option id="option6">6</option>'
                    +'</select>'
                +'</div>'
                +'<div class="col-sm-4">'
                    + '<button type="button" class="btn btn-danger removeButton"><span class="glyphicon glyphicon-minus"></span></button>'
                +'</div>'
            +'</div>');
    
            classCredit = $(this).find (".credit" + i).html ();
            className = $(this).find (".class" + i).html ();

            $('#optionSelection'+i).children ("#option"+classCredit).attr ("selected",true);

            $("#insertStudentModal input[name='class["+i + 0 + 0 +"][name]'").val (className);
        };

    });

    $(".deleteStudent").click (function ()
    {
        idtoDelete = $(this).find (".idDelete").html ();
        $("#deleteStudentModal input[name=id]").val (idtoDelete);
    });


};

$(document).ready(function() {

    rh.mq.enableButtons ();
    rh.mq.attachEventHandlers ();

    var wrapper         = $("#meter"); //Fields wrapper
    var add_button      = $(".addButton"); //Add button ID
    var remove_Button = $(".removeButton");
    var next = 0; //initlal text box count

    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();

        next++; //text box increment
        var input = $ ('<div class="form-group classAdded">'
            +'<div class="col-sm-4 col-sm-offset-2">'
                +'<input class="form-control" list="clases" name="class['+ next +'][name]" placeholder="Matexxxx">'
                +'<datalist id="clases">'
                    +'<option value="Ayudantia"></option>'
                    +'<option value="Tutoria"></option>'
                    +'<option value="Mate5000"></option>'
                    +'<option value="COMP6000"></option>'
                +'</datalist>'
            +'</div>'
            +'<div class = "col-sm-2">'
                +'<select type ="int" class="form-control" name ="class['+ next +'][credits]">'
                    +'<option>1</option>'
                    +'<option>2</option>'
                    +'<option selected>3</option>'
                    +'<option>4</option>'
                    +'<option>5</option>'
                    +'<option>6</option>'
                +'</select>'
            +'</div>'
            +'<div class="col-sm-4">'
                + '<button type="button" class="btn btn-danger removeButton"><span class="glyphicon glyphicon-minus"></span></button>'
            +'</div>'
        +'</div>');
      
        $(wrapper).before(input);

        
    });

    //removes current dynamically added class.
    $(document).on("click", ".removeButton" , function() {
      
        $(this).parent().parent().remove();
    });

});



