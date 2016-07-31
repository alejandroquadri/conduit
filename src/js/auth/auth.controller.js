class AuthCtrl{
  constructor($state){
    'ngInject';
    console.log('anda');
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.',"");
  }
  submitForm(){
    this.isSubmitting = true;
    console.log(this.formData);
  }
}
export default AuthCtrl;
