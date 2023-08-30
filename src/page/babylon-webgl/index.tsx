/*
 * @Author: wxy
 * @Description: 
 * @Date: 2023-08-29 16:55:24
 * @LastEditTime: 2023-08-30 16:32:53
 */

import React, { useEffect, useRef, RefObject } from "react";
import { WebGLModel } from "@utils/babylon-webgl";
import s from "./index.module.less";

const Babylone = () => {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (ref.current) {
      new WebGLModel(ref.current).render();
    }
  }, [ref]);

  return (
    <div className={s.container}>
      <canvas ref={ref as RefObject<HTMLCanvasElement>}></canvas>
    </div>
  );
};
export default Babylone;
