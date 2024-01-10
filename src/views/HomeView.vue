<template>
  <div class="home flex flex-col items-center justify-center">
    <!-- <div class="w-full flex flex-wrap items-start justify-start">
      <div class="run text-2xl text-[red] font-bold">test</div>
    </div> -->
    <div class="w-[80%] md:w-[80%] h-auto mt-4 md:mt-6 mine-flex-center" v-if="bannerData.length">
      <swiper 
        class="relative text-black w-[100vw] h-auto rounded-md mine-flex-center"
        :slides-per-view="1"
        :space-between="0"
        :navigation="{
          nextEl: '.next-button',
          prevEl: '.previous-button',
        }"
        :loop='true'
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <!-- <div @click="next" class="next-button absolute w-[30px] h-[30px] md:w-[60px] md:h-[60px] top-1/2 -translate-y-1/2 right-[3%] z-[30] cursor-pointer">
          <el-icon :color="'#a7f2a7'" :size="isMobile ? '30' : '60'"><ArrowRightBold /></el-icon>
        </div>
        <div @click="previous" class="previous-button absolute w-[30px] h-[30px] md:w-[60px] md:h-[60px] top-1/2 -translate-y-1/2 left-[3%] z-[30] cursor-pointer">
          <el-icon :color="'#a7f2a7'" :size="isMobile ? '30' : '60'"><ArrowLeftBold /></el-icon>
        </div> -->
        <swiper-slide
          class="relative w-full h-auto flex justify-center"
          v-for="(item, index) in bannerData" :key="index"
        >
          <!-- <div
            class="w-[100vw] md:w-[50vw] bg-cover bg-center bg-no-repeat mine-flex-center"
            :style="{
              'background-image': 'url(' + item.ImageUrl + ')',
              'height': countHeight(item.width,item.height)
            }"
            
          >
          </div> -->
          <div
            class="w-[80vw] md:w-[80vw] bg-cover bg-center bg-no-repeat mine-flex-center"
            :style="{
              backgroundImage:'url('+item.ImageUrl+ ')',
              'height': countHeight(item.width,item.height,(isMobile ? 80 : 80))
            }"
          >
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="w-full h-auto my-4 md:my-8 flex flex-col items-center justify-center">
      <!-- <div class="w-full my-2 md:my-4 text-2xl md:text-4xl font-bold text-orange-500 flex flex-wrap items-center justify-center gap-x-[40px]">
        <div>無漏創造孩童防護網</div>
        <div>智光園守護校園安全</div>
      </div> -->
      <div class="w-full flex flex-wrap items-center justify-center">
        <img class="w-[90vw] md:w-[70vw]" src="@/assets/img/show-1.png" alt="">
      </div>
      <div class="w-full flex flex-wrap items-center justify-center">
        <div class="w-auto">
          <img class="w-[90vw] md:w-[50vw]" src="@/assets/img/comic-1.png" alt="">
        </div>
      </div>
      <div class="w-[95%] md:mt-4 p-5 md:p-1 grid grid-cols-1 md:grid-cols-5 justify-items-center gap-[5vw] md:gap-[1vw]">
        <div class="w-full p-2 flex flex-col rounded-xl hover:border-4 hover:border-orange-500 transition-all">
          <img class="w-full" src="@/assets/img/comic-2.png" alt="">
          <div class="text-sm md:text-lg font-semibold text-left">當爸媽總是擔心著寶貝們在校生活</div>
        </div>
        <div class="w-full p-2 flex flex-col rounded-xl hover:border-4 hover:border-orange-500 transition-all">
          <img class="w-full" src="@/assets/img/comic-3.png" alt="">
          <div class="text-sm md:text-lg font-semibold text-left">不用再另外下載，只要輕鬆打開智光園Line官方，即可馬上查看</div>
        </div>
        <div class="w-full p-2 flex flex-col rounded-xl hover:border-4 hover:border-orange-500 transition-all">
          <img class="w-full" src="@/assets/img/comic-4.png" alt="">
          <div class="text-sm md:text-lg font-semibold text-left">操作不在像以前一樣要安裝多種APP</div>
        </div>
        <div class="w-full p-2 flex flex-col rounded-xl hover:border-4 hover:border-orange-500 transition-all">
          <img class="w-full" src="@/assets/img/comic-5.png" alt="">
          <div class="text-sm md:text-lg font-semibold text-left">輕鬆點擊加入，寶貝校園查看應有盡有</div>
        </div>
        <div class="w-full p-2 flex flex-col rounded-xl hover:border-4 hover:border-orange-500 transition-all">
          <img class="w-full" src="@/assets/img/comic-6.png" alt="">
          <div class="text-sm md:text-lg font-semibold text-left">加入後，隨時隨地都能知道寶貝們情況，讓孩童安全保護網更強大!!</div>
        </div>
      </div>
      <!-- <div class="w-full h-auto flex flex-wrap items-center justify-center gap-[4vw] md:gap-[1vw]">
        <div class="w-[80vw] h-[80vw] md:w-[15vw] md:h-[15vw] md:max-w-[250px] md:max-h-[250px] p-2 rounded-lg hover:border-4 hover:border-orange-500 transition-all">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/E7vBKfzOzn4?si=3vVp4inVpSeXXH8z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div class="w-[80vw] h-[80vw] md:w-[15vw] md:h-[15vw] md:max-w-[250px] md:max-h-[250px] p-2 rounded-lg hover:border-4 hover:border-orange-500 transition-all">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/YHXkYDZ8kZc?si=cBuynTXaaFS9WEpV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div class="w-[80vw] h-[80vw] md:w-[15vw] md:h-[15vw] md:max-w-[250px] md:max-h-[250px] p-2 rounded-lg hover:border-4 hover:border-orange-500 transition-all">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/Mexj6rFLPsk?si=8406t_3uOHt39sBD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div class="w-[80vw] h-[80vw] md:w-[15vw] md:h-[15vw] md:max-w-[250px] md:max-h-[250px] p-2 rounded-lg hover:border-4 hover:border-orange-500 transition-all">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/hVf0qu8Glqo?si=gHIBlUoFlWJkUKe3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div class="w-[80vw] h-[80vw] md:w-[15vw] md:h-[15vw] md:max-w-[250px] md:max-h-[250px] p-2 rounded-lg hover:border-4 hover:border-orange-500 transition-all">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/jx9iGO_V53c?si=S8SENgX5CAAcWrYW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div> -->
    </div>
    <div class="w-full my-4 md:my-8 flex flex-wrap items-center justify-center">
      <div class="w-full my-2 md:my-4 flex flex-wrap items-center justify-center">
        <div class="w-full text-xl md:text-3xl font-bold text-orange-500">六大特色 一次擁有</div>
        <div class="w-full text-xl md:text-3xl font-bold">最親善使用者的補習班管理系統，讓你一用就欲罷不能</div>
      </div>

      <div class="w-full md:w-[80%] my-2 md:my-4 grid grid-cols-1 md:grid-cols-2 justify-items-center gap-[5vw] md:gap-[1vw]">
        <div class="w-[100%] flex flex-wrap justify-center items-center ">
          <div class="w-[150px] h-[150px] bg-gray-50 flex flex-wrap items-center justify-center">
            <img class="w-full h-full" src="@/assets/img/feature-4.png" alt="">
          </div>
          <div class="w-[95%] md:w-[calc(100%_-_170px)] h-[auto] mx-2 flex flex-col justify-between items-cneter md:items-start">
            <div class="text-2xl text-[#1D2088] font-bold">直覺的操作介面</div>
            <div class="text-lg text-center md:text-left">18年以上的軟體開發經驗，針對補習班開發的全方位管理系統，操作介面簡單易上手</div>
          </div>
        </div>

        <div class="w-[100%] flex flex-wrap justify-center items-center ">
          <div class="w-[150px] h-[150px] bg-gray-50 flex flex-wrap items-center justify-center">
            <img class="w-full h-full" src="@/assets/img/feature-1.png" alt="">
          </div>
          <div class="w-[95%] md:w-[calc(100%_-_170px)] h-[auto] mx-2 flex flex-col justify-between items-cneter md:items-start">
            <div class="text-2xl text-[#1D2088] font-bold">專業形象網站</div>
            <div class="text-lg text-center md:text-left">只屬於你的形象網站，關於補習班的專業內容與孩子們的笑容都有地方可以展示</div>
          </div>
        </div>

        <div class="w-[100%] flex flex-wrap justify-center items-center ">
          <div class="w-[150px] h-[150px] bg-gray-50 flex flex-wrap items-center justify-center">
            <el-icon size="150"><Document /></el-icon>
          </div>
          <div class="w-[95%] md:w-[calc(100%_-_170px)] h-[auto] mx-2 flex flex-col justify-between items-cneter md:items-start">
            <div class="my-1 text-2xl text-[#1D2088] font-bold">功能齊全 All In One</div>
            <div class="my-1 text-lg text-center md:text-left">校務、教務、財務、前台網站功能、APP全部All In One，輕鬆整合所有系統</div>
          </div>
        </div>

        <div class="w-[100%] flex flex-wrap justify-center items-center ">
          <div class="w-[150px] h-[150px] bg-gray-50 flex flex-wrap items-center justify-center">
            <el-icon size="150"><Platform /></el-icon>
          </div>
          <div class="w-[95%] md:w-[calc(100%_-_170px)] h-[auto] mx-2 flex flex-col justify-between items-cneter md:items-start">
            <div class="text-2xl text-[#1D2088] font-bold">完整財務管理系統</div>
            <div class="text-lg text-center md:text-left">學生繳費、教師薪資、雜項費用不再一團亂，一鍵輸出完整報表一目瞭然</div>
          </div>
        </div>

        <div class="w-[100%] flex flex-wrap justify-center items-center ">
          <div class="w-[150px] h-[150px] bg-gray-50 flex flex-wrap items-center justify-center">
            <img class="w-full h-full" src="@/assets/img/feature-3.png" alt="">
          </div>
          <div class="w-[95%] md:w-[calc(100%_-_170px)] h-[auto] mx-2 flex flex-col justify-between items-cneter md:items-start">
            <div class="text-2xl text-[#1D2088] font-bold">擁有專屬APP</div>
            <div class="text-lg text-center md:text-left">只屬於你的手機APP，享受指尖上的管理，一手掌握補習班大小事</div>
          </div>
        </div>

        <div class="w-[100%] flex flex-wrap justify-center items-center ">
          <div class="w-[150px] h-[150px] bg-gray-50 flex flex-wrap items-center justify-center">
            <img class="w-full h-full" src="@/assets/img/feature-2.png" alt="">
          </div>
          <div class="w-[95%] md:w-[calc(100%_-_170px)] h-[auto] mx-2 flex flex-col justify-between items-cneter md:items-start">
            <div class="text-2xl text-[#1D2088] font-bold">系統測試體驗</div>
            <div class="text-lg text-center md:text-left">率先體驗智光I學院，整體系統，有效提升園所辦公效率，並讓孩童受到更安全的保護管理</div>
          </div>
        </div>
      </div>
    </div>
    <div class='w-full h-auto my-4 py-[50px] md:py-[100px] px-[5vw] md:px-[10vw] bg-[#0cb59b] flex flex-wrap items-center justify-center'>
      <div class="w-[50%] md:w-[25%] pb-[20px] md:pb-0 md:border-x-[1px] md:border-r-[0.5px] border-white flex flex-col items-center justify-center">
        <div class=" text-white py-2">
          <span class="text-4xl md:text-6xl px-1">4</span>
          <span class="text-base md:text-lg">所</span>
        </div>
        <div class=" text-white text-base md:text-lg">我們的分校</div>
      </div>
      <div class="w-[50%] md:w-[25%] pb-[20px] md:pb-0 md:border-r-[1px] border-white flex flex-col items-center justify-center">
        <div class=" text-white py-2">
          <span class="text-4xl md:text-6xl px-1">40</span>
          <span class="text-base md:text-lg">年</span>
        </div>
        <div class=" text-white text-base md:text-lg">創立</div>
      </div>
      <div class="w-[50%] md:w-[25%] pt-[20px] md:pt-0 border-t-[1px] md:border-0 border-white flex flex-col items-center justify-center">
        <div class=" text-white py-2">
          <span class="text-4xl md:text-6xl px-1">240</span>
          <span class="text-base md:text-lg">所</span>
        </div>
        <div class=" text-white text-base md:text-lg">學生來源(學校)</div>
      </div>
      <div class="w-[50%] md:w-[25%] pt-[20px] md:pt-0 border-t-[1px] md:border-0 md:border-x-[1px] border-white flex flex-col items-center justify-center">
        <div class=" text-white py-2">
          <span class="text-4xl md:text-6xl px-1">5</span>
          <span class="text-base md:text-lg">縣市</span>
        </div>
        <div class=" text-white text-base md:text-lg">學生分布</div>
      </div>
    </div>
    <div class="w-full h-auto flex flex-col justify-center items-center">
      <div class="w-auto h-auto min-w-[70vw] md:min-w-[40vw] min-h-[50px] md:min-h-[70px] my-4 p-2 md:p-4 text-3xl md:text-6xl text-white font-bold rounded-2xl bg-[#bfcf79] flex flex-col justify-center items-center">
        合作廠商
      </div>

      <!-- <div class="w-[90vw] h-[100vh] md:w-[84vw] md:h-[30vw] bg-cover bg-repeat md:bg-no-repeat bg-center flex flex-wrap justify-center items-center"
        :style="{backgroundImage:`url( ${require('@/assets/img/bg-2.png')} )`}">
        <div class="w-[90%] md:w-[95%] h-[auto] grid grid-cols-4 md:grid-cols-10 justify-items-center gap-[2vw] md:gap-[1vw]" >
          <div v-for="n in 40" :key="n" class="w-[15vw] h-[15vw] md:w-[6vw] md:h-[6vw] bg-red-500 rounded-lg"></div>
        </div>
      </div> -->
    </div>
    <bookView></bookView>
    <div class="w-[90%] md:w-full mt-2 md:mt-0 py-[50px] md:py-[100px] bg-zinc-100 flex flex-wrap justify-center items-center">
      <div class="text-base md:text-2xl text-[#1D2088] font-bold">超過三千家客戶使用補習班管理系統，不試試嗎?</div>
      <div class="mx-4">
        <button class="bg-orange-500 hover:bg-orange-600 text-base md:text-2xl text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-full">立即體驗</button>
      </div>
    </div>
    <tailView></tailView>
    
<!--     
    <div class="w-[95%] rounded-lg bg-slate-50 my-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center">
      <div class="w-full p-1 flex flex-wrap items-center justify-between">    
        <div class="text-lg md:text-3xl leading-tight font-semibold text-neutral-800">單位簡介</div>
        <div class="text-sm md:text-lg text-[#808080] cursor-pointer" @click="toIntroduction">更多</div>
      </div>
      <div class="w-full p-1 text-xl md:text-4xl text-left font-bold text-neutral-800">
        訊息e點通APP功能特色產品特色:
      </div>
      <div class="w-full p-1 text-base md:text-2xl text-left text-neutral-800">
        結合@LINE公眾號的廣告及優惠卷使用特色,並借助訊息e點通APP快速吸收粉絲客戶，讓產品曝光度倍增效果。
      </div>
    </div>
    <div class="w-[95%] rounded-lg bg-slate-50 my-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center gap-y-[10px]">
      <div class="w-full p-1 flex flex-wrap items-center justify-between">    
        <div class="text-lg md:text-3xl leading-tight font-semibold text-neutral-800">最新訊息</div>
        <div class="text-sm md:text-lg text-[#808080] cursor-pointer" @click="toNews()">更多</div>
      </div>
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
    </div> -->
    
  </div>
</template>

<script setup>
/*eslint-disable*/
import {getBannerSearch,getNewsSearch} from '@/api/api'
import { useStore } from "vuex";

import {ref,computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from "vue-router";
import 'swiper/css';
import 'swiper/css/navigation';
import tailView from "@/components/tailView.vue"
import bookView from "@/components/bookView.vue"

const store = useStore()
const router = useRouter()
const bannerData = ref([])
const newsData = ref([])

const isMobile = computed(() => {
    return store.state.isMobile
})

const init = async() => {
  //輪播資訊
  // await getBannerSearch({
  //   DepartmentID:"2bd3434f-1e95-4fdb-ab29-315921e06868"
  // }).then((res) => {
  //   bannerData.value = res.data.Result
    
  //   for(let item of bannerData.value){
      
  //     const img = new Image();
  //     img.src = item.ImageUrl;
      
  //     img.onload = function() {
  //       item.width = img.width
  //       item.height = img.height
  //       //console.log(img.width + 'x' + img.height)
  //     }
  //   }
  //   //console.log('bannerData.value',bannerData.value)
    
  // })
  // .catch((error) => {
  //   // handle error
  //   console.log(error);
  // })
    bannerData.value = [
      {ImageUrl:require('@/assets/img/carousel-1.jpg')},
      {ImageUrl:require('@/assets/img/carousel-1.jpg')}
    ]
    for(let item of bannerData.value){
      const img = new Image();
      img.src = item.ImageUrl;
      img.onload = function() {
        item.width = img.width
        item.height = img.height
      }
    }
    // //最新消息
    // let newsSearchPayload = {
    //   "DepartmentID":"2bd3434f-1e95-4fdb-ab29-315921e06868",
    //   "page":0,
    //   "rowsInPage":2,
    //   "HideExpired":false
    // }
    // await getNewsSearch(newsSearchPayload).then((res) => {
    //   newsData.value = res.data.Result.NewsList
    //   // console.log('newsData.value',newsData.value)
    // })
    // .catch((error) => {
    //   // handle error
    //   console.log(error);
    // })
}

init()

let swiperItem = null
const onSwiper = (element) => {
  // console.log('element',element)
  swiperItem = element;
};

const onSlideChange = () => {
  // console.log('slide change');
};

const countHeight = (w,h,width) => {
  //pc width 50vw phone width 100vw
  return (Math.round(h*width/w))+'vw'
  // return isMobile.value ? (Math.round(h*100/w))+'vw' : (Math.round(h*100/w)/2)+'vw'
}

// const toIntroduction = () => {
//   router.push({ path: 'introduction' })
// }

// const toNews = (item) => {
//   if(item){
//     router.push({ 
//       name: 'news',
//       query:{
//         NewsID:item.NewsID
//       }
//     })
//   }else{
//     router.push({ path: 'news' })
//   }
// }

</script>

<style lang="scss" scoped>
/*
.run {
  position: relative;
  animation: Marquee 6s linear 2s infinite;
}

@keyframes Marquee {
  0%   {transform: translateX(0vw);}
  25%  {transform: translateX(25vw);}
  50%  {transform: translateX(50vw);}
  75%  {transform: translateX(75vw);}
  100% {transform: translateX(100vw);}
}
*/
</style>
