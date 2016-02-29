import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href-lang', 'href', 'download'],
  'href-lang': 'image/svg+xml',
  download: 'dial.svg',

  href: Ember.computed('data', function() {
    var data = this.get('data');
    return "data:image/svg+xml;base64,\n" + btoa(data);
  })
});
