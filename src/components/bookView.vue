<template>
    <div class="w-full my-2 flex flex-wrap items-center justify-center">
        <div ref="bookItem" class="book-bg w-[80vw] h-[56vw] md:w-[70vw] md:h-[49vw] flex flex-wrap items-center justify-center">
            <Transition
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
                >
                <div v-if="bookAnimationStatus" class="w-[100%] h-[90%] flex flex-wrap items-center justify-center">
                    <div @click="toLeft" class="w-[50%] h-[100%] p-2 grid grid-rows-6 grid-cols-4 justify-items-center gap-[2vw] md:gap-[1vw]" >
                        <!-- <div v-for="(item,index) in bookShowLeft" :key="index" class="w-[5vw] h-[5vw] md:w-[5vw] md:h-[5vw] bg-red-500 rounded-sm md:rounded-lg flex flex-wrap items-center justify-center">
                            <div class="text-xs">{{item}}</div>
                        </div> -->
                    </div>
                    <div @click="toRight" class="w-[50%] h-[100%] p-2 grid grid-rows-6 grid-cols-4 justify-items-center gap-[2vw] md:gap-[1vw]" >
                        <!-- <div v-for="(item,index) in bookShowRight" :key="index" class="w-[5vw] h-[5vw] md:w-[5vw] md:h-[5vw] bg-red-500 rounded-sm md:rounded-lg flex flex-wrap items-center justify-center">
                            <div class="text-xs">{{item}}</div>
                        </div> -->
                    </div>
                </div>
            </Transition>
            
            <Transition enter-active-class="toLeft">
                <div 
                    v-if="leftAnimationStatus"
                    class="book-cover-left flex flex-wrap items-center justify-center">
                    <!-- <div class="w-[100%] h-[90%] p-2 grid grid-rows-6 grid-cols-4 justify-items-center gap-[2vw] md:gap-[1vw]">
                    </div> -->
                </div>
            </Transition>
            <Transition enter-active-class="toRight">
                <div 
                    v-if="rightAnimationStatus"
                    class="book-cover-right flex flex-wrap items-center justify-center">
                    <!-- <div class="w-[100%] h-[90%] p-2 grid grid-rows-6 grid-cols-4 justify-items-center gap-[2vw] md:gap-[1vw]">
                    </div> -->
                </div>
            </Transition>
        </div>
    </div>
    <!-- <div class="w-full flex flex-wrap items-center justify-center gap-[50px]">
        <button @click="toLeft" type="button">往左翻</button>
        <button @click="toRight" type="button">往右翻</button>
    </div> -->
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
for(let i = 0;i<=150;i++){
    bookData.value.push(i)
}
const bookKey = ref(0)
const bookShow = computed(() => {
    return bookData.value.slice((bookKey.value)*48,(bookKey.value+1)*48)
})
const bookShowLeft = computed(() => {
    return bookShow.value.slice(0,24)
})
const bookShowRight = computed(() => {
    return bookShow.value.slice(24,48)
})
const bookAnimationStatus = ref(true)
const rightAnimationStatus = ref(false)
const toRight = () => {
    if(rightAnimationStatus.value || leftAnimationStatus.value || (bookKey.value >= (bookData.value.length/48-1))){
        return false
    }
    
    bookKey.value++
    rightAnimationStatus.value = true
    bookAnimationStatus.value = false
    // console.log('toRight',bookKey.value)
    // console.log('bookShowRight',bookShow.value)
    setTimeout(() => {
        rightAnimationStatus.value = false
        bookAnimationStatus.value = true
    }, 1000);
}
const leftAnimationStatus = ref(false)
const toLeft = () => {
    if(leftAnimationStatus.value || rightAnimationStatus.value || (bookKey.value == 0)){
        return false
    }
    
    bookKey.value--
    leftAnimationStatus.value = true
    bookAnimationStatus.value = false
    // console.log('toLeft',bookKey.value)
    // console.log('bookShowLeft',bookShow.value)
    setTimeout(() => {
        leftAnimationStatus.value = false
        bookAnimationStatus.value = true
    }, 1000);
}

// const bookItem = ref(null)
// let bookStatus = false
// const turning = (event) => {
//     if(bookStatus){
//         return false
//     }
//     bookStatus = true

//     let isLeft = event.offsetX <= (bookItem.value.offsetWidth/2)

//     if(isLeft){
//         toLeft()
//     }else{
//         toRight()
//     }

//     setTimeout(() => {
//         bookStatus = false
//     }, 1500);

// }

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
    top:0;
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
    top:0;
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
  