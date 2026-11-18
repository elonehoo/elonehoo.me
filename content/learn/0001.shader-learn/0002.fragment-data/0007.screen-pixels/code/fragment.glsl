precision mediump float;
uniform vec2 uResolution;

void main() {
  vec2 pixel = floor(gl_FragCoord.xy / 24.000) * 24.000;
  vec2 screenUv = pixel / uResolution;
  vec3 color = vec3(screenUv, 0.3);
  gl_FragColor = vec4(color, 1.0);
}
