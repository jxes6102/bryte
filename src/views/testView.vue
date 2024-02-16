<template>
    <div class="w-full h-auto p-2 flex flex-col justify-start items-center bg-[rgb(245,245,220,0.1)]">
        <canvas id="board" class="border-2" width="300" height="200"></canvas>
        <div class="w-full my-2 flex flex-row justify-center items-center gap-[10px]">
            <button class="w-[80px] h-[40px] bg-gray-500 text-white rounded-lg" @click="reset">清除</button>
            <button class="w-[80px] h-[40px] bg-blue-500 text-white rounded-lg" @click="exportFile">上傳</button>
        </div>
        <div v-if="imgUrl" class="w-full h-full my-2 flex flex-col justify-center items-center">
            <div>輸出圖片</div>
            <img :src="imgUrl" alt="">
        </div>
    </div>
</template>
<script setup>
/*eslint-disable*/
import { fabric } from 'fabric'
import { ref,computed,onMounted } from 'vue';
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";
import { baseURL } from '@/api'
import { uploadSignature } from '@/api/api'
const store = useStore()
const router = useRouter()
const route = useRoute()

const imgUrl = ref('')
let boardItem = null
const init = () => {
    boardItem = new fabric.Canvas('board', {
        isDrawingMode: true,
        backgroundColor: 'rgb(226 232 240)'
    });
    // 实例化铅笔
    let pencilBrush = new fabric.PencilBrush(boardItem)
    // 将画布的画笔设置成铅笔
    boardItem.freeDrawingBrush = pencilBrush
    console.log(boardItem)
}

onMounted(() => {
    init()
})

const reset = () => {
    console.log('reset')
    boardItem.clear()
    boardItem.backgroundColor = 'rgb(226 232 240)'
}

const exportFile = () => {
    console.log('exportFile')
    let dataUrl = boardItem.toDataURL({
        format: 'png',
        quality: 1,
    });
    
    const formData = new FormData()
    formData.append("dataUrl", dataUrl)
    formData.append("type", "signature")
    uploadSignature(formData).then((res) => {
        if(res.data.status){
            imgUrl.value = baseURL + res.data.data
            console.log('file',res.data.data)
        }else{
            console.log(res.data.message)
        }
    }).catch((res) => {
        if (res && res.response && res.response.status == 401) {
            store.commit('clearToken')
            router.push({ path: '/' })
        }
        console.log(res)
    })
}

</script>
<style lang="scss" scoped>
</style>
