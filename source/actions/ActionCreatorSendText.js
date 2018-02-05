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

interface ManualFilterObject {
  state: string,
  sort: string,
  direction: string
}

function sendToAPI(filterObject : ManualFilterObject): void {
  console.log('filterObject: ', filterObject);
  let address = StoreAddress.getAddressRoot();
  let url = new URL(address),
    params = filterObject;
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
    let endObject: ManualFilterObject = {
      state: '',
      sort: '',
      direction: ''
    };
    let parsedJason: any = JSON.parse(json);
    endObject.direction = parsedJason.entities.hasOwnProperty('direction_type')
      ? parsedJason.entities.direction_type[0].value
      : 'desc';
    endObject.sort = parsedJason.entities.hasOwnProperty('sort_type')
      ? parsedJason.entities.sort_type[0].value
      : 'created';
    endObject.state = parsedJason.entities.hasOwnProperty('state_type')
      ? parsedJason.entities.state_type[0].value
      : 'all';
      sendToAPI(endObject);
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
