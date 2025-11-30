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
      fpsLimit: 60,
      particles: {
        number: {
          value: 100,
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
          value: {
            min: 0.3,
            max: 0.8,
          },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.3,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 5 },
          random: {
            enable: true,
            minimumValue: 1,
          },
        },
        move: {
          enable: true,
          speed: {
            min: 0.5,
            max: 2,
          },
          direction: "bottom",
          random: true,
          straight: false,
          outModes: {
            default: "out",
            bottom: "out",
            top: "none",
          },
          attract: {
            enable: false,
          },
          drift: {
            min: -0.5,
            max: 0.5,
          },
        },
        wobble: {
          enable: true,
          distance: 10,
          speed: {
            min: 1,
            max: 3,
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: false,
          },
          resize: {
            enable: true,
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