import * as THREE from 'three';

const canvas = document.querySelector('#avatar-canvas');
const viewer = document.querySelector('.viewer');
const cameraButton = document.querySelector('#camera-toggle');
const video = document.querySelector('#camera-preview');
const status = document.querySelector('#tracking-status');

if (canvas && viewer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, .1, 100);
  camera.position.set(0, .55, 8.1);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  scene.add(new THREE.HemisphereLight(0xbce9ff, 0x071326, 3.2));
  const key = new THREE.DirectionalLight(0x8eeaff, 6);
  key.position.set(4, 5, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff5bcf, 5);
  rim.position.set(-5, 2, -2);
  scene.add(rim);

  const avatar = new THREE.Group();
  avatar.position.y = -.2;
  scene.add(avatar);

  const materials = {
    skin: new THREE.MeshStandardMaterial({ color: 0xf7d9d7, roughness: .68 }),
    hair: new THREE.MeshStandardMaterial({ color: 0x0b1e42, roughness: .48, metalness: .12 }),
    blue: new THREE.MeshStandardMaterial({ color: 0x0f7aff, roughness: .4, metalness: .18 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x041126, roughness: .42, metalness: .3 }),
    cyan: new THREE.MeshStandardMaterial({ color: 0x64e6ff, roughness: .24, emissive: 0x0d7895, emissiveIntensity: .55 }),
    pink: new THREE.MeshStandardMaterial({ color: 0xf45acb, roughness: .28, emissive: 0x7c135f, emissiveIntensity: .3 }),
    white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .45 }),
  };

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(1.13, 1.35, 8, 24), materials.blue);
  torso.scale.set(1, .95, .58);
  torso.position.y = -1.55;
  avatar.add(torso);

  const jacket = new THREE.Mesh(new THREE.TorusGeometry(.86, .17, 12, 48, Math.PI), materials.dark);
  jacket.rotation.set(Math.PI / 2, 0, 0);
  jacket.position.set(0, -.86, .52);
  avatar.add(jacket);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.3, .34, .48, 24), materials.skin);
  neck.position.y = -.54;
  avatar.add(neck);

  const headPivot = new THREE.Group();
  headPivot.position.y = .35;
  avatar.add(headPivot);

  const head = new THREE.Mesh(new THREE.SphereGeometry(1.04, 48, 32), materials.skin);
  head.scale.set(.88, 1.04, .84);
  headPivot.add(head);

  const hairBack = new THREE.Mesh(new THREE.SphereGeometry(1.1, 36, 24), materials.hair);
  hairBack.scale.set(.92, 1.08, .9);
  hairBack.position.z = -.16;
  headPivot.add(hairBack);
  headPivot.remove(head);
  headPivot.add(hairBack, head);

  const fringeGeo = new THREE.ConeGeometry(.34, 1.05, 8);
  [-.54, -.18, .18, .54].forEach((x, index) => {
    const fringe = new THREE.Mesh(fringeGeo, index === 3 ? materials.cyan : materials.hair);
    fringe.position.set(x * .82, .5 + Math.abs(x) * .04, .77);
    fringe.rotation.z = x * -.28;
    fringe.rotation.x = -.16;
    headPivot.add(fringe);
  });

  const eyeGroup = new THREE.Group();
  eyeGroup.position.set(0, .08, .84);
  headPivot.add(eyeGroup);
  const eyes = [];
  [-.33, .33].forEach((x) => {
    const white = new THREE.Mesh(new THREE.SphereGeometry(.18, 24, 16), materials.white);
    white.scale.set(1, 1.22, .34);
    white.position.x = x;
    const iris = new THREE.Mesh(new THREE.SphereGeometry(.085, 20, 12), materials.cyan);
    iris.position.set(x, 0, .165);
    eyeGroup.add(white, iris);
    eyes.push({ white, iris });
  });

  const mouth = new THREE.Mesh(new THREE.TorusGeometry(.12, .025, 8, 20, Math.PI), materials.pink);
  mouth.rotation.z = Math.PI;
  mouth.position.set(0, -.36, .88);
  headPivot.add(mouth);

  const earRing = new THREE.Mesh(new THREE.TorusGeometry(.13, .025, 8, 24), materials.pink);
  earRing.position.set(.92, -.03, .02);
  earRing.rotation.y = Math.PI / 2;
  headPivot.add(earRing);

  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(.22, 1.28, 8, 18), materials.dark);
    arm.position.set(side * 1.08, -1.42, -.02);
    arm.rotation.z = side * -.17;
    avatar.add(arm);
  });

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.58, .018, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0x69e2ff, transparent: true, opacity: .46 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -2.85;
  scene.add(ring);

  const particles = new THREE.Group();
  for (let index = 0; index < 16; index += 1) {
    const dot = new THREE.Mesh(
      new THREE.IcosahedronGeometry(.03 + Math.random() * .035, 0),
      index % 4 === 0 ? materials.pink : materials.cyan
    );
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.7 + Math.random() * 1.2;
    dot.position.set(Math.cos(angle) * radius, -1.7 + Math.random() * 4.3, Math.sin(angle) * .5);
    particles.add(dot);
  }
  scene.add(particles);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let blinkStart = -10;
  let nextBlink = 2.5;
  let stream = null;
  let tracking = false;
  let detector = null;
  let lastDetection = 0;
  let motionCanvas = null;
  let motionContext = null;
  let previousFrame = null;

  viewer.addEventListener('pointermove', (event) => {
    if (tracking) return;
    const rect = viewer.getBoundingClientRect();
    target.x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    target.y = -(((event.clientY - rect.top) / rect.height - .5) * 2);
  });
  viewer.addEventListener('pointerleave', () => {
    if (!tracking) { target.x = 0; target.y = 0; }
  });

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    tracking = false;
    video.srcObject = null;
    video.classList.remove('active');
    cameraButton.classList.remove('active');
    cameraButton.textContent = 'カメラトラッキングを試す';
    status.textContent = 'カメラ映像は保存されません';
    target.x = 0;
    target.y = 0;
  };

  const trackMotion = () => {
    if (!motionCanvas) {
      motionCanvas = document.createElement('canvas');
      motionCanvas.width = 32;
      motionCanvas.height = 20;
      motionContext = motionCanvas.getContext('2d', { willReadFrequently: true });
    }
    motionContext.drawImage(video, 0, 0, 32, 20);
    const pixels = motionContext.getImageData(0, 0, 32, 20).data;
    if (previousFrame) {
      let total = 0;
      let weightedX = 0;
      let weightedY = 0;
      for (let y = 0; y < 20; y += 1) {
        for (let x = 0; x < 32; x += 1) {
          const offset = (y * 32 + x) * 4;
          const current = pixels[offset] + pixels[offset + 1] + pixels[offset + 2];
          const prior = previousFrame[offset] + previousFrame[offset + 1] + previousFrame[offset + 2];
          const difference = Math.abs(current - prior);
          if (difference > 55) {
            total += difference;
            weightedX += x * difference;
            weightedY += y * difference;
          }
        }
      }
      if (total > 900) {
        target.x = -((weightedX / total / 31) - .5) * 1.8;
        target.y = -((weightedY / total / 19) - .5) * 1.45;
      }
    }
    previousFrame = new Uint8ClampedArray(pixels);
  };

  const trackFace = async () => {
    if (!tracking || video.readyState < 2) return;
    try {
      if (detector) {
        const faces = await detector.detect(video);
        if (faces[0]) {
          const box = faces[0].boundingBox;
          target.x = -(((box.x + box.width / 2) / video.videoWidth) - .5) * 1.8;
          target.y = -(((box.y + box.height / 2) / video.videoHeight) - .5) * 1.45;
        }
      } else {
        trackMotion();
      }
    } catch {
      trackMotion();
    }
  };

  cameraButton?.addEventListener('click', async () => {
    if (tracking) { stopCamera(); return; }
    if (!navigator.mediaDevices?.getUserMedia) {
      status.textContent = 'このブラウザはカメラ入力に対応していません';
      return;
    }
    try {
      status.textContent = 'カメラの許可を待っています…';
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 } }, audio: false });
      video.srcObject = stream;
      await video.play();
      tracking = true;
      previousFrame = null;
      if ('FaceDetector' in window) detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
      video.classList.add('active');
      cameraButton.classList.add('active');
      cameraButton.textContent = 'トラッキングを終了';
      status.textContent = detector ? '顔の位置を検出中（映像は保存しません）' : '動きを検出中（映像は保存しません）';
    } catch {
      status.textContent = 'カメラを開始できませんでした。許可設定をご確認ください';
      stopCamera();
    }
  });

  const resize = () => {
    const width = viewer.clientWidth;
    const height = viewer.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(viewer);
  resize();

  const clock = new THREE.Clock();
  const animate = () => {
    const elapsed = clock.getElapsedTime();
    pointer.x += (target.x - pointer.x) * .06;
    pointer.y += (target.y - pointer.y) * .06;

    headPivot.rotation.y = pointer.x * .28;
    headPivot.rotation.x = -pointer.y * .15;
    eyeGroup.rotation.y = pointer.x * .14;
    eyeGroup.rotation.x = -pointer.y * .1;
    avatar.position.y = -.18 + Math.sin(elapsed * 1.25) * .045;
    avatar.rotation.z = Math.sin(elapsed * .72) * .018;
    torso.scale.y = .95 + Math.sin(elapsed * 1.25) * .008;
    particles.rotation.y = elapsed * .06;
    ring.rotation.z = elapsed * .22;

    if (elapsed > nextBlink) {
      blinkStart = elapsed;
      nextBlink = elapsed + 2.8 + Math.random() * 3.8;
    }
    const blinkProgress = elapsed - blinkStart;
    const eyeScale = blinkProgress < .22 ? Math.max(.08, 1 - Math.sin(blinkProgress / .22 * Math.PI)) : 1;
    eyes.forEach(({ white, iris }) => {
      white.scale.y = 1.22 * eyeScale;
      iris.scale.y = eyeScale;
    });

    if (tracking && elapsed - lastDetection > .11) {
      lastDetection = elapsed;
      trackFace();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
  window.addEventListener('pagehide', stopCamera);
}
