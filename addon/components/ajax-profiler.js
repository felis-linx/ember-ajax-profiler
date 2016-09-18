import Ember from 'ember';
import layout from '../templates/components/ajax-profiler';

export default Ember.Component.extend({
  
  layout,
  ajax: Ember.inject.service(),
  fields: {data: 'Request', result: 'Response', error: 'Error'}
  
});
