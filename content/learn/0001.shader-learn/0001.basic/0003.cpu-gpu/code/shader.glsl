precision mediump float;
varying vec2 vUv;
uniform highp float uTime;

void main() {
  vec2 cell = floor(vUv * 12.000);
  float index = cell.y * 12.000 + cell.x;          // C 循环里的第几次
  vec3 color = vec3((cell + 0.5) / 12.000, 0.25);  // shade(x, y)
  float total = 12.000 * 12.000;
  float cpu = mod(uTime * 24.000, total + 8.0);
  float done = step(index + 0.5, cpu);
  float current = 1.0 - step(0.5, abs(index - floor(cpu)));
  color = mix(vec3(0.06, 0.10, 0.14), color, max(done, current * 0.6));
  vec2 local = fract(vUv * 12.000);
  color = mix(color, vec3(1.0), current * step(0.86, max(local.x, local.y)));
  gl_FragColor = vec4(color, 1.0);
}
