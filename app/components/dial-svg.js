import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: ['width', 'height'],
  width: '300',
  height: '300',
  scale: 100,  // pixels per inch
  paper: undefined,

  center_x: Ember.computed('width', function() {
    return this.get('width') / 2;
  }),

  center_y: Ember.computed('height', function() {
    return this.get('height') / 2;
  }),

  update: Ember.observer('value', function() {
    this.draw(
      this.get('paper'),
      this.get('value'),
      this.get('width'),
      this.get('height'),
      this.get('scale')
    );
  }),

  didInsertElement: function() {
    var s = Snap('#' + this.$().attr('id'));
    this.set('paper', s);

    this.draw(
      s,
      this.get('value'),
      this.get('width'),
      this.get('height'),
      this.get('scale')
    );
  },

  draw: function(s, value, width, height, scale) {
    // Dial
    var dial = s.circle(0, 0, value.diameter);
    var dial_g = s.g(dial);
    dial_g.addClass('dial');

    if (value.fill) {
      dial.attr({
        fill: value.fill
      });
    }

    // dial.transform(transform);
    var rings = value.rings.forEach((ring) => {
      var ring_g = s.g();
      ring_g.addClass('ring');

      var features = ring.features.forEach((feature) => {
        var feature_g = s.g();
        feature_g.addClass('feature');

        if (feature.type == "dot") {
          for(var i = 0; i < feature.count; i++) {
            var dot = s.circle(0, 0, feature.dot_diameter);
            var angle = 360.0 / feature.count * i;
            dot.transform("T" + feature.diameter + " 0 R" + angle + " 0 0");

            if (feature.fill) {
              dot.attr({fill: feature.fill})
            }

            feature_g.add(dot);
          }
        }

        ring_g.add(feature_g);
      });

      dial_g.add(ring_g);
    });

    // Scale and translate everything
    var transform = "t" + width/2 + " " + height/2 + " s" + scale + " " + scale;
    dial_g.transform(transform);
  }
});
