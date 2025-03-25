import { useEffect, useState } from 'react';
import GetLocation from "./GetLocation";
import CalcDistance from "./CalcDistance";
import Nav from './Nav';

function Main() {

  const [restaurants, setRestaurants] = useState([]);
  const [p2r, setP2R] = useState(0);
  const location = GetLocation();
  let map;

  useEffect(() => {

    async function nearbySearch() {

      const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places');

      let center = new google.maps.LatLng(location.lat, location.lng);

      const request = {
        // required parameters
        fields: ['displayName', 'location', 'businessStatus'],
        locationRestriction: {
          center: center,
          radius: 20000,
        },
        // optional parameters
        includedPrimaryTypes: ['ramen_restaurant'],
        maxResultCount: 5,
        rankPreference: SearchNearbyRankPreference.DISTANCE,
        language: 'en-US',
        region: 'us',
      };

      const { places } = await Place.searchNearby(request);

      if (places.length) {
        //console.log(places);

        setRestaurants(places);
        setP2R(CalcDistance(location.lat, location.lng, places[0].location.lat(), places[0].location.lng()));

        // places.forEach((place) => {
        //     console.log(place.displayName);
        // });

      } else {
        console.log("No results");
      }

    }

    if (location.lat) {

      nearbySearch();

    }

  }, [location]);


  if (location && restaurants.length) {

    return (

      <>
        <h2>Proximity to Ramen</h2>

        <h3>Your current location:</h3>
        lat: {location.lat.toFixed(4)}, long: {location.lng.toFixed(4)}

        <h3>Your proximity to ramen (p2r):</h3>
        <div className="p2r">
          <h1>{p2r.toFixed(2)} km</h1>
          <h3>{restaurants[0].displayName}</h3>
          <Nav userLat={location.lat} userLng={location.lng} restaurant={restaurants[0].displayName} p2r={p2r} />
        </div>

        <div className="ramens">
          <br />
          {restaurants.map((restaurant, key) => {
            return (<div key={key}><b>{restaurant.displayName}</b>: {CalcDistance(location.lat, location.lng, restaurant.location.lat(), restaurant.location.lng()).toFixed(2)} km</div>);
          })}
        </div>

      </>

    );

  } else {

    return (
      <p>No results? Settings > Privacy & Security > Location Services</p>
    );
  }

}

export default Main;