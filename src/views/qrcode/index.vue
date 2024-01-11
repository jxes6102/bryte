<template>
    <div v-if="isMobile" class="flex flex-col justify-center items-center">
        <div class="qrcodeStyle relative w-[75vw] h-[75vw] my-1">
            <!-- <QrcodeStream
                :paused="paused"
                :constraints="{ facingMode }"
                :track="paintBoundingBox"
                :torch="torchActive"
                @detect="onDetect"
                @error="onError">
            </QrcodeStream> -->
            <QrcodeStream
                :paused="paused"
                @camera-on="onReady"
                :torch="torchActive"
                :track="paintBoundingBox"
                @detect="onDetect"
                @error="onError">
            </QrcodeStream>
            <div v-if="stopStatus" 
                class="absolute top-0 left-0 text-black bg-white flex flex-wrap justify-center items-center"
                style="width:75vw;height:75vw;"
                >
                切換中
            </div>
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
                開關手電筒
            </button>
        </div>
        <div class="w-[90%] my-1 px-2 text-xs flex flex-col justify-center items-center break-all">
            <div
                class="w-full flex flex-col justify-center items-center break-all">
                {{result}}
            </div>
            <div
                class="w-full flex flex-col justify-center items-center break-all">
                {{error}}
            </div>
            <div
                class="w-full flex flex-col justify-center items-center break-all">
                {{apiData}}
            </div>
            <!-- <div
                class="w-full flex flex-col justify-center items-center break-all"
                v-for="(item,index) in resultArr" :key="index">
                {{item}}
            </div> -->
        </div>
        <div class="w-[90%] my-1 text-xs flex flex-wrap justify-center items-center break-all">{{error}}</div>
        <Teleport to="body">
            <dialogView v-if="dialogStatus">
                <template v-slot:message>
                    <!-- <div
                        v-for="(item,index) in resultArr" :key="index"
                        class="w-[90%] h-[80px] text-xs flex flex-col justify-center items-center break-all overflow-hidden">
                        {{item}}
                    </div> -->
                    <!-- <div
                        class="w-[90%] h-[80px] text-xs flex flex-col justify-center items-center break-all overflow-hidden">
                        {{result}}
                    </div> -->
                    <div
                        class="w-[80%] h-[80px] text-lg flex flex-col justify-center items-center break-all overflow-hidden">
                        {{apiData.message}}
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-4 flex flex-wrap justify-center items-center">
                        <button
                            @click="cancel"
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
import { checkQR } from '@/api/api'
import { useStore } from "vuex";
import { QrcodeStream } from 'vue-qrcode-reader'
import dialogView from "@/components/dialogView.vue"

onMounted(() => {
})

const store = useStore()
const isMobile = computed(() => {
    return store.state.isMobile
})
/*
torchActive 手電筒狀態
result  顯示文字
resultArr qrcode資料陣列
error 錯誤文字
facingMode 鏡頭訊息
stopStatus loading狀態
paused 暫停狀態
dialogStatus 彈出視窗狀態
*/
const torchActive = ref(false)
const result = ref('')
const resultArr = ref([])
const error = ref('')
const facingMode = ref('environment')
const stopStatus = ref(true)
const paused = ref(false)
const dialogStatus = ref(false)
//掃描框線設定
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
//偵測到error觸發
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
let loadStatus = false
const apiData = ref({})
//偵測到QRCODE觸發
const onDetect = async(detectedCodes) => {
    if(loadStatus) {
        return false
    }
    loadStatus = true
    //console.log('detectedCodes',detectedCodes)
    resultArr.value = detectedCodes.map(code => code.rawValue)
    result.value = detectedCodes[0].rawValue

    let positionIndex =  result.value.indexOf("arrivedId=")
    let value = result.value.substring(positionIndex+10,result.value.length)
    let payload = {
        'arrivedId':value
    }
    console.log('add check')
    await checkQR(payload).then((res) => {
        apiData.value = res.data
        console.log('res',res.data)
        if(res.data.status){
            console.log(res.data.message)
        }else{
            console.log(res.data.message)
        }
    })

    dialogStatus.value = true
    paused.value = true
}
//切換前後鏡頭
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
//切換手電筒
const clickFlash = async() => {
    stopStatus.value = true
    paused.value = true
    torchActive.value = !torchActive.value
    await delay()
    paused.value = false
}
//延遲設定
const delay = () => {   
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('delay');
        }, 2000);
    });
}
//qrcode元件初始化時觸發
const onReady = (item) => {
    stopStatus.value = false
    //console.log('onReady',item)
}
//關閉彈出視窗
const cancel = () => {
    loadStatus = false
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
  