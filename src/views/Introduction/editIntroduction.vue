<template>
    <div class="editIntroduction flex flex-col justify-center items-center">
        <div class="w-[90%]">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
        <div class="w-[90%] flex flex-col justify-center items-center">
            <button @click="test">儲存</button>
            <button>取消</button>
        </div>
        
    </div>
</template>

<script setup>
/*eslint-disable*/
import {getIntroduction} from '@/api/api'
import { useStore } from "vuex";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
//import { ImageInsert } from '@ckeditor/ckeditor5-image';

//import Editor from 'ckeditor5-custom-build/build/ckeditor';

import {ref,computed } from 'vue'
import { useRouter } from "vue-router";
const store = useStore()
const editorData = ref("")

const editor = ref(ClassicEditor)

const editorConfig = ref({
    // plugins: [ /* ... */ , ImageInsert ],
    // toolbar: [ /* ... */ , 'insertImage' ]
})

const isMobile = computed(() => {
    return store.state.isMobile
})

const init = async() => {
    //介紹資訊
    await getIntroduction().then((res) => {
        editorData.value = res.data.Result.Introduction
        console.log('editorData.value',editorData.value)
        
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })

}

init()

const test = () => {
    console.log('test',editorData.value)
}


</script>

<style>

</style>