const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // シーンにカメラを追加し、それを canvas にアタッチ
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    
    // シーンにライト（光源）を追加
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    // あなたのコード

  return scene;
};