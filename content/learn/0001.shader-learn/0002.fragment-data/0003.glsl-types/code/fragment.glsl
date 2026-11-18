precision mediump float;
varying vec2 vUv;

void main() {
  float brightness = 1.000;
  int count = 12;
  bool invert = false;
  float stripe = step(0.5, fract(vUv.x * float(count)));
  if (invert) stripe = 1.0 - stripe;
  vec3 color = mix(vec3(0.06, 0.10, 0.14), vec3(0.48, 0.83, 0.69), stripe) * brightness;
  gl_FragColor = vec4(color, 1.0);
}
