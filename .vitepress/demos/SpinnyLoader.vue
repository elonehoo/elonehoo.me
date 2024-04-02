<template>
  <CraftBox>
    <div class="center">
      <span class="a">
        <span class="b">
          <span class="c" />
        </span>
      </span>
    </div>
  </CraftBox>
</template>

<style scoped>
span {
  position: absolute;
  display: block;
  width: 60px;
  height: 60px;
  border: 3px solid #808080;
  border-radius: 100%;
}

.a, .b, .c {
  animation-name: rotate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.a {
  animation-duration: 1500ms;
}

.b {
  animation-duration: 4500ms;
  transform-origin: 63% 63%;
  width: 40px;
  height: 40px;
}

.c {
  animation-duration: 9000ms;
  transform-origin: 74% 74%;
  width: 20px;
  height: 20px;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -33px;
  margin-left: -33px;
}
</style>
