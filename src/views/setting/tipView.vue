<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading" 
        :date="dayData" @changeDate="changeDate"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">{{className}}班</div>
        </div>
        <template v-if="!apiLoading" >
            <div 
                v-for="(item, index) in list" :key="index"
                @click="detail(item)"
                :class="(index % 2 == 0) ? 'bg-slate-50' : 'bg-slate-200'"
                class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg rounded-lg my-1 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
                <!-- <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full ">
                    <img v-if="item.pictureUrl" :src="item.pictureUrl" class="rounded-full " alt="">
                </div> -->
                <div class="w-auto px-2 h-full grow flex flex-col items-start justify-center">
                    <div class="w-auto flex flex-wrap items-start justify-center">
                        <div class="px-1">{{item.title}}</div>
                    </div>
                    <div class="w-auto flex flex-wrap items-center justify-center">
                        <div class="px-1">{{item.remark}}</div>
                    </div>
                </div>
                <div class="w-auto px-2 h-full grow flex flex-col items-end justify-center">
                    <div class="w-auto flex flex-wrap items-start justify-center">
                        <div class="px-1"></div>
                    </div>
                    <div class="w-auto flex flex-wrap items-center justify-center">
                        <div class="px-1">{{item.createDateTime}}</div>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="modalStatus" >
            <div class="w-[95%] md:w-[40%] my-2 text-[16px] md:text-2xl text-left text-[#6E6EFF] font-semibold">班級叮嚀</div>
            <div class="w-[90%] md:w-[40%] h-auto rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-start justify-center">
                <div class="relative w-full h-full text-sm md:text-lg">
                    <el-input 
                        v-model="modifyData.title" 
                        class="w-full"
                        size="large"  />
                </div>
            </div>
            <div class="w-[95%] md:w-[40%] my-2 text-[16px] md:text-2xl text-left text-[#6E6EFF] font-semibold">班級叮嚀</div>
            <div class="w-[90%] md:w-[40%] h-auto rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-start justify-center">
                <div class="relative w-full h-full text-sm md:text-lg">
                    <!-- <textarea 
                        v-model="modifyData.remark"
                        required
                        class="w-full h-[100px] md:h-[150px] p-1 overflow-hidden"
                        style="resize:none;"
                        maxlength="30"
                        :disabled="!isSchool"
                        >
                    </textarea> -->
                    <el-input
                        v-model="modifyData.remark" 
                        size="large"
                        class="w-full"
                        maxlength="500"
                        :rows="2"
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 5 }"
                        :disabled="!isSchool"
                    />
                    <!-- <div class="absolute right-3 bottom-1">{{'字數' + modifyData.reply.length + '/30'}}</div> -->
                </div>
            </div>
            <div v-if="isSchool" class="w-[95%] md:w-[40%] h-auto min-h-[40px] my-1 md:my-3 flex flex-wrap justify-start items-center">
                <button
                    @click="upLoadPhone"
                    class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 rounded">
                    上傳照片
                </button>
                <!-- <button
                    @click="upLoad"
                    class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 rounded">
                    上傳附件
                </button> -->
                <button
                    @click="setData"
                    class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 rounded">
                    儲存
                </button>
            </div>
            <div class="w-[95%] md:w-[40%] h-auto min-h-[40px] my-1 md:my-3 flex flex-wrap justify-start items-center">
                <swiper 
                    class="relative w-[95%] h-auto" 
                    :loop="true"
                    :modules="modules" 
                    :pagination="{ clickable: true }"
                    :slides-per-view="1"
                    :space-between="10"
                    @swiper="onSwiper"
                    @slideChange="onSlideChange"
                >
                    <!-- <div @click="next" class="next-button absolute w-[30px] h-[30px] md:w-[60px] md:h-[60px] top-1/2 -translate-y-1/2 right-[3%] z-[30] cursor-pointer">
                    <el-icon :color="'#a7f2a7'" :size="isMobile ? '30' : '60'"><ArrowRightBold /></el-icon>
                    </div>
                    <div @click="previous" class="previous-button absolute w-[30px] h-[30px] md:w-[60px] md:h-[60px] top-1/2 -translate-y-1/2 left-[3%] z-[30] cursor-pointer">
                    <el-icon :color="'#a7f2a7'" :size="isMobile ? '30' : '60'"><ArrowLeftBold /></el-icon>
                    </div> -->
                    <swiper-slide
                        class="relative w-full flex justify-center"
                        v-for="(item, index) in album  " :key="index"
                        >
                        <div class="w-full h-[100%] pb-[50%]">
                            <img :src="item.ImageUrl" class="w-[95%] h-[100%]">
                        </div>
                    </swiper-slide>
                </swiper>
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
        </template>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { uploadFile, getAnnouncementByClassId, createAnnouncement } from '@/api/api'
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";
import signalR from '@/utils/signalR'
import dateSelect from '@/components/dateSelect.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

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

const album = ref([])


let swiperItem = null
const onSwiper = (element) => {
  // console.log('element',element)
  swiperItem = element;
};

const onSlideChange = () => {
  // console.log('slide change');
};

const countHeight = (w,h,width) => {
  //pc width 50vw phone width 100vw
  return (Math.round(h*width/w))+'vw'
  // return isMobile.value ? (Math.round(h*100/w))+'vw' : (Math.round(h*100/w)/2)+'vw'
}

const modalStatus = ref(false)
const detail = (item) => {
    modifyData.value = JSON.parse(JSON.stringify(item))
    modalStatus.value = true
    
    album.value = [
        {ImageUrl:require('@/assets/img/carousel-2.jpg')},
        {ImageUrl:require('@/assets/img/carousel-3.jpg')},
        {ImageUrl:require('@/assets/img/carousel-4.jpg')},
    ]
    for(let item of album.value){
        const img = new Image();
        img.src = item.ImageUrl;
        img.onload = function() {
            item.width = img.width
            item.height = img.height
        }
    }
}

const formatDate = (dateTime) => {
    let toDay = new Date(Date.now())
    let date = new Date(dateTime)
    let year = date.getFullYear()
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : '' + date.getMonth()
    let day = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate()
    let dateStr = year + '/' + month + '/'+ day
    if ((toDay.getFullYear() == year) && 
        (toDay.getMonth() == month) && 
        (toDay.getDate() == day)) {
        dateStr = '今天'
    }
    let AM = date.getHours() < 12 ? '上午' : (date.getHours() < 18 ? '下午' : '晚上')
    let hours = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12
    hours = hours < 10 ? '0' + hours : '' + hours
    let mins = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
    return (dateStr + ' ' + AM + ' ' + hours + ':' + mins)
    // return (AM + ' ' + hours + ':' + mins + ':' + seconds)
}

const list = ref([
    {
        title: '活動',
        remark: '簡介',
        createDateTime: formatDate(new Date().toUTCString()),
    },
    {
        title: '活動',
        remark: '簡介',
        createDateTime: formatDate(new Date().toUTCString()),
    }
])

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
    // await getData()
    apiLoading.value = false
}

const dayData = ref(new Date())
init()
const changeDate = (value) => {
    dayData.value = value
    init()
}

</script>

<style>

</style>