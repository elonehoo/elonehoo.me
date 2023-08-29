<template>
  <div class="font-sans text-gray-700 dark:text-gray-200">
    <AppLoadingBar />
    <NavBar />
    <main class="px-7 py-10 pb-10 of-x-hidden">
      <slot />
      <Footer />
    </main>
  </div>
</template>
