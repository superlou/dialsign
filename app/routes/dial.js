import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {
      diameter: 1.12,
      dial_fill: '#000',
      default_fill: '#fff',

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
              count: 12
            },
            {
              type: 'text',
              string: 'Watch',
              position: [0, 0.4],
              font: 'arial',
              size: 0.15
            },
            {
              type: 'radial',
              diameter: 0.82,
              shape: 'numeral',
              size: 0.15,
              count: 12,
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
              thickness: 0.02
            },
            {
              type: 'radial',
              diameter: 0.26,
              shape: 'tick',
              tick_width: 0.04,
              tick_length: 0.06,
              count: 6
            },
            {
              type: 'radial',
              diameter: 0.28,
              shape: 'tick',
              tick_width: 0.01,
              tick_length: 0.04,
              count: 30
            },
            {
              type: 'radial',
              diameter: 0.15,
              shape: 'numeral',
              size: 0.1,
              count: 3,
              format: '1-60-20',
              orientation: 'flat'
            }
          ]
        }
      ]
    }
  }
});
