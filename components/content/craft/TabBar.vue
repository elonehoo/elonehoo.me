<script setup lang="ts">
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="tabs">
      <!-- TAB 1 -->
      <input id="tab-01" type="radio" name="tab" value="url(#path-icon-01)" checked>
      <label for="tab-01">
        <svg>
          <use xlink:href="#icon-01" class="icon" />
        </svg>
        <div class="wave" />
      </label>
      <!-- TAB 2 -->
      <input id="tab-02"  type="radio" name="tab" value="url(#path-icon-02)">
      <label for="tab-02">
        <svg>
          <use xlink:href="#icon-02" class="icon" />
        </svg>
        <div class="wave" />
      </label>
      <!-- TAB 3 -->
      <input id="tab-03"  type="radio" name="tab" value="url(#path-icon-03)">
      <label for="tab-03">
        <svg>
          <use xlink:href="#icon-03" class="icon" />
        </svg>
        <div class="wave" />
      </label>
      <!-- TAB 4 -->
      <input id="tab-04"  type="radio" name="tab" value="url(#path-icon-04)">
      <label for="tab-04">
        <svg>
          <use xlink:href="#icon-04" class="icon" />
        </svg>
        <div class="wave" />
      </label>
    </div>

    <!-- SVG -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon-01" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
        <path d="M13.93,1H20.8A4.21,4.21,0,0,1,25,5.2V20.8A4.21,4.21,0,0,1,20.8,25H5.2A4.21,4.21,0,0,1,1,20.8V5.2A4.21,4.21,0,0,1,5.2,1h.47" />
        <line x1="16" y1="10" x2="18" y2="10" />
        <line x1="8" y1="10" x2="12" y2="10" />
        <line x1="8" y1="15" x2="18" y2="15" />
      </symbol>
      <symbol id="icon-02" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
        <path d="M17,1a12.33,12.33,0,0,1,8,11.65A12.18,12.18,0,0,1,13,25,12.18,12.18,0,0,1,1,12.65,12.33,12.33,0,0,1,9,1" />
        <polygon points="15 14.33 11 17 11 11.67 15 9 15 14.33" />
      </symbol>
      <symbol id="icon-03" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
        <path d="M7.91,2.08a11.15,11.15,0,0,0-5.73,9.81v6a7.83,7.83,0,0,1-1,2.92A1.47,1.47,0,0,0,2.43,23H23.57a1.47,1.47,0,0,0,1.26-2.16,7.83,7.83,0,0,1-1-2.92v-6A11.06,11.06,0,0,0,15.18,1" />
        <path d="M15,23a2,2,0,0,1-4,0" />
        <path d="M16,5.51A6.53,6.53,0,0,1,19.65,9.4" />
      </symbol>
      <symbol id="icon-04" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
        <path d="M17,1a12.33,12.33,0,0,1,8,11.65A12.18,12.18,0,0,1,13,25,12.18,12.18,0,0,1,1,12.65,12.33,12.33,0,0,1,9,1" />
        <path d="M18,18.26a8,8,0,0,1-10.09-.1" />
      </symbol>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" height="0" width="0">
      <clipPath id="path-icon-01">
        <path d="M13.93,1H20.8A4.21,4.21,0,0,1,25,5.2V20.8A4.21,4.21,0,0,1,20.8,25H5.2A4.21,4.21,0,0,1,1,20.8V5.2A4.21,4.21,0,0,1,5.2,1h.47" />
      </clipPath>
      <clipPath id="path-icon-02">
        <path d="M17,1a12.33,12.33,0,0,1,8,11.65A12.18,12.18,0,0,1,13,25,12.18,12.18,0,0,1,1,12.65,12.33,12.33,0,0,1,9,1" />
      </clipPath>
      <clipPath id="path-icon-03">
        <path d="M7.91,2.08a11.15,11.15,0,0,0-5.73,9.81v6a7.83,7.83,0,0,1-1,2.92A1.47,1.47,0,0,0,2.43,23H23.57a1.47,1.47,0,0,0,1.26-2.16,7.83,7.83,0,0,1-1-2.92v-6A11.06,11.06,0,0,0,15.18,1" />
      </clipPath>
      <clipPath id="path-icon-04">
        <path d="M17,1a12.33,12.33,0,0,1,8,11.65A12.18,12.18,0,0,1,13,25,12.18,12.18,0,0,1,1,12.65,12.33,12.33,0,0,1,9,1" />
      </clipPath>
    </svg>
  </div>
</template>

<style scoped>
.tabs {
  --background: #fff;
  --light-grey: #c6cfd9;
  --wave-color: #2ac8dd;
  --width: 300px;
  --height: 75px;
  --border-radius: var(--height);
  background: var(--background);
  width: var(--width);
  height: var(--height);
  padding: 0;
  position: relative;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.dark .tabs {
  --background: #2b2b2b;
  --light-grey: #acacac;
  --wave-color: #2ac8dd;
}
.tabs label {
  width: 26px;
  height: 26px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transform-origin: center bottom;
}
.tabs label::before {
   content: "";
   height: 4px;
   width: 4px;
   border-radius: 0% 100% 50% 50% / 0% 50% 50% 100%;
   transform: scale(1, 1) rotate(45deg);
   transform-origin: 50% 50%;
   background: var(--wave-color);
   display: block;
   position: absolute;
   top: -30px;
}
.tabs label svg {
   width: 100%;
   height: 100%;
   position: relative;
   z-index: 1;
}
.tabs label svg .icon {
   fill: none;
   stroke: var(--light-grey);
   stroke-dashoffset: 98;
   stroke-width: 2px;
   stroke-linecap: round;
   stroke-linejoin: round;
   transition: stroke 0.15s linear 0.3s;
}
.tabs label .wave {
   height: 26px;
   width: 26px;
   position: absolute;
   overflow: hidden;
}
.tabs label .wave::before, .tabs label .wave::after {
   content: "";
   position: absolute;
   left: 0;
   bottom: -12px;
   right: 0;
   background-repeat: repeat;
   height: 14px;
   width: 48px;
   background-size: 12px 12px;
   animation: wave-animation 3s linear infinite;
   transition: bottom 0.15s ease-out 0.35s;
}
.tabs label .wave::before {
   background-image: radial-gradient(circle at 6px -3px, transparent 6px, var(--wave-color) 6px);
   animation-duration: 2s;
   opacity: 0.5;
}
.tabs label .wave::after {
   background-image: radial-gradient(circle at 6px -3px, transparent 6px, var(--wave-color) 6px);
   animation-duration: 3s;
}
.tabs label:nth-of-type(1) .wave {
   clip-path: url(#path-icon-01);
}
.tabs label:nth-of-type(2) .wave {
   clip-path: url(#path-icon-02);
}
.tabs label:nth-of-type(3) .wave {
   clip-path: url(#path-icon-03);
}
.tabs label:nth-of-type(4) .wave {
   clip-path: url(#path-icon-04);
}
.tabs input {
   display: none;
}
.tabs input:checked + label {
   animation: wiggle-animation 1s ease 0.3s;
}
.tabs input:checked + label::before {
   animation: drop-animation 0.35s ease-in both;
}
.tabs input:checked + label svg .icon {
   stroke: #4b4b4b;
}
.dark .tabs input:checked + label svg .icon {
   stroke: #ffffff;
}
.tabs input:checked + label .wave:before {
   bottom: 0;
}
.tabs input:checked + label .wave:after {
   bottom: -4px;
}
@keyframes wiggle-animation {
   0% {
     transform: rotate(0deg);
  }
   20% {
     transform: rotate(-7deg);
  }
   60% {
     transform: rotate(7deg);
  }
   90% {
     transform: rotate(-3deg);
  }
   100% {
     transform: rotate(0deg);
  }
}
@keyframes wave-animation {
   0% {
     transform: translateX(0%);
  }
   100% {
     transform: translateX(-50%);
  }
}
@keyframes drop-animation {
   70% {
     transform: scale(0.8, 3) rotate(45deg);
     top: -7px;
  }
   100% {
     transform: scale(1.5, 0.5) rotate(45deg);
     top: 19px;
  }
}
</style>
