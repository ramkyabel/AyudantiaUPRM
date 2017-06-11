$(document).ready(function() {
    var max_fields      = 100; //maximum input boxes allowed
    var wrapper         = $("#meter"); //Fields wrapper
    var add_button      = $(".addButton"); //Add button ID
    var remove_Button = $(".removeButton");
    var next = 0; //initlal text box count

    var button = $ ('<div class="form-group">'
                +'<div class="col-sm-4 col-sm-offset-2">'+'<button type="button" class="btn btn-default removeButton">+</button></div>').click(function(e){
        e.preventDefault();
         $(this).parent().remove();
    });

    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(next < max_fields){ //max input box allowed
            next++; //text box increment
            var input = $ ('<div class="form-group">'
                +'<div class="col-sm-4 col-sm-offset-2">'
                    +'<input class="form-control" list="clases" name="class['+ next +'][name]" placeholder="Matexxxx">'
                    +'<datalist id="clases">'
                        +'<option value="Ayudantia"></option>'
                        +'<option value="Tutoria"></option>'
                        +'<option value="Mate5000"></option>'
                        +'<option value="COMP6000"></option>'
                    +'</datalist>'
                +'</div>'
                +'<div class = "col-sm-1">'
                    +'<select type ="int" class="form-control" name ="class['+ next +'][credits]">'
                        +'<option>1</option>'
                        +'<option>2</option>'
                        +'<option>3</option>'
                        +'<option>4</option>'
                        +'<option>5</option>'
                    +'</select>'
                +'</div>'
                +'<div class="col-sm-5">'
                    + '<button type="button" class="btn btn-danger removeButton">-</button>'
                +'</div>'
            +'</div>');
          
            $(wrapper).before(input);
      //add input box
        }
    });
  $(document).on("click", ".removeButton" , function() {
    
              $(this).parent().parent().remove();
            });
});
