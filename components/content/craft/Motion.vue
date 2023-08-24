<script setup lang="ts">

</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div class="shape circle" />
    <div class="shape rectangle" />
    <div class="shape triangle" />
  </div>
</template>

<style scoped>
.shape.triangle {
    animation-name: Motion_triangle;
    background-image: radial-gradient(circle at top right,#00ff51,rgba(0,255,255,0)),radial-gradient(circle at top left,#14ffec,rgba(255,20,146,0));
    margin-left: 32px;
    border-radius: 50% 50% 4px 4px;
}
.shape.rectangle {
    animation-name: Motion_rectangle;
    margin-left: 32px;
    background-image: radial-gradient(circle at top right,#0ff,rgba(0,255,255,0)),radial-gradient(circle at bottom left,#ff1492,rgba(255,20,146,0));
}
.shape.circle {
    border-radius: 50%;
    animation-name: Motion_circle;
    background-image: radial-gradient(circle at top left,#f8ff00,#00ffff00),radial-gradient(circle at bottom right,#ff1414,#ff149200);
}
.shape {
    width: 35px;
    height: 35px;
    border-radius: 4px;
    background-color: #6469ff;
    animation-duration: .9s;
    animation-timing-function: cubic-bezier(.2,.8,.4,1);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
}
@keyframes Motion_circle {
  0% {
    transform: scale(1);
    box-shadow: 0 4px 16px -1px rgba(255,161,161,.5)
  }
  to {
    transform: scale(1.4);
    box-shadow: 0 8px 16px -1px rgba(255,161,161,.7)
  }
}
@keyframes Motion_rectangle {
    0% {
        border-radius: 4px;
        transform: scale(1);
        box-shadow: 0 4px 16px -1px rgba(189,161,255,.5)
    }

    to {
        border-radius: 20%;
        transform: scale(1.4);
        box-shadow: 0 8px 16px -1px rgba(189,161,255,.7)
    }
}
@keyframes Motion_triangle {
    0% {
        transform: scale(1);
        border-radius: 50% 50% 4px 4px;
        box-shadow: 0 4px 16px -1px rgba(93,224,255,.5)
    }

    to {
        transform: scale(1.4);
        box-shadow: 0 8px 16px -1px rgba(93,224,255,.7)
    }
}
</style>
