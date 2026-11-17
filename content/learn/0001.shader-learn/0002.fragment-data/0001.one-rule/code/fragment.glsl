precision mediump float;
varying vec2 vUv;
uniform vec2 uResolution;

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
  float d = length(p);
  float circle = 1.0 - smoothstep(0.300, 0.300 + 0.040, d);
  vec3 gradient = mix(vec3(0.96, 0.43, 0.30), vec3(0.48, 0.83, 0.69), vUv.y);
  vec3 color = mix(vec3(0.06, 0.10, 0.14), gradient, circle);
  gl_FragColor = vec4(color, 1.0);
}
