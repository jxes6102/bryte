<template>
    <div v-if="!apiLoading" class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">{{className}}班</div>
        </div>
        <div class="w-[95%] md:w-[40%] my-2 text-[16px] md:text-2xl text-left text-[#6E6EFF] font-semibold">班級叮嚀</div>
        <div class="w-[90%] md:w-[40%] h-auto rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-start justify-center">
            <div class="relative w-full h-full text-sm md:text-lg">
                <textarea 
                    v-model="modifyData.remark"
                    required
                    class="w-full h-[100px] md:h-[150px] p-1 overflow-hidden"
                    style="resize:none;"
                    maxlength="30"
                    :disabled="!isSchool"
                    >
                </textarea>
                <!-- <div class="absolute right-3 bottom-1">{{'字數' + modifyData.reply.length + '/30'}}</div> -->
            </div>
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
                @click="setData"
                class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 rounded">
                儲存
            </button>
        </div>
        <div class="w-[95%] md:w-[40%] h-auto my-1 flex flex-wrap justify-start items-center">
            <template v-for="(item,index) in fileList" :key="index">
                <div class="w-[25vw] h-[25vw] md:w-[27%] md:h-[27%] m-1 md:m-2">
                    <a :href="'api/' + item" download>附件{{index+1}}</a>
                </div>
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
import { uploadFile, getAnnouncementByClassId, createAnnouncement } from '@/api/api'
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";
import signalR from '@/utils/signalR'

const router = useRouter()
const store = useStore()
const isMobile = computed(() => {
    return store.state.isMobile
})
const roleID = computed(() => {
    return store.state.roleID
})

const user = computed(() => {
    return store.state.user
})

const isSchool = computed(() => {
    return (user.value.roleType == 3) || (user.value.roleType == 2)
})

const classId = computed(() => {
    return localStorage.getItem('classId')
})

const className = computed(() => {
    return localStorage.getItem('className')
})

const apiLoading = ref(false)

const modifyData = ref({
    remark:''
})
const fileList = ref([])

const fileEle = ref(null)
const upLoad = () => {
    fileEle.value.click()
}

const getData = async() => {
    fileList.value = []
    let formData = new FormData()
    formData.append("classId", classId.value)
    await getAnnouncementByClassId(formData).then((res) => {
        if(res.data.status){
            modifyData.value = res.data.data
            let files = res.data.data.files.split('&')
            for (let key in files) {
                if (files[key] != '') {
                    fileList.value.push(files[key])
                }
            }
        }else{
            console.log(res.data.message)
        }
    }).catch((err) => { })
}
const setData = async() => {
    let files = ''
    for (let key in fileList.value) {
        files += fileList.value[key] + '&'
    }
    let formData = new FormData();
    formData.append("classId", classId.value)
    formData.append("remark", modifyData.value.remark)
    formData.append("files", files)
    await createAnnouncement(formData).then((res) => {
        if(res.data.status){
            let data = 'classId=' + classId.value
            signalR.sendNotify(1, data)
            console.log(res.data.message)
        }else{
            console.log(res.data.message)
        }
    }).catch((err) => { })
}
const handleFiles = async(event) => {
    // console.log('event',event)
    // console.log('files',event.target.files)
    fileList.value = []
    let target = event.target.files
    for(let key in target){
        if(!isNaN(parseInt(key))){
            let formData = new FormData();
            formData.append("file", target[key])
            formData.append("type", "announcement")
            await uploadFile(formData).then((res) => {
                if(res.data.status){
                    fileList.value.push(res.data.data)
                }else{
                    console.log(res.data.message)
                }
            }).catch((err) => { })
        }
    }
}

const filePhoneEle = ref(null)
const upLoadPhone = () => {
    filePhoneEle.value.click()
}

const init = async() => {
    // if(apiLoading.value) return false

    apiLoading.value = true
    await getData()
    apiLoading.value = false
}
init()

</script>

<style>

</style>