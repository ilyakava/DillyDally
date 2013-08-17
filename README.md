DillyDally
===

Users create maps of their favorite locations in an area, and share them. The point being that the app stores locations that the user liked, and groups them by location, or in groups that the user chooses. Then, users can share the small maps with each other, and create itineraries together (Chelsea Galeries…eat at Rocket Pig restaurant…walk down highline…coffee at Colombe).

Project Outline
===
##Rails Features

#Functional-Phase I
By the end of this phase:

* users should be able to add locations either from the location page or the collection page
* ~~users should be able to see their collections, with location info and collection info like names, hours, comments, likes, note~~
* users are able to edit their location info's after having them in collections
* ~~users should be able to see other user's collections~~
* users should be able to share collections
* when viewing another user's collection, the current user will be able to add that collection's locations to their locations (or some default bin of locations)


##Locations: Basic View
* Search for a location
	* Location model
	* Goals:
		* ~~have option to select area to search in~~
		* ~~search for locations~~
		* ~~Display the locations on the map~~
		* ~~see about location~~
		* **see hours**
		* **add functionality to the ["find me" button](http://www.mapbox.com/mapbox.js/example/v1.0.0/geolocation/)**
* ~~Select location and save (To a misc collection, say "Searched Collections")~~
* ~~Save location~~
	* ~~mark as visited/not visited~~
	* if visited
		* ~~Add category~~
		* ~~Checkbox characteristics~~
		* like/not like/neutral
		* ~~Add comment~~
* See number of user visits
* ~~See user comments~~
* Other
	* ~~see icons on the map~~ **(different color icons based on visited/unvisited/unseen)**
	
###User page:
* ~~list user's saved locations~~
* be able to get to user's detail view from Locations page


##Collections: Associated Basic Views
###Within Locations:
* ~~Add a location to a collection~~
	* ~~add the location to a new collection~~
* see what collections of your own your location is in
* Be able to check/uncheck a location from a collection
* see what collections of others your location is in
* see nearby collections of yours, and others, that your location is in
* recommend a location to a user, or send it to a non-user

###Within Collections:
* View a collection
	* Map vectors
	* Editable Collection info
		* list user likes
	* ~~see a list of locations~~
	* remove a location from a collection
	* ~~search for a new location in the collection view~~
	* search for an existing saved location in the collection view
		* either your other locations
		* or all locations
	* add a searched for location to the collection
* ~~Start a blank collection~~
	* same search ability to add new locations
* ~~navigate to location page~~
	* ~~from included location list~~
	* from search location
* Share
	* a collection with a user
	* a collection with a non-user, as a link

###User's page
* ~~List of collections~~
	* ~~Sublist of locations~~
* other users are accessible this way

---

#Functional-Phase II
* By the end of this phase, in addition to the basic view in the locations and collections pages, there will be a "My View" option/view
	* This will allow a map to display your collections on top of the current view
	* This means that when searching for a location, you can see your collections on the map
	* When editing a collection, you can see other collections of yours on the map
	* There will be an option to exclude non overlapping collections of yours from displaying

---

#Functional-Phase III
* by the end of this phase, an additional view showing any DillyDally user's collections on the map will be availible

---

##TODO
* universals:
	* search nearby
	* recenter map
* from userFriends
	* userCollections
	* userLocations

##Fix later
* SQL queries! not just in to_json!
* Update titles of the webpage when navigating SPAs
	* [Helper](https://github.com/pwhisenhunt/Backbonejs-Router-Title-Helper)
* Rename userSavedData variable to cached
	* restrict fetching not on collection page load, but **only** when the models in this cache get updated
* Don't rename friends controller, but still figure out a way to query the users controller to get information about individual user models
* Break appart backbone view re-rendering (rerender individual db location views instead of containing collection views)
	* This has been done for the visited/unvisited toggle, but not for comments/tags in the location detail view
* Make markers dissapear when moving from search nearby to my locations
* add in fetch to replace includes statements, to reduce unneccessarily detailed sql queries
* Check nested includes statements
* Check where a location of a friends that you are viewing and then saving is added. (As an orphan?)
* Add labels to location views that indicate which collections of yours the location is saved in
* Human readable dates
* reconsider eager loading on friends page

##Stretch features
* icons for friends, locations and collections with hover over yeilding a pointy box with the options
* Drop down menu from the word DillyDally containing site options there too
* switch inline comments over to [JSDoc](http://en.wikipedia.org/wiki/JSDoc) format
* display icons on the maps in variable ways
	* ranking by comments/ratings
* Have app recommend locations - "locations like this"
* Have app map out an itinerary based on locations and open hours
* Add support for routes, not just collections

---

Related Resources and Reading
===
* Mapbox
	* [General Map information](http://www.mapbox.com/developers/guide/) 
	* [Markers for maps](http://mapbox.com/maki/)
	* [mapbox.js](http://www.mapbox.com/mapbox.js/api/v1.3.1/)
	* [GeoJSON](http://www.geojson.org/)
	* [REST API](http://www.mapbox.com/developers/api/#map_resources)
* [Similar project, sort of](https://github.com/tmcw/togeojson/), visitable [here](http://geojson.io/)
	* [Leaflet](https://github.com/Leaflet/Leaflet.draw)
* Misc
	* [lodash](http://lodash.com/) for deep cloning of objects and other underscore like utility methods
	* Do I need validations [JS side](http://coding.smashingmagazine.com/2013/08/09/backbone-js-tips-patterns/)?
		* [Smashing Magazine](https://shop.smashingmagazine.com/smashing-book-3-printed-and-or-ebook.html#comments)
		* [Faker](http://rubygems.org/gems/faker) for testing, random name generation
	* [Style](http://ilikepixels.co.uk/drop/bubbler/) with bubble/corners
	* [Subroutes](http://www.geekdave.com/2012/04/05/module-specific-subroutes-in-backbone/) - organizational gains
	* [Backbone Patterns](http://ricostacruz.com/backbone-patterns/)
