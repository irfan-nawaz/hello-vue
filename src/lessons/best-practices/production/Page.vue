<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <Demo name="BuildInfo" title="Flags & mode" />
  <h2>Compile-time flags</h2>
  <table>
    <tbody>
      <tr><td><code>__VUE_OPTIONS_API__</code></td><td>default <code>true</code>. Set <code>false</code> to drop Options API support (~smaller bundle) if you only use Composition API.</td></tr>
      <tr><td><code>__VUE_PROD_DEVTOOLS__</code></td><td>default <code>false</code>. Enable devtools in production.</td></tr>
      <tr><td><code>__VUE_PROD_HYDRATION_MISMATCH_DETAILS__</code></td><td>default <code>false</code>. Detailed hydration mismatch warnings in prod.</td></tr>
    </tbody>
  </table>
  <p>Configure them per bundler (“Configuration Guides”):</p>
  <CodeBlock lang="ts" code="// Vite: vite.config.ts
define: { __VUE_OPTIONS_API__: 'true', __VUE_PROD_DEVTOOLS__: 'false', __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false' }
// webpack: new webpack.DefinePlugin({ … })
// Rollup:  @rollup/plugin-replace({ … })" />
  <h2>Shipping</h2>
  <CodeBlock lang="bash" code="pnpm build      # type-check + vite build → dist/ (hashed, minified, code-split)
pnpm preview    # serve dist/ locally like production" />
  <ul>
    <li>Serve <code>dist/</code> as static files; configure the host to fall back to <code>index.html</code> for client-side routes (history mode).</li>
    <li>Report runtime errors with <code>app.config.errorHandler</code> → Sentry/Bugsnag (both ship Vue integrations).</li>
    <li>Long-cache hashed assets, no-cache <code>index.html</code>.</li>
  </ul>
  <Callout type="info">
    With a build step you ship the runtime-only build (templates precompiled). This lab additionally bundles the template
    compiler on purpose for its demos — a normal app wouldn't.
  </Callout>
</template>
