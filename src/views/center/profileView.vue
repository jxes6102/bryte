<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-center items-center ">
        <div class="w-[95%] md:w-[45%] h-[100%] text-xs md:text-base rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>姓名</div>
                <div>{{userProfile?.UserName}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>暱稱</div>
                <div>{{userProfile?.NickName}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>電子信箱</div>
                <div>{{userProfile?.Email}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>LINE綁定狀態</div>
                <div></div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>LINE Notify綁定狀態</div>
                <div>{{userProfile?.LINENotifyStatus}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { getProfile } from '@/api/api'
import { ref,watch } from 'vue'
import { useRouter,useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()

const userProfile = ref(null)
const init = async(payload) => {
    await getProfile(payload).then((res) => {
        userProfile.value = res.data.Result
        //console.log('userProfile.value',userProfile.value)
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })
}

watch(route, (newVal,oldval) => {
    let payload = {
        UserID:''
    }
    if(newVal.query?.UserID){
        payload.UserID = newVal.query.UserID
    }else{
        payload.UserID = "50ceb08b-9174-453f-9bfc-2b57cb4f86be"
    }

    init(payload)
},{ deep: true,immediate: true });

</script>

<style>

</style>