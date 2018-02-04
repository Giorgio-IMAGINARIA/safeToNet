// @flow
// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';
// Stores
import StoreAddress from '../stores/StoreAddress';
// Other libraries
import 'whatwg-fetch';

interface ActionObject {
  type: string,
  parameter: AITextObject
}

interface AITextObject {
  text: string
}

export default function(objectToSubmit : AITextObject): void {
  console.log('objectToSubmit: ', objectToSubmit);

  let address = '/AIText';
  fetch(address, {
    method: 'POST',
    body: JSON.stringify(objectToSubmit),
    headers: new Headers({'Content-Type': 'application/json'})
  }).then((response) => {
    return response.json()
  }).then((json) => {

let parsedJason: any = JSON.parse(json);

    console.log('the response: ', parsedJason.entities);
    // dispatchAction(array);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });

}

function dispatchAction(parameter : AITextObject) {
  let Action: ActionObject = {
    type: 'update_github_array',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
