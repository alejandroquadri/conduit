class Profile{

  constructor(AppConstants, $http){
    'ngInject';
    this._AppConstants = AppConstants;
    this._$http = $http;
  }


  get(username){
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + username,
      method: 'GET'
    })
    .then((res)=>res.data.profile);
  }

  follow(username){
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + username + '/follow',
      method: 'POST'
    })
    .then((res)=>{
      // en comparacion este then con el de abajo. Se puede hacer con {} o sin. Si se usan los {} para la funcion, entonces hay que poner el return
      return res.data
    });
  }

  unFollow(username){
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + username + '/follow',
      method: 'DELETE'
    })
    .then((res)=>res.data);
  }

}

export default Profile;
