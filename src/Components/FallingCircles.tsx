import React, { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function FallingCircles() {
  const [init, setInit] = React.useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#111722",
        },
      },
      fpsLimit: 120,
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.8,
        },
        size: {
          value: { min: 5, max: 15 },
        },
        move: {
          enable: true,
          speed: 2,
          direction: "bottom",
          random: true,
          straight: true,
          outModes: {
            default: "out",
            bottom: "out",
            top: "none",
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: false,
            mode: "repulse",
          },
          resize: {
            enable: false,
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}