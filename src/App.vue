<template>
  <div
    id="main"
    class="relative w-full h-[100vh] min-h-[100vh] overflow-y-auto overflow-x-hidden" 
    @scroll="handleScroll"
  >
    <headerView ref="headerItem" :heightStatus="scrollStutus"></headerView>
    <!-- <Transition
      appear
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <router-view class="relative" :class="menuStatus ? 'pt-[50vh]' : 'pt-[10vh]'"/>
    </Transition> -->
    <router-view v-slot="{ Component, route }" class="relative pb-[20vh] md:pb-0">
      <Transition enter-active-class="animate__animated animate__fadeIn">
        <component v-totop :is="Component" :key="route.path" />
      </Transition>
    </router-view>
    <footerView></footerView>
    <transition 
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      >
      <announceView v-if="announceStatus"></announceView>
    </transition>
  </div>
</template>
<script setup>
/*eslint-disable*/
  import headerView from './components/headerView.vue';
  import footerView from './components/footerView.vue';
  import announceView from './components/announceView.vue'
  import { getLineLoginCallback, authorize } from '@/api/api'
  import { ref,computed,onMounted,onBeforeUnmount } from 'vue';
  import { useRouter,useRoute } from "vue-router";
  import { useStore } from "vuex";
  import 'animate.css';
  //console.log('test 2')
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const scrollStutus = ref(true)

  const announceStatus = computed(() => {
    return store.state.announceStatus
  })

  const menuStatus = computed(() => {
      return store.state.menuStatus
  })

  const isMobile = computed(() => {
      return store.state.isMobile
  })

  const handleScroll = (el) => {
    if(el.target.scrollTop === 0){
      scrollStutus.value = true
    }else{
      scrollStutus.value = false
    }
  }

  const setWidth = () => {
    store.commit('setMobile',window.innerWidth)
  }
  
  const headerItem = ref(null)

  const init = () => {
    const token = localStorage.getItem('token');
    if (token) {
      store.commit('changeLoginStatus',true)
    }
  }
  init()

  const checkLineLogin = () =>  {
    //https://192.168.1.102:8080/?code=FHvFFCRr91OeZEfdqH5W&state=zxcasdqew#/
    // console.log('line login')
    const urlParams = new URLSearchParams(window.location.search);
    // console.log('urlParams',urlParams)
    const codeParam = urlParams.get('code');
    // console.log('codeParam',codeParam)
    const stateParam = urlParams.get('state');
    // console.log('stateParam',stateParam)
    if(stateParam && codeParam){
      let payload = {
          "code": codeParam,
          "state": stateParam
      }
      getLineLoginCallback(payload).then((res) => {
        // console.log('getLineLoginCallback',res)
        if(res.data.status){
          if (res.data.data.state == 0) {
            console.log('getLineLoginCallback',res.data.data.data)
            store.commit('setToken',res.data.data.data)
            authorize().then((res1) => {
                if(res1.data.status){
                    store.commit('setUser',res1.data.data)
                    window.location.replace((window.location.origin + window.location.pathname))
                }else{
                    console.log(res1.data.message)
                }
            })
            // window.location.href = window.location.origin + window.location.pathname
            // window.open((window.location.origin + window.location.pathname), '_self')
          }else if (res.data.data.state == 1) {
            store.commit('setLineId',res.data.data.data)
            // router.push({ path: '/profile' })
            window.location.replace((window.location.origin + window.location.pathname + '#/profile'))
          }              
        }else{
          console.log(res.data.message)
        }
      }) 
    }    
  }

  onMounted(() => {
    // console.log('headerItem.value',headerItem.value.$el.clientHeight)
    setWidth()
    window.addEventListener('resize', () => {
      setWidth()
    }, false);
    
    checkLineLogin()
  })

  onBeforeUnmount(() => {
    // store.commit('clearToken')
  })

</script>
<style lang="scss">
#app {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*/

/*
@media (min-width: 767px)  {
//網頁捲軸【寬度
::-webkit-scrollbar {
  width: 10px;
}

//網頁捲軸【背景】顏色
::-webkit-scrollbar-track {
  background: #cbfbac;
}

//網頁捲軸【把手】顏色
::-webkit-scrollbar-thumb {
  background: #87f87a;
  border-radius: 5px;
}

//網頁捲軸【滑過時】把手的顏色
::-webkit-scrollbar-thumb:hover {
  background: #9ff99a;
}
}
*/
</style>
