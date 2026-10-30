<script setup lang="ts">
import { ref } from 'vue'

const id = 'my-element-id'
const isButtonDisabled = ref(false)
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper rounded p-2',
  style: 'background-color: oklch(0.69 0.14 160 / .2)',
}
const message = ref('Hi there')
const attributeName = ref<'title' | 'aria-label'>('title')
const eventName = ref<'click' | 'dblclick'>('click')
const clicks = ref(0)
</script>

<template>
  <div class="stack">
    <!-- same-name shorthand (3.4+): :id is :id="id" -->
    <div :id class="mono">:id → id="{{ id }}"</div>

    <!-- boolean attribute: removed when falsy -->
    <div class="row">
      <label class="row text-sm"><input v-model="isButtonDisabled" type="checkbox" /> disabled</label>
      <button v-bind:disabled="isButtonDisabled">I am {{ isButtonDisabled ? 'disabled' : 'enabled' }}</button>
    </div>

    <!-- bind many attributes at once -->
    <div v-bind="objectOfAttrs">v-bind="objectOfAttrs"</div>

    <!-- any single JS expression -->
    <input v-model="message" aria-label="message" />
    <div :id="message.split('').reverse().join('')" class="mono">
      reversed id: {{ message.split('').reverse().join('') }} · {{ message.length > 5 ? 'long' : 'short' }}
    </div>

    <!-- dynamic arguments: the attribute / event name itself is reactive -->
    <div class="row">
      <select v-model="attributeName" aria-label="attribute"><option>title</option><option>aria-label</option></select>
      <select v-model="eventName" aria-label="event"><option>click</option><option>dblclick</option></select>
      <button :[attributeName]="'bound via ' + attributeName" @[eventName]="clicks++">
        {{ eventName }} me ({{ clicks }})
      </button>
    </div>
  </div>
</template>
