<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-center items-center ">
        <div class="w-[95%] md:w-[45%] h-[100%] text-xs md:text-base rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>課程名稱</div>
                <div>{{classDetail?.CLSNAME}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>課程代號</div>
                <div>{{classDetail?.CLSNO}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>課程日期</div>
                <div>{{classDetail?.HDYDATE}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>起始時間</div>
                <div>{{classDetail?.CLSTIME1}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>結束時間</div>
                <div>{{classDetail?.CLSTIME2}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>講師</div>
                <div>{{classDetail?.CLSTEAS1}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>教室編號</div>
                <div>{{classDetail?.CLRNO}}</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>教學進度</div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { getClassDetail } from '@/api/api'
import { ref } from 'vue'
import { useRouter,useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()

const classDetail = ref(null)
const init = async() => {
    
    await getClassDetail({
        DepartmentID:'2bd3434f-1e95-4fdb-ab29-315921e06868',
        CLSNO:route.query.CLSNO,
        HDYDATE:route.query.HDYDATE,
        STUID:null
    }).then((res) => {
        // console.log('res',res.data.Result)
        classDetail.value = res.data.Result
        //console.log('classDetail.value',classDetail.value)
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