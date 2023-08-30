/*
 * @Author: wxy
 * @Description: 
 * @Date: 2023-08-28 15:56:23
 * @LastEditTime: 2023-08-30 10:06:08
 */

import React from "react";
import { useRoutes, RouteObject,Navigate } from "react-router-dom";
import Babylon from "@page/babylon-webgpu";
import BabylonWebGL from "@page/babylon-webgl";
import Three from "@page/three";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/webgpu" />,
  },
  {
    path: "/webgpu",
    element: <Babylon />,
  },
  {
    path: "/webgl",
    element: <BabylonWebGL />,
  },
  {
    path: "/three",
    element: <Three />,
  },
];

export const RouterContainer = () => {
  return useRoutes(routes);
};
