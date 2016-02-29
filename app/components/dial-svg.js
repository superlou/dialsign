import Ember from 'ember';

export default Ember.Component.extend({
  numerals: Ember.inject.service('numerals'),
  tagName: 'svg',
  attributeBindings: ['width', 'height'],
  width: '300',
  height: '300',
  scale: 4,  // pixels per mm
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

    var serializer = new XMLSerializer();
    var svgXml = serializer.serializeToString(this.$()[0]);
    this.sendAction('svgChanged', svgXml);
  }),

  didInsertElement: function() {
    var s = Snap('#' + this.$().attr('id'));
    this.set('paper', s);
    this.update();
  },

  draw: function(s, value, width, height, scale) {
    // Dial
    var dial = s.circle(0, 0, value.diameter);
    var f = s.filter(Snap.filter.shadow(0, 2, 2, '#000', 0.2));

    dial.attr({
      fill: value.dial_fill || '#000',
      filter: f
    });

    var default_fill = value.default_fill || '#fff';

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
        var feature_g = s.g();
        feature_g.addClass('feature');

        if (feature.type == "radial") {
          for(var i = 0; i < feature.count; i++) {
            if (feature.skip && this.skip(feature.skip, i)) {
              continue;
            }

            var angle = 360.0 / feature.count * i - 90;
            var transform = "";

            if (feature.shape == 'tick') {
              var x = -feature.tick_length / 2.0;
              var y = -feature.tick_width / 2.0;
              var width = feature.tick_length;
              var height = feature.tick_width;
              var tick = s.rect(x, y, width, height);
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
            tick.attr({fill: feature.fill || default_fill})

            feature_g.add(tick);
          }
        } else if (feature.type == "ring") {
          var ring = s.circle(0, 0, feature.diameter);

          ring.attr({
            stroke: feature.fill || default_fill,
            'fill-opacity': 0,
            'stroke-width': feature.thickness
          });

          feature_g.add(ring);
        } else if (feature.type == "text") {
          var text = s.text(feature.position[0],
                            -feature.position[1],
                            feature.string);

          text.attr({
            fill: feature.fill || default_fill,
            'font-family': feature.font || 'sans-serif',
            'font-size': feature.size || 0.01,
            'text-anchor': feature.align || 'middle'
          });

          feature_g.add(text);
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
