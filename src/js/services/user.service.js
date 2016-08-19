export default class User {
  constructor(JWT, AppConstants, $http, $state, $q){
    'ngInject';
    this.current = null;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
    this._$state = $state;
    this._$q = $q;
  }

  attempAuth(type, credentials){
    let route = (type === 'login') ? '/login' : '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        this._JWT.save(res.data.user.token);
        this.current = res.data.user;
        return res;
      });
  }

  update(fields){
    return this._$http({
      url: this._AppConstants.api + '/user',
      method: 'PUT',
      data: {
        user: fields
      }
    })
    .then((res)=>{
      this.current = res.data.user;
      return res.data.user;
    })
  }

  logout(){
    this.current = null;
    this._JWT.destroy();
    this._$state.go(this._$state.$current, null, {reload:true});
  }

  verifyAuth(){
    var deferred = this._$q.defer();

    //chequea JWT token y en caso que no encuentre devuelve falso
    console.log('Token actual', this._JWT.get());
    if (!this._JWT.get()){
      deferred.resolve(false);
      return deferred.promise;
    }

    // en caso que encuentre Token chequea si this.current existe. Eso implicaria que estoy logueado
    if (this.current){
      deferred.resolve(true)
    } else {
      // en caso que no, chequea si el Token existe pidiendo los datos del usuario con ese Token al servidor
      this._$http({
        url: this._AppConstants.api + '/user',
        method:'GET',
        // headers: {
        //   Authorization: 'Token ' + this._JWT.get()
        // } esto queda comentado, porque en lugar de estar chequeando los headers en cada request, usamos el interceptor para que lo haga automaticamente.
      })
      .then(
        (res)=>{
          // cuando vuelven los datos, los asigna a this.current
          this.current = res.data.user;
          deferred.resolve(true);
        },
        (err)=>{
          // si vuelve error es porque el token debe ser viejo o trucho, con lo cual lo borra y devuelve error
          this._JWT.destroy();
          deferred.resolve(false);
        }
      )
    }
    return deferred.promise;
  }

  ensureAuthIs(bool) {

    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid)=>{
      if (authValid !== bool) {
        this._$state.go('app.home');
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }
    })

    return deferred.promise;
  }
}
