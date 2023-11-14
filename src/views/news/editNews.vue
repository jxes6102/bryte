<template>
    <div class="w-full h-auto editIntroduction flex flex-col justify-center items-center">
        <div class="w-[90%] text-base md:text-lg flex flex-col justify-center items-center">
            <div class="w-[100%] my-2 flex flex-col justify-center items-center">
                <div class="w-full font-medium text-left text-gray-900">分類</div>
                <div class="relative w-full inline-block ">
                    <select 
                        v-model="newsData.Category"
                        class="block w-full bg-white border border-gray-400 hover:border-gray-500 p-1 rounded shadow focus:outline-none focus:shadow-outline">
                        <option value="最新公告">最新公告</option>
                        <option value="內部消息">內部消息</option>
                        <option value="活動訊息">活動訊息</option>
                    </select>
                </div>
            </div>
            <div class="w-[100%] my-2 flex flex-col justify-center items-center">
                <div class="w-full font-medium text-left text-gray-900">標題</div>
                <input 
                    type="text" 
                    class="w-full p-2 bg-[white] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    v-model="newsData.Title">
            </div>
            <div class="w-[100%] my-2 flex flex-col justify-center items-center">
                <div class="w-full font-medium text-left text-gray-900">開始日期</div>
                <input 
                    type="text" 
                    class="w-full p-2 bg-[white] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    v-model="newsData.CreateTime">
            </div>
            <div class="w-[100%] my-2 flex flex-col justify-center items-center">
                <div class="w-full font-medium text-left text-gray-900">結束日期</div>
                <input 
                    type="text" 
                    class="w-full p-2 bg-[white] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    v-model="newsData.EndTime">
            </div>
            <div class="w-[100%] my-2 flex flex-col justify-center items-center">
                <div class="w-full font-medium text-left text-gray-900">預覽文字</div>
                <input 
                    type="text" 
                    class="w-full p-2 bg-[white] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    v-model="newsData.PreviewText">
            </div>
            <div class="w-[100%] my-2 flex flex-col justify-center items-center">
                <div class="w-full font-medium text-left text-gray-900">預覽圖片</div>
                <input 
                    type="text" 
                    class="w-full p-2 bg-[white] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value="">
            </div>
            <div class="w-[100%] my-2 flex flex-col justify-center items-center">
                <div class="w-full font-medium text-left text-gray-900">上傳檔案</div>
                <div class="w-full border-t-4 border-solid border-[#1452D7] bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center gap-y-[10px]">
                    <div class="w-full border-b-2 border-solid border-gray-200 flex flex-wrap justify-center items-center">
                        <div class="w-1/2 px-1 text-left">點選套用</div>
                        <div class="w-1/4 px-1 text-left">預覽</div>
                        <div class="w-1/4 px-1 text-left">刪除</div>
                    </div>
                </div>
                <button
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded">
                    上傳檔案
                </button>
            </div>
            <div class="w-[100%] my-2 flex flex-col justify-center items-center">
                <div class="w-full font-medium text-left text-gray-900">內文</div>
                <div class="w-full">
                    <ckeditor class="" :editor="editor" v-model="newsData.Content" :config="editorConfig"></ckeditor>
                </div>
            </div>
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
import { getNew } from '@/api/api'
import { useStore } from "vuex";
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { ImageInsert } from '@ckeditor/ckeditor5-image';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import {Image,ImageCaption,ImageStyle,ImageToolbar,ImageUpload} from '@ckeditor/ckeditor5-image';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import UploadAdapter from '@/utility/UploadAdapter';
import {ref,computed } from 'vue'
import { useRouter,useRoute } from "vue-router";
const store = useStore()

function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new UploadAdapter( loader );
    };
}

const router = useRouter()
const route = useRoute()

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

const newsData = ref({
    Category:'',
    Content:'',
    CreateTime:'',
    CreateUserID:'',
    DepartmentID:'',
    EndTime:'',
    InvitationCode:'',
    IsReviewed:false,
    NewsID:'',
    PreviewImage:'',
    PreviewText:'',
    SendToLine:false,
    StartTime:'',
    Title:'',
    UpdateTime:'',
    UpdateUserID:''
})

const init = async() => {
    if(!route.query.NewsID){
        return false
    }
    //指定消息
    let payload = {
        "NewsID":route.query.NewsID
    }
    await getNew(payload).then((res) => {
        newsData.value = res.data.Result
        //console.log('newsData',newsData.value)
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

<style scoped>

</style>