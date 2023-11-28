<script setup lang="ts">
</script>

<template>
  <CraftBox class="relative box-border">
    <div class="box">
      <input id="a" type="radio" name="box">
      <label for="a">A</label>

      <input id="b" type="radio" name="box" checked>
      <label for="b">B</label>

      <input id="c" type="radio" name="box">
      <label for="c">C</label>
    </div>
  </CraftBox>
</template>

<style scoped>
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
  .box {
    position: relative;
    width: calc(var(--box-size) * var(--wrapper-scale));
    height: calc(var(--box-size) * var(--wrapper-scale));
  }
  input, label {
    position: absolute;
    width: var(--box-size);
    height: var(--box-size);
  }
  input {
    opacity: 0;
  }
  label {
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
  input:not(:checked) + label {
    --box-rotate: -16deg;
    --box-x: calc(var(--box-size) * -0.48);
    --box-y: calc(var(--box-size) * -0.3);
  }
  input:not(:checked) ~ input:not(:checked) + label {
    --box-rotate: 16deg;
    --box-x: calc(var(--box-size) * 0.48);
    --box-y: calc(var(--box-size) * -0.3);
  }
  input:checked + label {
    z-index: 1;
    --box-bg: #39f;
    --box-scale: 1.2;
  }
  .box:hover label {
    --box-bg: #39f !important;
    --box-border: #39f !important;
  }
  .box:hover label:hover {
    --box-scale: 1.2 !important;
  }
  .box:hover input:not(:checked) + label {
    --box-rotate: 0deg;
    --box-x: calc(var(--box-size) * -1.3);
    --box-y: 0;
  }
  .box:hover input:not(:checked) ~ input:not(:checked) + label {
    --box-rotate: 0deg;
    --box-x: calc(var(--box-size) * 1.3);
    --box-y: 0;
  }
  .box:hover input:checked + label {
    --box-scale: 1;
  }
</style>
