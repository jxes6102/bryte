<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">XX班</div>
        </div>
        <div class="w-[95%] md:w-[40%] my-2 text-[16px] md:text-2xl text-left text-[#6E6EFF] font-semibold">班級叮嚀</div>
        <div v-if="isSchool" class="w-[90%] md:w-[40%] h-auto rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-start justify-center">
            <div class="relative w-full h-full text-sm md:text-lg">
                <textarea 
                    v-model="modifyData.reply"
                    required
                    class="w-full h-[100px] md:h-[150px] p-1 overflow-hidden"
                    style="resize:none;"
                    maxlength="30"
                    >
                </textarea>
                <!-- <div class="absolute right-3 bottom-1">{{'字數' + modifyData.reply.length + '/30'}}</div> -->
            </div>
        </div>
        <div v-else class="w-[95%] md:w-[40%] py-1 md:py-3 text-left text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
            <div class="">腸病毒盛行，回家勤洗手，多吃水果</div>
        </div>
        <div v-if="isSchool" class="w-[95%] md:w-[40%] h-auto min-h-[40px] my-1 md:my-3 flex flex-wrap justify-start items-center">
            <button
                v-if="isMobile"
                @click="upLoadPhone"
                class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 rounded">
                拍照
            </button>
            <button
                @click="upLoad"
                class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 rounded">
                上傳附件
            </button>
            <button
                class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 rounded">
                儲存
            </button>
        </div>
        <div class="w-[95%] md:w-[40%] h-auto my-1 flex flex-wrap justify-start items-center">
            <template v-for="(item,index) in fileList" :key="index">
                <div v-if="item.isImg" class="w-[25vw] h-[25vw] md:w-[27%] md:h-[27%] m-1 md:m-2">
                    <img class="w-full h-full" :src="item.src" alt="">
                </div>
                <div v-else class="w-[25vw] h-[25vw] md:w-[27%] md:h-[27%] m-1 md:m-2 bg-black"></div>
            </template>
        </div>
        <input
            ref="fileEle"
            v-show="false"
            type="file"
            id="file-uploader"
            data-target="file-uploader"
            accept="image/*,.pdf,.docx,.doc"
            @change="handleFiles($event)"
            multiple="multiple"
        />
        <input
            ref="filePhoneEle"
            v-show="false"
            type="file" 
            capture="environment" 
            @change="handleFiles($event)"
            accept="image/*"/>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()
const isMobile = computed(() => {
    return store.state.isMobile
})
const roleID = computed(() => {
    return store.state.roleID
})
const isSchool = computed(() => {
    return (roleID.value == 2) || (roleID.value == 1)
})

const modifyData = ref({
    reply:''
})

const fileEle = ref(null)
const upLoad = () => {
    fileEle.value.click()
}
const fileList = ref([])
const handleFiles = (event) => {
    // console.log('event',event)
    // console.log('files',event.target.files)
    fileList.value = []
    let target = event.target.files
    for(let key in target){

        if(!isNaN(parseInt(key))){
            var reader = new FileReader()
            reader.onload = function (e) {
                //console.log('e',e.target.result)
                fileList.value.push({
                    name:target[key].name,
                    type:target[key].type,
                    isImg:target[key].type.includes("image"),
                    src:e.target.result
                })
                //console.log('fileList',fileList.value)
            }
            reader.readAsDataURL(target[key])
            
        }
        
    }
    console.log('fileList',fileList.value)
}

const filePhoneEle = ref(null)
const upLoadPhone = () => {
    filePhoneEle.value.click()
}

</script>

<style>

</style>