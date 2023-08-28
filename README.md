# An-Event-Search-Website-using-the-Ticketmaster-API-implemented-on-Google-Cloud-App-Engine

## Technologies used: Python, Flask, JSON, the Ticketmaster API, Google API, ipinfo.io API, HTML, CSS, JavaScript, DOM, JSON. 


Created a webpage that allows you to search for event information using the Ticketmaster API, and the results will be displayed in a tabular format. The page will also provide event and venue details.
Implemented the backend in the cloud on Google Cloud App Engine. Server-side Scripting using Python, Flask, JSON. 
User can search events based on event keywords, distance (miles) from their location, category, location and a checkbox to auto-detect location. 
Used the ipinfo.io API to fetch the user’s geolocation if the location checkbox is checked.
If the Location information is used to get events results, client JavaScript used the input address to get the geocoding via the Google Maps Geocoding API. Used the latitude and longitude of the location to construct a RESTful web service URL to retrieve matching search results. 
Used DOM to display cards for event details and venue details after clicking on the event name and venue details.
