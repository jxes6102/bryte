<template>
    <div class="flex flex-col justify-center items-center">
        <div class="qrcodeStyle relative w-[75vw] h-[75vw] my-1">
            <QrcodeStream
                :paused="paused"
                :constraints="{ facingMode }"
                :track="paintBoundingBox"
                :torch="torchActive"
                @detect="onDetect"
                @error="onError">
            </QrcodeStream>
        </div>
        <div class="w-full text-sm flex flex-wrap justify-center items-center">
            <button
                @click="switchCamera"
                class=" bg-blue-500 hover:bg-blue-600 text-white font-bold mx-1 py-1 px-2 md:py-2 md:px-3 rounded">
                相機反轉
            </button>
            <button
                @click="clickFlash"
                class=" bg-blue-500 hover:bg-blue-600 text-white font-bold mx-1 py-1 px-2 md:py-2 md:px-3 rounded">
                打開手電筒
            </button>
        </div>
        <div class="w-full my-1 px-2 text-xs flex-col justify-center items-center">
            {{ result }}
            <!-- <div
                class="w-full flex-col justify-center items-center"
                v-for="(item,index) in result" :key="index">
                {{item}}
            </div> -->
        </div>
        <div class="w-full my-1 text-xs flex-wrap justify-center items-center">{{error}}</div>
    </div>
</template>
<script setup>
/*eslint-disable*/
import { ref,computed,onMounted } from 'vue';
import { useStore } from "vuex";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

onMounted(() => {
})

const torchActive = ref(false)
const result = ref([])
const error = ref('')
const facingMode = ref('environment')
const paused = ref(false)

const paintBoundingBox = (detectedCodes, ctx) => {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
    }
}

const onError = (err) => {

    if (err.name === 'NotAllowedError') {
        error.value += 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
        error.value += 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
        error.value += 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
        error.value += 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
        error.value += 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
        error.value += 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
        error.value += 'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
        error.value += err.message
    }
}

const onDetect = (detectedCodes) => {
    result.value = JSON.stringify(
        detectedCodes.map(code => code.rawValue)
    )
}

const switchCamera = () => {
    switch (facingMode.value) {
        case 'environment':
            facingMode.value = 'user'
            break
        case 'user':
            facingMode.value = 'environment'
            break
    }
}

const clickFlash = () => {
    torchActive.value = !torchActive.value
}

</script>
<style lang="scss" scoped>
.qrcodeStyle div {
    width: 100%;
    height: 100%;
}
</style>
  