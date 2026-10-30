ue is a JS frmaework used to build UI,
It provides declarative UI rendering using template sysntax component based architecture.
Vue has a refined reactiviy mechanism following a one way data binding and compiler-informed virtual DOM: Fully static subtrees get hoisted out of the render function and flagged HOISTED,

The compiler knows what’s static, so the runtime doesn’t have to discover it by diffing. React’s reconciler is runtime-only, which is why React needs memo and useMemo — you’re manually supplying information Vue’s compiler derives automatically.”

vites generated the module graph and does support treeshaking, code splitting, HMR, Build-time path errors

Vue: uses the block tree. Those _openBlock() / _createElementBlock() calls in your bundle aren’t decoration — they collect every dynamic descendant into a flat array (dynamicChildren) on the block vnode. On update, Vue iterates that flat array instead of recursing the tree. Static nodes are not in the array, so they are never visited at all.

Vue doesn’t skip diffing. Vue shrinks the diff.

Tree traversal becomes array iteration, and each item in that array carries a patch flag narrowing what gets checked on it.

vue provides

Declarative Rendering: Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.

Reactivity: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.

Vue is a progressive framework

Single-File Components are .vue files

Options API: it exposes a set of options via an obect in evey component
Composition API: we define a component's logic using imported API functions. grouped by feature, helps in having declarative state and feature oriended development

Creating vue app need a root vue compoiennt creates an app instance, the app instance must be mounted on a actual dom element.

template syntax: declarative UI rendering compoisnet absed, once way data binding
v-bind:id = "". :id="", :id
v-bind:disabled = ""
v-bind = "obj"
v-bind = "any JS expressions, function call"
v-bind:href=""
v-bind:[attributeName]="",:[attributeName]=""
v-html

v-on:click="", @click=""
v-on:[eventName]="" ,@[eventName]=""

other directives:
v-if

Reactivity:
ref(), and reactive({})

cosnt count = ref({
nested: { count: 0 },
arr: ['foo', 'bar']
})
