<template>
    <div class="w-full bg-[#0db59c] flex flex-col justify-center items-center">
      <div class="w-[auto] py-10 grid grid-rows-3 md:grid-rows-1 grid-cols-[repeat(1,minmax(0,250px))] md:grid-cols-[repeat(3,minmax(0,250px))] justify-items-center gap-[5vh] md:gap-[4vw]">
        <div class="w-full h-auto flex flex-col justify-start items-center">
            <div class="w-full my-1 text-base text-white font-semibold text-left">網站導覽</div>
            <div class="w-full my-1 text-white flex flex-wrap justify-start items-center">
                <div class="w-1/2 text-lg text-left underline underline-offset-2">關於我們</div>
                <div class="w-1/2 text-lg text-left underline underline-offset-2">功能介紹</div>
                <div class="w-1/2 text-lg text-left underline underline-offset-2">價格方案</div>
                <div class="w-1/2 text-lg text-left underline underline-offset-2">聯絡我們</div>
                <div class="w-1/2 text-lg text-left underline underline-offset-2">補教系統專欄</div>
            </div>
        </div>
        <div class="w-full h-auto flex flex-col justify-start items-center">
            <div class="w-full my-1 text-base text-white font-semibold text-left">公司資訊</div>
            <div class="w-full text-lg text-left text-white ">名稱: OOXX公司</div>
            <div class="w-full text-lg text-left text-white ">電話: 04-2XXX-XXXX</div>
            <div class="w-full text-lg text-left text-white ">e-mail: OOXX@gamil.com</div>
        </div>
        <div class="w-full h-auto flex flex-col justify-start items-center">
            <div class="w-full my-1 text-base text-white font-semibold text-left">關注我們</div>
            <div class="w-full my-1 flex flex-wrap justify-start items-center">
                <img class="w-[40px] h-[40px] mx-1" :src="require('@/assets/img/fb-1.png')" alt="">
                <img class="w-[40px] h-[40px] mx-1" :src="require('@/assets/img/ig-1.png')" alt="">
                <img class="w-[40px] h-[40px] mx-1" :src="require('@/assets/img/line-1.png')" alt="">
                <img class="w-[40px] h-[40px] mx-1" :src="require('@/assets/img/youtube-2.png')" alt="">
            </div>
        </div>
      </div>
      <div class="w-full bg-black text-white text-sm flex flex-wrap justify-start items-start">
        <div class="ml-[20vw] my-1">Powered by OOXX</div>
      </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()

const isMobile = computed(() => {
    return store.state.isMobile
})

</script>

<style lang="scss" scoped>
</style>