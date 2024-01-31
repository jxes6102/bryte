<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>{{statement}}</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">全校</div>
        </div>
        <!-- <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>聯絡簿回覆: (</div>
            <div class="text-[#F08080]">67/123</div>
            <div>)</div>
        </div> -->
        <div v-if="isSchool" class="w-[95%] md:w-[40%] h-[auto] text-base md:text-2xl rounded-lg p-1 flex flex-wrap items-center justify-center">
            <div @click="toContactChart" class="btn-style-1">聯絡簿統計</div>
            <div @click="toMedication" class="btn-style-1">今日餵藥列表</div>
        </div>
        <template v-if="isSchool">
            <div 
                v-for="(item,index) in data" :key="index"
                @click="toContactDetail(item.classId, item.className,'','')"
                class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
                <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                    <div class="text-[16px] md:text-2xl font-semibold">班級：{{ item.className }}</div>
                    <div 
                        class="text-[#6E6EFF] text-[14px] md:text-xl pl-1"
                        v-for="(name,teacherKey) in item.teachers" :key="teacherKey" >{{ name }}</div>
                </div>
                <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl flex flex-wrap items-center justify-start">
                    <div class="text-[#00D1D1]">{{ item.studentCount + '人'}}</div>
                    <div class="">{{ '/' + item.studentTotal + '人'}}</div>
                </div>
                <div 
                    class="absolute right-[5px] top-[calc(50%_-_10px)] md:right-[15px] md:top-[calc(50%_-_20px)] cursor-pointer">
                    <el-icon :size="isMobile ? 20 : 40"><ArrowRightBold /></el-icon>
                </div>
            </div>
        </template>
        <template v-else>
            <div 
                v-for="(item,index) in studentData" :key="index"
                @click="toContactDetail(item.classId, item.className, item.studentId, item.studentUserName, item.studentNumber)"
                class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
                <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                    <div class="text-[16px] md:text-2xl font-semibold">班級：{{ item.className }}</div>
                    <div 
                        class="text-[#6E6EFF] text-[14px] md:text-xl pl-1"
                        v-for="(name,teacherKey) in item.teachers" :key="teacherKey" >{{ name }}</div>
                </div>
                <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl flex flex-wrap items-center justify-start">
                    <div>{{ item.studentUserName + ' ' + item.studentNumber + '號'}}</div>
                </div>
                <div 
                    class="absolute right-[5px] top-[calc(50%_-_10px)] md:right-[15px] md:top-[calc(50%_-_20px)] cursor-pointer">
                    <el-icon :size="isMobile ? 20 : 40"><ArrowRightBold /></el-icon>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { getContactBookClassList,getContactBookStudentList } from '@/api/api'
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";
import dateSelect from '@/components/dateSelect.vue'

const router = useRouter()
const store = useStore()

const isMobile = computed(() => {
    return store.state.isMobile
})

const roleID = computed(() => {
    return store.state.roleID
})

const user = computed(() => {
    if (store.state.user && store.state.user.roleName != ''){
        return store.state.user
    }
    return JSON.parse(localStorage.getItem('user'))
})

const statement = computed(() => {
    return (user.value == null ? '' : user.value.roleName + '：' + user.value.name)
    // if(roleID.value == 1){
    //     return '園長:施O漢'
    // } else if(roleID.value == 2) {
    //     return '導師:羅O空'
    // }
})

const data = ref([
    {
        classId:'',
        className:'',
        classCode:'',
        teachers:[''],
        studentCount:0,
        studentTotal:0,
    }
])

const studentData = ref([
    {
        classId:'',
        className:'',
        classCode:'',
        teachers:[''],
        studentId:'',
        studentUserName:'',
        studentNumber:0,
    }
])

const apiLoading = ref(false)
const isSchool = ref(false)

const setContactBookClassList = () => {
    getContactBookClassList().then((res) => {
        // console.log('res',res)
        if(res.data.status){
            data.value = res.data.data
        }else{
            console.log(res.data.message)
        }
    })
}

const setContactBookStudentList = () => {
    getContactBookStudentList().then((res) => {
        // console.log('res',res)
        if(res.data.status){
            studentData.value = res.data.data
        }else{
            console.log(res.data.message)
        }
    })
}

const init = async() => {
    apiLoading.value = true
    if (user.value.roleType == 2 || user.value.roleType == 3) {
        await setContactBookClassList()
        isSchool.value = true
    } else {
        await setContactBookStudentList()
        isSchool.value = false
    }
    // if(roleID.value == 2){
    //     data.value = data.value.slice(0,2)
    // }
    apiLoading.value = false
}

init()

const toContactDetail = (classId, className, studentId, studentName ,studentNumber) => {
    store.commit('setClassId',classId)
    store.commit('setClassName',className)
    store.commit('setStudentId',studentId)
    store.commit('setStudentName',studentName)
    store.commit('setStudentNumber',studentNumber)
    router.push({ path: '/contactDetail' })
}

const toContactChart = () => {
    router.push({ path: '/contactChart' })
}

const toMedication = () => {
    router.push({ path: '/medicationList' })
}

</script>

<style>

</style>