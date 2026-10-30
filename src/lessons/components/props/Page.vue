<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    Props are a component's inputs. Declare them with <code>defineProps</code> (type-based in
    <code>&lt;script setup lang="ts"&gt;</code>) or the runtime <code>props</code> option. They flow <b>one way</b>:
    parent → child. The child must never mutate them.
  </p>
  <Demo name="PropsPlayground" title="Props: type-based, runtime, defaults, validation" :files="['demos/UserCard.vue', 'demos/RuntimeProps.vue']" />
  <h2>Passing props</h2>
  <CodeBlock code='<UserCard name="static string" />
<UserCard :age="42" />              <!-- number: needs v-bind -->
<UserCard verified />               <!-- boolean casting: true -->
<UserCard :name />                  <!-- same-name shorthand (3.4+) -->
<UserCard v-bind="userObject" />    <!-- spread an object as props -->' />
  <Callout type="warn" title="One-way data flow">
    To “change” a prop, either emit an event so the parent changes it, or copy it to local state
    (<code>const local = ref(props.initial)</code>) / derive it with <code>computed</code>.
  </Callout>
  <Callout type="info">
    Destructured props (3.5+) stay reactive because the compiler rewrites <code>name</code> to <code>__props.name</code>.
    To pass one to a function that expects a ref/getter, wrap it: <code>useThing(() => name)</code>.
  </Callout>
</template>
