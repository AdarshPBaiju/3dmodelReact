import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/table.glb");
  return <primitive object={scene} {...props} />;
}

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="shadow-lg rounded-lg overflow-hidden w-96 p-7 bg-transparent">
        <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, -18] }} style={{ position: "relative", height: "400px" }}>
          <PresentationControls speed={.5} global zoom={1} polar={[-10, Math.PI]}>
            <Stage environment={null}>
              <Model scale={0.1} position={[0, 0, -18]} />
            </Stage>
          </PresentationControls>
        </Canvas>
      </div>
      <h2 className="mt-4 text-center text-lg font-semibold">3D Model Preview</h2>
    </div>
  );
};

export default App;
