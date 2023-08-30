
import React, { useEffect, useRef, RefObject } from "react";
import { WebGPUModel } from "@utils/babylon-webgpu";
import s from "./index.module.less";

const Babylone = () => {
  const ref2 = useRef<HTMLCanvasElement>();
  useEffect(() => {
    (async () => {
      if (ref2.current) {
        const webgpu = new WebGPUModel();
        await webgpu.initEngine(ref2.current)
        webgpu.render()
      }
    })();
  }, [ref2]);

  return (
    <div className={s.container}>
      <canvas
        id="renderCanvas"
        ref={ref2 as RefObject<HTMLCanvasElement>}
      ></canvas>
    </div>
  );
};
export default Babylone;
