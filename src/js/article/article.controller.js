import marked from 'marked';
//esto es un paquete que se instala con npm que te permite agregarle markup al editor

class ArticleCtrl {
  constructor(article, $sce, User, $rootScope, Comments) {
    'ngInject';

    this.article = article;
    this.currentUser = User.current;
    this._Comments = Comments;

    // Update the title of this page
    $rootScope.setPageTitle(this.article.title);

    // Transform the markdown into HTML
    // el sce es un servicio de angualar que le dice que confie en ese html
    // lo que esta adentro, marked es parte del paquete que se importo y su api. No se bien como se usara.
    this.article.body = $sce.trustAsHtml(marked(this.article.body, { sanitize: true }));

    this.resetCommentForm()

    // Get comments for this article and expose it to the view
    Comments.getAll(this.article.slug).then(
      (comments) => this.comments = comments
    );
  }

  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: []
    }
  }

  addComment(){
    this.commentForm.isSubmitting = true;
    this._Comments.add(this.article.slug, this.commentForm.body).then(
      (comment) => {
        this.comments.unshift(comment); //unshift es un metodo de js que agrega un item al elemento pero al principio
        this.resetCommentForm();
      },
      (err) => {
        this.commentForm.isSubmitting = false;
        this.commentForm.errors = err.data.errors;
      }
    );
  }

    deleteComment(commentId, index) {
    this._Comments.destroy(commentId, this.article.slug).then(
      (success) => {
        this.comments.splice(index, 1);
      }
    );
  }

}

export default ArticleCtrl;
