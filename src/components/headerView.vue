<template>
    <div 
        class="transition-all sticky w-full h-[8vh] top-0 left-0 z-10 flex flex-wrap justify-around items-center bg-[#008AFF]"
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
            <div v-if="isSchool" @click="tocontactSet" class="px-1">
                <el-icon size="25" color="#fff"><Setting /></el-icon>
            </div>
            <div v-if="isSchool" @click="toScan" class="px-1">
                <el-icon size="25" color="#fff"><Stamp /></el-icon>
            </div>
        </div>
        <div 
            class="relative w-[auto] h-[8vh] text-white text-xl md:text-3xl flex flex-wrap justify-center items-center font-extrabold"
            @click="tohome"
            >
            <div v-if="headerTitle == '智光智慧園管理平台'">
                <img class="h-[8vh]" src="@/assets/img/logo-3.png" alt="">
            </div>
            <div v-else>{{ headerTitle }}</div>
        </div>
        <div 
            v-if="!isMobile" 
            class="relative w-[auto] h-[8vh] px-4 mine-flex-center"
        >
            <div @click="tolatest" class="relative w-[auto] h-[8vh] px-4 mine-flex-center text-white text-xl font-bold cursor-pointer hover:scale-[1.1] transition-all">最新消息</div>
            <div
                class="relative w-[auto] h-[8vh] px-4 mine-flex-center text-white text-xl font-bold cursor-pointer hover:scale-[1.1] transition-all" 
                v-for="(item, index) in linkData" :key="index"
                @click="toLink(item.url)">
                {{item.text}}
                <div v-if="item?.isAlert" class="absolute top-[5px] right-[2px] w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-white text-xs bg-[#FF0000] rounded-full flex flex-wrap justify-center items-center">9+</div>
            </div>
            <div id="primary_nav_wrap" class="text-white text-xl font-bold cursor-pointer hover:scale-[1.1] transition-all">
                <ul>
                    <li @click.stop="toCenter">{{ statement }}
                        <ul v-if="isSchool">
                            <li @click.stop="tocontactSet">設定</li>
                        </ul>
                    </li>
                </ul>
            </div>
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

const roleID = computed(() => {
    return store.state.roleID
})

const statement = computed(() => {
    if(roleID.value == 1){
        return '園長:施O漢'
    } else if(roleID.value == 2) {
        return '導師:羅O空'
    } else if(roleID.value == 3) {
        return '家長:孔O榮'
    } 
})

const isSchool = computed(() => {
    return (roleID.value == 2) || (roleID.value == 1)
})

const setStatus = computed(() => {
    return ((route.path == '/contact') || (route.path == '/contactDetail'))  && isMobile.value
})

const headerTitle = ref('智光智慧園管理平台')
watch(route, (newVal,oldval) => {

    linkData.value = [
        {text:"聯絡簿",url:'/contact'},
        {text:"訊息通知",url:'/messageView',isAlert:true},
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
    }else if(newVal.path == '/contactDetail'){
        headerTitle.value = '電子聯絡簿'
    }else if(newVal.path == '/contactSet'){
        headerTitle.value = '設定'
    }else if(newVal.path == '/contactChart'){
        headerTitle.value = '聯絡簿統計'
    }else if(newVal.path == '/medicationList'){
        headerTitle.value = '餵藥'
    }else if(newVal.path == '/signView'){
        headerTitle.value = '聯絡簿簽名'
    }else if(newVal.path == '/transmitView'){
        headerTitle.value = '當日通知單'
    }else if(newVal.path == '/learnSituation'){
        headerTitle.value = '學習狀況'
    }else if(newVal.path == '/tipView'){
        if(isSchool.value){
            headerTitle.value = '編輯班級叮嚀'
        }else{
            headerTitle.value = '班級叮嚀'
        }
    }else if(newVal.path == '/temperatureView'){
        headerTitle.value = '體溫檢查'
    }else if(newVal.path == '/chatView'){
        headerTitle.value = '留言版'
    }else if(newVal.path == '/chatroom'){
        headerTitle.value = '留言版'
    }else if(newVal.path == '/messageView'){
        headerTitle.value = '訊息通知'
    }else if(newVal.path == '/qrcodeView'){
        headerTitle.value = '掃描'
    }else if(newVal.path == '/recordView'){
        headerTitle.value = '簽到記錄'
    }else if(newVal.path == '/latestNewsView'){
        headerTitle.value = '最新消息'
    }else{
        headerTitle.value = '智光智慧園管理平台'
    }
    
});

const tohome = () => {
  router.push({ path: '/' })
}

const linkData = ref([
    {text:"聯絡簿",url:'/contact'},
    {text:"訊息通知",url:'/messageView',isAlert:true},
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

const toCenter = () => {
    router.push({ path: '/center' })
}

const toScan = () => {
    router.push({ path: '/qrcodeView' })
}

const tolatest = () =>  {
    router.push({ path: '/latestNewsView' })
}

</script>

<style lang="scss" scoped>
    .flex-grow {
        flex-grow: 1;
    }
    #primary_nav_wrap
    {
      width: auto;
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
        background:#008AFF
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
        background:#008AFF;
        padding:0
    }

    #primary_nav_wrap ul ul li
    {
        float:none;
        width:100px;
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