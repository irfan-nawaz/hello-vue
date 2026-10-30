<template>
  <!-- multiple roots: Vue can't guess, so attrs are NOT applied (and dev warns) unless bound explicitly -->
  <header class="text-xs">multi-root header</header>
  <main v-bind="$attrs" class="text-xs">main gets $attrs</main>
</template>
