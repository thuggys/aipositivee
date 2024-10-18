// import React, { useCallback } from 'react';
// import Particles from "react-tsparticles";
// import { loadSlim } from "tsparticles-slim";

// const StarryBackground = () => {
//   const particlesInit = useCallback(async (engine) => {
//     await loadSlim(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container) => {
//     console.log("Particles container loaded", container);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       loaded={particlesLoaded}
//       options={{
//         background: {
//           color: {
//             value: "#000000",
//           },
//         },
//         fpsLimit: 60,
//         interactivity: {
//           events: {
//             onClick: {
//               enable: false,
//             },
//             onHover: {
//               enable: false,
//             },
//           },
//         },
//         particles: {
//           color: {
//             value: "#ffffff",
//           },
//           links: {
//             enable: false,
//           },
//           move: {
//             direction: "none",
//             enable: true,
//             outModes: {
//               default: "out",
//             },
//             random: true,
//             speed: 0.1,
//             straight: false,
//           },
//           number: {
//             density: {
//               enable: true,
//               area: 800,
//             },
//             value: 40,
//           },
//           opacity: {
//             value: 0.5,
//           },
//           shape: {
//             type: "circle",
//           },
//           size: {
//             value: { min: 1, max: 3 },
//           },
//         },
//         detectRetina: true,
//       }}
//     />
//   );
// };

// export default StarryBackground;