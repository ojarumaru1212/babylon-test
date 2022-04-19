const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // シーンにカメラを追加し、それを canvas にアタッチ
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  
  // シーンにライト（光源）を追加
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // ベース
  const outline = [
    // モデルを斜辺にする設定
    // new BABYLON.Vector3(-0.3, 0, -0.1),
    // new BABYLON.Vector3(0.2, 0, -0.1),
  ]

  // カーブした前面（モデルを曲線にする設定）
  // for (let i = 0; i < 20; i++) {
  //   outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
  // }

  // 上部
  outline.push(new BABYLON.Vector3(0, 0, 0.1));
  outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

  // 車の本体部分を作成
  // ↓ 深さ depth: 0.2 で押し出している
  // const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2});
  const car = BABYLON.MeshBuilder.CreateBox("box1", {width:0.2, height:0.2, depth: 0.5}, scene);

  // 車輪を作成
  const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05}, scene);
  // 車輪の親を、車の本体に設定
  wheelRB.parent = car;
  // 車輪の座標、向きを設定
  wheelRB.position.z = -0.14;
  wheelRB.position.x = -0.12;
  wheelRB.position.y = -0.09;
  wheelRB.rotation.z = -Math.PI / 2;
  // クローンにより残りの車輪を作成
  // 1つ目の車輪の対となる車輪
  const wheelRF = wheelRB.clone("wheelRF");
  wheelRF.position.x = 0.12;
  // 1つ目の車輪の後ろの車輪
  const wheelLB = wheelRB.clone("wheelLB");
  wheelLB.position.z = 0.15;
  // 1つ目の車輪と対角線の車輪
  const wheelLF = wheelRF.clone("wheelLF");
  wheelLF.position.z = 0.15;

  return scene;
};