function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    url: '/@:username',
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: (Profile, $state, $stateParams)=>{
        return Profile.get($stateParams.username)
        .then(
          (profile)=>profile,
          (err)=>{
            console.log('error');
            $state.go('app.home');
          }
        );
      }
    }
  });

};

export default ProfileConfig;
