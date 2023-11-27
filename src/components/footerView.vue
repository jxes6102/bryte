<template>
    <div v-if="isMobile"
        class="transition-all fixed h-auto w-full py-1 bottom-0 left-0 z-10 flex flex-wrap justify-around items-center bg-[#f9f7f0]"
    >
        <div 
          class="relative w-[25%] h-[8vh] md:w-[25%] md:h-[8vh] text-xs flex flex-col justify-center items-center font-extrabold cursor-pointer"
          @click="tohome()"
          >
          <el-icon :size="25"><HomeFilled /></el-icon>
          首頁
        </div>
        <div 
          class="relative w-[25%] h-[8vh] md:w-[25%] md:h-[8vh] text-xs flex flex-col justify-center items-center font-extrabold cursor-pointer"
          @click="tocontact()"
          >
          <el-icon :size="25"><Document /></el-icon>
          聯絡簿
        </div>
        <div 
          class="relative w-[25%] h-[8vh] md:w-[25%] md:h-[8vh] text-xs flex flex-col justify-center items-center font-extrabold cursor-pointer"
          @click="tohome()"
          >
          <el-icon :size="25"><Message /></el-icon>
          訊息中心
        </div>
        <div 
          class="relative w-[25%] h-[8vh] md:w-[25%] md:h-[8vh] text-xs flex flex-col justify-center items-center font-extrabold cursor-pointer"
          @click="tocenter()"
          >
          <el-icon :size="25"><User /></el-icon>
          個人中心
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

const props = defineProps({
    heightStatus: {
        type: Boolean,
        default: true
    }
})

const isMobile = computed(() => {
    return store.state.isMobile
})

// const toLink = (val) => {
//   router.push({ path: menuList.value[val].url })
//   store.commit('setMenu',false)
// }

const tohome = () => {
  router.push({ path: '/' })
}

const tocenter = () => {
  router.push({ path: '/center' })
}

const tocontact = () => {
    router.push({ path: '/contact' })
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
        margin:0;
        padding:0
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