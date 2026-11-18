precision mediump float;
varying vec2 vUv;

void main() {
  vec3 original = vec3(vUv.x, vUv.y, 0.2);
  vec3 color = original.rgb;
  gl_FragColor = vec4(color, 1.0);
}
