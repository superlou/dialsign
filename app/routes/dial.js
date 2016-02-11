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
              type: 'radial',
              diameter: 1.0,
              shape: 'dot',
              dot_diameter: 0.01,
              count: 60,
              fill: '#fff'
            },
            {
              type: 'radial',
              diameter: 0.95,
              shape: 'tick',
              tick_width: 0.04,
              tick_length: 0.14,
              count: 12,
              fill: '#fff',
              skip: '%3'
            },
            {
              type: 'radial',
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
