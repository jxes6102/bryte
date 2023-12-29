<template>
  <div class="home flex flex-col items-center justify-center">
    <!-- <div class="h-[2222px]"></div> -->
    <!-- <img class="mine-fixed-center" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="w-[95%] h-auto p-1 mine-flex-center" v-if="bannerData.length">
      <swiper 
        class="relative text-black w-[100vw] md:w-[50vw] h-auto rounded-md mine-flex-center"
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
          <div
            class="w-[100vw] md:w-[50vw] bg-cover bg-center bg-no-repeat mine-flex-center"
            :style="{
              'background-image': 'url(' + item.ImageUrl + ')',
              'height': countHeight(item.width,item.height)
            }"
          >
            <!-- <div class="text-3xl bg-[red]">{{ '這是標題:' + (index+1)}}</div> -->
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="w-full my-4 md:my-8">
      <div class="w-full my-2 md:my-4 text-2xl md:text-4xl font-bold text-orange-500 flex flex-wrap items-center justify-center gap-x-[40px]">
        <div>無紙化數位補習班</div>
        <div>就是這樣實現的</div>
      </div>
      <div class="w-full h-auto flex flex-wrap items-center justify-center gap-[4vw] md:gap-[1vw]">
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
      </div>
    </div>
    
    <!-- <div class="w-full h-auto bg-red-400">
        <img src="@/assets/img/logo-2.png" alt="">
    </div> -->
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
        <!-- <div 
          v-if="item.PreviewImage" 
          class="w-[25vw] h-[25vw] md:w-[180px] md:h-[180px] bg-cover bg-center bg-no-repeat rounded-lg"
          :style="{
            'background-image': 'url(' + item.PreviewImage + ')',
          }"
          >
        </div> -->
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
import {getBannerSearch,getNewsSearch} from '@/api/api'
import { useStore } from "vuex";

import {ref,computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from "vue-router";
import 'swiper/css';
import 'swiper/css/navigation';

const store = useStore()
const router = useRouter()
const bannerData = ref([])
const newsData = ref([])

const isMobile = computed(() => {
    return store.state.isMobile
})

const init = async() => {
  //輪播資訊
  await getBannerSearch({
    DepartmentID:"2bd3434f-1e95-4fdb-ab29-315921e06868"
  }).then((res) => {
    bannerData.value = res.data.Result
    
    for(let item of bannerData.value){
      
      const img = new Image();
      img.src = item.ImageUrl;
      
      img.onload = function() {
        item.width = img.width
        item.height = img.height
        //console.log(img.width + 'x' + img.height)
      }
    }
    //console.log('bannerData.value',bannerData.value)
    
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  //最新消息
  let newsSearchPayload = {
    "DepartmentID":"2bd3434f-1e95-4fdb-ab29-315921e06868",
    "page":0,
    "rowsInPage":2,
    "HideExpired":false
  }
  await getNewsSearch(newsSearchPayload).then((res) => {
    newsData.value = res.data.Result.NewsList
    // console.log('newsData.value',newsData.value)
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
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

const countHeight = (w,h) => {
  //pc width 50vw phone width 100vw
  return isMobile.value ? (Math.round(h*100/w))+'vw' : (Math.round(h*100/w)/2)+'vw'
}

const toIntroduction = () => {
  router.push({ path: 'introduction' })
}

const toNews = (item) => {
  if(item){
    router.push({ 
      name: 'news',
      query:{
        NewsID:item.NewsID
      }
    })
  }else{
    router.push({ path: 'news' })
  }
}

</script>

<style>

</style>