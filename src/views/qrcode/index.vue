<template>
    <div v-if="isMobile" class="flex flex-col justify-center items-center">
        <div v-if="!paused" class="qrcodeStyle relative w-[75vw] h-[75vw] my-1">
            <!-- <QrcodeStream
                :paused="paused"
                :constraints="{ facingMode }"
                :track="paintBoundingBox"
                :torch="torchActive"
                @detect="onDetect"
                @error="onError">
            </QrcodeStream> -->
            <QrcodeStream
                @camera-on="onReady"
                :torch="torchActive"
                :track="paintBoundingBox"
                @detect="onDetect"
                @error="onError">
            </QrcodeStream>
        </div>
        <div v-else class="relative w-[75vw] h-[75vw] my-1 text-black flex flex-wrap justify-center items-center">
            切換中
        </div>
        <div class="w-full text-sm flex flex-wrap justify-center items-center">
            <!-- <button
                @click="switchCamera"
                class=" bg-blue-500 hover:bg-blue-600 text-white font-bold mx-1 py-1 px-2 md:py-2 md:px-3 rounded">
                相機反轉
            </button> -->
            <button
                @click="clickFlash"
                class=" bg-blue-500 hover:bg-blue-600 text-white font-bold mx-1 py-1 px-2 md:py-2 md:px-3 rounded">
                打開手電筒
            </button>
        </div>
        <div class="w-[90%] my-1 px-2 text-xs flex flex-col justify-center items-center break-all">
            <!-- {{ result }} -->
            <div
                class="w-full flex flex-col justify-center items-center break-all"
                v-for="(item,index) in resultArr" :key="index">
                {{item}}
            </div>
        </div>
        <div class="w-[90%] my-1 text-xs flex flex-wrap justify-center items-center break-all">{{error}}</div>
        <Teleport to="body">
            <dialogView v-if="dialogStatus">
                <template v-slot:message>
                    <div
                        v-for="(item,index) in resultArr" :key="index"
                        class="w-[90%] h-[80px] text-xs flex flex-col justify-center items-center break-all overflow-hidden">
                        {{item}}
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-4 flex flex-wrap justify-center items-center">
                        <button
                            class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            確定
                        </button>
                        <button
                            @click="cancel"
                            class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            取消
                        </button>
                    </div>
                </template>
            </dialogView>
        </Teleport>
    </div>
    <div v-else class="w-full my-4 text-4xl flex flex-col justify-center items-center">
        請使用手機掃描
    </div>
    
</template>
<script setup>
/*eslint-disable*/
import { ref,computed,onMounted,provide } from 'vue';
import { useStore } from "vuex";
import { QrcodeStream } from 'vue-qrcode-reader'
import dialogView from "@/components/dialogView.vue"

onMounted(() => {
})

const store = useStore()
const isMobile = computed(() => {
    return store.state.isMobile
})

const torchActive = ref(false)
const result = ref('')
const resultArr = ref([])
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
    console.log('detectedCodes',detectedCodes)
    
    result.value = JSON.stringify(detectedCodes.map(code => code.rawValue))
    resultArr.value = detectedCodes.map(code => code.rawValue)
    dialogStatus.value = true
    paused.value = true

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

const clickFlash = async() => {
    paused.value = true
    torchActive.value = !torchActive.value
    await delay()
    paused.value = false
}

const delay = () => {   
    return new Promise(function (resolve, reject) {
        setTimeout(function () {

            resolve('delay');
        }, 2000);
    });
}

const onReady = (item) => {
    //console.log('onReady',item)
}

const dialogStatus = ref(false)
const cancel = () => {
    dialogStatus.value = false
    paused.value = false
}

provide('cancel', cancel)


</script>
<style lang="scss" scoped>
.qrcodeStyle div {
    width: 100%;
    height: 100%;
}
</style>
  