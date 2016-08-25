class FollowBtnCtrl {
  constructor(User, Profile, $state){

    'ngInject';

    this._User = User;
    this._$state = $state;
    this._Profile = Profile;
  }

  submit() {
    this.isSubmitting = true;
    console.log(this._User.current);
    console.log(this._Profile);
    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    // If following already, unfollow
    if (this.user.following) {
      this._Profile.unFollow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = false;
        }
      )

    // Otherwise, follow them
    } else {
      this._Profile.follow(this.user.username).then(
        () => {
          console.log('vuelve');
          this.isSubmitting = false;
          this.user.following = true;
        }
      )
    }
  }
}

let FollowBtn= {
  bindings: {
    user: '='
  },
  controller: FollowBtnCtrl,
  templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;

/*
class FollowBtnCtrl {
  constructor(Profile, User, $state) {
    'ngInject';

    this._Profile = Profile;
    this._User = User;

    this._$state = $state;
  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    // If following already, unfollow
    if (this.user.following) {
      this._Profile.unfollow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = false;
        }
      )

    // Otherwise, follow them
    } else {
      this._Profile.follow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = true;
        }
      )
    }
  }

}

let FollowBtn= {
  bindings: {
    user: '='
  },
  controller: FollowBtnCtrl,
  templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;*/
