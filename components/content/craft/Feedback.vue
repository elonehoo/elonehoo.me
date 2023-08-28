<script setup lang="ts">

const selected = ref<number>(1)
</script>

<template>
  <div class="min-h-screen w-full flex justify-center items-center flex-col ">
    <ul class="feedback m-0 p-0 flex [list-style:none]">
      <li class="angry mr-20px" @click="selected = 1" :class="{'active':selected === 1}">
        <div class="w-40px h-40px relative [transform:perspective(240px)_translateZ(4px)]">
          <svg class="eye left">
            <use xlink:href="#eye" />
          </svg>
          <svg class="eye right">
            <use xlink:href="#eye" />
          </svg>
          <svg class="mouth">
            <use xlink:href="#mouth" />
          </svg>
        </div>
      </li>
      <li class="sad mr-20px" @click="selected = 2" :class="{'active':selected === 2}">
        <div class="w-40px h-40px relative [transform:perspective(240px)_translateZ(4px)]">
          <svg class="eye left">
            <use xlink:href="#eye" />
          </svg>
          <svg class="eye right">
            <use xlink:href="#eye" />
          </svg>
          <svg class="mouth">
            <use xlink:href="#mouth" />
          </svg>
        </div>
      </li>
      <li class="ok mr-20px" @click="selected = 3" :class="{'active':selected === 3}">
        <div class="w-40px h-40px relative [transform:perspective(240px)_translateZ(4px)]" />
      </li>
      <li class="good mr-20px" @click="selected = 4" :class="{'active':selected === 4}">
        <div class="w-40px h-40px relative [transform:perspective(240px)_translateZ(4px)]">
          <svg class="eye left">
            <use xlink:href="#eye" />
          </svg>
          <svg class="eye right">
            <use xlink:href="#eye" />
          </svg>
          <svg class="mouth">
            <use xlink:href="#mouth" />
          </svg>
        </div>
      </li>
      <li class="happy" @click="selected = 5" :class="{'active':selected === 5}">
        <div class="w-40px h-40px relative [transform:perspective(240px)_translateZ(4px)]">
          <svg class="eye left">
            <use xlink:href="#eye" />
          </svg>
          <svg class="eye right">
            <use xlink:href="#eye" />
          </svg>
        </div>
      </li>
    </ul>

    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4">
        <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1" />
      </symbol>
      <symbol id="mouth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7">
        <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5" />
      </symbol>
    </svg>
  </div>
</template>

<style>
.feedback {
	 --normal: #eceaf3;
	 --normal-shadow: #d9d8e3;
	 --normal-mouth: #9795a4;
	 --normal-eye: #595861;
	 --active: #f8da69;
	 --active-shadow: #f4b555;
	 --active-mouth: #f05136;
	 --active-eye: #313036;
	 --active-tear: #76b5e7;
	 --active-shadow-angry: #e94f1d;
}
 .feedback li {
	 position: relative;
	 border-radius: 50%;
	 background: var(--sb, var(--normal));
	 box-shadow: inset 3px -3px 4px var(--sh, var(--normal-shadow));
	 transition: background 0.4s, box-shadow 0.4s, transform 0.3s;
	 -webkit-tap-highlight-color: transparent;
}
 .feedback li div svg, .feedback li div:before, .feedback li div:after {
	 display: block;
	 position: absolute;
	 left: var(--l, 9px);
	 top: var(--t, 13px);
	 width: var(--w, 8px);
	 height: var(--h, 2px);
	 transform: rotate(var(--r, 0deg)) scale(var(--sc, 1)) translateZ(0);
}
 .feedback li div svg {
	 fill: none;
	 stroke: var(--s);
	 stroke-width: 2px;
	 stroke-linecap: round;
	 stroke-linejoin: round;
	 transition: stroke 0.4s;
}
 .feedback li div svg.eye {
	 --s: var(--e, var(--normal-eye));
	 --t: 17px;
	 --w: 7px;
	 --h: 4px;
}
 .feedback li div svg.eye.right {
	 --l: 23px;
}
 .feedback li div svg.mouth {
	 --s: var(--m, var(--normal-mouth));
	 --l: 11px;
	 --t: 23px;
	 --w: 18px;
	 --h: 7px;
}
 .feedback li div:before, .feedback li div:after {
	 content: '';
	 z-index: var(--zi, 1);
	 border-radius: var(--br, 1px);
	 background: var(--b, var(--e, var(--normal-eye)));
	 transition: background 0.4s;
}
 .feedback li.angry {
	 --step-1-rx: -24deg;
	 --step-1-ry: 20deg;
	 --step-2-rx: -24deg;
	 --step-2-ry: -20deg;
}
 .feedback li.angry div:before {
	 --r: 20deg;
}
 .feedback li.angry div:after {
	 --l: 23px;
	 --r: -20deg;
}
 .feedback li.angry div svg.eye {
	 stroke-dasharray: 4.55;
	 stroke-dashoffset: 8.15;
}
 .feedback li.angry.active {
	 animation: angry 1s linear;
}
 .feedback li.angry.active div:before {
	 --middle-y: -2px;
	 --middle-r: 22deg;
	 animation: toggle 0.8s linear forwards;
}
 .feedback li.angry.active div:after {
	 --middle-y: 1px;
	 --middle-r: -18deg;
	 animation: toggle 0.8s linear forwards;
}
 .feedback li.sad {
	 --step-1-rx: 20deg;
	 --step-1-ry: -12deg;
	 --step-2-rx: -18deg;
	 --step-2-ry: 14deg;
}
 .feedback li.sad div:before, .feedback li.sad div:after {
	 --b: var(--active-tear);
	 --sc: 0;
	 --w: 5px;
	 --h: 5px;
	 --t: 15px;
	 --br: 50%;
}
 .feedback li.sad div:after {
	 --l: 25px;
}
 .feedback li.sad div svg.eye {
	 --t: 16px;
}
 .feedback li.sad div svg.mouth {
	 --t: 24px;
	 stroke-dasharray: 9.5;
	 stroke-dashoffset: 33.25;
}
 .feedback li.sad.active div:before, .feedback li.sad.active div:after {
	 animation: tear 0.6s linear forwards;
}
 .feedback li.ok {
	 --step-1-rx: 4deg;
	 --step-1-ry: -22deg;
	 --step-1-rz: 6deg;
	 --step-2-rx: 4deg;
	 --step-2-ry: 22deg;
	 --step-2-rz: -6deg;
}
 .feedback li.ok div:before {
	 --l: 12px;
	 --t: 17px;
	 --h: 4px;
	 --w: 4px;
	 --br: 50%;
	 box-shadow: 12px 0 0 var(--e, var(--normal-eye));
}
 .feedback li.ok div:after {
	 --l: 13px;
	 --t: 26px;
	 --w: 14px;
	 --h: 2px;
	 --br: 1px;
	 --b: var(--m, var(--normal-mouth));
}
 .feedback li.ok.active div:before {
	 --middle-s-y: 0.35;
	 animation: toggle 0.2s linear forwards;
}
 .feedback li.ok.active div:after {
	 --middle-s-x: 0.5;
	 animation: toggle 0.7s linear forwards;
}
 .feedback li.good {
	 --step-1-rx: -14deg;
	 --step-1-rz: 10deg;
	 --step-2-rx: 10deg;
	 --step-2-rz: -8deg;
}
 .feedback li.good div:before {
	 --b: var(--m, var(--normal-mouth));
	 --w: 5px;
	 --h: 5px;
	 --br: 50%;
	 --t: 22px;
	 --zi: 0;
	 opacity: 0.5;
	 box-shadow: 16px 0 0 var(--b);
	 filter: blur(2px);
}
 .feedback li.good div:after {
	 --sc: 0;
}
 .feedback li.good div svg.eye {
	 --t: 15px;
	 --sc: -1;
	 stroke-dasharray: 4.55;
	 stroke-dashoffset: 8.15;
}
 .feedback li.good div svg.mouth {
	 --t: 22px;
	 --sc: -1;
	 stroke-dasharray: 13.3;
	 stroke-dashoffset: 23.75;
}
 .feedback li.good.active div svg.mouth {
	 --middle-y: 1px;
	 --middle-s: -1;
	 animation: toggle 0.8s linear forwards;
}
 .feedback li.happy div {
	 --step-1-rx: 18deg;
	 --step-1-ry: 24deg;
	 --step-2-rx: 18deg;
	 --step-2-ry: -24deg;
}
 .feedback li.happy div:before {
	 --sc: 0;
}
 .feedback li.happy div:after {
	 --b: var(--m, var(--normal-mouth));
	 --l: 11px;
	 --t: 23px;
	 --w: 18px;
	 --h: 8px;
	 --br: 0 0 8px 8px;
}
 .feedback li.happy div svg.eye {
	 --t: 14px;
	 --sc: -1;
}
 .feedback li.happy.active div:after {
	 --middle-s-x: 0.95;
	 --middle-s-y: 0.75;
	 animation: toggle 0.8s linear forwards;
}
 .feedback li:not(.active) {
	 cursor: pointer;
}
 .feedback li:not(.active):active {
	 transform: scale(0.925);
}
.feedback li.active {
	 --sb: var(--active);
	 --sh: var(--active-shadow);
	 --m: var(--active-mouth);
	 --e: var(--active-eye);
}
 .feedback li.active div {
	 animation: shake 0.8s linear forwards;
}
 @keyframes shake {
	 30% {
		 transform: perspective(240px) rotateX(var(--step-1-rx, 0deg)) rotateY(var(--step-1-ry, 0deg)) rotateZ(var(--step-1-rz, 0deg)) translateZ(10px);
	}
	 60% {
		 transform: perspective(240px) rotateX(var(--step-2-rx, 0deg)) rotateY(var(--step-2-ry, 0deg)) rotateZ(var(--step-2-rz, 0deg)) translateZ(10px);
	}
	 100% {
		 transform: perspective(240px) translateZ(4px);
	}
}
 @keyframes tear {
	 0% {
		 opacity: 0;
		 transform: translateY(-2px) scale(0) translateZ(0);
	}
	 50% {
		 transform: translateY(12px) scale(0.6, 1.2) translateZ(0);
	}
	 20%, 80% {
		 opacity: 1;
	}
	 100% {
		 opacity: 0;
		 transform: translateY(24px) translateX(4px) rotateZ(-30deg) scale(0.7, 1.1) translateZ(0);
	}
}
 @keyframes toggle {
	 50% {
		 transform: translateY(var(--middle-y, 0)) scale(var(--middle-s-x, var(--middle-s, 1)), var(--middle-s-y, var(--middle-s, 1))) rotate(var(--middle-r, 0deg));
	}
}
 @keyframes angry {
	 40% {
		 background: var(--active);
	}
	 45% {
		 box-shadow: inset 3px -3px 4px var(--active-shadow), inset 0 8px 10px var(--active-shadow-angry);
	}
}

</style>

<style scoped>
.prose ul > li {
  position: none;
  padding-left: 0;
}
.prose li {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
