<template>
    <div 
        class="transition-all sticky w-full top-0 left-0 z-10 flex flex-wrap justify-around items-center bg-[#008AFF]"
    >
        <div 
          class="relative w-[auto] h-[8vh] text-white text-xl md:text-3xl flex flex-wrap justify-center items-center font-extrabold"
          @click="tohome()"
          >A機構家校e點通平台
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
const props = defineProps({
    heightStatus: {
        type: Boolean,
        default: true
    }
})

const isMobile = computed(() => {
    return store.state.isMobile
})

// watch(route, (newVal,oldval) => {
//     console.log('newVal',newVal)
//     console.log('newVal',newVal.path)
// });

// const toLink = (val) => {
//   router.push({ path: menuList.value[val].url })
//   store.commit('setMenu',false)
// }

const tohome = () => {
  router.push({ path: '/' })
}

const linkData = ref([
    // {text:"作業",url:'homework'},
    // {text:"訊息中心",url:'mail'},
    // {text:"個人中心",url:'center'},
    {text:"作業",url:'/'},
    {text:"訊息中心",url:'/'},
    {text:"個人中心",url:'/center'},
])

const toLink = (url) => {
    router.push({ path: url })
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