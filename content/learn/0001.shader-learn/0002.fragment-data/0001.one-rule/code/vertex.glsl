attribute vec3 aColor;
attribute vec3 aPosition;
attribute vec2 aUv;
attribute vec3 aNormal;
uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat3 uNormalMatrix;
varying vec3 vColor;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;

void main() {
  vec3 p = aPosition;
  vColor = aColor;
  vUv = aUv;
  vNormal = uNormalMatrix * aNormal;
  vec4 world = uModel * vec4(p, 1.0);
  vWorld = world.xyz;
  gl_Position = uProjection * uView * world;
}
