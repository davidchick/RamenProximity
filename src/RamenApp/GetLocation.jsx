import { useEffect, useState } from 'react';

function GetLocation() {

  const [location, setLocation] = useState({});

  useEffect(() => {

    async function getLocation() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        console.error("Geolocation is not supported by this browser.");
      }

    }

    function showPosition(position) {

      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

    }

    function showError(error) {

      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("An unknown error occurred.");
          break;
      }

    }

    getLocation();

  }, []);

  return location;

}

export default GetLocation;
