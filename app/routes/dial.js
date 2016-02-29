import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return $.getJSON("/data/dial_" + params.dial_id + ".json");
    return {};
  }
});
