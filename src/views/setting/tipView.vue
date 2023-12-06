<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">XX班</div>
        </div>
        <div class="w-[95%] md:w-[40%] my-2 text-[16px] md:text-2xl text-left text-[#6E6EFF] font-semibold">愛的叮嚀</div>
        <div class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-start justify-center">
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
        <div class="w-[95%] md:w-[40%] my-1 flex flex-wrap justify-start items-center">
            <button
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
        <div class="w-[95%] md:w-[40%] my-1 flex flex-wrap justify-start items-center">

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
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()

const roleID = computed(() => {
    return store.state.roleID
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
            fileList.value.push({
                name:target[key].name,
                type:target[key].type,
            })
        }
        
    }
    console.log('fileList',fileList.value)
}


</script>

<style>

</style>