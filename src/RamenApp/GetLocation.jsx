import { useEffect, useState } from 'react';

function GetLocation() {

  const [location, setLocation] = useState({});

  useEffect(() => {

    async function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        // Geolocation is not supported by the browser
        console.error("Geolocation is not supported by this browser.");
      }
    }
  
    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setLocation({lat: position.coords.latitude,
                   lng: position.coords.longitude,
                  });

      // Use latitude and longitude as needed
      //console.log("Latitude: " + latitude + ", Longitude: " + longitude);
    }
  
    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          // User denied the request for Geolocation
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          // Location information is unavailable
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          // The request to get user location timed out
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          // An unknown error occurred
          console.error("An unknown error occurred.");
          break;
      }
    }

    // Call the function to request location
    getLocation();

  }, []);

  return location;

}

export default GetLocation;
