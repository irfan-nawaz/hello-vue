<template>
  <div class="card">
    <p class="title">child .title</p>
    <slot />
  </div>
</template>

<style scoped>
.card {
  border: 2px dashed currentColor;
  border-radius: 8px;
  padding: 8px;
}
/* :slotted targets content passed in through the slot (owned by the parent) */
:slotted(em) {
  color: #e11d48;
}
</style>
