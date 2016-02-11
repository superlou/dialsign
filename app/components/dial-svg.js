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
    this.get('paper').clear();
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

        if (feature.type == "radial") {
          for(var i = 0; i < feature.count; i++) {
            if (feature.skip && this.skip(feature.skip, i)) {
              continue;
            }

            if (feature.shape == 'tick') {
              var x = -feature.tick_length / 2.0;
              var y = -feature.tick_width / 2.0;
              var width = feature.tick_length;
              var height = feature.tick_width;
              var tick = s.rect(x, y, width, height);
            } else {
              var tick = s.circle(0, 0, feature.dot_diameter);
            }

            var angle = 360.0 / feature.count * i;
            tick.transform("T" + feature.diameter + " 0 R" + angle + " 0 0");

            if (feature.fill) {
              tick.attr({fill: feature.fill})
            }

            feature_g.add(tick);
          }
        } else if (feature.type == "ring") {
          var ring = s.circle(0, 0, feature.diameter);

          if (feature.fill) {
            ring.attr({
              stroke: feature.fill,
              fill: '#000',
              'fill-opacity': 0,
              'stroke-width': feature.thickness
            });
          }

          feature_g.add(ring);
        }

        ring_g.add(feature_g);
      });

      dial_g.add(ring_g);
    });

    // Scale and translate everything
    var transform = "t" + width/2 + " " + height/2 + " s" + scale + " " + scale;
    dial_g.transform(transform);
  },

  skip: function(skip_string, i) {
    var patterns = skip_string.split(',');

    var match = patterns.find(function(pattern) {
      if (pattern[0] == '%') {
        var mod = parseInt(pattern.substr(1, pattern.length));
        if (!(i % mod)) { return true; }
      } else {
        var position = parseInt(pattern);
        if (i == position) { return true; }
      }

      return false;
    });

    if (match) { return true; } else { return false; }
  }
});
