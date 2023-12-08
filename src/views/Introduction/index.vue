<template>
    <div class="introduction flex flex-col justify-center items-center ">
        <div class="w-[90%] md:w-[80%] py-2">
            <button
                v-if="isSchool"
                @click="toIntroductionEdit" 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded">
                編輯
            </button>
            <button
                @click="shareNews" 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded">
                分享
            </button>
        </div>
        <div class="w-[90%] md:w-[80%]" v-html="introductionData"></div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import {getIntroduction} from '@/api/api'
import { useStore } from "vuex";

import {ref,computed } from 'vue'
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()
const introductionData = ref([])

const isMobile = computed(() => {
    return store.state.isMobile
})

const roleID = computed(() => {
    return store.state.roleID
})

const isSchool = computed(() => {
    return (roleID.value == 2) || (roleID.value == 1)
})

const init = async() => {
    //介紹資訊
    await getIntroduction({
        DepartmentID:"2bd3434f-1e95-4fdb-ab29-315921e06868"
    }).then((res) => {
        introductionData.value = res.data.Result.Introduction
        // console.log('introductionData.value',introductionData.value)
        
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })

}

init()

const toIntroductionEdit = () => {
  router.push({ path: 'editIntroduction' })
}

const shareNews = () => {
    if (navigator.share) {
        //let NewsID = result.NewsID;
        // let InvitationCode = localStorage.getItem("InvitationCode");
        
        // if (InvitationCode != null && InvitationCode != "") {
        //     shareUrl += "&InvitationCode=" + InvitationCode;
        // }
        let shareUrl = "https://" + location.host
        let shareData = {
            title: '分享測試',
            url: shareUrl
        };
        
        navigator.share(shareData)
        .then(() => console.log('成功！'))
        .catch((error) => console.log('發生錯誤', error));
    }
    
};

</script>

<style>

</style>