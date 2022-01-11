import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Scroll, ScrollControls, Torus } from "@react-three/drei";
import "./App.scss";

const MyBox: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01;
  });

  return (
    <>
      <Torus ref={ref}>
        <meshToonMaterial attach="material" color="pink" />
      </Torus>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[1, 0, 1]} />
      <ScrollControls pages={3} damping={5}>
        <Scroll>
          <MyBox />
        </Scroll>
        <Scroll html>
          <h1 className="intro">Welcome!</h1>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};

export default App;
