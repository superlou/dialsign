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
            }
          ]
        }
      ]
    }
  }
});
