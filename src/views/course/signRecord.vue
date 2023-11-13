<template>
    <div class="w-auto h-auto max-w-[100%] p-2 flex flex-col justify-center items-center ">
        <div class="w-[95%] md:w-[70%] h-[100%] text-xs md:text-base rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
            <div class="grow">日期</div>
            <div class="grow">簽到</div>
            <div class="grow">簽退</div>
            <div class="grow">狀態</div>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { getSignRecord } from '@/api/api'
import { ref,computed } from 'vue'
import { useRouter,useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()
const store = useStore()

const signData = ref([])
const apiLoading = ref(false)
const init = async() => {
    if(apiLoading.value) return false

    apiLoading.value = true
    
    let dayArr = route.query.HDYDATE.split('-')

    let payload = {
        CLSNO: route.query.CLSNO,
        DepartmentID: "2bd3434f-1e95-4fdb-ab29-315921e06868",
        Month: parseInt(dayArr[1]),
        STUID: null,
        Year: parseInt(dayArr[0]) + 1911
    }

    getSignRecord(payload).then((res) => {
        signData.value = res
        apiLoading.value = false
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })
}


const isMobile = computed(() => {
    return store.state.isMobile
})


init()

</script>

<style lang="scss">


</style>