<template>
    <div class="w-auto h-auto flex justify-center items-center">
        <div class="w-[95%] md:w-[80%] h-auto rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div 
                class="w-full h-auto text-xs md:text-base border-b-[1px] border-gray-300 flex flex-wrap justify-center items-center"
                @click="toProfile(item)"
                v-for="(item, index) in userList" :key="index">
                <div class="w-[40%] p-2 flex flex-col items-end md:items-center justify-center md:justify-end">
                    <div 
                        v-if="item.PictureUrl" 
                        class="w-[25vw] h-[25vw] md:w-[10vw] md:h-[10vw] bg-[#808080] bg-cover bg-center bg-no-repeat"
                        >
                        <img class="w-full h-full" :src="item.PictureUrl" alt="">
                    </div>
                    <div
                        v-else
                        class="w-[25vw] h-[25vw] md:w-[10vw] md:h-[10vw] bg-[#808080]" >
                    </div>
                </div>
                <div class="grow">{{item.UserName}}</div>
                <div class="grow">未綁定LINE</div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
/*eslint-disable*/
import {getUserList} from '@/api/api'
import { useStore } from "vuex";

import {ref,computed,watch } from 'vue'
import { useRouter,useRoute } from "vue-router";

const store = useStore()
const router = useRouter()

const userList = ref([])
const init = async() => {
    //人員列表
    let payload = {
        "DepartmentID":"2bd3434f-1e95-4fdb-ab29-315921e06868",
        "PYNO":null
    }
    //介紹資訊
    await getUserList(payload).then((res) => {
        // console.log('getUserList',res)
        userList.value = res.data.Result.Users
        //console.log('userList.value',userList.value)
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })
}

init()

const isMobile = computed(() => {
    return store.state.isMobile
})

const toProfile = (item) => {
    router.push({ 
        name: 'profile',
        query:{
            UserID:item.UserID
        }
    })
}


</script>

<style>

</style>