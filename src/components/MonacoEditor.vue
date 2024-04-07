<script lang="ts" setup>
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'


const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

const code = ref(`// some code
import banana


class Monkey:
    # Bananas the monkey can eat.
    capacity = 10
    def eat(self, n):
        """Make the monkey eat n bananas!"""
        self.capacity -= n * banana.size

    def feeding_frenzy(self):
        self.eat(9.25)
        return "Yum yum"

`)
const editorRef = shallowRef()
const handleMount = (editor: never) => (editorRef.value = editor)

</script>

<template>
  <VueMonacoEditor
    :value="code"
    theme="vs-dark"
    language="python"
    :options="MONACO_EDITOR_OPTIONS"
    @mount="handleMount"
  />
</template>


