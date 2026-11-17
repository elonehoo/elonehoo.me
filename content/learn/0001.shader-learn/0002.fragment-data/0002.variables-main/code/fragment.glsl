precision mediump float;
uniform float uInput;
uniform float uGain;
varying vec2 vUv;

void main() {
  float result = uInput * uGain;
  vec3 color = vec3(mix(uInput, result, step(0.5, vUv.x)));
  gl_FragColor = vec4(color, 1.0);
}
