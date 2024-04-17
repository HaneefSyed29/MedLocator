import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

function App() {
  // this are the different useStates for state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [location, setLocation] = useState({});

  // this useEffect will be helpinf us to store the data in the local and also to extract the geolocation of a particular user as well
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const jsonUserInfo = JSON.parse(userInfo);
    if (jsonUserInfo) {
      setIsLoggedIn(true);
      setCurrentUser(jsonUserInfo);
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }, []);

  // on successfully getting the location
  const successCallback = (position) => {
    const { coords } = position;
    const lattitude = coords.latitude;
    const longitude = coords.longitude;
    setLocation({
      lattitude: parseFloat(lattitude),
      longitude: parseFloat(longitude),
    });
  };

  // when location will not able to extract
  const errorCallback = (error) => {
    console.log(error);
  };

  // this function will call at the time when user click on user Login
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        console.log(data.data);
        const { email, name, picture } = data.data;
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ name, email, picture })
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log(error),
  });

  return (
    <>
      {!isLoggedIn && (
        <div className="h-screen w-full flex flex-col space-y-44 justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
          <img
            className="h-96"
            src="https://res.cloudinary.com/dxaovcjmr/image/upload/v1713201610/login_aonvqv.svg"
            alt="login"
          />
          <button
            onClick={() => login()}
            className="border-2 border-black px-5 py-3 flex space-x-4 rounded-lg justify-center items-center font-medium  bg-white text-black text-xl"
          >
            <p>Sign in with Google</p>
            <img
              className="h-6"
              src="https://res.cloudinary.com/dxaovcjmr/image/upload/v1713201786/google_paovly.svg"
              alt="google"
            />
          </button>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <Navbar name={currentUser.name} picture={currentUser.picture} />
          <Homepage lat={location.lattitude} lng={location.longitude} />
        </div>
      )}
    </>
  );
}

export default App;
