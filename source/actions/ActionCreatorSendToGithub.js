// @flow
// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';
// Stores
import StoreAddress from '../stores/StoreAddress';
// Other libraries
import 'whatwg-fetch';

interface ActionObject {
  type: string,
  parameter: GithubObject
}

interface GithubObject {
  milestone: any,
  state: string,
  assignee: string,
  creator?: string,
  mentioned?: string,
  labels?: string,
  sort: string,
  since?: string
}

// http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken
// http://food2fork.com/api/search?milestone=*&state=all&assignee=*&sort=created&direction=desc

export default function(objectToSubmit: GithubObject): void {



  // let address = StoreAddress.getAddressRoot();
  // let url = new URL(address);
  // let  params = objectToSubmit;
  // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  // console.log('url: ', url);


let url = new URL('https://community-food2fork.p.mashape.com/search?key=388a3fb91f08c545ae5f8238bc65a984&q=shredded+chicken');
// https://community-food2fork.p.mashape.com/search?key=388a3fb91f08c545ae5f8238bc65a984&q=shredded+chicken

  let header = new Headers({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'multipart/form-data'
  });

  let sentData={
    method:'GET',
    mode: 'cors',
    // header: header
};




// url = 'http://food2fork.com/api/search?key={388a3fb91f08c545ae5f8238bc65a984}&q=shredded%20chicken';
  fetch(url, sentData).then((response) => {

console.log(response);

    return response.json()
  }).then((array) => {
    dispatchAction(array);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}

function dispatchAction(parameter : GithubObject) {
  let Action: ActionObject = {
    type: 'update_github_array',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
