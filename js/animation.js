const createScene =  () => {
  const scene = new BABYLON.Scene(engine);
  
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2.2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

  const faceColors = [];
  faceColors[0] = BABYLON.Color3.Blue();
  faceColors[1] = BABYLON.Color3.Teal()
  faceColors[2] = BABYLON.Color3.Red();
  faceColors[3] = BABYLON.Color3.Purple();
  faceColors[4] = BABYLON.Color3.Green();
  faceColors[5] = BABYLON.Color3.Yellow();

  const boxParent = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors});
  const boxChild = BABYLON.MeshBuilder.CreateBox("Box", {size: 0.5, faceColors:faceColors});
  boxChild.setParent(boxParent);
  
  // 子boxの位置
  // 子boxだけ動く
  boxChild.position.x = 0;
  boxChild.position.y = 2;
  boxChild.position.z = 0;

  boxChild.rotation.x = Math.PI / 4;
  boxChild.rotation.y = Math.PI / 4;
  boxChild.rotation.z = Math.PI / 4;

  // 親boxの座標
  // 子boxごと動く
  boxParent.position.x = 2;
  boxParent.position.y = 0;
  boxParent.position.z = 0;

  boxParent.rotation.x = 0;
  boxParent.rotation.y = 0;
  boxParent.rotation.z = -Math.PI / 4;
  
  const boxChildAxes = localAxes(1, scene);
  boxChildAxes.parent = boxChild; 
  showAxis(6, scene);
  return scene;
}

/***********Create and Draw Axes**************************************/
const showAxis = (size, scene) => {
  const makeTextPlane = (text, color, size) => {
  const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
  dynamicTexture.hasAlpha = true;
  dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
  const plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
  plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
  plane.material.backFaceCulling = false;
  plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
  plane.material.diffuseTexture = dynamicTexture;
  return plane;
  };

  const axisX = BABYLON.Mesh.CreateLines("axisX", [ 
    new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
    new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
  ]);
  axisX.color = new BABYLON.Color3(1, 0, 0);
  const xChar = makeTextPlane("X", "red", size / 10);
  xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

  const axisY = BABYLON.Mesh.CreateLines("axisY", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
      new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
  ]);
  axisY.color = new BABYLON.Color3(0, 1, 0);
  const yChar = makeTextPlane("Y", "green", size / 10);
  yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
  
  const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
      new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
  ]); 
  axisZ.color = new BABYLON.Color3(0, 0, 1);
  const zChar = makeTextPlane("Z", "blue", size / 10);
  zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};

/*********************************************************************/

/*******************************Local Axes****************************/
localAxes = (size, scene) => {
  const local_axisX = BABYLON.Mesh.CreateLines("local_axisX", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
      new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
  ], scene);
  local_axisX.color = new BABYLON.Color3(1, 0, 0);

  local_axisY = BABYLON.Mesh.CreateLines("local_axisY", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
      new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
  ], scene);
  local_axisY.color = new BABYLON.Color3(0, 1, 0);

  const local_axisZ = BABYLON.Mesh.CreateLines("local_axisZ", [
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
      new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
  ], scene);
  local_axisZ.color = new BABYLON.Color3(0, 0, 1);

  const local_origin = new BABYLON.TransformNode("local_origin");

  // ここで親子関係を設定している
  local_axisX.parent = local_origin;
  local_axisY.parent = local_origin;
  local_axisZ.parent = local_origin;

  return local_origin;
}
/*******************************End Local Axes****************************/