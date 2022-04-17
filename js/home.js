const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // シーンにカメラを追加し、それを canvas にアタッチ
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  
  // シーンにライト（光源）を追加
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  const box = buildBox(scene);
  const roof = buildRoof(scene);
  const ground = buildGround(scene);
    
  return scene;
};

// ボックスの作成
const buildBox = (scene) => {
  // テクスチャ
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png", scene);// 画像も指定できる

  // ボックスへの画像の適用範囲を指定
  const faceUV = [];
  // 背面
  faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); // (左下x、左下y、右上x、右上y)
  // 前面
  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); 
  // 右側面
  faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); 
  // 左側面
  faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); 
  
  // ボックス
  const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true, width:0.5, height:0.5, depth: 0.5}, scene);
  // 位置を半分だけ上に上げる（地面にめり込んでいるため）
  box.position.y = 0.25;
  box.material = boxMat;

  return box;
};

// 屋根の組み立て
const buildRoof = (scene) => {
  // テクスチャ
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);

  // 屋根（Cylinder は円柱という意味）
  const roof = BABYLON.MeshBuilder.CreateCylinder(
    "roof", 
    {diameter: 0.8, height: 0.6, tessellation: 3},  // tessellationが３の場合、底辺が三角形になる（0だと円柱）
    scene
  );
  roof.scaling.x = 0.4;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 0.56;
  roof.material = roofMat;

  return roof;
};

// 地面の作成
const buildGround = (scene) => {
  // テクスチャ
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0); // rgbで緑色を指定 （new BABYLON.Color3.Green(); でも指定可）

  // 地面
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10}, scene);
  ground.material = groundMat; // 地面の色のためのマテリアルのプロパティを指定

  return ground;
};