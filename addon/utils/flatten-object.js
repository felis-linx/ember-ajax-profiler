import Ember from 'ember';

const flattenTypes = ['object', 'array', 'date', 'class', 'instance', 'error'];

export default function flattenObject(obj) {
  var result = {};
  
  for(let key in obj) {
    let type = Ember.typeOf(obj[key]);
    if (flattenTypes.indexOf(type) !== -1) {
      result[key] = JSON.stringify(obj[key]);
    }
  }
  
  return result;
}
