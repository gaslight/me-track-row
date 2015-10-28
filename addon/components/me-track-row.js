import Ember from 'ember';
let { inject } = Ember;

export default Ember.Component.extend({
  tagName: 'tr',

  player: inject.service(),

  click() {
    this.get('player').play(this.get('track'));
  }
});
