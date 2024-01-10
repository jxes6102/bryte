<template>
    <div class="flex flex-col items-center justify-center">
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
import {getNewsSearch} from '@/api/api'
import { useStore } from "vuex";
import {ref,computed } from 'vue'
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()
const newsData = ref([])

const isMobile = computed(() => {
    return store.state.isMobile
})

const init = async() => {
    // //最新消息
    // let newsSearchPayload = {
    //     "DepartmentID":"2bd3434f-1e95-4fdb-ab29-315921e06868",
    //     "page":0,
    //     "rowsInPage":2,
    //     "HideExpired":false
    // }
    // await getNewsSearch(newsSearchPayload).then((res) => {
    //     newsData.value = res.data.Result.NewsList
    //     // console.log('newsData.value',newsData.value)
    // })
    // .catch((error) => {
    //     // handle error
    //     console.log(error);
    // })
}

init()

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
