<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <div class="tic_tac_toe_loading" />
  </CraftBox>
</template>

<style scoped>
.tic_tac_toe_loading {
 position: relative;
 width: 2.5em;
 height: 2.5em;
 transform: rotate(165deg);
}

.tic_tac_toe_loading:before, .tic_tac_toe_loading:after {
 content: "";
 position: absolute;
 top: 50%;
 left: 50%;
 display: block;
 width: 0.5em;
 height: 0.5em;
 border-radius: 0.25em;
 transform: translate(-50%, -50%);
}

.tic_tac_toe_loading:before {
 animation: before_tic_tac_toe_loading 2s infinite;
}

.tic_tac_toe_loading:after {
 animation: after_tic_tac_toe_loading 2s infinite;
}

@keyframes before_tic_tac_toe_loading {
 0% {
  width: 0.5em;
  box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
 }

 35% {
  width: 2.5em;
  box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
 }

 70% {
  width: 0.5em;
  box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
 }

 100% {
  box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
 }
}

@keyframes after_tic_tac_toe_loading {
 0% {
  height: 0.5em;
  box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
 }

 35% {
  height: 2.5em;
  box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
 }

 70% {
  height: 0.5em;
  box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
 }

 100% {
  box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
 }
}

.tic_tac_toe_loading {
 position: absolute;
 top: calc(50% - 1.25em);
 left: calc(50% - 1.25em);
}
</style>
