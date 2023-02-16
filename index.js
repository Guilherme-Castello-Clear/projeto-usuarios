var fields = document.querySelectorAll("#form-user-create [name]");
fields.forEach(function(field, index){

    if(field.name == 'gender' && field.checked){
        console.log("SIM", field);
    }
    else{
        console.log("NÃO");
    }

    //console.log(index, field.name);

});