precision mediump float;
varying vec2 vUv;
uniform vec2 uResolution;

void main() {
  vec2 point = vec2(0.650, 0.400);
  vec2 p = (vUv - point) * uResolution / min(uResolution.x, uResolution.y);
  float grid = max(step(0.98, fract(vUv.x * 10.0)), step(0.98, fract(vUv.y * 10.0)));
  float dotMask = 1.0 - smoothstep(0.018, 0.025, length(p));
  vec3 color = mix(vec3(0.06, 0.10, 0.14), vec3(0.22, 0.30, 0.33), grid);
  color = mix(color, vec3(0.96, 0.43, 0.30), dotMask);
  gl_FragColor = vec4(color, 1.0);
}
