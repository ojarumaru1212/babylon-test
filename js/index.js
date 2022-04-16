const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // シーンにカメラを追加し、それを canvas にアタッチ
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    
    // シーンにライト（光源）を追加
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // ボックス
    const box1 = BABYLON.MeshBuilder.CreateBox("box1", {width:0.5, height:0.5, depth: 0.5}, scene);
    // 位置を半分だけ上に上げる（地面にめり込んでいるため）
    box1.position.y = 0.25;
    
    // **モデルのサイズは、以下でも変更できる。（位置も使用する関数は異なるが同様に2種類ある） ** 
    // ①scalingを使用する。
    // box.scaling.x = 2;
    // box.scaling.y = 1.5;
    // box.scaling.z = 3;
    
    // ②Vector3を使用する。
    // box.scaling = new BABYLON.Vector3(2, 1.5, 3);

    // モデルの向きの変更
    // box.rotation.y = Math.PI / 4; // ラジアン（1[rad] = 180/π)
    // box.rotation.y = BABYLON.Tools.ToRadians(45); // [度]
    
    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {width:0.5, height:0.5, depth: 0.5}, scene);
    box2.position = new BABYLON.Vector3(1, 0, 0);
    box2.rotation.y = BABYLON.Tools.ToRadians(45);
    
    // 地面
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10}, scene);

  return scene;
};