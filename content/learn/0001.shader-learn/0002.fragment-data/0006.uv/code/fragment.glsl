precision mediump float;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec3 color = vec3(uv.x * 1.000, uv.y * 1.000, 0.25);
  gl_FragColor = vec4(color, 1.0);
}
