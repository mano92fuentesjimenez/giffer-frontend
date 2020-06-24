GIFFER is a new web application that allows the user to have access to a wide variety of giffs. Powered by Giphy api offers search features like searching by a string or just seeing latest trending gifs

Most of the code is implemented using functional components unless a class component was really necessary to use.
Redux was used to hold the state of the app, and connected-react-router was used for using the URL as unique source of truth for search filters.
Redux-saga was used to handle all the async logic of the app as well as to handle the redux state.

Current Features:
 * Internationalization
 * Fully responsive from Iphone 5s to 4k screens
 * URL as source of truth for search filters
 * User logging and user configurations
 * Change user data and user credentials
 * Persist user logging by using localStorage api
 * Search gifs with a string
 * Search latest trending gifs
 * Filter all gifs search endpoints by using content rating
 * Select a set of gifs as favorites
 * Filter gifs by favorite
 * See a full description of a gif
 * Show an empty state component when the search returns empty

Project structure:
 * src -- Contains all the code
   * api -- Contains the communication to backend code
   * components -- Reusable components
   * constants -- Constants useful for all the app
   * helpers -- Useful helpers  for all the app
   * hocs -- Useful hoc for all the app
   * hooks -- Useful hooks for all the app
   * images -- all the images of the app
   * scenes -- contains the view for each route in the project
     * sagas -- the sagas of the scene if needed
     * constants -- The constants that pertain to the scene like PATH
     * actions -- Actions for the scene
     * components -- All the components for the scene
   * services -- Contains all the services in the app like internationalization ...
     * sagas -- the sagas of the service if needed
     * constants -- The constants that only the service uses
     * actions -- Actions for the service
     * reducer -- The reducer code for the service
     * selectors -- The redux selectors for the scene
   * App.js -- First component in the project
   * index.js -- Configures and run the app  
 
For used technologies: Please see package.json 

For run, just do ```yarn start```
 