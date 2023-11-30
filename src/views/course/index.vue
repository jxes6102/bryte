<template>
    <div class="w-auto h-auto max-w-[100%] p-2 flex flex-col justify-center items-center ">
        <div class="w-[100%] h-[auto] py-2 flex flex-wrap justify-center items-center">
            <div class="w-auto text-lg md:text-3xl px-2 md:px-4">選擇日期</div>
            <div class="w-[150px] md:w-[auto]">
                <el-date-picker
                    v-model="dayData"
                    popper-class="custom-date-picker"
                    type="date"
                    placeholder="選擇查詢日期"
                    :disabled-date="disabledDate"
                    :disabled="apiLoading"
                    :editable="false"
                    :style="isMobile ? 'width: 150px;font-size: 12px;' : 'width: 100%;'"
                />
            </div>
            
        </div>
        <div class="w-[100%] h-auto rounded-lg bg-slate-50 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center">
            <div 
                class="w-[100%] md:w-[50%] h-auto max-w-[600px] m-2 p-2 rounded-lg bg-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center gap-y-[10px]"
                v-for="(item, index) in classList" :key="index"
            >
                <div class="w-full flex flex-wrap items-center justify-center">
                    <div class="w-[70%] text-left flex flex-col items-center justify-center">
                        <div class="w-full text-xl md:text-2xl">{{ item.CLSNAME }}</div>
                        <div class="w-full text-sm md:text-base">{{ '課程編號'+item.CLSNO }}</div>
                        <div class="w-full text-sm md:text-base">{{ '上課時間'+item.CLSTIME1+'~'+item.CLSTIME2 }}</div>
                        <div class="w-full text-sm md:text-base">{{ '教師'+item.CLSTEAS1 }}</div>
                    </div>
                    <div class="w-[30%] text-sm md:text-base">
                        <button
                            @click="signIn"
                            class="bg-orange-400 hover:bg-orange-500 text-white font-bold mx-1 py-1 px-2 md:mx-2 md:py-2 md:px-3 rounded">
                            簽到
                        </button>
                    </div>
                </div>
                <div class="w-full text-sm md:text-base flex flex-wrap items-center justify-between md:justify-around">
                    <button
                        class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-[1px] py-1 px-2 md:py-2 md:px-3 rounded">
                        作業
                    </button>
                    <button
                        @click="toDetail(item)"
                        class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-[1px] py-1 px-2 md:py-2 md:px-3 rounded">
                        詳情
                    </button>
                    <button
                        @click="leave" 
                        class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-[1px] py-1 px-2 md:py-2 md:px-3 rounded">
                        請假
                    </button>
                    <button
                        @click="toSign(item)"
                        class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-[1px] py-1 px-2 md:py-2 md:px-3 rounded">
                        簽到記錄
                    </button>
                </div>
                
            </div>

        </div>
        <dialogView v-if="dialogStatus">
            <template v-slot:message>
                <div class="text-base md:text-2xl">{{dialogData}}</div>
            </template>
            <template v-slot:control>
                <div class="absolute w-full bottom-4 flex flex-wrap justify-center items-center">
                    <button
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
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { getClassList } from '@/api/api'
import { ref,computed,watch,provide  } from 'vue'
import { useRouter } from "vue-router";
import dialogView from "@/components/dialogView.vue"

const router = useRouter()
const store = useStore()

const dayData = ref(new Date())
const classList = ref([])
const apiLoading = ref(false)
const init = async() => {
    if(apiLoading.value) return false

    apiLoading.value = true
    let payload = {
        DepartmentID: "2bd3434f-1e95-4fdb-ab29-315921e06868",
        EndDate: dayData.value.getUTCFullYear()+'/'+(dayData.value.getMonth()+1)+'/'+dayData.value.getDate(),
        STUID: null,
        StartDate: dayData.value.getUTCFullYear()+'/'+(dayData.value.getMonth()+1)+'/'+dayData.value.getDate()
    }
    getClassList(payload).then((res) => {
        //console.log('res',res)
        //console.log('newsData',newsData.value)
        classList.value = res.data.Result
        //console.log('classList.value',classList.value)
        apiLoading.value = false
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })
}

//設定選擇日期範圍
const disabledDate = (time) => {
    return (time.getTime() > Date.now()) || (time.getTime() < (Date.now() - 2592000000))
}

//監聽日期改變
watch(dayData, (newVal,oldVal)=>{
    init()
},{immediate:true})

const isMobile = computed(() => {
    return store.state.isMobile
})

const toDetail = (item) => {
    // console.log('item',item.HDYDATE)
    // console.log('item',item.CLSNO,item.CLSNO.length)
    router.push({ 
        name: 'courseDetail',
        query:{
            CLSNO:item.CLSNO.trim(),
            HDYDATE:item.HDYDATE
        }
    })
}

const toSign = (item) => {
    router.push({ 
        name: 'signRecord',
        query:{
            CLSNO:item.CLSNO.trim(),
            HDYDATE:item.HDYDATE
        }
    })
}


const dialogStatus = ref(false)
const dialogData = ref('')
const signIn = () => {
    dialogStatus.value = true
    dialogData.value = '您確定要簽到嗎?'
}

const leave = () => {
    dialogStatus.value = true
    dialogData.value = '您確定要請假嗎?'
}

const cancel = () => {
    dialogStatus.value = false
}
provide('cancel', cancel)

</script>

<style lang="scss">
</style>