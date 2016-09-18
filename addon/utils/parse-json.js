import Ember from 'ember';

export default function parseJson(data) {
  try {
    let result = Ember.$.parseJSON(data);
    for(let key in result) {
      if (typeof result[key] === 'object') {
        result[key] = JSON.stringify(result[key]);
      }
    }
    return result;
  } catch(e) {
    return data;
  }
}
