<template>
    <div class="w-full h-auto p-2 flex flex-col justify-start items-center bg-[rgb(245,245,220,0.1)]">
        <dateSelect :apiLoading="apiLoading"
        :date="dayData" @changeDate="changeDate"></dateSelect>
        <div 
            class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">{{contactBookRecord.className}}班</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>{{contactBookRecord.studentUserName}} {{contactBookRecord.studentNumber}}號</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div></div>
        </div>
        <canvas id="board" class="border-2" width="300" height="150"></canvas>
        <div class="w-full my-2 flex flex-row justify-center items-center gap-[10px]">
            <button class="w-[80px] h-[40px] bg-gray-500 text-white rounded-lg" @click="reset">清除</button>
            <button class="w-[80px] h-[40px] bg-blue-500 text-white rounded-lg" @click="exportFile">上傳</button>
        </div>
        <div v-if="imgUrl" class="w-full h-full my-2 flex flex-col justify-center items-center">
            <div>簽名：</div>
            <img :src="imgUrl" alt="">
        </div>

        <Teleport to="body">
            <dialogView v-if="dialogStatus">
                <template v-slot:message>
                    <div class="text-base md:text-2xl">{{dialogData}}</div>
                </template>
            </dialogView>
        </Teleport>
    </div>
</template>
<script setup>
/*eslint-disable*/
import { fabric } from 'fabric'
import { ref,computed,onMounted,provide } from 'vue';
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";
import { baseURL } from '@/api'
import { uploadSignature, getContactBookRecordByClassIdAndStudentId, editContactBookRecordBySignature } from '@/api/api'
import dialogView from "@/components/dialogView.vue"
import dateSelect from '@/components/dateSelect.vue'
const store = useStore()
const router = useRouter()
const route = useRoute()

const dialogData = ref('')
const dialogStatus = ref(false)

const cancel = () => {
    dialogStatus.value = false
}

const classId = computed(() => {
    return localStorage.getItem('classId')
})

const studentId = computed(() => {
    return localStorage.getItem('studentId')
})

provide('cancel', cancel)

const imgUrl = ref('')
let boardItem = null
const init = async() => {
    await getDetail()
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

const contactBookRecord = ref({
})

onMounted(() => {
    init()
})

const dayData = ref(new Date())
const changeDate = async(value) => {
    dayData.value = value
    await getDetail()
    reset()
}
const getDetail = async() => {
    const formData = new FormData()
    formData.append("classId", classId.value)
    formData.append("studentId", studentId.value)
    formData.append("date", dayData.value.toDateString())
    await getContactBookRecordByClassIdAndStudentId(formData).then((res) => {
        if(res.data.status){
            contactBookRecord.value = res.data.data
            if(contactBookRecord.value.signature && contactBookRecord.value.signature != ''){
                imgUrl.value = baseURL + contactBookRecord.value.signature
            }else{
                imgUrl.value = ''
            }
        }else{
            console.log(res.data.message)
        }
    }).catch((err) => { })
}

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
            const formData1 = new FormData()
            formData1.append("id", contactBookRecord.value.id)
            formData1.append("signature", res.data.data)
            editContactBookRecordBySignature(formData1).then((res1) => {
                if(res1.data.status){
                    imgUrl.value = baseURL + res.data.data
                    dialogData.value = '上傳成功'
                    dialogStatus.value = true
                    console.log(res1.data.message)
                }else{
                    console.log(res1.data.message)
                }
            }).catch((err) => { })
        }else{
            console.log(res.data.message)
        }
    }).catch((err) => { })
}

</script>
<style lang="scss" scoped>
</style>
