const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // シーンにカメラを追加し、それを canvas にアタッチ（第4引数がカメラの半径（大きくすると引きの描写になる）
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 40, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  
  // シーンにライト（光源）を追加
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  
  // 住居を作成
  buildDwellings(scene);
  
  return scene;
};

// 住居の作成
const buildDwellings = (scene) => {
  const ground = buildGround(scene);

  const detached_house = buildHouse(scene, 1);
  detached_house.rotation.y = -Math.PI / 16;
  detached_house.position.x = -6.8;
  detached_house.position.z = 2.5;

  const semi_house = buildHouse(scene, 2);
  semi_house .rotation.y = -Math.PI / 16;
  semi_house.position.x = -4.5;
  semi_house.position.z = 3;

  const places = []; //家のタイプ等を定義した配列 [家のタイプ, 向き, x, z]
  places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
  places.push([2, -Math.PI / 16, -4.5, 3 ]);
  places.push([2, -Math.PI / 16, -1.5, 4 ]);
  places.push([2, -Math.PI / 3, 1.5, 6 ]);
  places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
  places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
  places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
  places.push([1, 5 * Math.PI / 4, 0, -1 ]);
  places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
  places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
  places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
  places.push([2, Math.PI / 1.9, 4.75, -1 ]);
  places.push([1, Math.PI / 1.95, 4.5, -3 ]);
  places.push([2, Math.PI / 1.9, 4.75, -5 ]);
  places.push([1, Math.PI / 1.9, 4.75, -7 ]);
  places.push([2, -Math.PI / 3, 5.25, 2 ]);
  places.push([1, -Math.PI / 3, 6, 4 ]);

  //places[]の要素数だけ家を作成する
  const houses = [];
  for (let i = 0; i < places.length; i++) {
    // メッシュの複製
    if (places[i][0] === 1) {
        houses[i] = detached_house.createInstance("house" + i);
    }
    else {
        houses[i] = semi_house.createInstance("house" + i);
    }
    houses[i].rotation.y = places[i][1];
    houses[i].position.x = places[i][2];
    houses[i].position.z = places[i][3];
  }
};

// 地面の作成
const buildGround = (scene) => {
  // テクスチャ
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0); // rgbで緑色を指定 （new BABYLON.Color3.Green(); でも指定可）
  
  // 地面
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:20, height:20}, scene);
  ground.material = groundMat; // 地面の色のためのマテリアルのプロパティを指定
  
  return ground;
};

// 家の作成
const buildHouse = (scene, width) => {
  const box = buildBox(scene, width);
  const roof = buildRoof(scene, width);

  // 屋根とボックスを一つのメッシュとしてマージする
  // 第2引数をtrueにすると、元のメッシュが破棄され、マージされたメッシュが生成される
  // 第6引数をtrueにすると、各メッシュ毎のデザインが適用される
  const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);

  return house;
};

// ボックスの作成
const buildBox = (scene, width) => {
  // ボックス
  // テクスチャ
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  if (width == 2) {
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png") 
  }else {
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");   
  }

  // ボックスへの画像の適用範囲を指定
  const faceUV = [];
  // (左下x、左下y、右上x、右上y)
  if (width == 2) {
    faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
  }else {
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
  }
    
  // ボックス
  const box = BABYLON.MeshBuilder.CreateBox("box", {width: width, faceUV: faceUV, wrap: true}, scene);
  // 位置を半分だけ上に上げる（地面にめり込んでいるため）
  box.position.y = 0.5;
  box.material = boxMat;

  return box;
};

// 屋根の作成
const buildRoof = (scene, width) => {
  // 屋根
  // テクスチャ
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);

  // 屋根（Cylinder は円柱という意味）
  const roof = BABYLON.MeshBuilder.CreateCylinder(
    "roof", 
    {diameter: 1.3, height: 1.2, tessellation: 3},  // tessellationが３の場合、底辺が三角形になる（0だと円柱）
    scene
  );
  roof.scaling.x = 0.75;
  roof.scaling.y = width;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;
  roof.material = roofMat;

  return roof;
};
