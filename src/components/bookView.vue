<template>
    <div class="w-full flex flex-wrap items-center justify-center">
        <!-- width:60vw;
    height: 42vw; -->
        <div class="book-bg w-[80vw] h-[56vw] md:w-[60vw] md:h-[42vw]" @click="turning">
            <Transition enter-active-class="toLeft">
                <div 
                    v-if="leftAnimationStatus"
                    class="book-cover-left">
                </div>
            </Transition>
            <Transition enter-active-class="toRight">
                <div 
                    v-if="rightAnimationStatus"
                    class="book-cover-right">
                </div>
            </Transition>
        </div>
    </div>
    <div class="w-full flex flex-wrap items-center justify-center gap-[50px]">
        <button @click="toLeft" type="button">往左翻</button>
        <button @click="toRight" type="button">往右翻</button>
    </div>
    <!-- <div class="w-full flex flex-wrap items-center justify-center">
        <button @click="addTime">add</button>
    </div> -->
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import {ref,computed,onBeforeUnmount } from 'vue'
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()


const bookData = ref([])
const rightAnimationStatus = ref(false)
const toRight = () => {
    if(rightAnimationStatus.value || leftAnimationStatus.value){
        return false
    }
    rightAnimationStatus.value = true
    setTimeout(() => {
        rightAnimationStatus.value = false
    }, 1000);
}
const leftAnimationStatus = ref(false)
const toLeft = () => {
    if(leftAnimationStatus.value || rightAnimationStatus.value){
        return false
    }
    leftAnimationStatus.value = true
    setTimeout(() => {
        leftAnimationStatus.value = false
    }, 1000);
}

const turning = (event) => {
    console.log('event',event)
}


// /*
// time計時記時間
// timer計時記時器物件
// showKey當前展示品指標
// showItem展示品陣列
// */
// let time = 1000
// let timer = null
// let showKey = 0
// let showItem = ['a','b','c','d','e','f']
// //建立計時器
// const createTimer = () => {
//     timer = setInterval(( () => {
//         console.log('==================================')
//         console.log('test=>'+'時間:'+time+'顯示:'+showItem[showKey])

//         if(showKey<showItem.length-1){
//             showKey++
//         }else{
//             showKey = 0
//         }
        
//     } ), time);
// }
// //清除計時器
// const clearTimer = () => {
//     clearInterval(timer)   
// }
// //增加時間
// const addTime = () => {
//     time+=3000
//     clearInterval(timer)  
//     createTimer()
// }
// //初始化計時器
// createTimer()
// //換頁時需清除
// onBeforeUnmount(() => {
//     clearTimer()
// })

</script>

<style lang="scss" scoped>
  
.book-bg{
    position:relative;
    background:url('@/assets/img/book-1.png') no-repeat;
    background-size: contain;
    transform-style:preserve-3d;
    /*控制 3d 透視的景深 數字越小則拉伸的狀況越誇張*/
    perspective:600px;
}

.book-cover-right{
    position:absolute;
    background:url('@/assets/img/book-right.png') no-repeat;
    background-size: contain;
    left:50%;
    width:50%;
    height:100%;
    /*將起始點設定在書背上*/
    transform-origin:0 50%;
    transition:all .5s ease ;
}
  
.toRight {
    transform: rotateY(-180deg);
}

.book-cover-left{
    position:absolute;
    background:url('@/assets/img/book-left.png') no-repeat;
    background-size: contain;
    right:50%;
    width:50%;
    height:100%;
    /*將起始點設定在書背上*/
    transform-origin:100% 50%;
    transition:all .5s ease ;
}

.toLeft {
    transform: rotateY(180deg);
}

/*
  .book-bg{
    position:relative;
    width:200px;
    height:192px;
    background:url('https://image.ibb.co/mCjO00/400x577page.jpg') no-repeat;
    background-size: contain;
    transform-style:preserve-3d;
    perspective:600px;
  }
  
  .book-cover{
    position:absolute;
    background:url('https://image.ibb.co/irG0DL/book-cover.jpg') no-repeat;
    background-size: contain;
    width:100%;
    height:100%;
    transform-origin:0 50%;
    transition:all .3s ease ;
  }
  
  .book-bg:hover .book-cover{
    transform: rotateY(-60deg);
  }
*/
</style>
  