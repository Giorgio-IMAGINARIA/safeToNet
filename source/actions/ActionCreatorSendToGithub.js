// @flow
// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';
// Stores
import StoreAddress from '../stores/StoreAddress';
// Other libraries
import 'whatwg-fetch';

interface ActionObject {
  type: string,
  parameter: ManualFilterObject
}

interface ManualFilterObject {
  state: string,
  sort: string,
  direction: string
}

export default function(objectToSubmit: ManualFilterObject): void {
  let address = StoreAddress.getAddressRoot();
  let url = new URL(address),
    params = objectToSubmit;
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  fetch(url, {method: 'GET'}).then((response) => {
    return response.json()
  }).then((array) => {
    dispatchAction(array);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}

function dispatchAction(parameter : ManualFilterObject) {
  let Action: ActionObject = {
    type: 'update_github_array',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
