"use client";

import { openModal, useAppDispatch } from "@/app/store";
import { MODAL_IDS } from "@/app/store/slices/modal-slice/modal-ids";
import { CompassArrowIcon } from "@/shared/ui";
import dynamic from "next/dynamic";
import { memo } from "react";

const WeatherModal = dynamic(
  () =>
    import("@/pages/weather/ui/weather-modal/weather-modal").then(
      (mod) => mod.WeatherModal
    ),
  { ssr: false }
);

// const getUserIP = async () => {
//   try {
//     const response = await fetch("https://ipapi.co/json");
//     const data = await response.json();
//     return data.ip;
//   } catch (error) {
//     console.error("Error fetching user IP:", error);
//     return null;
//   }
// };

// способ запроса наличия разрешений на использование геолокации. при статусе denied нужно уведомить пользователя, что разрешение на геолокации выключено
// и используются примерные координаты
// function handlePermission() {
//   navigator.permissions.query({ name: "geolocation" }).then((result) => {
//     if (result.state === "granted") {
//       report(result.state);
//       geoBtn.style.display = "none";
//     } else if (result.state === "prompt") {
//       report(result.state);
//       geoBtn.style.display = "none";
//       navigator.geolocation.getCurrentPosition(
//         revealPosition,
//         positionDenied,
//         geoSettings,
//       );
//     } else if (result.state === "denied") {
//       report(result.state);
//       geoBtn.style.display = "inline";
//     }
//     result.addEventListener("change", () => {
//       report(result.state);
//     });
//   });
// }

// function report(state) {
//   console.log(`Permission ${state}`);
// }

// handlePermission();

/* 
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
*/

const positionOptions = {};
// const positionOptions = {
//   enableHighAccuracy: true,
//   maximumAge: 0,
//   timeout: 5000,
// }

const getUserPosition = () => {
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        console.error("error obtaining geolocation: ");
        console.error(err.message);
      },
      positionOptions
    );
  } else {
    /* geolocation IS NOT available */
    console.log("geolocation is not available in this browser");
  }
};

export const FindMeButton = memo(() => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(openModal(MODAL_IDS.WEATHER_MAP));
  };

  return (
    <>
      <button
        className="bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center gap-3 px-6 py-2.5 shadow-md cursor-pointer"
        onClick={handleClick}
      >
        <CompassArrowIcon size={18} className="mb-0.5" />
        <span className="whitespace-nowrap font-medium">Find me</span>
      </button>
      <WeatherModal />
    </>
  );
});

FindMeButton.displayName = "FindMeButton";
