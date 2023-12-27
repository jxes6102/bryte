<template>
    <div class="w-auto h-auto md:h-[80%] p-2 text-sm md:text-xl flex flex-col justify-start items-center ">
        <div class="w-full max-w-[800px] rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full text-2xl md:text-4xl font-semibold">猴子班</div>
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-center">
                <div class="w-auto text-[16px] md:text-2xl">選擇班級:</div>
                <div class="w-auto px-[1px] flex flex-wrap items-center justify-center">
                    <el-select v-model="className" placeholder="Select" 
                        :style="{ 'width': isMobile ? '150px' : '400px' }">
                        <el-option
                            v-for="item in classOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
        </div>
        <div class="w-full max-w-[800px] rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div
                v-for="(item,index) in memberList" :key="index"
                class="w-full my-1 flex flex-wrap items-center justify-around md:justify-between">
                <div class="flex flex-wrap items-center justify-center">
                    <div class="mx-[2px] md:mx-1">{{item.number+'號'}}</div>
                    <div class="mx-[2px] md:mx-1">{{item.name}}</div>
                </div>
                
                <div class="flex flex-wrap items-center justify-center">
                    <div 
                        :class="item.isArrive ? 'bg-[#20B2AA]' : 'bg-[#808080]'"
                        class="w-[auto] mx-[2px] md:mx-1 text-sm md:text-xl text-white py-[2px] px-[4px] md:py-1 md:px-2 rounded">
                        {{item.isArrive ? '已到校' : '未到校'}}
                    </div>
                    <div
                        :class="item.isLeave ? 'bg-[#4169E1]' : 'bg-[#808080]'"
                        class="w-[auto] mx-[2px] md:mx-1 text-sm md:text-xl text-white py-[2px] px-[4px] md:py-1 md:px-2 rounded">
                        {{item.isLeave ? '已離校' : '未離校'}}
                    </div>
                    <div
                        :class="item.isHoliday ? 'bg-[#DC143C]' : 'bg-[#808080]'"
                        class="w-[auto] mx-[2px] md:mx-1 text-sm md:text-xl text-white py-[2px] px-[4px] md:py-1 md:px-2 rounded">
                        請假
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()

const memberList = ref([
    {
        name:'猴子一號',
        class:'猴子班',
        number:1,
        isArrive :true,
        isLeave:false,
        isHoliday:false
    },
    {
        name:'猴子二號',
        class:'猴子班',
        number:2,
        isArrive :true,
        isLeave:false,
        isHoliday:false
    },
    {
        name:'猴子三號',
        class:'猴子班',
        number:3,
        isArrive :true,
        isLeave:true,
        isHoliday:false
    },
    {
        name:'猴子四號',
        class:'猴子班',
        number:4,
        isArrive :true,
        isLeave:false,
        isHoliday:false
    },
    {
        name:'猴子五號',
        class:'猴子班',
        number:5,
        isArrive :true,
        isLeave:false,
        isHoliday:false
    },
    {
        name:'猴子六號',
        class:'猴子班',
        number:6,
        isArrive :false,
        isLeave:false,
        isHoliday:true
    },
    {
        name:'猴子七號',
        class:'猴子班',
        number:7,
        isArrive :true,
        isLeave:false,
        isHoliday:false
    },
    {
        name:'猴子八號',
        class:'猴子班',
        number:8,
        isArrive :true,
        isLeave:true,
        isHoliday:false
    },
    {
        name:'猴子九號',
        class:'猴子班',
        number:9,
        isArrive :false,
        isLeave:false,
        isHoliday:true
    },
])

const apiLoading = ref(false)
const init = async() => {
    apiLoading.value = true

    apiLoading.value = false
}

init()

const isMobile = computed(() => {
    return store.state.isMobile
})

const className = ref('Option6')
const classOptions = ref([
        {
            value: 'Option1',
            label: '天鵝班',
        },
        {
            value: 'Option2',
            label: '鬥雞班',
        },
        {
            value: 'Option3',
            label: '小鴨班',
        },
        {
            value: 'Option4',
            label: '鴿子班',
        },
        {
            value: 'Option5',
            label: '放牛班',
        },
        {
            value: 'Option6',
            label: '猴子班',
        },
    ])

</script>

<style>

</style>