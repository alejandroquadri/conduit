function AuthConfig($stateProvider, $httpProvider){
  'ngInject';

  $stateProvider

  .state('app.login',{
    url:'/login',
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
    title: 'Sign up'
  })
}

export default AuthConfig;
