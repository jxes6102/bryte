<template>
    <div class="w-full h-auto p-2 flex flex-col justify-start items-center bg-[rgb(245,245,220,0.1)]">
        <canvas id="board" class="border-2" width="600" height="400"></canvas>
        <div class="w-full my-2 flex flex-row justify-center items-center gap-[10px]">
            <button class="w-[80px] h-[40px] bg-gray-500 rounded-lg" @click="reset">reset</button>
            <button class="w-[80px] h-[40px] bg-gray-500 rounded-lg" @click="exportFile">export</button>
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
const store = useStore()
const router = useRouter()
const route = useRoute()

const imgUrl = ref('')
let boardItem = null
const init = () => {
    boardItem = new fabric.Canvas('board', {
        isDrawingMode: true,
        freeDrawingBrush: new fabric.PencilBrush({ decimate: 18 })
    });
    console.log(boardItem)
}

onMounted(() => {
    init()
})

const reset = () => {
    console.log('reset')
    boardItem.clear()
}

const exportFile = () => {
    console.log('exportFile')
    let file = boardItem.toDataURL({
        format: 'png',
        quality: 1,
    });

    console.log('file',file)

    imgUrl.value = file
}

</script>
<style lang="scss" scoped>
</style>
