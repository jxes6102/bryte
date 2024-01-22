<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col md:flex-row md:flex-wrap justify-center items-center ">
        <div class="w-[95%] md:w-[25%] h-[100%] md:h-[70%] rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-row md:flex-col items-center justify-center ">
            <div class="w-auto p-2 grow flex flex-col items-end md:items-center justify-center md:justify-end">
                <div 
                    v-if="userProfile?.PictureUrl" 
                    class="w-[25vw] h-[25vw] md:w-[180px] md:h-[180px] bg-[#808080] bg-cover bg-center bg-no-repeat rounded-lg"
                    >
                    <img :src="userProfile.PictureUrl" alt="">
                </div>
                <div 
                    v-else 
                    class="w-[25vw] h-[25vw] md:w-[180px] md:h-[180px] bg-[#808080] rounded-lg" >
                </div>
            </div>
            <div class="w-auto p-2 text-left md:text-center grow flex flex-col items-center justify-center md:justify-start">
                <div class="w-full text-[12px] md:text-base">{{userProfile?.GroupName}}</div>
                <div class="w-full text-[12px] md:text-base">{{userProfile?.DepartmentName}}</div>
                <div class="w-full text-xl md:text-2xl">{{userProfile?.UserName}}</div>
            </div>
        </div>
        <div class="w-[95%] md:w-[25%] h-[100%] md:h-[70%] rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="text-2xl md:text-3xl my-2 md:my-3 font-bold text-gray-900">{{userMenu?.Header}}</div>
            <div
                class="text-[#0d6efd] text-lg md:text-2xl my-1 md:my-2 cursor-pointer"
                @click="toLink(item)"
                v-for="(item, index) in userMenu?.Menus" :key="index">
                {{item.Name}}
            </div>
            <div @click="openAnnounce" class="text-[#0d6efd] text-lg md:text-2xl my-1 md:my-2 cursor-pointer">家長接送</div>
            <div @click="logout" class="text-[#dc3545] my-1 md:my-2 text-lg md:text-2xl cursor-pointer">登出</div>
        </div>
        <div class="w-[95%] flex flex-col md:flex-row items-center justify-center">
            <div class="mx-1">身分切換:</div>
            <el-radio-group
                class=""
                v-model="roleID" @change="changeRole">
                <el-radio :label="1">園長</el-radio>
                <el-radio :label="2">導師</el-radio>
                <el-radio :label="3">家長</el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { getUserMenu,getProfile,testLogout } from '@/api/api'
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()

const userMenu = ref(null)
const userProfile = ref(null)
const init = async() => {
    // let payload = {
    //     UserID:"50ceb08b-9174-453f-9bfc-2b57cb4f86be"
    // }
    // await getUserMenu(payload).then((res) => {
    //     userMenu.value = res.data.Result[0]
    //     // console.log('userMenu.value',userMenu.value)
    // })
    // .catch((error) => {
    //     // handle error
    //     console.log(error);
    // })

    // await getProfile(payload).then((res) => {
    //     userProfile.value = res.data.Result
    //     // console.log('userProfile.value',userProfile.value)
    // })
    // .catch((error) => {
    //     // handle error
    //     console.log(error);
    // })
}

init()

const toLink = (item) => {
    // console.log('toLink',item.Identifier)
    if(item.Identifier == "News"){
        router.push({ path: 'news' })
    }else if(item.Identifier == "Profile"){
        router.push({ path: 'profile' })
    }else if(item.Identifier == "User"){
        router.push({ path: 'user' })
    }else if(item.Identifier == "Course"){
        router.push({ path: 'course' })
    }
}

const roleID = computed({
  get: () => store.state.roleID,
  set: (val) => {
    return val
  },
})

const changeRole = (value) => {
    //console.log('value',value)
    store.commit('setRole',value)
}

const logout = async() => {
    await testLogout().then((res) => {
        console.log('res',res.data)
        if(res.data.status){
            store.commit('clearToken')
            router.push({ path: '/' })
        }else{
            console.log(res.data.message)
        }
    })
}

const openAnnounce = () => {
    store.commit('changeAnnounceStatus',true)
}

</script>

<style>

</style>