<template>
    <div class="introduction mine-flex-center">
        <div class="w-[90%] md:w-[80%]" v-html="introductionData"></div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import {getIntroduction} from '@/api/api'
import { useStore } from "vuex";

import {ref,computed } from 'vue'
import { useRouter } from "vue-router";

const store = useStore()
const introductionData = ref([])

const isMobile = computed(() => {
    return store.state.isMobile
})

const init = async() => {
    //介紹資訊
    await getIntroduction().then((res) => {
        introductionData.value = res.data.Result.Introduction
        // console.log('introductionData.value',introductionData.value)
        
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })

}

init()


</script>

<style>

</style>