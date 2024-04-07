<script setup lang="ts">
import * as pyodideModule from 'pyodide'
const pythonCode = `print("Hello, Pyodide from Vue!")
a = 1
a = b
b
`
const pyodideReady = ref(false)
const result = ref('')
const output = ref('Click to run')
const pyodide = ref()
async function loadPyodide() {
  if (!pyodideReady.value) {
    pyodide.value = await pyodideModule.loadPyodide({ stdout: addToOutput, stderr: addToOutput })
    pyodideReady.value = true
  }
}

function addToOutput(s: string) {
  output.value += `${s}\n`
}
const runPythonCode = async () => {
  if (!pyodideReady.value) {
  } else {
    console.log('Pyodide is already loaded.')
    await pyodide.value.runPythonAsync(pythonCode)
  }

}

async function evaluatePython() {
  addToOutput(`>>>${pythonCode}`)

  try {
    // Since pyodide 0.18.0, you must call loadPackagesFromImports()
    // to import any python packages referenced via import statements in your code.
    // This function will no longer do it for you.
    await pyodide.value.loadPackagesFromImports(pythonCode, addToOutput, addToOutput)
    let result = await pyodide.value.runPythonAsync(pythonCode)
    addToOutput(`${result}`)
  }
  catch (e) {
    addToOutput(`${e}`)
  }
}

onBeforeMount(async () => {
  await loadPyodide()
})

</script>

<template>
  <div
    mt-4 flex flex-col
    items-center
    justify-center
  >
    <p>Console</p>
    <ElButton primary @click="runPythonCode">
      Run Python Code
    </ElButton>
    <ElButton primary @click="evaluatePython">
      Run Python Code
    </ElButton>
    <p text-pretty>
      Result:{{ result }}
    </p>
    <p whitespace="pre-wrap" text-pretty>
      OutPut: {{ output }}
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>
