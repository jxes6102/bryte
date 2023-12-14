<template>
    <div class="flex flex-col justify-center items-center">
        <div class="qrcodeStyle relative w-[250px] h-[250px] my-1">
            <!-- decode是扫描结果的函数，torch用于是否需要打开手电筒，init用于检查该设备是否能够调用摄像头的权限，camera可用于打开前面或者后面摄像头  -->
            <!-- <QrcodeDropZone @decode="onDecode">
              <QrcodeStream @decode="onDecode" :torch="torchActive" @init="onInit" :camera="camera" />
            </QrcodeDropZone> -->
            <!-- <QrcodeStream @decode="onDecode" :torch="torchActive" @init="onInit" :camera="camera" /> -->
            <QrcodeStream :track="paintBoundingBox" @detect="onDetect" @error="onError"></QrcodeStream>
        </div>
        <!-- <div class="w-full text-sm flex flex-wrap justify-center items-center">
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
            <button
                @click="turnCameraOff"
                class=" bg-blue-500 hover:bg-blue-600 text-white font-bold mx-1 py-1 px-2 md:py-2 md:px-3 rounded">
                關閉相機
            </button>
        </div>
        <div class="w-full my-1 text-xs flex-wrap justify-center items-center">{{errorMessage}}</div>
        <div class="w-full my-1 text-xs flex-wrap justify-center items-center">{{qrcodeData}}</div> -->
        <div class="w-full my-1 text-xs flex-wrap justify-center items-center">{{result}}</div>
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

// const camera = ref('rear')
// const torchActive = ref(false)
// const qrcode = ref(false)
// const noStreamApiSupport = ref(false)
// const errorMessage = ref('')
// const qrcodeData = ref('')

// const switchCamera = () => {
//     switch (camera.value) {
//         case 'front':
//             camera.value = 'rear'
//             break
//         case 'rear':
//             camera.value = 'front'
//             break
//         default:
//             console.log('error')
//     }
// }

// const clickFlash = () => {
//     torchActive.value = !torchActive.value
// }

// const turnCameraOff = () => {
//     camera.value = 'off'
//     qrcode.value = false
// }

// const onDecode = (result) => {
//     console.log('result',result)
//     qrcodeData.value = result
//     turnCameraOff()
// }

// const onInit = async (promise) => {
//     console.log('dodo')
//     try {
//         await promise

//         console.log('dodo')
//     } catch (error) {
//         if (error.name === 'StreamApiNotSupportedError') {
//             errorMessage.value = 'StreamApiNotSupportedError'
//         } else if (error.name === 'NotAllowedError') {
//             errorMessage.value = 'Hey! I need access to your camera'
//         } else if (error.name === 'NotFoundError') {
//             errorMessage.value = 'Do you even have a camera on your device?'
//         } else if (error.name === 'NotSupportedError') {
//             errorMessage.value = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
//         } else if (error.name === 'NotReadableError') {
//             errorMessage.value = "Couldn't access your camera. Is it already in use?"
//         } else if (error.name === 'OverconstrainedError') {
//             errorMessage.value = "Constraints don't match any installed camera. Did you asked for the front camera although there is none?"
//         } else {
//             errorMessage.value = 'UNKNOWN ERROR: ' + error.message
//         }
//     }

// }



const result = ref([])
const error = ref('')

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
    // error.value = `[${err.name}]: `

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

</script>
<style lang="scss" scoped>
.qrcodeStyle div {
    width: 100%;
    height: 100%;
}
</style>
  