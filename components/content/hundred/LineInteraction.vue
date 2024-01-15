<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <div class="loader"/>
  </CraftBox>
</template>

<style scoped>
.loader {
  -webkit-transform: rotateZ(45deg);
      -ms-transform: rotate(45deg);
          transform: rotateZ(45deg);
  -webkit-perspective: 1000px;
          perspective: 1000px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #91ff00;
      }
.loader:before,
.loader:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  -webkit-transform: rotateX(70deg);
          transform: rotateX(70deg);
  -webkit-animation: 1s spin linear infinite;
          animation: 1s spin linear infinite;
}
.loader:after {
  color: #FF3D00;
  -webkit-transform: rotateY(70deg);
          transform: rotateY(70deg);
  -webkit-animation-delay: .4s;
          animation-delay: .4s;
}

@-webkit-keyframes rotate {
  0% {
    -webkit-transform: translate(-50%, -50%) rotateZ(0deg);
            transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotateZ(360deg);
            transform: translate(-50%, -50%) rotateZ(360deg);
  }
}

@keyframes rotate {
  0% {
    -webkit-transform: translate(-50%, -50%) rotateZ(0deg);
            transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotateZ(360deg);
            transform: translate(-50%, -50%) rotateZ(360deg);
  }
}

@-webkit-keyframes rotateccw {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
            transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(-360deg);
            transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes rotateccw {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
            transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(-360deg);
            transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@-webkit-keyframes spin {
  0%,
  100% {
    -webkit-box-shadow: .2em 0px 0 0px currentcolor;
            box-shadow: .2em 0px 0 0px currentcolor;
  }
  12% {
    -webkit-box-shadow: .2em .2em 0 0 currentcolor;
            box-shadow: .2em .2em 0 0 currentcolor;
  }
  25% {
    -webkit-box-shadow: 0 .2em 0 0px currentcolor;
            box-shadow: 0 .2em 0 0px currentcolor;
  }
  37% {
    -webkit-box-shadow: -.2em .2em 0 0 currentcolor;
            box-shadow: -.2em .2em 0 0 currentcolor;
  }
  50% {
    -webkit-box-shadow: -.2em 0 0 0 currentcolor;
            box-shadow: -.2em 0 0 0 currentcolor;
  }
  62% {
    -webkit-box-shadow: -.2em -.2em 0 0 currentcolor;
            box-shadow: -.2em -.2em 0 0 currentcolor;
  }
  75% {
    -webkit-box-shadow: 0px -.2em 0 0 currentcolor;
            box-shadow: 0px -.2em 0 0 currentcolor;
  }
  87% {
    -webkit-box-shadow: .2em -.2em 0 0 currentcolor;
            box-shadow: .2em -.2em 0 0 currentcolor;
  }
}

@keyframes spin {
  0%,
  100% {
    -webkit-box-shadow: .2em 0px 0 0px currentcolor;
            box-shadow: .2em 0px 0 0px currentcolor;
  }
  12% {
    -webkit-box-shadow: .2em .2em 0 0 currentcolor;
            box-shadow: .2em .2em 0 0 currentcolor;
  }
  25% {
    -webkit-box-shadow: 0 .2em 0 0px currentcolor;
            box-shadow: 0 .2em 0 0px currentcolor;
  }
  37% {
    -webkit-box-shadow: -.2em .2em 0 0 currentcolor;
            box-shadow: -.2em .2em 0 0 currentcolor;
  }
  50% {
    -webkit-box-shadow: -.2em 0 0 0 currentcolor;
            box-shadow: -.2em 0 0 0 currentcolor;
  }
  62% {
    -webkit-box-shadow: -.2em -.2em 0 0 currentcolor;
            box-shadow: -.2em -.2em 0 0 currentcolor;
  }
  75% {
    -webkit-box-shadow: 0px -.2em 0 0 currentcolor;
            box-shadow: 0px -.2em 0 0 currentcolor;
  }
  87% {
    -webkit-box-shadow: .2em -.2em 0 0 currentcolor;
            box-shadow: .2em -.2em 0 0 currentcolor;
  }
}
</style>
