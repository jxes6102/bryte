<template>
    <div 
        class="transition-all sticky w-full top-0 left-0 z-10 flex flex-wrap justify-around items-center bg-[#008AFF]"
    >
        <div 
            v-show="route.path !== '/'"
            @click="toback"
            class="absolute w-[auto] h-[8vh] top-[0px] left-[5px] md:left-[20px] mine-flex-center cursor-pointer">
            <el-icon :size="isMobile ? '25' : '40'" color="#fff"><Back /></el-icon>
        </div>
        <div 
            v-if="setStatus"
            class="absolute w-[auto] h-[8vh] top-[0px] right-[5px] mine-flex-center">
            <div @click="tocontactSet" class="px-1">
                <el-icon size="25" color="#fff"><Setting /></el-icon>
            </div>
            <div @click="toDownload" class="px-1">
                <el-icon size="25" color="#fff"><Download /></el-icon>
            </div>
        </div>
        <div 
          class="relative w-[auto] h-[8vh] text-white text-xl md:text-3xl flex flex-wrap justify-center items-center font-extrabold"
          @click="tohome"
          >{{ headerTitle }}
        </div>
        <div 
            v-if="!isMobile" 
            class="relative w-[auto] h-[8vh] "
        >
            <nav id="primary_nav_wrap" class="relative w-full">
                <ul class="relative w-full">
                  <li 
                    v-for="(item, index) in linkData" :key="index"
                    class="w-[auto] h-[8vh] px-4 mine-flex-center text-white text-xl font-bold cursor-pointer hover:scale-[1.1] transition-all"
                    @click="toLink(item.url)"
                  >{{item.text}}</li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed,watch } from "vue";
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";

const store = useStore()
const router = useRouter()
const route = useRoute()

const isMobile = computed(() => {
    return store.state.isMobile
})

const setStatus = computed(() => {
    return ((route.path == '/contact') || (route.path == '/contactDetail'))  && isMobile.value
})

const headerTitle = ref('A機構家校e點通平台')
watch(route, (newVal,oldval) => {

    linkData.value = [
        {text:"聯絡簿",url:'/contact'},
        {text:"訊息中心",url:'/'},
        {text:"個人中心",url:'/center'},
    ]

    if(newVal.path == '/center'){
        headerTitle.value = '個人中心'
    }else if(newVal.path == '/introduction'){
        headerTitle.value = '單位介紹'
    }else if(newVal.path == '/editIntroduction'){
        headerTitle.value = '編輯單位介紹'
    }else if(newVal.path == '/profile'){
        if(newVal.query?.UserID){
            headerTitle.value = '學員檔案'
        }else{
            headerTitle.value = '個人檔案'
        }
    }else if(newVal.path == '/user'){
        headerTitle.value = '用戶管理'
    }else if(newVal.path == '/news'){
        if(newVal.query?.NewsID){
            headerTitle.value = '公告詳情'
        }else{
            headerTitle.value = '公告列表'
        }
    }else if(newVal.path == '/editNews'){
        headerTitle.value = '編輯公告'
    }else if(newVal.path == '/course'){
        headerTitle.value = '課程管理'
    }else if(newVal.path == '/courseDetail'){
        headerTitle.value = newVal.query?.CLSNO
    }else if(newVal.path == '/signRecord'){
        headerTitle.value = '簽到記錄'
    }else if(newVal.path == '/contact'){
        headerTitle.value = '全校電子聯絡簿'
        linkData.value = [
            {text:"設定",url:'/contactSet'},
            {text:"下載專區",url:'/contactDownload'},
        ]
    }else if(newVal.path == '/contactDetail'){
        headerTitle.value = '電子聯絡簿'
        linkData.value = [
            {text:"設定",url:'/contactSet'},
            {text:"下載專區",url:'/contactDownload'},
        ]
    }else if(newVal.path == '/contactSet'){
        headerTitle.value = '設定'
        linkData.value = []
    }else if(newVal.path == '/contactChart'){
        headerTitle.value = '聯絡簿統計'
        linkData.value = []
    }else if(newVal.path == '/medicationList'){
        headerTitle.value = '餵藥'
        linkData.value = []
    }else if(newVal.path == '/signView'){
        headerTitle.value = '聯絡簿簽名'
        linkData.value = []
    }else if(newVal.path == '/transmitView'){
        headerTitle.value = '今日發回'
        linkData.value = []
    }else if(newVal.path == '/learnSituation'){
        headerTitle.value = '學習狀況'
        linkData.value = []
    }else if(newVal.path == '/contactDownload'){
        headerTitle.value = '下載專區'
        linkData.value = []
    }else if(newVal.path == '/tipView'){
        headerTitle.value = '編輯愛的叮嚀'
        linkData.value = []
    }else if(newVal.path == '/temperatureView'){
        headerTitle.value = '體溫量測'
        linkData.value = []
    }else if(newVal.path == '/chatView'){
        headerTitle.value = '家長留言'
        linkData.value = []
    }else if(newVal.path == '/chatroom'){
        headerTitle.value = '家長留言'
        linkData.value = []
    }else{
        headerTitle.value = 'A機構家校e點通平台'
    }
    
});

const tohome = () => {
  router.push({ path: '/' })
}

const linkData = ref([
    {text:"聯絡簿",url:'/contact'},
    {text:"訊息中心",url:'/'},
    {text:"個人中心",url:'/center'},
])

const toLink = (url) => {
    router.push({ path: url })
}

const toback = () => {
    router.go(-1)
}

const tocontactSet = () =>{
    router.push({ path: '/contactSet' })
}

const toDownload = () => {
    router.push({ path: '/contactDownload' })
}

</script>

<style lang="scss" scoped>
    .flex-grow {
        flex-grow: 1;
    }
    #primary_nav_wrap
    {
      width: 100%;
      height: auto;
    }

    #primary_nav_wrap ul
    {
        list-style:none;
        position:relative;
        float:left;
        margin:0;
        padding:0
    }

    //#primary_nav_wrap ul a
    //{
    //    display:block;
    //    color:#333;
    //    text-decoration:none;
    //    font-weight:700;
    //    font-size:12px;
    //    line-height:32px;
    //    padding:0 15px;
    //    font-family:"HelveticaNeue","Helvetica Neue",Helvetica,Arial,sans-serif
    //}

    #primary_nav_wrap ul li
    {
        position:relative;
        float:left;
        //margin:0;
        //padding:0
    }

    #primary_nav_wrap ul li.current-menu-item
    {
        background:#ddd
    }

    //#primary_nav_wrap ul li:hover
    //{
    //    background:#b0afaf
    //}

    #primary_nav_wrap ul ul
    {
        display:none;
        position:absolute;
        top:100%;
        left:0;
        background:#fff;
        padding:0
    }

    #primary_nav_wrap ul ul li
    {
        float:none;
        width:200px
    }

    //#primary_nav_wrap ul ul a
    //{
    //    line-height:120%;
    //    padding:10px 15px
    //}

    #primary_nav_wrap ul ul ul
    {
        top:0;
        left:100%
    }

    #primary_nav_wrap ul li:hover > ul
    {
        display:block
    }
</style>