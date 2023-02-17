class User{

    constructor(name, gender, birth, country, email, password, photo, admin){
        //Define User Object Attributes
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
    
}