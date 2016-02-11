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
              diameter: 0.96,
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
              type: 'ring',
              diameter: 1.03,
              thickness: 0.02,
              fill: '#fff'
            },
            {
              type: 'ring',
              diameter: 0.88,
              thickness: 0.02,
              fill: '#fff'
            },
            {
              type: 'radial',
              diameter: 0.96,
              dot_diameter: 0.04,
              count: 4,
              fill: '#48F',
              skip: '3'
            },
            {
              type: 'radial',
              diameter: 0.96,
              dot_diameter: 0.04,
              count: 4,
              fill: '#fff',
              skip: '0,1,2'
            },
            {
              type: 'text',
              string: 'Watch',
              position: [0, 0.1],
              font: 'arial',
              size: 0.15,
              fill: '#fff'
            }
          ]
        }
      ]
    }
  }
});
