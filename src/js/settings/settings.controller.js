class SettingsCtrl {
  constructor(User, $state){
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.formData = {
      email: User.current.email ,
      bio: User.current.bio,
      image: User.current.image,
      username: User.current.username
    }

    //this.logout = User.logout.bind(User);
    // esta es una forma alternativa a declarar this._User y despues hacer la funcion
    //fuera del constructor. El bind parece que le dice en que contexto usar el logout.
    //Tendria que entender como funciona eso del .bind()
  }

  logout(){
    this._User.logout();
  }

  submitForm(){
    this.isSubmitting = true;
    this._User.update(this.formData)
    .then(
      (user)=>{
        console.log('exito');
        this.isSubmitting = false;
      },
      (err)=>{
        this.isSubmitting = false;
        this.errors = err.data.errors;  
      }
    );
  }
}

export default SettingsCtrl;
