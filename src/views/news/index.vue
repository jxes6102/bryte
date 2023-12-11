<template>
    <div class="flex flex-col justify-center items-center ">
        <div class="w-[90%] md:w-[80%] py-2">
            <template v-if="hasNews">
                <button
                    v-if="isSchool"
                    @click="toNewsEdit" 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded">
                    編輯
                </button>
                <button
                    @click="shareNews" 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded">
                    分享
                </button>
            </template>
            <template v-else-if="isSchool">
                <button
                    @click="addNews" 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded">
                    新增公告
                </button>
            </template>
            
        </div>
        
        <div v-if="hasNews" class="w-[90%] md:w-[80%] flex flex-col justify-center items-center">
            <div class="font-black text-lg md:text-xl">{{newsHtml.Title}}</div>
            <div class="text-[#757575] text-base">{{newsHtml.CreateTime}}</div>
            <div class="w-full" v-html="newsHtml.Content"></div>
        </div>
        <div 
            v-else
            class="w-[95%] rounded-lg bg-slate-50 my-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center gap-y-[10px]">
            <div 
                v-for="(item, index) in newsData" :key="index"
                @click="toNews(item)"
                class="relative w-full h-[auto] md:h-[210px] p-1 border-t-[1px] border-gray-300 text-neutral-800 flex flex-wrap items-center justify-between cursor-pointer">
                <div 
                    v-if="item.PreviewImage" 
                    class="w-[25vw] h-[25vw] md:w-[180px] md:h-[180px] bg-[#808080] bg-cover bg-center bg-no-repeat rounded-lg"
                    >
                    <img :src="item.PreviewImage" alt="">
                </div>
                <div 
                    v-else 
                    class="w-[25vw] h-[25vw] md:w-[180px] md:h-[180px] bg-[#808080] rounded-lg" >
                </div>
                <div class="w-[calc(100%_-_25vw)] md:w-[calc(100%_-_200px)] h-[100%] min-h-[25vw] md:min-h-[100%]  px-1 text-[14px] md:text-2xl flex flex-col items-center justify-between">
                    <div class="w-[100%] text-left text-[#0d6efd] font-semibold grow-[1]">{{item.Title}}</div>
                    <div class="w-[100%] text-left text-[#808080] grow-[9]">{{item.PreviewText}}</div>
                    <div class="w-[100%] h-auto text-[12px] md:text-xl text-[#808080] flex items-center justify-between">
                        <div>{{ "類別:" + item.Category}}</div>
                        <div>{{item.CreateTime}}</div>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script setup>
/*eslint-disable*/
import {getNewsSearch,getNew} from '@/api/api'
import { useStore } from "vuex";

import {ref,computed,watch } from 'vue'
import { useRouter,useRoute } from "vue-router";

const store = useStore()
const router = useRouter()
const route = useRoute()
const hasNews = ref(false)
const newsData = ref([])
const newsHtml = ref("")

const initList = async() => {
    //最新消息列表
    let newsSearchPayload = {
        "DepartmentID":"2bd3434f-1e95-4fdb-ab29-315921e06868",
        "page":0,
        "rowsInPage":2,
        "HideExpired":false
    }
    await getNewsSearch(newsSearchPayload).then((res) => {
        newsData.value = res.data.Result.NewsList
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })
}

const initNew = async() => {
    //指定消息
    let payload = {
        "NewsID":route.query.NewsID
    }
    //介紹資訊
    await getNew(payload).then((res) => {
        newsHtml.value = res.data.Result
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })
}

watch(route, (newVal,oldval) => {
    if(newVal.query.NewsID){
        hasNews.value = true
        initNew()
    }else{
        hasNews.value = false
        initList()
    }
},{ deep: true,immediate: true });

const isMobile = computed(() => {
    return store.state.isMobile
})

const roleID = computed(() => {
    return store.state.roleID
})

const isSchool = computed(() => {
    return (roleID.value == 2) || (roleID.value == 1)
})

const toNewsEdit = () => {
    router.push({ 
        name: 'editNews',
        query:{
            NewsID:route.query.NewsID
        }
    })
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

const toNews = (item) => {
    if(item){
        router.push({ 
            name: 'news',
            query:{
                NewsID:item.NewsID
            }
        })
    }
}

const addNews = () => {
    //console.log('addNews')
    router.push({ name: 'editNews',})
}

</script>

<style>

</style>