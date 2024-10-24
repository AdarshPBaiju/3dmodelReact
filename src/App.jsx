/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect } from "react";

// Model component to load a 3D model
const Model = ({ path }) => {
  const { scene } = useGLTF(path);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
    }
  });

  return <primitive object={scene} />;
};

// Lighting component to pass custom lighting
const CustomLighting = ({ lighting }) => {
  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={lighting.ambientLight.intensity} />
      {/* Directional Lights */}
      {lighting.directionalLights.map((light, index) => (
        <directionalLight
          key={index}
          position={light.position}
          intensity={light.intensity}
        />
      ))}
      {/* Point Lights */}
      {lighting.pointLights.map((light, index) => (
        <pointLight
          key={index}
          position={light.position}
          intensity={light.intensity}
        />
      ))}
      {/* Spot Lights */}
      {lighting.spotLights.map((light, index) => (
        <spotLight
          key={index}
          position={light.position}
          angle={light.angle}
          penumbra={light.penumbra}
          intensity={light.intensity}
        />
      ))}
    </>
  );
};


// Canvas component for rendering the model with controls and lighting
const ZoomableCanvas = ({ modelPath, lighting }) => {
  useEffect(() => {
    const handleWheel = (event) => {
      if (event.ctrlKey) {
        event.preventDefault(); // Prevent default zoom behavior
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("gesturestart", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("gesturestart", handleWheel);
    };
  }, []);

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg bg-gray-200">
      <Canvas
        dpr={[1, 2]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        camera={{ position: [0, 2, 10], fov: 60 }}
      >
        <Suspense fallback={null}>
          {/* Render dynamic lighting */}
          <CustomLighting lighting={lighting} />

          {/* Orbit Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.4}
            rotateSpeed={0.4}
            maxPolarAngle={Math.PI}
          />

          <Stage environment={null} shadows={false}>
            <Model path={modelPath} scale={0.1} position={[0, 0, 0]} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
};

// Main App component
const App = () => {
  // Array of model paths, names, and custom lighting settings
  const models = [
    {
      path: "/table.glb",
      name: "Table",
      lighting: {
        ambientLight: { intensity: 2 },
        directionalLights: [
          { position: [10, 10, 5], intensity: 4 },
          { position: [-10, -10, -5], intensity: 4 }
        ],
        pointLights: [{ position: [0, 10, 0], intensity: 2 }],
        spotLights: [{ position: [0, 20, 10], angle: 0.15, penumbra: 1, intensity: 6 }]
      }
    },
    {
      path: "/samsung.glb",
      name: "Samsung",
      lighting: {
        ambientLight: { intensity: 3 },
        directionalLights: [
          { position: [15, 10, 18], intensity: 19 }
        ],
        pointLights: [{ position: [0, 15, 5], intensity: 0 }],
        spotLights: [{ position: [0, 25, 15], angle: 0.1, penumbra: 0.5, intensity: 1 }]
      }
    },
    {
      path: "/base_basic_shaded.glb",
      name: "fox",
      lighting: {
        ambientLight: { intensity: 3 },
        directionalLights: [
          { position: [5, 10, 3], intensity: 5 }
        ],
        pointLights: [{ position: [0, 15, 5], intensity: 0 }],
        spotLights: [{ position: [0, 25, 5], angle: 0.1, penumbra: 0.5, intensity: 1 }]
      }
    },
    {
      path: "/iphone_16_plus_green.glb",
      name: "Iphone 16 Plus Green",
      lighting: {
        ambientLight: { intensity: 3 },
        directionalLights: [
          { position: [5, 10, 3], intensity: 5 }
        ],
        pointLights: [{ position: [0, 15, 5], intensity: 0 }],
        spotLights: [{ position: [0, 25, 5], angle: 0.1, penumbra: 0.5, intensity: 1 }]
      }
    },
    {
      path: "/base.glb",
      name: "Gaming Chair",
      lighting: {
        ambientLight: { intensity: 3 },
        directionalLights: [
          { position: [5, 10, 3], intensity: 5 }
        ],
        pointLights: [{ position: [0, 15, 5], intensity: 0 }],
        spotLights: [{ position: [0, 25, 5], angle: 0.1, penumbra: 0.5, intensity: 1 }]
      }
    },
    {
      path: "/asusrog.glb",
      name: "Asus ROG",
      lighting: {
        ambientLight: { intensity: 1.5 },
        directionalLights: [
          { position: [15, 20, 19], intensity: 19 }
        ],
        pointLights: [{ position: [0, 5, 5], intensity: 2 }],
        spotLights: [{ position: [0, 30, 15], angle: 0.2, penumbra: 0.8, intensity: 10 }]
      }
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">3D Model Previews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {models.map((model, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <ZoomableCanvas modelPath={model.path} lighting={model.lighting} />
            <h2 className="mt-4 text-center text-lg font-semibold text-gray-700">{model.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
