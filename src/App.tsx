import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Torus,
  ScrollControls,
  Scroll,
  useScroll,
  Stars,
  Html,
} from "@react-three/drei";
import "./App.scss";

const MyTorus: React.FC<any> = ({ color, ...props }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01;
  });

  return (
    <>
      <Torus ref={ref} {...props}>
        <meshToonMaterial attach="material" color={color ? color : "pink"} />
      </Torus>
    </>
  );
};
const PageScroll = () => {
  const { viewport } = useThree();
  const scrollHook = useScroll();
  const numOfProjects = 3;

  useFrame((state, delta) => {
    const offset = 4 * viewport.height * scrollHook.offset;
    //Returns true FROM 2/4 of scroll TO end of scroll
    const show = scrollHook.visible(2 / 4, 2 / 4);
    //Helper To get a 0-1 value FROM 2.2/4 of the scroll TO end of scroll
    //This would make object manipulation at that certain scroll location
    const r1 = scrollHook.range(2.2 / 4, 1.8 / 4) * numOfProjects;
    state.camera.position.y = -offset;
    if (show) {
      state.camera.position.y = -2 * viewport.height;
    }
    state.camera.position.x = r1 * viewport.width;
  });

  return (
    <>
      <MyTorus position={[0, 0, 0]} />
      <MyTorus position={[0, -viewport.height, 0]} color={"olive"} />
      <MyTorus position={[0, -viewport.height * 2, 0]} color={"green"} />
      <MyTorus
        position={[viewport.width, -viewport.height * 2, 0]}
        color={"yellow"}
      />
      <MyTorus
        position={[2 * viewport.width, -viewport.height * 2, 0]}
        color={"purple"}
      />
      <MyTorus
        position={[3 * viewport.width, -viewport.height * 2, 0]}
        color={"#33FFBD"}
      />
      <Html
        as="h1"
        position={[0, -viewport.height * 2.25, 0]}
        className="scroll-message"
        center
      >
        Keep Scrolling To Continue
      </Html>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Canvas className="three-scroll">
      <ambientLight />
      <pointLight position={[1, 0, 1]} />
      <Stars />
      <ScrollControls pages={4} damping={5}>
        <PageScroll />
        <Scroll html>
          <h1 className="intro">Welcome!</h1>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};

export default App;
