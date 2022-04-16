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
    
    // 屋根（Cylinder は円柱という意味）
    const roof = BABYLON.MeshBuilder.CreateCylinder(
      "roof", 
      {diameter: 0.8, height: 0.6, tessellation: 3},  // tessellationが３の場合、底辺が三角形になる（0だと円柱）
      scene
    );
    roof.scaling.x = 0.4;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 0.56;

    // 地面
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10}, scene);

    // 色を追加（マテリアルをモデルに適用する）
    const material = new BABYLON.StandardMaterial("name", scene);
    // ボックス
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png", scene);// 画像も指定できる
    box1.material = boxMat;
    // 屋根
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    roof.material = roofMat;
    // 地面
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0); // rgbで緑色を指定 （new BABYLON.Color3.Green(); でも指定可）
    ground.material = groundMat; // 地面の色のためのマテリアルのプロパティを指定

  return scene;
};