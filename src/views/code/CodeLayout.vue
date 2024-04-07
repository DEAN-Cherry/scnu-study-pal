<template>
  <div class="tw-flex tw-flex-col tw-h-full">
    <div>
      <p>编程区</p>
    </div>
    <MonacoEditor />
    <div class="tw-h-1/3">
      <p class="tw-text-2xl">Hello world</p>
      <p>Hello world2</p>
    </div>
  </div>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor.vue'

export default {
  name: 'CodeLayout',
  components: { MonacoEditor },
}
</script>
