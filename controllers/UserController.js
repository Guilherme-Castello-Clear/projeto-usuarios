class UserController{
    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.TableEl = document.getElementById(tableId);
        this.onSubmit();

    }

    onSubmit(){
       //Take the the click on Submit button
        this.formEl.addEventListener("submit", (event)=>{
            
            event.preventDefault();//Stop page refresh.

            let values = this.getValues();

            this.getPhoto().then(
                (content)=>{
                    values.photo = content;
                    this.addLine(values);

                },
                (e)=>{
                    console.error(e);
            });
            
        });

    }

    getPhoto(){

        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader(); //Create a instance of class FileReader.
            let elements = [...this.formEl.elements].filter(item=>{
                if(item.name === 'photo'){//Take photo field element.
                    return item;
                }
            });
    
            let file = elements[0].files[0];
    
            fileReader.onload = () =>{
                resolve(fileReader.result);
    
            }
            fileReader.onerror = (e)=>{
                reject(e);
            }
            if(file){
                fileReader.readAsDataURL(file);//Return URL of file.
            }
            else{
                resolve('dist/img/boxed-bg.jpg');//If file is'nt set, return a default image.
            }
        });
        
    }


    getValues(){
        //This method is used to get values of Form Fields
        let user = {};
        [...this.formEl.elements].forEach(function(field){

            if(field.name == 'gender' && field.checked){//Analise which field gender are checked (there's two field gender's)
                user[field.name] = field.value;
            }
            else if(field.name == "admin"){

                user[field.name] = field.checked;

            }


            else{
                user[field.name] = field.value;
            }
        });
    
        var objectUser = new User( //Create a instance of User Obj
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
        return objectUser;
    }

    addLine(dataUser){
        let tr = document.createElement("tr"); //Create a new row
        tr.innerHTML = `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? 'Sim' : "Não"}</td>
        <td>${dataUser.birth}</td>
        <td>
          <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
        `//Edit row with dataUser properties
        this.TableEl.appendChild(tr);// Append the new row inside tbody
    }
}