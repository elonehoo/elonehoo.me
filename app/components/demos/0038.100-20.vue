<script setup lang="ts">

</script>

<template>
  <CraftBox>
    <svg class="star" width="128" height="128" viewBox="0 0 128 128">
      <defs>
        <filter id="star-glow">
          <feGaussianBlur result="coloredBlur" stddeviation="1.5" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="star-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000" />
          <stop offset="100%" stop-color="#fff" />
        </linearGradient>
        <mask id="star-mask">
          <rect x="0" y="0" width="128" height="128" fill="url(#star-grad)" />
        </mask>
      </defs>
      <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <g stroke="hsla(223,90%,50%,0.2)">
          <polygon points="64 49 66.322 58.992 71.071 56.929 69.008 61.678 79 64 69.008 66.322 71.071 71.071 66.322 69.008 64 79 61.678 69.008 56.929 71.071 58.992 66.322 49 64 58.992 61.678 56.929 56.929 61.678 58.992 64 49" />
          <polygon points="64 34 68.644 53.983 78.142 49.858 74.017 59.356 94 64 74.017 68.644 78.142 78.142 68.644 74.017 64 94 59.356 74.017 49.858 78.142 53.983 68.644 34 64 53.983 59.356 49.858 49.858 59.356 53.983 64 34" />
          <polygon points="64 19 70.966 48.975 85.213 42.787 79.025 57.034 109 64 79.025 70.966 85.213 85.213 70.966 79.025 64 109 57.034 79.025 42.787 85.213 48.975 70.966 19 64 48.975 57.034 42.787 42.787 57.034 48.975 64 19" />
          <polygon points="64 4 73.287 43.966 92.284 35.716 84.034 54.713 124 64 84.034 73.287 92.284 92.284 73.287 84.034 64 124 54.713 84.034 35.716 92.284 43.966 73.287 4 64 43.966 54.713 35.716 35.716 54.713 43.966 64 4" />
        </g>
        <g filter="url(#star-glow)">
          <g stroke="hsl(223,90%,50%)">
            <polygon class="star__stroke" stroke-dasharray="31 93" points="64 49 66.322 58.992 71.071 56.929 69.008 61.678 79 64 69.008 66.322 71.071 71.071 66.322 69.008 64 79 61.678 69.008 56.929 71.071 58.992 66.322 49 64 58.992 61.678 56.929 56.929 61.678 58.992 64 49" />
            <polygon class="star__stroke star__stroke--2" stroke-dasharray="62 186" points="64 34 68.644 53.983 78.142 49.858 74.017 59.356 94 64 74.017 68.644 78.142 78.142 68.644 74.017 64 94 59.356 74.017 49.858 78.142 53.983 68.644 34 64 53.983 59.356 49.858 49.858 59.356 53.983 64 34" />
            <polygon class="star__stroke star__stroke--3" stroke-dasharray="93 279" points="64 19 70.966 48.975 85.213 42.787 79.025 57.034 109 64 79.025 70.966 85.213 85.213 70.966 79.025 64 109 57.034 79.025 42.787 85.213 48.975 70.966 19 64 48.975 57.034 42.787 42.787 57.034 48.975 64 19" />
            <polygon class="star__stroke star__stroke--4" stroke-dasharray="124 372" points="64 4 73.287 43.966 92.284 35.716 84.034 54.713 124 64 84.034 73.287 92.284 92.284 73.287 84.034 64 124 54.713 84.034 35.716 92.284 43.966 73.287 4 64 43.966 54.713 35.716 35.716 54.713 43.966 64 4" />
          </g>
          <g stroke="hsl(283,90%,50%)" mask="url(#star-mask)">
            <polygon class="star__stroke" stroke-dasharray="31 93" points="64 49 66.322 58.992 71.071 56.929 69.008 61.678 79 64 69.008 66.322 71.071 71.071 66.322 69.008 64 79 61.678 69.008 56.929 71.071 58.992 66.322 49 64 58.992 61.678 56.929 56.929 61.678 58.992 64 49" />
            <polygon class="star__stroke star__stroke--2" stroke-dasharray="62 186" points="64 34 68.644 53.983 78.142 49.858 74.017 59.356 94 64 74.017 68.644 78.142 78.142 68.644 74.017 64 94 59.356 74.017 49.858 78.142 53.983 68.644 34 64 53.983 59.356 49.858 49.858 59.356 53.983 64 34" />
            <polygon class="star__stroke star__stroke--3" stroke-dasharray="93 279" points="64 19 70.966 48.975 85.213 42.787 79.025 57.034 109 64 79.025 70.966 85.213 85.213 70.966 79.025 64 109 57.034 79.025 42.787 85.213 48.975 70.966 19 64 48.975 57.034 42.787 42.787 57.034 48.975 64 19" />
            <polygon class="star__stroke star__stroke--4" stroke-dasharray="124 372" points="64 4 73.287 43.966 92.284 35.716 84.034 54.713 124 64 84.034 73.287 92.284 92.284 73.287 84.034 64 124 54.713 84.034 35.716 92.284 43.966 73.287 4 64 43.966 54.713 35.716 35.716 54.713 43.966 64 4" />
          </g>
        </g>
      </g>
    </svg>
  </CraftBox>
</template>

<style scoped>
.star {
  margin: auto;
  width: 12em;
  height: 12em;
}
.star__stroke {
  --dur: 2s;
  animation: stroke1 var(--dur) linear infinite;
}
.star__stroke--2 {
  animation-name: stroke2;
  animation-delay: calc(var(--dur) / -2);
}
.star__stroke--3 {
  animation-name: stroke3;
  animation-direction: reverse;
}
.star__stroke--4 {
  animation-name: stroke4;
  animation-delay: calc(var(--dur) / -2);
  animation-direction: reverse;
}

@keyframes stroke1 {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 124; }
}
@keyframes stroke2 {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 248; }
}
@keyframes stroke3 {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 372; }
}
@keyframes stroke4 {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 496; }
}
</style>
