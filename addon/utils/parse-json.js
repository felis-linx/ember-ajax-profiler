import Ember from 'ember';

export default function parseJson(data) {
  try {
    return Ember.$.parseJSON(data);;
  } catch(e) {
    return data;
  }
}
