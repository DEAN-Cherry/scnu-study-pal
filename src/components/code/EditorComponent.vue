<script setup lang="ts">
import * as vscode from 'vscode'
import '@codingame/monaco-vscode-python-default-extension'
import { RegisteredFileSystemProvider, registerFileSystemOverlay, RegisteredMemoryFile } from '@codingame/monaco-vscode-files-service-override'
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory'
import { getTextContent, getWrapper } from '@/utils/example-apps-common'

const code = 'print("Hello, World!")'
const input = computed(() => handleOutput())
const configureMonacoWorkers = () => {
  useWorkerFactory({ basePath: '../../../node_modules' })
}
const runPythonWrapper = async () => {
  const fileSystemProvider = new RegisteredFileSystemProvider(false)
  fileSystemProvider.registerFile(new RegisteredMemoryFile(vscode.Uri.file('/workspace/hello.py'), code))
  registerFileSystemOverlay(1, fileSystemProvider)

  try {
    const userConfig = createUserConfig(code.value)
    const htmlElement = document.getElementById('monaco-editor-root')
    await startEditor(userConfig, htmlElement, code.value)
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

const handleOutput = () => {
  const wrapper = getWrapper()
  const textInput = wrapper.getModel(true)?.getValue() ?? ''
  return textInput

}

onMounted(() => {
  configureMonacoWorkers()
  runPythonWrapper()
})
onUnmounted(async () => {
  const userConfig = createUserConfig(code)
  await disposeEditor(userConfig.wrapperConfig.editorAppConfig.useDiffEditor)
})
</script>

<template>
  <div id="monaco-editor-root" h-full w-full />
</template>

<style scoped lang="scss">

</style>
