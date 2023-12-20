<template>
    <div class="w-[100%] h-[auto] my-1 flex flex-wrap justify-center items-center gap-x-[10px]">
        <!-- <div class="w-auto text-lg md:text-3xl px-2 md:px-4">選擇日期</div> -->
        <el-icon class="cursor-pointer" @click="lastDay" :size="isMobile ? 30 : 40"><ArrowLeftBold /></el-icon>
        <div class="w-[150px] md:w-[auto]">
            <el-date-picker
                v-model="dayData"
                popper-class="custom-date-picker"
                type="date"
                placeholder="選擇查詢日期"
                :disabled-date="disabledDate"
                :disabled="apiLoading"
                :editable="false"
                :style="isMobile ? 'width: 150px;font-size: 14px;' : 'font-size: 18px;width: 100%;'"
            />
        </div>
        <el-icon class="cursor-pointer" @click="nextDay" :size="isMobile ? 30 : 40"><ArrowRightBold /></el-icon>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed,watch } from 'vue'
import { useRouter } from "vue-router";

const emit = defineEmits(['changeDate'])
const props = defineProps({
    disabledDate: {
        type: Function,
        default: (time) => {
            return (time.getTime() > Date.now() + 2592000000 ) || (time.getTime() < (Date.now() - 2592000000))
        }
    },
    apiLoading:{
        type:Boolean,
        default:false,
    },
    date:{
        type:Date,
        default:new Date()
    }
})

const router = useRouter()
const store = useStore()

const isMobile = computed(() => {
    return store.state.isMobile
})

const roleID = computed(() => {
    return store.state.roleID
})

const dayData = ref(new Date())
dayData.value = props.date
//監聽日期改變
watch(dayData, (newVal,oldVal)=>{
    emit('changeDate',newVal)
},{immediate:false})

const lastDay = () => {
    if(props.apiLoading){
        return false
    }
    let target = new Date(dayData.value.setDate(dayData.value.getDate()-1))
    if(!props.disabledDate(target)){
        dayData.value = target
    }
}

const nextDay = () => {
    if(props.apiLoading){
        return false
    }
    let target = new Date(dayData.value.setDate(dayData.value.getDate()+1))
    if(!props.disabledDate(target)){
        dayData.value = target
    }
}

</script>

<style>

</style>