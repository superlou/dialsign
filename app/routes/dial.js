import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {
      diameter: 28.5,
      dial_fill: '#000',
      default_fill: '#fff',

      rings: [
        {
          features: [
            {
              type: 'radial',
              diameter: 26,
              shape: 'tick',
              tick_width: 1,
              tick_length: 3,
              count: 12
            },
            {
              type: 'text',
              string: 'Watch',
              position: [0, 10],
              font: 'arial',
              size: 3.8
            },
            {
              type: 'radial',
              diameter: 21,
              shape: 'numeral',
              size: 4,
              count: 12,
              skip: '6',
              format: 'I-12',
              font: 'times new roman'
            }
          ]
        },
        {
          center: [0, -13],
          features: [
            {
              type: 'ring',
              diameter: 7.5,
              thickness: 0.5
            },
            {
              type: 'radial',
              diameter: 6.6,
              shape: 'tick',
              tick_width: 1,
              tick_length: 1.5,
              count: 6
            },
            {
              type: 'radial',
              diameter: 7,
              shape: 'tick',
              tick_width: 0.25,
              tick_length: 1,
              count: 30
            },
            {
              type: 'radial',
              diameter: 3.8,
              shape: 'numeral',
              size: 2.5,
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
