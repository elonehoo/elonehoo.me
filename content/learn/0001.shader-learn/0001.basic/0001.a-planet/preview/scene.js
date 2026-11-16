import * as THREE from 'three'

const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x101b23)
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
camera.position.set(0, 0.3, 10)

function framePlanet() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (!width || !height) return
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  const span = Math.min(width, height) * 0.5
  const halfFov = THREE.MathUtils.degToRad(camera.fov / 2)
  camera.position.z = height / (span * Math.tan(halfFov))
  camera.updateProjectionMatrix()
}

framePlanet()
new ResizeObserver(framePlanet).observe(canvas)
window.addEventListener('resize', framePlanet)

scene.add(new THREE.HemisphereLight(0xd9e9ee, 0x38443b, 1.5))
const light = new THREE.DirectionalLight(0xfff2dc, 3)
light.position.set(-2, 3, 3)
scene.add(light)

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uHeight: { value: 0.35 },
    uBands: { value: 3 },
    uSun: { value: new THREE.Vector3(0.8, 0.5, 0.6) }
  },
  vertexShader: /* glsl */ `
    uniform float uHeight;   // 山的高度
    varying vec3 vWorld;
    varying float vH;

    float hash(vec3 p) {
      return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
    }
    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
                     mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
                 mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
                     mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
    }
    float fbm(vec3 p) {
      float sum = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 5; i++) {
        sum += amp * noise(p);
        p *= 2.0;
        amp *= 0.5;
      }
      return sum;
    }

    void main() {
      vec3 n = normalize(position);
      float h = fbm(n * 2.2 + 3.0);          // 0～1 的地形高度
      vH = h;
      float land = max(h - 0.45, 0.0);        // 海平面以下保持圆球
      vec3 p = n * (1.0 + land * uHeight * 2.0);
      vec4 world = modelMatrix * vec4(p, 1.0);
      vWorld = world.xyz;
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uSun;
    uniform float uBands;
    uniform float uTime;
    varying vec3 vWorld;
    varying float vH;

    void main() {
      // 用屏幕导数求每个小三角形的朝向 → 低多边形风格
      vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
      vec3 L = normalize(uSun);
      vec3 V = normalize(cameraPosition - vWorld);
      float diffuse = max(dot(N, L), 0.0);
      float level = ceil(diffuse * uBands) / uBands;   // 分层光照

      vec3 water = vec3(0.16, 0.42, 0.62);
      vec3 sand = vec3(0.89, 0.80, 0.55);
      vec3 grass = vec3(0.36, 0.62, 0.38);
      vec3 rock = vec3(0.45, 0.42, 0.40);
      vec3 snow = vec3(0.95, 0.96, 0.98);
      vec3 base = water;
      if (vH > 0.45) base = sand;
      if (vH > 0.48) base = grass;
      if (vH > 0.58) base = rock;
      if (vH > 0.64) base = snow;

      float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);   // 大气边缘光
      vec3 color = base * (0.18 + 0.82 * level);
      color += vec3(0.45, 0.70, 1.00) * rim * 0.5;
      gl_FragColor = vec4(color, 1.0);
    }
  `
})
const planet = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 28), material)
scene.add(planet)

renderer.setAnimationLoop((ms) => {
  const time = ms / 1000
  material.uniforms.uTime.value = time
  planet.rotation.y = time * 0.08
  renderer.render(scene, camera)
})
