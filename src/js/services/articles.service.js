export default class Articles {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;


  }

  //gets an article
  get(slug){
    let deferred = this._$q.defer();

    if (!slug.replace(" ", "")){
      deferred.reject("There's no slug");
      return deferred.promise;
    }

    this._$http({
      url:`${this._AppConstants.api}/articles/${slug}`,
      method:'GET'
    }).then(
      (res)=>deferred.resolve(res.data.article),
      (err)=>deferred.reject(err)
    );
    return deferred.promise;
  }

  destroy(slug){
    return this._$http({
      url:`${this._AppConstants.api}/articles/${slug}`,
      method:'DELETE'
    })
  }

  // Creates an article
  save(article) {
    let request = {}

    if (article.slug){
      request.url = `${this._AppConstants.api}/articles/${article.slug}`;
      request.method = 'PUT';
    } else {
      request.url = `${this._AppConstants.api}/articles`;
      request.method = 'POST';

    }

    request.data = { article: article };

    return this._$http(request).then((res) => res.data.article);
  }

 // Favorite an article
  favorite(slug) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/favorite',
      method: 'POST'
    });
  }

  // Unfavorite an article
  unfavorite(slug) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/favorite',
      method: 'DELETE'
    });
  }


}
