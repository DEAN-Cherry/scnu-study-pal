<script setup lang="ts">
import * as vscode from 'vscode'
import '@codingame/monaco-vscode-python-default-extension'
import { RegisteredFileSystemProvider, RegisteredMemoryFile, registerFileSystemOverlay } from '@codingame/monaco-vscode-files-service-override'
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory'

const codeStore = useCodeStore()
const { input } = toRefs(codeStore)
const code = input.value

const configureMonacoWorkers = () => {
  useWorkerFactory({ basePath: '../../../node_modules' })
}
const runPythonWrapper = async () => {
  const fileSystemProvider = new RegisteredFileSystemProvider(false)
  fileSystemProvider.registerFile(new RegisteredMemoryFile(vscode.Uri.file('/workspace/hello.py'), code))
  registerFileSystemOverlay(1, fileSystemProvider)

  try {
    const userConfig = createUserConfig(code)
    const htmlElement = document.getElementById('monaco-editor-root')
    await startEditor(userConfig, htmlElement, code)
    // document.querySelector('#button-start')?.addEventListener('click', async () => {
    //   await startEditor(userConfig, htmlElement, code)
    // })
    // document.querySelector('#button-dispose')?.addEventListener('click', async () => {
    //   await disposeEditor(userConfig.wrapperConfig.editorAppConfig.useDiffEditor)
    // })
  } catch (e) {
    console.error(e)
  }
}


onMounted(() => {
  configureMonacoWorkers()
  runPythonWrapper()
})
onUnmounted(async () => {
  const userConfig = createUserConfig(code)
  input.value = await disposeEditor(userConfig.wrapperConfig.editorAppConfig.useDiffEditor)

})
</script>

<template>
  <div id="monaco-editor-root" h-full w-full />
</template>

<style scoped lang="scss">

</style>
