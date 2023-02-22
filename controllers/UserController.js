class UserController{
    constructor(formIdCreate, formIdUpdate,tableId){

        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.formEl = document.getElementById(formIdCreate);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.onEdit();
        this.updateCount();
        this.selectAll();

    }

    updateCount(){
        let numberUsers = 0;
        let numberAdmin = 0;
        [...this.tableEl.children].forEach(tr=>{
            numberUsers++;
            let user = JSON.parse(tr.dataset.user);
            document.getElementById("number-users").innerHTML = numberUsers;
            if (user._admin){
                numberAdmin++
                document.getElementById("number-users-admin").innerHTML = numberAdmin;
            } 
        });
    }
    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{
            e.preventDefault();
            this.showPanelCreate();

        })
        this.formUpdateEl.addEventListener("submit", e=>{
            e.preventDefault();//Stop page refresh.
            let btn = this.formUpdateEl.querySelector("[type=submit]");
            let values = this.getValues(this.formUpdateEl);
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];
            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);


            
            this.updateCount();
            this.formUpdateEl.reset();
            this.getPhoto(this.formUpdateEl).then(
                (content)=>{
                    if(!values.photo){
                        result._photo = userOld._photo
                    } else { 
                        result._photo = content;
                    }
                    let user = new User()
                    user.loadFromJSON(result);
                    tr = this.getTr(user, tr);
                    this.updateCount();
                    this.formUpdateEl.reset();
                    btn.disabled = false;
                    this.showPanelCreate

                },
                (e)=>{
                    console.error(e);
                    

            });
        })
    }


    onSubmit(){
       //Take the the click on Submit button
        this.formEl.addEventListener("submit", (event)=>{
            
            event.preventDefault();//Stop page refresh.

            let btn = this.formEl.querySelector("[type=submit]")
            btn.disabled = true;

            let values = this.getValues(this.formEl);
            if(!values){
                btn.disabled = false;
                return false;
            } 
            this.getPhoto(this.formEl).then(
                (content)=>{
                    values.photo = content;
                    this.insert(values);

                    this.addLine(values);
                    this.formEl.reset();
                    btn.disabled = false;
                    

                },
                (e)=>{
                    console.error(e);
                    

            });
            
        });

    }

    getPhoto(formEl){

        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader(); //Create a instance of class FileReader.
            let elements = [...formEl.elements].filter(item=>{
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


    getValues(formEl){
        //This method is used to get values of Form Fields
        let user = {};
        let isValid = true;
        [...formEl.elements].forEach(function(field){


            if(['name', 'email', "password"].indexOf(field.name) > -1 && !field.value){
                field.parentElement.classList.add("has-error");
                isValid = false;
                return false;
            }

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
    
        if(!isValid){
            return false;
        }
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

    getUsersStorage(){

        let users = [];
        if(localStorage.getItem("users")){

            let users = JSON.parse(localStorage.getItem("users"));

            return users;

        }
        return users;

    }

    selectAll(){

        let users = this.getUsersStorage();  

        users.forEach(dataUser=>{

            let user = new User();
            user.loadFromJSON(dataUser)
            this.addLine(user);

        })

    }


    insert(data){

        let users = this.getUsersStorage();        
        users.push(data);

        //sessionStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("users", JSON.stringify(users));



    }

    getTr(dataUser, tr = null){
        if(tr === null) tr = document.createElement("tr"); //Create a new row
        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? 'Sim' : "Não"}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
          <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
        </td>
        `;
        this.addEventsTr(tr);
        return tr;
    }


    addLine(dataUser){
        
        let tr = this.getTr(dataUser);        
        
        this.tableEl.appendChild(tr);// Append the new row inside tbody
        
        this.updateCount()
 
 
    }
    addEventsTr(tr){

        tr.querySelector(".btn-delete").addEventListener("click", e=>{

            if(confirm("Deseja realmente exluir?")){

                tr.remove();

            }

        });


        tr.querySelector(".btn-edit").addEventListener("click", e=>{
            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for(let name in json){
                let field = this.formUpdateEl.querySelector("[name="+name.replace("_", "")+"]");
                
                if(field){
                    
                    switch(field.type){
                        case 'file':
                            continue;
                            break;
                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name="+name.replace("_", "")+"][value="+json[name]+"]");
                            field.checked = true;
                            break
                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                            break;
                    }

                }

            }
            this.formUpdateEl.querySelector(".photo").src = json._photo;
            this.showPanelUpdate();

        })
    }
    showPanelCreate(){
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";
    }
    showPanelUpdate(){
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    }

   
}