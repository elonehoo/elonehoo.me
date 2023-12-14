<script setup lang="ts">
</script>

<template>
  <CraftBox class="relative box-border">
    <div class="box left-3% top-5%">
      <input id="a" class="box-picker-input" type="radio" name="box">
      <label class="box-picker-label" for="a">A</label>

      <input id="b" class="box-picker-input" type="radio" name="box" checked>
      <label class="box-picker-label" for="b">B</label>

      <input id="c" class="box-picker-input" type="radio" name="box">
      <label class="box-picker-label" for="c">C</label>
    </div>
  </CraftBox>
</template>

<style>
:root {
    --box-size: 48px;
    --wrapper-scale: 2;
    --box-bg: #444;
    --box-border: #fff;
    --box-rotate: 0deg;
    --box-scale: 1;
    --box-x: 0;
    --box-y: 0;
  }
</style>

<style scoped>
  .box {
    position: relative;
    width: calc(var(--box-size) * var(--wrapper-scale));
    height: calc(var(--box-size) * var(--wrapper-scale));
  }
  .box-picker-input, label {
    position: absolute;
    width: var(--box-size);
    height: var(--box-size);
  }
  .box-picker-input {
    opacity: 0;
  }
  .box-picker-label {
    cursor: pointer;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    border-radius: calc(var(--box-size) * 0.18);
    transition: 0.3s;
    background: var(--box-bg);
    border: 1.5px solid var(--box-border);
    left: var(--box-x);
    top: var(--box-y);
    transform: rotate(var(--box-rotate));
  }
  .box-picker-input:not(:checked) + .box-picker-label {
    --box-rotate: -16deg;
    --box-x: calc(var(--box-size) * -0.48);
    --box-y: calc(var(--box-size) * -0.3);
  }
  .box-picker-input:not(:checked) ~ .box-picker-input:not(:checked) + .box-picker-label {
    --box-rotate: 16deg;
    --box-x: calc(var(--box-size) * 0.48);
    --box-y: calc(var(--box-size) * -0.3);
  }
  .box-picker-input:checked + .box-picker-label {
    z-index: 1;
    --box-bg: #39f;
    --box-scale: 1.2;
  }
  .box:hover .box-picker-label {
    --box-bg: #39f !important;
    --box-border: #39f !important;
  }
  .box:hover label:hover {
    --box-scale: 1.2 !important;
  }
  .box:hover .box-picker-input:not(:checked) + .box-picker-label {
    --box-rotate: 0deg;
    --box-x: calc(var(--box-size) * -1.3);
    --box-y: 0;
  }
  .box:hover .box-picker-input:not(:checked) ~ .box-picker-input:not(:checked) + .box-picker-label {
    --box-rotate: 0deg;
    --box-x: calc(var(--box-size) * 1.3);
    --box-y: 0;
  }
  .box:hover .box-picker-input:checked + .box-picker-label {
    --box-scale: 1;
  }
</style>
