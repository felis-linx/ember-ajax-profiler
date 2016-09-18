import Ember from 'ember';
import AjaxProfilerMixin from 'ember-ajax-profiler/mixins/ajax-profiler';
import { module, test } from 'qunit';

module('Unit | Mixin | ajax profiler');

// Replace this with your real tests.
test('it works', function(assert) {
  let AjaxProfilerObject = Ember.Object.extend(AjaxProfilerMixin);
  let subject = AjaxProfilerObject.create();
  assert.ok(subject);
});
