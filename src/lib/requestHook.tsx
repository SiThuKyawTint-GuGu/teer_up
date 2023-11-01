// import { useVerifyModal } from "@/store/authStore";
// import { useEffect } from "react";
// import appAxios from "./appAxios";

// const requestHook = () => {
//   useEffect(() => {
//     const requestInterceptor = appAxios.interceptors.request.use(
//       function (config) {
//         token && !config.headers.getAuthorization() && config.headers.setAuthorization("Bearer " + token);
//         return config;
//       },
//       function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//       }
//     );

//     const responseInterceptor = appAxios.interceptors.response.use(
//       response => {
//         if (response.status === 201 || response.status === 204) {
//           // showToast("success", "Success");
//         }
//         return response;
//       },
//       function (error) {
//         if (error.response.status === 401) {
//           token && useVerifyModal().verifyModalOpenHandler();
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       appAxios.interceptors.request.eject(requestInterceptor);
//       appAxios.interceptors.response.eject(responseInterceptor);
//     };
//   }, [token]);
// };

// export default requestHook;
