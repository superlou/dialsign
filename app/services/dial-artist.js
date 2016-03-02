import Ember from 'ember';

export default Ember.Service.extend({
  numerals: Ember.inject.service('numerals'),

  draw: function(s, value, width, height, scale) {
    // Dial
    var dial = s.circle(0, 0, value.diameter);
    var f = s.filter(Snap.filter.shadow(0, 2, 2, '#000', 0.2));

    dial.attr({
      fill: value.dial_fill || '#000',
      filter: f
    });

    var defaults = {
      fill: value.default_fill || '#fff'
    }

    var dial_g = s.g();
    dial_g.add(dial);
    dial_g.addClass('dial');

    var rings = value.rings.forEach((ring) => {
      var ring_g = s.g();
      ring_g.addClass('ring');

      if (ring.center) {
        ring_g.transform("T" + ring.center[0] + " " + -1*ring.center[1]);
      }

      var features = ring.features.forEach((feature) => {
        ring_g.add(this.buildFeature(s, feature, defaults));
      });

      dial_g.add(ring_g);
    });

    // Scale and translate everything
    var transform = "t" + width/2 + " " + height/2 + " s" + scale + " " + scale;
    dial_g.transform(transform);
  },

  buildFeature: function(s, feature, defaults) {
    var builders = {
      'radial': this.buildFeatureRadial,
      'ring': this.buildFeatureRing,
      'text': this.buildFeatureText
    };

    var feature_g = builders[feature.type].bind(this)(s, feature, defaults);
    feature_g.addClass('feature');

    return feature_g;
  },

  buildFeatureRadial: function(s, feature, defaults) {
    var group = s.g();

    for(var i = 0; i < feature.count; i++) {
      if (feature.skip && this.skip(feature.skip, i)) {
        continue;
      }

      var angle = (360.0 / feature.count * i) - 90;
      var transform = "";

      if (feature.shape == 'tick') {
        var x = -feature.tick_length / 2.0;
        var y = -feature.tick_width / 2.0;
        var width = feature.tick_length;
        var height = feature.tick_width;
        var tick = s.rect(x, y, width, height);
        transform = "T" + feature.diameter + " 0 R" + angle + " 0 0";
      } else if (feature.shape == 'triangle') {
        var base = feature.triangle_base;
        var height = feature.triangle_height;

        var tick = s.polygon(height/2, -base/2, height/2, base/2, -height/2, 0);
        transform = "T" + feature.diameter + " 0 R" + angle + " 0 0";
      } else if (feature.shape == 'numeral') {
        var numeral = this.get('numerals').numerize(i, feature.format);
        var tick = s.text(0, 0, numeral);
        tick.attr({
          'font-family': feature.font || 'sans-serif',
          'font-size': feature.size || 0.01,
          'text-anchor': 'middle',
          'dominant-baseline': 'middle'
        });
        transform = "R90 0 0 T" + feature.diameter + " 0 R" + angle + " 0 0";
        if (feature.orientation == 'flat') {
          transform += "r" + (-1*angle-90) + " 0 0";
        }
      } else {
        var tick = s.circle(0, 0, feature.dot_diameter);
        transform = "T" + feature.diameter + " 0 R" + angle + " 0 0";
      }

      tick.transform(transform);
      tick.attr({fill: feature.fill || defaults.fill})

      group.add(tick);
    }

    return group;
  },

  buildFeatureRing: function(s, feature, defaults) {
    var group = s.g();
    var ring = s.circle(0, 0, feature.diameter);

    ring.attr({
      stroke: feature.fill || defaults.fill,
      'fill-opacity': 0,
      'stroke-width': feature.thickness
    });

    group.add(ring);
    return group;
  },

  buildFeatureText: function(s, feature, defaults) {
    var group = s.g();
    var text = s.text(feature.position[0],
                      -feature.position[1],
                      feature.string);

    text.attr({
      fill: feature.fill || defaults.fill,
      'font-family': feature.font || 'sans-serif',
      'font-size': feature.size || 3,
      'text-anchor': feature.align || 'middle'
    });

    group.add(text);
    return group;
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
