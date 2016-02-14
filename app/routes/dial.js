import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {
      diameter: 1.12,
      fill: '#000',

      rings: [
        {
          center: [0, 0],
          features: [
            {
              type: 'radial',
              diameter: 1,
              shape: 'tick',
              tick_width: 0.04,
              tick_length: 0.12,
              count: 12,
              fill: '#fff'
            },
            {
              type: 'text',
              string: 'Watch',
              position: [0, 0.4],
              font: 'arial',
              size: 0.15,
              fill: '#fff'
            },
            {
              type: 'radial',
              diameter: 0.82,
              shape: 'numeral',
              size: 0.15,
              count: 12,
              fill: '#fff',
              skip: '6',
              format: 'I-12',
              font: 'times new roman'
            }
          ]
        },
        {
          center: [0, -0.5],
          features: [
            {
              type: 'ring',
              diameter: 0.3,
              fill: '#fff',
              thickness: 0.02
            },
            {
              type: 'radial',
              diameter: 0.26,
              shape: 'tick',
              tick_width: 0.04,
              tick_length: 0.06,
              count: 6,
              fill: '#fff'
            },
            {
              type: 'radial',
              diameter: 0.28,
              shape: 'tick',
              tick_width: 0.01,
              tick_length: 0.04,
              count: 30,
              fill: '#fff'
            },
            {
              type: 'radial',
              diameter: 0.15,
              shape: 'numeral',
              size: 0.1,
              count: 3,
              fill: '#fff',
              format: '1-60-20',
              orientation: 'flat'
            }
          ]
        }
      ]
    }
  }
});
