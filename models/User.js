class User{

    constructor(name, gender, birth, country, email, password, photo, admin){
        //Define User Object Attributes
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get id(){
        return this._id;
    }

    get register(){
        return this._register;
    }
    get name(){
        return this._name
    }

    get gender(){
        return this._gender
    }
    get birth(){
        return this._birth
    }
    get country(){
        return this._country
    }
    get email(){
        return this._email
    }
    get password(){
        return this._password
    }
    get photo(){
        return this._photo
    }
    get admin(){
        return this._admin
    }


    //

    set register(value){
        return this._register;
    }
    set name(value){
        return this._name
    }

    set gender(value){
        return this._gender
    }
    set birth(value){
        return this._birth
    }
    set country(value){
        return this._country
    }
    set email(value){
        return this._email
    }
    set password(value){
        return this._password
    }
    set photo(value){
        this._photo = value;
    }
    set admin(value){
        return this._admin
    }
    

    loadFromJSON(json){

        for(let name in json){
            switch(name){
                case `_register`:
                    this[name] = new Date(json[name]);
                    break;
            default:
                this[name] = json[name];
            }

        }

    }

    static getUsersStorage(){

        let users = [];
        if(localStorage.getItem("users")){

            let users = JSON.parse(localStorage.getItem("users"));
            return users;


        }
        return users;

    }
    getNewID(){
        if(localStorage.getItem("usersID")){
            console.log("First IF")

            var usersID = parseInt(localStorage.getItem("usersID"));
        }
        else{
            localStorage.setItem("usersID", 1);
            var usersID = parseInt(localStorage.getItem("usersID"));
            console.log("First Else")
        }
        console.log(usersID);
        if(usersID < 1){
            usersID = 1;
            localStorage.setItem("usersID", usersID);
        }
        else{

            usersID++;
            localStorage.setItem("usersID", usersID);
        }
        
        return usersID;
    }
    save(){

        let users = User.getUsersStorage();
        console.log(this.id);    
        if(this.id > 0){
            console.log("In If")
            users.map(u=>{
                if (u._id == this.id){
                    Object.assign(u, this);
                }
                return u;
            }) 
        }
        else{
            console.log("In Else")
                 

            this._id = this.getNewID();

            users.push(this);
        }
        localStorage.setItem("users", JSON.stringify(users));
        

    }

    remove(){

        let users = User.getUsersStorage();
        users.forEach((userData, index)=>{

            if(this._id == userData._id){
                users.splice(index, 1);
            }
            localStorage.setItem("users", JSON.stringify(users));
        })

    }
}