<script setup lang="ts">
import * as pyodideModule from 'pyodide'
import { saveMainCode } from '@/utils/example-apps-common'

const codeStore = useCodeStore()
const { input } = toRefs(codeStore)
const pyodideReady = ref(false)
const cnt = ref(0)
const output = ref('')
const pyodide = ref()

async function loadPyodide() {
  if (!pyodideReady.value) {
    pyodide.value = await pyodideModule.loadPyodide({ stdout: addToOutput, stderr: addToOutput })
    pyodideReady.value = true
  }
}

function addToOutput(s: string) {
  output.value += `${ s }\n`
}


async function evaluatePython() {
  input.value = saveMainCode(false)
  addToOutput(`Input [${cnt.value}]>>>\n${ input.value }\nOutput [${cnt.value}]>>>`)

  try {
    // Since pyodide 0.18.0, you must call loadPackagesFromImports()
    // to import any python packages referenced via import statements in your code.
    // This function will no longer do it for you.
    await pyodide.value.loadPackagesFromImports(input.value, addToOutput, addToOutput)
    let result = await pyodide.value.runPythonAsync(input.value)
    addToOutput(`${ result }\n`)
  } catch (e) {
    addToOutput(`${ e }\n`)
  }
  cnt.value++
}
function clearOutput() {
  output.value = ''
}

onBeforeMount(async () => {
  await loadPyodide()
})

</script>

<template>
  <div
    mt-2 flex flex-col
    items-center
    justify-center
  >
    <div
      w-full flex flex-row
      items-center justify-center space-x-4
    >
      <p text-3>
        Console
      </p>
      <ElButton size="small" primary @click="evaluatePython" :disabled="!pyodideReady">
        运行
      </ElButton>
      <ElButton size="small" primary @click="clearOutput" :disabled="!pyodideReady">
        清除输出
      </ElButton>
    </div>
    <div w-full>
      <p
        whitespace="pre-wrap" ml-5
        text-pretty
        text-13px
      >
        {{ output }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
