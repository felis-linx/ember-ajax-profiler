import Ember from 'ember';
import parseJson from '../utils/parse-json';
import flattenObject from '../utils/flatten-object';

export default Ember.Mixin.create({
    
  profiling: Ember.computed('_requests', function() {
    return this.get('_requests');
  }),
  
  init() {
    this._super(...arguments);
    this.set('_requests', Ember.A());
    this.get('headers')['X-Ajax-Profiler'] = 'enable';
  },
    
  request(url, options) {
    return new Ember.RSVP.Promise((resolve, reject) => {

      var request = {
        url: this._buildURL(url, options),
        method: options.method || options.type
      };
      
      console.log(typeof options.data, options.data);
      if (Ember.isPresent(options.data)) {
        request.data = flattenObject(Ember.typeOf(options.data) !== 'object' ? parseJson(options.data) : options.data);
      }
      
      let start = performance.now();
      
      this._super(url, options)
        .then(function(response) {
          Ember.Logger.log('[Ajax profiler]', response);
          Ember.set(request, 'result', flattenObject(response));
          resolve(response);
        }, function(error) {
          Ember.Logger.warn('[Ajax profiler]', error);
          let _error = { message: error.message };
          
          if (error.hasOwnProperty('errors')) {
            _error.status = error.errors[0].status;
            _error.title = error.errors[0].title;
            _error.detail = flattenObject(error.errors[0].detail);
//            for(let key of error.errors) {
//              _error[key] = error.errors[key];
//            }
          }
          Ember.set(request, 'error', _error);
          reject(error);
        })
        .finally(function() {        
          var duration = (performance.now() - start),//.toFixed(5),
              m = Math.floor(duration / 60000),
              s = Math.floor(duration / 1000) % 60,
              ms = (duration % 1000).toFixed(3);

          Ember.set(request, 'duration', (m ? m+'m ':'') + (s ? s+'s ':'') + ms+'ms');
        });
      
      this.get('_requests').unshiftObject(request);
    });
  }
  
});
