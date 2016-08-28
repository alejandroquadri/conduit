export default class Articles {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;


  }

  //gets an article
  get(slug){
    return this._$http({
      url:`${this._AppConstants.api}/articles/${slug}`,
      method:'GET'
    }).then(
      (res)=>res.data.article)
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


}
