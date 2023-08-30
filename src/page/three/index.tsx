/*
 * @Author: wxy
 * @Description:
 * @Date: 2023-08-28 15:51:50
 * @LastEditTime: 2023-08-30 10:07:13
 */
import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;

const Three = () => {
  useEffect(() => {
    initLoad();
    loadFile();
    animate();
  }, []);

  const initLoad = () => {
    scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xd3df56, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    // 环境光
    scene.add(new THREE.AmbientLight("#c1c3c1", 1.25));

    // 平行光
    const dirLight = new THREE.DirectionalLight("#fefefe", 1);
    dirLight.castShadow = true;
    dirLight.position.set(11.127, 17.637, -10.535);
    scene.add(dirLight);

    renderer.render(scene, camera);
  };

  const loadFile = () => {
    const loader = new GLTFLoader();
    loader.load(
      "assets/cm.gltf",
      (gltf) => {
        // gltf.scene.scale.set(2, 2, 2);
        scene.add(gltf.scene);
      },
      (xhr) => {
        // 加载进度回调
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }
    );
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
  };

  return <div></div>;
};
export default Three;
