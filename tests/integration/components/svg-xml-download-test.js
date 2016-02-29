import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('svg-xml-download', 'Integration | Component | svg xml download', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{svg-xml-download}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#svg-xml-download}}
      template block text
    {{/svg-xml-download}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
