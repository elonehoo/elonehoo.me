<script setup lang="ts">
const action = ref<boolean>(false)

function handleFistbumpClick() {
  action.value = true
  setTimeout(() => {
    action.value = false
  }, 1000)
}
</script>

<template>
  <div
    class="fistbump w-9 h-9 [transform:scale(2)] [transition:all_0.2s_ease] cursor-pointer pt-[3px] pb-[9px] px-1.5 rounded-[999px] scale-[2] [background:#EDEFEB] hover:[background:#e8eae5]"
    :class="[action ? 'boom' : '']"
    @click="handleFistbumpClick"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0017 6V4M8.14886 7.40371L6.86328 5.87162M15.864 7.40367L17.1496 5.87158" class="bm" />
      <path d="M2 19.0001H7.35165C8.86462 19.0001 10.1408 17.8735 10.3285 16.3722L10.5785 14.3722C10.8023 12.5817 9.40615 11.0001 7.60165 11.0001H7.5L6.79566 10.5305C6.2889 10.1927 5.66315 10.0843 5.07229 10.232C4.39889 10.4004 3.8473 10.8819 3.58951 11.5263L3 13.0001H2" class="fl" />
      <path d="M22.0005 19.0001H16.6489C15.1359 19.0001 13.8597 17.8735 13.672 16.3722L13.422 14.3722C13.1982 12.5817 14.5944 11.0001 16.3989 11.0001H16.5005L17.2049 10.5305C17.7116 10.1927 18.3374 10.0843 18.9282 10.232C19.6016 10.4004 20.1532 10.8819 20.411 11.5263L21.0005 13.0001H22.0005" class="fr" />
    </svg>
  </div>
</template>

<style scoped>
svg path {
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: black;
}
svg path.fl {
  transform: translateX(0);
}
svg path.fr {
  transform: translateX(0);
}
svg path.bm {
  stroke-dasharray: 3;
  stroke-dashoffset: 3;
}

.fistbump.boom svg path.fl {
  transform: translateX(1.5px);
  animation: fistL 1s ease forwards;
}

.fistbump.boom svg path.fr {
  transform: translateX(-1.5px);
  animation: fistR 1s ease forwards;
}

.fistbump.boom svg path.bm {
  stroke-dasharray: 3;
  stroke-dashoffset: 3;
  animation: bump 1s ease forwards;
}
</style>

<style>
@keyframes fistL {
  0% {
    transform: translateX(0);
  }
  24% {
    transform: translateX(1.5px);
  }
  25% {
    transform: translateX(1.5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fistR {
  0% {
    transform: translateX(0);
  }
  24% {
    transform: translateX(-1.5px);
  }
  25% {
    transform: translateX(-1.5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bump {
  20% {
    stroke-dasharray: 3;
    stroke-dashoffset: 3;
  }
  30% {
    stroke-dasharray: 5;
    stroke-dashoffset: 3;
  }
  30.1% {
    stroke-dasharray: 3;
    stroke-dashoffset: 6;
  }
  75% {
    stroke-dasharray: 3;
    stroke-dashoffset: 3;
  }
}
</style>
