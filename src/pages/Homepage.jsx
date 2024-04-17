import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
const libraries = ["places"];

const Homepage = ({ lat, lng }) => {
  // the two are usestate we are using the hopitals and selectedhospitals
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries,
  });

  // the declaration of the size of the map
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  // default location i.e Nagpur
  const center = {
    lat: lat || 21.1458, // default latitude
    lng: lng || 79.088158, // default longitude
  };

  // in this useEffect we will fetch the nearby hospitals according to the current location
  useEffect(() => {
    if (isLoaded) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.nearbySearch(
        {
          location: { lat: center.lat, lng: center.lng },
          radius: 5000,
          type: ["hospital"],
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setHospitals(results);
          }
        }
      );
    }
  }, [isLoaded, center.lat, center.lng]);

  // if Error then this screen will be shown
  if (loadError) {
    return (
      <div>
        <div class="text-center">
          <h1 class="mb-4 text-6xl font-semibold text-red-500">404</h1>
          <p class="mb-4 text-lg text-gray-600">
            Oops! Looks like you're lost.
          </p>
          <div class="animate-bounce">
            <svg
              class="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p class="mt-4 text-gray-600">
            Let's get you back{" "}
            <a href="/" class="text-blue-500">
              home
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  // In case of Loading this screen will shown
  if (!isLoaded) {
    return (
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
      >
        {hospitals.map((hospital) => (
          <Marker
            title="Hospitals"
            key={hospital.place_id}
            onClick={() => setSelectedHospital(hospital)}
            position={{
              lat: hospital.geometry.location.lat(),
              lng: hospital.geometry.location.lng(),
            }}
          />
        ))}
        {selectedHospital && (
          <InfoWindow
            position={{
              lat: selectedHospital.geometry.location.lat(),
              lng: selectedHospital.geometry.location.lng(),
            }}
            onCloseClick={() => setSelectedHospital(null)}
          >
            <div>
              <h2>{selectedHospital.name}</h2>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Homepage;
