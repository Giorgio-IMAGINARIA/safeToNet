# FOR DEVELOPMENT

1. Install Node.js and Yarn globally.
2. Clone the project in a location and be sure to have the rights to modify the files.
3. In the root directory of the project type "yarn" and wait for the packages to be built.
4. Type "yarn run web-watch" in a terminal and let it watch and dynamically build the project;
5. Open a different terminal, go to the "bin" directory in the project and type "node www".
6. Open a browser window and navigate to: "http://localhost:3001";
7. The API address to which to connect is in environment.js

# INITIAL ASSUMPTIONS

The initial assumptions were that the time was limited and that 2 main features to implement were showing details for selected recipes and using Wit.ai to turn voice and text commands in search data. The app should have been designed to handle a big amount of data and to be as much modular as I could, to be more manageable by me or other developers in the future.

Other considerations were oriented towards a language as ECMAScript that is widespread and well supported by now and a framework as React that is very svelte for these kind of projects.

React is a UI library that used in collaboration with other libraries helps creating a framework-like ecosystem which is an ideal tool for MVC-like applications.

Also the code base can be easily implemented in React Native and used for the creation of mobile applications.

# COMPROMISES

I tried to create a modular future-proof app with modules that deal with different concerns, but I could have done more that way. For instance the ActionCreator files for text and voice search are very similar at a point that some features could have been shared through a library file.

Not all the style objects are confined in the "styles" directory, plus the styles themselves could be improved to provide more responsiveness beyond what the Material UI library already does out of the box.

The errors that can be retrieved by fetch in the ActionCreator files could be being handled better, for instance by providing an action or choices for the user such as resetting the query panels.

The filter panel could have been more modular to host more filter sub-panels for future improvements of the API.

Going on developing the app without thinking at these initial compromises and addressing them could lead to an increasing amount of time spent for the code maintenance and for the implementation of further features.

Other compromises involved discarting the Food2Fork API that seems broken and instead using the Github API as a proof of concept. Also the voice search feature is half backed, because making it working would require more time.

Wit.ai is trained only for keywords involving the Github issue filters.

Sentences that work are:

1) "set state to open, direction to ascending and sort to created"
2) "set state to closed and direction to descending"
3) "set sort to updated and state to all"

And so on

# EXPLANATION

The application has a backend written in Node.js and using Express.js as framework. The frontend is instead written in ES6, using React + Flux as framework, Flow as type-checking language, Radium as Javascript-CSS helper, Material-UI as UI library and transpiled with Webpack.

The relevant part of the backend is the apiAddress route that contains the path to use for the REST request to the Github API (atom/atom issues). Having the address stored in that location makes changing the route easier for future updates. The address is retrieved at the apiAddress route when the app is started and it is stored in the StoreAddress to be used for the API requests.

The backend presents also two routes for the text and voice requests to Wit.ai. The text request works and uses the official Wit.ai client, whilst the voice request would require a POST request of the audio file directly made in node. That would require more efforts and is left for further development.

What is lacking is the conversion of the audio retrieved with WebRTC technologies (by using the RecordRTC library) in a .wav file to encode and send to the backend. The file should then be sent to Wit.ai and turned into an object to use for the filters.

The application is made of different components, the main ones are the ManualQueryPanel, the AIQueryPanel and the ResultPanel.

The first one is the panel that would have been used if Wit.ai wasn't been used. It has manual filters that ideally would have been totally replaced by the AI capability.

The AIQueryPanel contains commands for recording a message and for typing a request.

The ResultPanel visualises the results as a dynamic list of clickable issues.

The end goal of all requests is to retrieve entries from the Github API and to dispatch actions that are then listened by the StoreGithub Store.

The store updates its status which is listened by the ResultPanel module. The module gets the next state of the Store and visualises part of the retrieved information as a list of issues.

Focusing on the ManualQueryPanel and then on the filters, it can be seen that the object to send to the ActionCreator and to use for the request to the API has the following interface:

interface ManualFilterObject {
  state: string,
  sort: string,
  direction: string
}

The style section uses the new spread syntax as the following example shows:

Most of the styles are contained in the "styles" directory. The new spread syntax is used to extend the single style objects as shown below:

let globalText = {
  color: '#ffffff'
}

let titles = {
  ...globalText,
  margin: '0',
  textIndent: '25px'
}

It can be seen also the use of the keywords let and const as variable declaration, the .map() and .foreach() methods and the arrow functions:

nextArray.forEach((item, index, array) => {
  let elementToCreate: any = <ListItem onMouseDown={this.openTab.bind(this, item.html_url)} innerDivStyle={ResultStyle.listItemStyle} key={index} primaryText={item.title}/>;
  listToRender.push(elementToCreate);
});

The following statement uses the Object.keys(obj) method to return an array of keys from the JSON object passed and then the forEach() method to loop through that. The append method of url.searchParams appends those keys and their values to the URL created with the address retrieved from the related store that is then used by Fetch for the GET request:

let url = new URL(address),
  params = objectToSubmit;
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

As for React, the way the elements are dynamically rendered on the screen requires the use of states:

this.state = {
  issueList: []
};

That are set by the class logic:

this.setState({issueList: listToRender});

and then rendered:

<List>
  {this.state.issueList}
</List>

# FUTURE IMPROVEMENTS

The style can be more refined with the use of initial mock-ups and can be improved to be more responsive.

Overall The logic can be made more DRY.
