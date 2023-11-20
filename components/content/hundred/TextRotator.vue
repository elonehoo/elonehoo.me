<template>
  <div class=" overflow-hidden">
    <div class="px-4 py-8 flex items-center justify-center">
      <div class="font-extrabold text-lg [text-wrap:balance] text-gray-700 dark:text-gray-200">
        We can work to develop the best
        <span class="inline-flex flex-col h-1.40625rem items-center overflow-hidden">
          <ul class="block text-left leading-tight [&_li]:block animate-text-slide">
            <li class="text-indigo-500">Mobile apps</li>
            <li class="text-rose-500">Websites</li>
            <li class="text-yellow-500">Admin dashboards</li>
            <li class="text-teal-500">Landing pages</li>
            <li class="text-pink-500">Illustrations</li>
            <li class="text-sky-500">Icons</li>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose ul {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  list-style-type: none !important;
}
.prose ul > li::before {
    content: none !important;
    position: static !important;
    background-color: none !important;
    border-radius: 0 !important;
    width: 0 !important;
    height: 0 !important;
    top: 0 !important;
    left: 0 !important;
}
.prose li {
    margin-top: 0em !important;
    margin-bottom: 0em !important;
}
.prose ul > li {
    position: static !important;
    padding-left: 0em !important;
}
  .animate-text-slide {
    animation: text-slide 10.5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  }

  @keyframes text-slide {
    0%,
    16% {
      transform: translateY(0%);
    }

    20%,
    36% {
      transform: translateY(-16.66%);
    }

    40%,
    56% {
      transform: translateY(-33.33%);
    }

    60%,
    76% {
      transform: translateY(-50%);
    }

    80%,
    96% {
      transform: translateY(-66.66%);
    }

    100% {
      transform: translateY(-83.33%);
    }
  }
</style>
