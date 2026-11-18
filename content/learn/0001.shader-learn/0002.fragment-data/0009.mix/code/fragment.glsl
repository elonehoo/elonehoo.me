precision mediump float;

void main() {
  vec3 a = vec3(0.96, 0.43, 0.30);
  vec3 b = vec3(0.48, 0.83, 0.69);
  vec3 color = mix(a, b, 0.500);
  gl_FragColor = vec4(color, 1.0);
}
