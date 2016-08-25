import angular from 'angular';

let componentsModule = angular.module('app.components', []);

 // Components
import ListErrors from './list-errors.component';
componentsModule.component('listErrors', ListErrors);

// Directives
import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

export default componentsModule;
