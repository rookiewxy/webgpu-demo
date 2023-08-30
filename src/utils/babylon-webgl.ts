import { Nullable } from "babylonjs/types";
import { GLTFFileLoader } from "babylonjs-loaders";

type DOM = Nullable<
  | HTMLCanvasElement
  | OffscreenCanvas
  | WebGLRenderingContext
  | WebGL2RenderingContext
>;

BABYLON.SceneLoader.RegisterPlugin(new GLTFFileLoader());

let text1: BABYLON.GUI.TextBlock;

export class WebGLModel {
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private instrumentation: BABYLON.EngineInstrumentation;

  constructor(dom: DOM) {
    this.initEngine(dom);
    this.initScene();
    this.initCamera(dom);
    this.initLight();
    this.initModel();
    this.initTextGUI();
    this.initInstrumentation();
  }

  initEngine(dom: DOM) {
    this.engine = new BABYLON.Engine(dom, true);
  }

  initScene() {
    this.scene = new BABYLON.Scene(this.engine);
  }

  initCamera(dom: DOM) {
    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      this.scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(dom, true);
  }

  initLight() {
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.7;
  }

  initMesh() {
    const sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      this.scene
    );
    sphere.position.y = 1;
    BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      this.scene
    );
  }

  initModel() {
    BABYLON.SceneLoader.Append("assets/", "cm.glb", this.scene, (scene) => {
      scene.createDefaultCameraOrLight(true, true, true);
    });
  }

  // Instrumentation
  initInstrumentation() {
    this.instrumentation = new BABYLON.EngineInstrumentation(this.engine);
    this.instrumentation.captureGPUFrameTime = true;
    this.instrumentation.captureShaderCompilationTime = true;
  }

  initTextGUI() {
    const advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "UI",
        true,
        this.scene
      );

    const stackPanel = new BABYLON.GUI.StackPanel();
    stackPanel.width = "25%";
    stackPanel.top = 10;
    stackPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(stackPanel);

    text1 = new BABYLON.GUI.TextBlock();
    text1.color = "white";
    text1.height = "180px";
    text1.fontFamily = "RuslanDisplay";
    text1.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    stackPanel.addControl(text1);
  }

  render() {
    const sceneInstrumentation = new BABYLON.SceneInstrumentation(this.scene);
    this.scene.registerBeforeRender(() => {
    });
    
    this.engine.runRenderLoop(() => {
      text1.text =
        "current frame time (GPU): " +
        (this.instrumentation.gpuFrameTimeCounter.current * 0.000001).toFixed(
          2
        ) +
        "ms";
      text1.text +=
        "\r\naverage frame time (GPU): " +
        (this.instrumentation.gpuFrameTimeCounter.average * 0.000001).toFixed(
          2
        ) +
        "ms";
      text1.text +=
        "\r\ntotal shader compilation time: " +
        this.instrumentation.shaderCompilationTimeCounter.total.toFixed(2) +
        "ms";
      text1.text +=
        "\r\naverage shader compilation time: " +
        this.instrumentation.shaderCompilationTimeCounter.average.toFixed(2) +
        "ms";
      text1.text +=
        "\r\ncompiler shaders count: " +
        this.instrumentation.shaderCompilationTimeCounter.count;
      text1.text +=
        "\r\nDraw calls: " + sceneInstrumentation.drawCallsCounter.count;
      text1.text +=
        "\r\nframe time: " + sceneInstrumentation.frameTimeCounter.count;
      this.scene.render();
    });
  }
}
