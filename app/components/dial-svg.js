import Ember from 'ember';

export default Ember.Component.extend({
  dialArtist: Ember.inject.service(),
  tagName: 'svg',
  attributeBindings: ['width', 'height'],
  width: '400',
  height: '400',
  scale: 5,  // pixels per mm
  paper: undefined,

  center_x: Ember.computed('width', function() {
    return this.get('width') / 2;
  }),

  center_y: Ember.computed('height', function() {
    return this.get('height') / 2;
  }),

  update: Ember.observer('value', function(clear=true) {
    this.get('paper').clear();
    this.get('dialArtist').draw(
      this.get('paper'),
      this.get('value'),
      this.get('width'),
      this.get('height'),
      this.get('scale')
    );

    var serializer = new XMLSerializer();
    var svgXml = serializer.serializeToString(this.$()[0]);
    this.sendAction('svgChanged', svgXml);
  }),

  didInsertElement: function() {
    var s = Snap('#' + this.$().attr('id'));
    this.set('paper', s);
    Ember.run.scheduleOnce('afterRender', this, 'update');
  }
});
