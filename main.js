'use sstrict';

// レンダラの作成、DOMに追加
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
let mixer;


renderer.setClearColor(0xf3f3f3, 1.0);
document.body.appendChild(renderer.domElement);


// シーンの作成、カメラの作成と追加、ライトの作成と追加
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1.0);
camera.position.set(0, 1, 5);

var directionalLight = new THREE.DirectionalLight( 0xffeedd, 3);
directionalLight.position.set( 0, 0, 50 );
scene.add( directionalLight );

var directionalLight2 = new THREE.DirectionalLight( 0xffeedd, 3);
directionalLight2.position.set( 0, 0, -50 );
scene.add( directionalLight2 );

var directionalLight3 = new THREE.DirectionalLight( 0xffeedd,1);
directionalLight3.position.set( 50, 0, 0 );
scene.add( directionalLight3 );

var directionalLight4 = new THREE.DirectionalLight( 0xffeedd,1);
directionalLight4.position.set( -50, 0, 0 );
scene.add( directionalLight4 );

var directionalLight5 = new THREE.DirectionalLight( 0xffeedd, 2);
directionalLight5.position.set( 0, 50, 0 );
scene.add( directionalLight5 );

const loader = new THREE.GLTFLoader();
const model = 'Assets/model/itボーン.gltf';



//glTFの読み込み
loader.load(model, (data) => {
  const gltf = data;
  const object = gltf.scene;
  const animations = gltf.animations;


  mixer = new THREE.AnimationMixer(object);

  $(function () {

    $("span").mouseover(function(){
      let span = $("span").index(this);
      
      chengeanime(span);

    });

  });

  object.position.set(0, -1.1, 0,)
  scene.add(object);

  //アニメーションの切り替え
  function chengeanime(num) {
    mixer.stopAllAction();
    const anime = mixer.clipAction(animations[num]);
    anime.setLoop(THREE.LoopOnce)
    anime.clampWhenFinished = true
    anime.enable = true

    anime.play();
  }
});


onResize();
window.addEventListener('resize', onResize);

animation();


$(function () {
  const div = $('<div class="c"></div>');
  $('canvas').wrap(div);
})

// レンダリング
function animation() {
  renderer.render(scene, camera);

  if (mixer) {
    mixer.update(clock.getDelta());
  }

  requestAnimationFrame(animation);
};

//リサイズ
function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
