<template>
    <div class="w-full h-auto editIntroduction flex flex-col justify-center items-center">
        <div class="w-[90%]">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
        <div class="w-[90%] py-2 flex flex-wrap justify-center items-center">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded">
                儲存
            </button>
            <button
                @click="back"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded">
                取消
            </button>
        </div>
        
    </div>
</template>

<script setup>
/*eslint-disable*/
import { getIntroduction } from '@/api/api'
import { useStore } from "vuex";
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { ImageInsert } from '@ckeditor/ckeditor5-image';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import {
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload
} from '@ckeditor/ckeditor5-image';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import UploadAdapter from '@/utility/UploadAdapter';
import {ref,computed } from 'vue'
import { useRouter } from "vue-router";
const store = useStore()
const editorData = ref("")
function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new UploadAdapter( loader );
    };
}

const router = useRouter()

const editor = ref(ClassicEditor)

const editorConfig = ref({
    plugins: [
        Essentials,
        Bold,
        Italic,
        Link,
        Paragraph,
        ImageInsert,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        MediaEmbed,
        MyCustomUploadAdapterPlugin
    ],
    toolbar: {
        items: [
            'bold',
            'italic',
            'link',
            'undo',
            'redo',
            'insertImage',
            'mediaEmbed'
        ]
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side'
        ]
    },

})

const isMobile = computed(() => {
    return store.state.isMobile
})

const init = async() => {
    //介紹資訊
    await getIntroduction({
        DepartmentID:"2bd3434f-1e95-4fdb-ab29-315921e06868"
    }).then((res) => {
        editorData.value = res.data.Result.Introduction
        //console.log('editorData.value',editorData.value)
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })
}

init()

const back = () => {
    router.go(-1)
}

</script>

<style>

</style>