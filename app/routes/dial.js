import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {
      diameter: 1.12,
      fill: '#222',

      rings: [
        {
          center: [0, 0],
          features: [
            {
              type: 'dot',
              diameter: 1.0,
              dot_diameter: 0.01,
              count: 60,
              fill: '#fff'
            },
            {
              type: 'dot',
              diameter: 1.0,
              dot_diameter: 0.05,
              count: 12,
              fill: '#fff'
            },
            {
              type: 'dot',
              diameter: 1.0,
              dot_diameter: 0.06,
              count: 4,
              fill: '#f00'
            }
          ]
        }
      ]
    }
  }
});
