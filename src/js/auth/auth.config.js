function AuthConfig($stateProvider, $httpProvider){
  'ngInject';

  $stateProvider

  .state('app.login',{
    url:'/login',
    resolve : { //esto se asegura antes de cargar la pagina que el usuario no este loguado. Si esta logueado no le muestra la pagina y lo manda directemente al home
      auth: (User)=>{
        return User.ensureAuthIs(false);
      }
    },
    controller: 'AuthCtrl',
    controllerAs: '$ctrl',
    templateUrl:'auth/auth.html',
    title: 'Sign in'
  })

  .state('app.register',{
    url:'/register',
    controller: 'AuthCtrl',
    controllerAs: '$ctrl',
    templateUrl:'auth/auth.html',
    title: 'Sign up',
    resolve : {
      auth: (User)=>{
        return User.ensureAuthIs(false);
      }
    }
  })
}

export default AuthConfig;
