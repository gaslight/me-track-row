import Ember from 'ember';
let { run, on, computed } = Ember;

export default Ember.Service.extend({
  isPlaying: false,
  currentTime: 0,

  audioElement: null,
  track: null,

  setupAudioElement: on('init', function() {
    var el = document.createElement('audio');
    el.addEventListener('play', run.bind(this, 'didStartPlaying'));
    el.addEventListener('pause', run.bind(this, 'didPause'));
    el.addEventListener('timeupdate', run.bind(this, 'didUpdateTime'));
    this.set('audioElement', el);
  }),

  willDestroy() {
    this.get('audioElement').pause();
    this.set('audioElement.src', "");
  },

  play(track) {
    this.set('track', track);
    this.set('audioElement.src', track.get('audioUrl'));
    this.get('audioElement').play();
  },

  pause() {
    this.get('audioElement').pause();
  },

  resume() {
    this.get('audioElement').play();
  },

  didStartPlaying() {
    this.set('isPlaying', true);
  },

  didPause() {
    this.set('isPlaying', false);
  },

  didUpdateTime() {
    this.set('currentTime', Math.floor(this.get('audioElement.currentTime')));
  },

  remainingTime: computed('track.duration', 'currentTime', function() {
    return this.get('track.duration') - this.get('currentTime');
  })
});
