import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ajax-profiler', 'Integration | Component | ajax profiler', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ajax-profiler}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ajax-profiler}}
      template block text
    {{/ajax-profiler}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
