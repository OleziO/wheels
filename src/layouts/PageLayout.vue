<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <div class="flex flex-col flex-1 overflow-y-auto relative">
      <main class="flex flex-col flex-grow">
        <slot />
      </main>
      <AppFooter />
      <AppScrollTopButton />
    </div>
  </div>
</template>
