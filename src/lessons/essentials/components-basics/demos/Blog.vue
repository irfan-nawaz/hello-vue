<script setup lang="ts">
import { computed, ref } from 'vue'
import BlogPost from './BlogPost.vue' // imported components are usable directly in <script setup>

const posts = ref([
  { id: 1, title: 'My journey with Vue', likes: 2, body: 'It started with a ref…' },
  { id: 2, title: 'Blogging with Vue', likes: 0, body: '' },
  { id: 3, title: 'Why Vue is so fun', likes: 5, body: 'Reactivity!' },
])
const total = computed(() => posts.value.reduce((s, p) => s + p.likes, 0))
</script>

<template>
  <div class="stack">
    <p>Total likes: <b>{{ total }}</b></p>
    <div class="grid gap-3 md:grid-cols-3">
      <BlogPost
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :likes="post.likes"
        @like="post.likes++"
        @remove="posts = posts.filter((p) => p !== post)"
      >
        {{ post.body }}
      </BlogPost>
    </div>
  </div>
</template>
