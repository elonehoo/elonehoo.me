<script setup lang="ts">
</script>

<template>
  <CraftBox>
    <label v-for="i in 15" :key="i" class="line">
      <input type="radio" name="line">
      <div />
    </label>
  </CraftBox>
</template>

<style scoped>
.line {
  cursor: pointer;
  height: 100px;
  padding: 0px 4px;
  transition: transform 0.2s;
  position: relative;
}
.line > input {
  position: absolute;
  width: 0px;
  height: 0px;
  margin: 0px;
  padding: 0px;
}
.line:has(> input:checked):hover > div {
  width: 180px;
}
.line:has(> input:checked) > div {
  background: yellow;
}
.dark .line > div {
  height: 100%;
  width: 2px;
  background: #222;
  transition: background 0.6s, width 0.2s;
}
.line > div {
  height: 100%;
  width: 2px;
  background: #ddd;
  transition: background 0.6s, width 0.2s;
}
.line:hover {
  transform: scaleY(1.3);
}
.dark .line:hover > div {
  background: #eee !important;
}
.line:hover > div {
  background: #111 !important;
}
.line:has(+ .line:hover), .line:hover + .line {
  transform: scaleY(1.2);
}
.line:has(+ .line:hover) > div, .line:hover + .line > div {
  background: #888;
}
.dark .line:has(+ .line:hover) > div, .line:hover + .line > div {
  background: #777;
}
.line:has(+ .line + .line:hover), .line:hover + .line + .line {
  transform: scaleY(1.05);
}
.dark .line:has(+ .line + .line:hover) > div, .line:hover + .line + .line > div {
  background: #444;
}
.line:has(+ .line + .line:hover) > div, .line:hover + .line + .line > div {
  background: #bbb;
}
</style>
