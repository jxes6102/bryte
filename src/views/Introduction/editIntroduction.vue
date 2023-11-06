<template>
    <div class="editIntroduction mine-flex-center">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>

<script setup>
/*eslint-disable*/
import {getIntroduction} from '@/api/api'
import { useStore } from "vuex";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {ref,computed } from 'vue'
import { useRouter } from "vue-router";

const store = useStore()
const editorData = ref([])
const editor = ref(ClassicEditor)
const editorConfig = ref({})

const isMobile = computed(() => {
    return store.state.isMobile
})

const init = async() => {
    //介紹資訊
    await getIntroduction().then((res) => {
        editorData.value = res.data.Result.Introduction
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