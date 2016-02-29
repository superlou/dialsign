import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    svgChanged: function(svgXml) {
      this.set('svgXml', svgXml);
    }
  }
});
