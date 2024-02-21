<template>
    <div v-if="!isMobile" class="absolute w-auto h-auto top-0 left-0 flex flex-col justify-center items-center z-[9998]">
        <div
            @click="closeAnnounce"
            class="absolute w-auto h-auto top-0 right-0 p-2 flex flex-wrap justify-center items-center cursor-pointer z-[20]">
            <el-icon size="50"><Close /></el-icon>
        </div>
        <div
            @click="setVolume"
            class="absolute w-auto h-auto top-0 right-[50px] p-2 flex flex-wrap justify-center items-center cursor-pointer z-[20]">
            <el-icon v-if="volume" size="50"><VideoPause /></el-icon>
            <el-icon v-else size="50"><VideoPlay /></el-icon>
        </div>
        <div class="w-[100vw] h-[100vh] bg-[#F0F8FF] flex flex-wrap justify-center items-center overflow-hidden">
            <div 
                class="w-[50%] h-[100vh] bg-[#F0F8FF] border-r-2 border-[#B0BEC5] flex flex-col justify-start items-center">
                <transition
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                    <div class="relative w-full h-[80px] rounded-lg bg-slate-50 my-1 flex flex-wrap justify-center items-center">
                        <div class="absolute top-0 left-[5px] w-[5vw] h-[5vw] max-w-[80px] max-h-[80px] rounded-full ">
                            <img src="@/assets/img/van.png" alt="">
                        </div>
                        <div class="text-red-700 w-full text-4xl font-bold flex flex-wrap justify-center items-center">🔴等待區🔴</div>
                    </div>
                </transition>
                <div class="w-full flex flex-wrap justify-center items-center">
                    <transition-group 
                        name="fade"
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                        <div
                            v-for="(item,index) in callShow.wait" :key="index"
                            :class="((index % 4 == 0 || index % 4 == 1) ? 'bg-slate-50' : 'bg-slate-200') + ' ' + 
                                ((item.isEnd && (index % 4 == 0 || index % 4 == 2)) ? 'w-[95%]' : 'w-[48%] mx-[2px]')"
                            class="h-[auto] rounded-lg mt-1 text-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap justify-center items-center">
                            <div class="w-full flex flex-wrap justify-center items-center text-2xl text-state-900">
                                <div class="w-auto font-semibold px-1">男生</div>
                                <div class="w-auto font-semibold px-1">{{item.className + '班'}}</div>
                                <div class="w-auto font-semibold px-1">{{item.studentUserName}}</div>
                                <div class="w-auto font-semibold px-1">→</div>
                                <div class="w-auto font-semibold px-1">{{item.parentTitle}}</div>
                            </div>
                            <div class="w-full flex flex-wrap justify-center items-center text-xl">
                                <div class="w-auto text-center font-semibold"
                                :class="((item.state == 2) ? 'text-red-700' : 'text-blue-600')">{{item.message}}</div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div 
                class="w-[50%] h-[100vh] bg-[#F0F8FF] border-l-2 border-[#B0BEC5] flex flex-col justify-start items-center">
                <transition
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                    <div class="relative w-full h-[80px] rounded-lg bg-slate-50 my-1 flex flex-wrap justify-center items-center">
                        <div class="absolute top-0 left-[5px] w-[5vw] h-[5vw] max-w-[80px] max-h-[80px] rounded-full ">
                            <img src="@/assets/img/walking.png" alt="">
                        </div>
                        <div class="text-lime-600 w-full text-4xl font-bold flex flex-wrap justify-center items-center">🟢已離校🟢</div>
                    </div>
                </transition>
                <div class="w-full flex flex-wrap justify-center items-center">
                    <transition-group 
                        name="fade"
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                        <div
                            v-for="(item,index) in callShow.arrive" :key="index"
                            :class="((index % 4 == 0 || index % 4 == 1) ? 'bg-slate-50' : 'bg-slate-200') + ' ' + ((item.isEnd && (index % 4 == 0 || index % 4 == 2)) ? 'w-[95%]' : 'w-[48%] mx-[2px]')"
                            class="h-[auto] rounded-lg mt-1 text-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap justify-center items-center">
                            <div class="w-full flex flex-wrap justify-center items-center text-2xl text-state-900">
                                <div class="w-auto font-semibold px-1">{{item.className + '班'}}</div>
                                <div class="w-auto font-semibold px-1">{{item.studentUserName}}</div>
                                <div class="w-auto font-semibold px-1">→</div>
                                <div class="w-auto font-semibold px-1">{{item.parentTitle}}</div>
                            </div>
                            <div class="text-green-600 w-full flex flex-wrap justify-center items-center text-xl">
                                <div class="w-auto text-center font-semibold">{{item.message}}</div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <!-- <div 
                v-for="(item,index) in 4" :key="index"
                class="w-[25%] h-[100vh] bg-[#F0F8FF] border-2 border-[#F2FFFF] flex flex-col justify-start items-center">
                <transition
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                    <div v-if="showList[index]?.class" class="relative w-full h-[80px] rounded-lg bg-slate-50 my-1 flex flex-wrap justify-center items-center">
                        <div class="absolute top-0 left-[5px] w-[5vw] h-[5vw] max-w-[80px] max-h-[80px] rounded-full ">
                            <img :src="getImageUrl(showList[index]?.img)" alt="">
                        </div>
                        <div class="w-full text-4xl font-bold flex flex-wrap justify-center items-center">{{ showList[index]?.class }} </div>
                        <div class="w-full text-xl font-bold flex flex-wrap justify-center items-center">{{ '導師:' + showList[index]?.teacher }} </div>
                    </div>
                </transition>
                <div class="w-full flex flex-wrap justify-center items-center">
                    <transition-group 
                        name="fade"
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                        <div
                            v-for="(thing,key) in showList[index]?.crowd" :key="key"
                            :class="(showList[index]?.crowd.length <= maxCount) ? 
                                'w-[95%]' : 'w-[48%] mx-[2px]'"
                            class=" h-[auto] rounded-lg bg-slate-50 mt-1 text-xs lg:text-sm xl:text-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap justify-center items-center">
                            <div class="w-full flex flex-wrap justify-center items-center">
                                <div class="w-auto font-semibold">{{thing.number + '號'}}</div>
                                <div class="w-auto font-semibold">{{thing.name}}</div>
                            </div>
                            <div class="w-full flex flex-wrap justify-center items-center">
                                <div class="w-auto text-center font-semibold">接送人員:</div>
                                <div v-if="thing.isMom" class="w-auto text-[#F08080] text-center font-semibold">媽媽</div>
                                <div v-else class="w-auto text-[#0000CD] text-center font-semibold">爸爸</div>
                            </div>
                            <div class="w-full flex flex-wrap justify-center items-center">
                                <div class="w-auto text-center font-semibold">抵達情況:</div>
                                <div v-if="thing.isArrive" class="w-auto text-[#DC143C] text-center font-semibold">{{ thing.time + '分抵達'}}</div>
                                <div v-else class="w-auto text-[#79FF79] text-center font-semibold">已抵達</div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div> -->
        </div>
        <!-- <Teleport to="body">
            <dialogView layer="9999" type="small" v-if="true">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">選單</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-full h-[200px] p-4 flex flex-col justify-between items-center gap-y-[20px]">
                        <div class="w-[95%] md:w-[90%] text-2xl p-2 border-[1px] border-black rounded-lg flex flex-wrap justify-center items-center">編輯基本資料</div>
                        <div class="w-[95%] md:w-[90%] text-2xl p-2 border-[1px] border-black rounded-lg flex flex-wrap justify-center items-center">編輯橫幅</div>
                        <div class="w-[95%] md:w-[90%] text-2xl text-gray-400 p-2 border-[1px] border-gray-400 rounded-lg flex flex-wrap justify-center items-center">編輯簡介(製作中)</div>
                    </div>
                </template>
            </dialogView>
        </Teleport> -->
    </div>
    <div class="absolute w-[100vw] h-[100vh] top-0 left-0 bg-white flex flex-col justify-center items-center z-[9999]" v-else>
        <div class="text-2xl">此畫面無法用手機開啟</div>
        <div
            @click="closeAnnounce"
            class="absolute w-auto h-auto top-0 right-0 p-2 flex flex-wrap justify-center items-center">
            <el-icon size="50"><Close /></el-icon>
        </div>
    </div>
    
</template>

<script setup>
/*eslint-disable*/
import { getCall } from '@/api/api'
import { ref,computed,onBeforeUnmount,onMounted } from 'vue'
import { useRouter } from "vue-router";
// import dialogView from "@/components/dialogView.vue"
import { useStore } from "vuex";
import 'animate.css'

const store = useStore()
const router = useRouter()

// {
//     "data": 
//     [
//         {
//             id
//             "id": string,
//             班級名稱
//             "className": string,
//             班級代碼
//             "classCode": string,
//             學生姓名
//             "studentUserName": string,
//             學生號碼
//             "studentNumber": number,
//             接送日期
//             "scheduleDate": Date,
//             家長姓名
//             "parentUserName": string,
//             家長稱謂
//             "parentTitle": string,
//             預計接送時間(分鐘)
//             "pickupTime": number,
//             接送狀態：
//             0. 在校
//             1. 等待接送但家長尚未選擇接送時間
//             2. 等待接送
//             3. 等待接送且家長已抵達
//             4. 已接送完成
//             "state": number,
//             離校時間
//             "arrivedDateTime": Date,
//         }
//     ],
//     // 狀態：true成功、false失敗
//     "status": boolean,
//     // 訊息
//     "message": string
// }

const volume = ref(0)
const setVolume = () => {
    if(volume.value){
        volume.value = 0
    }else{
        volume.value = 1
    }
}
let oldMusicList = []
let musicList = []
const playMusic = (text) => {
    if(typeof speechSynthesis){
        const msg = new SpeechSynthesisUtterance(text);
        msg.volume = volume.value
        window.speechSynthesis.speak(msg);
    }
}
let musicTimer = null
const createMusicTimer = () =>  {
    musicTimer = setInterval(() => {
        // console.log('test',musicList[0]);
        if(musicList.length){
            let play = ''
            if (musicList[0].state == 3) {
                play = musicList[0].className + '班，' + musicList[0].studentUserName + '同學，你的' + musicList[0].parentTitle + '已經抵達。'
            } else if (musicList[0].state == 4) {
                play = musicList[0].className + '班，' + musicList[0].studentUserName + '同學，已離校。'
            }
            playMusic(play)
            musicList.shift()
        }
        
    }, 3000);
}

setTimeout(() => {
    oldMusicList = JSON.parse(JSON.stringify(musicList))
}, 10000);

// setTimeout(() => {
//     musicList.push("測試五號","測試六號","測試七號","測試八號")
// }, 30000);

// setTimeout(() => {
//     musicList.push("測試九號","測試十號")
// }, 60000);

const callData = ref([])
const callShow = computed(() => {
    let target = {
        wait:[],
        arrive:[]
    }
    if(!callData.value.length){
        return target
    }
    
    for(let i = 0; i < callData.value.length; i++){
        let obj = callData.value[i]
        if(obj.state == 2){
            let pickupTime = obj.pickupTime < 0 ? 0 : obj.pickupTime
            obj.message = '預計'+pickupTime+'分後抵達'
            target.wait.push(obj)
        }else if(obj.state == 3){
            obj.message = '已抵達'
            target.wait.push(obj)
            pushMusicList(obj)
        }else if(obj.state == 4){
            let arrivedDateTime = new Date(obj.arrivedDateTime)
            let AM = arrivedDateTime.getHours() < 12 ? '上午' : (arrivedDateTime.getHours() < 18 ? '下午' : '晚上')
            let hours = arrivedDateTime.getHours() < 12 ? arrivedDateTime.getHours() : arrivedDateTime.getHours() - 12
            hours = hours < 10 ? '0' + hours : '' + hours
            let mins = arrivedDateTime.getMinutes() < 10 ? '0' + arrivedDateTime.getMinutes() : '' + arrivedDateTime.getMinutes()
            let seconds = arrivedDateTime.getSeconds() < 10 ? '0' + arrivedDateTime.getSeconds() : '' + arrivedDateTime.getSeconds()
            obj.message = '於 ' + AM + ' ' + hours + ':' + mins + ':' + seconds + ' 離校'
            target.arrive.push(obj)
            pushMusicList(obj)
        }else{
            obj.message = '等待中'
            target.wait.push(obj)
        }
        console.log(obj)
    }
    target.wait = target.wait.slice(0,maxCount.value*2)
    target.arrive = target.arrive.slice(0,maxCount.value*2)

    for (let key in target.wait) {
        target.wait[key].isEnd = (key == (target.wait.length - 1));
    }
    for (let key in target.arrive) {
        target.arrive[key].isEnd = (key == (target.arrive.length - 1));
    }
    return target
})

const pushMusicList = (obj) => {
    let isSame = false 
    for (let key in oldMusicList) {
        if (oldMusicList[key].id == obj.id) {
            isSame = true
        }
    }
    if (!isSame) {
        musicList.push(obj)
        oldMusicList.push(obj)
    }
}

const getCallData = async() => {
    // console.log('call api')
    await getCall().then((res) => {
        // console.log('res',res.data)
        if(res.data.status){
            callData.value = res.data.data
            // callData.value = testData
            // console.log('callData',callData.value)
            // console.log('callShow',callShow.value)
        }else{
            console.log(res.data.message)
        }
    }).catch((err) => { })
}
let callTimer = null
const createCallTimer = () =>  {
    callTimer = setInterval(() => {
        getCallData()
    }, 5000);
}

onMounted( async() => {
    if(!isMobile.value){
        getCallData()
        createMusicTimer()
        createCallTimer()
    }
})

onBeforeUnmount(() => {
    window.clearInterval(timer.value)
    window.clearInterval(musicTimer)
    window.clearInterval(callTimer)
    
})

const list = ref([
])
const timer = ref(null)
const showIndex = ref(0)
const maxCount = ref(0)
const showList = computed(() => {
    let target = []
    target = list.value.slice(showIndex.value*4,showIndex.value*4+4)
    for(let index in target){
        target[index].crowd = target[index].crowd.slice(0,maxCount.value*2)
    }
  return target
})
const isMobile = computed(() => {
    return store.state.isMobile
})
const init = () => {
    if(isMobile.value){
        return false
    }

    maxCount.value = Math.floor((window.innerHeight - 80)/90) 
    // console.log(maxCount.value)

    timer.value = window.setInterval(( () => {
        let max = Math.floor(list.value.length/4)
        if(showIndex.value >= max) {
            showIndex.value = 0
        }else{
            showIndex.value++
        }
        //console.log('showList',showList.value)

    }), 5000);
}

init()

// //延遲設定
// const delay = () => {   
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve('delay');
//         }, 2000);
//     });
// }

const getImageUrl = (path) => {
    return new URL(`../assets/${path}`, import.meta.url).href;
};

const closeAnnounce = () => {
    store.commit('changeAnnounceStatus',false)
}

</script>

<style lang="scss" scoped>
.fade-enter-active, 
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
</style>