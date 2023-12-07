<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <div
            v-if="(roleID == 2) || (roleID == 1)" 
            class="w-[95%] md:w-[50%] h-[auto] rounded-lg m-1 p-1 flex flex-wrap items-center justify-center">
            <button
                @click="upLoad"
                class="w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 py-1 rounded">
                上傳檔案
            </button>
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
        <div 
            v-for="(item,index) in list" :key="index"
            class="w-[90%] md:w-[45%] h-[auto] text-sm md:text-lg rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-[20%] flex flex-col items-center justify-center">
                <div class="w-[40px] h-[40px] bg-lime-400"></div>
            </div>
            <div class="w-[60%] text-left flex flex-col items-center justify-center">
                <div class="w-full truncate break-all">{{item.name + item.type}}</div>
                <div class="w-full">{{item.time}}</div>
            </div>
            <div class="w-[20%] flex flex-col items-center justify-center">
                <button
                    class="w-[auto] text-sm md:text-xl text-[#FF4500] mx-[2px] py-[1px] px-[2px] rounded">
                    清除
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()

const apiLoading = ref(false)
const init = async() => {
    apiLoading.value = true
    apiLoading.value = false
}

init()

const isMobile = computed(() => {
    return store.state.isMobile
})

const roleID = computed(() => {
    return store.state.roleID
})

const list = ref([])
const handleFiles = (event) => {
    // console.log('event',event)
    // console.log('files',event.target.files)
    list.value = []
    let target = event.target.files
    for(let key in target){
        
        if(!isNaN(parseInt(key))){
            list.value.push({
                name:target[key].name,
                type:target[key].type,
                time:'test time',
            })
        }
        
    }
}

const fileEle = ref(null)

const upLoad = () => {
    fileEle.value.click()
}

</script>

<style>

</style>