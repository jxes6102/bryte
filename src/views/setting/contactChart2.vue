<template>
    <div class="w-auto h-auto md:h-[80%] p-2 text-sm md:text-xl flex flex-col justify-start items-center ">
        <div class="w-full max-w-[800px] rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div 
                v-for="(item,index) in list" :key="index"
                class="w-full py-1 flex flex-wrap justify-center items-center">
                <div class="grow shrink w-4-12">{{item.name}}</div>
                <div class="grow shrink w-4-12 text-right flex flex-wrap justify-right items-right">
                    <div class="w-[auto] bg-[#20B2AA] text-white py-[1px] px-[2px] rounded">已讀</div>
                    <div class="px-1">{{item.isRead + '人'}}</div>
                </div>
                <div class="grow shrink w-4-12 text-right flex flex-wrap justify-right items-right">
                    <div class="w-[auto] bg-[#4169E1] text-white py-[1px] px-[2px] rounded">已簽</div>
                    <div class="px-1">{{item.isSign + '人'}}</div>
                </div>
            </div>
        </div>
        <div class="w-[250px] h-[150px] md:w-[750px] md:h-[450px]">
            <Bar v-if="!apiLoading" :data="data" :options="options" />
        </div>
        <div class="w-full max-w-[800px] rounded-lg p-1 flex flex-wrap items-center justify-center">
            <div class="collapse w-full bg-slate-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <input type="checkbox" /> 
                <div class="collapse-title" style="padding-inline-end: 1rem;">
                    <div class="w-full max-w-[800px] rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
                        猴子班
                    </div>
                </div>
                <div class="collapse-content">
                    <div class="w-full max-w-[800px] rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
                        <div
                            v-for="(item,index) in memberList" :key="index"
                            :class="(index % 2 == 0) ? 'bg-slate-50' : 'bg-slate-200'"
                            class="w-full my-1 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center">
                                <div class="px-1">{{item.className}}</div>
                                <div class="px-1">{{item.number+'號'}}</div>
                                <div class="px-1">{{item.studentUserName}}</div>
                            </div>
                            
                            <div class="flex flex-wrap items-center justify-center">
                                <div 
                                    :class="item.isRead ? 'bg-[#20B2AA]' : 'bg-[#808080]'"
                                    class="w-[auto] mx-1 text-sm md:text-xl text-white py-1 px-2 rounded">
                                    {{item.isRead ? '已讀' : '未讀'}}
                                </div>
                                <div
                                    :class="item.isSign ? 'bg-[#4169E1]' : 'bg-[#808080]'"
                                    class="w-[auto] mx-1 text-sm md:text-xl text-white py-1 px-2 rounded">
                                    {{item.isSign ? '已簽' : '未簽'}}
                                </div>
                            </div>
                        </div>
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
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const router = useRouter()
const store = useStore()

const memberList = ref([
    {
        studentUserName:'李明琳',
        className:'猴子班',
        number:1,
        isRead:false,
        isSign:false
    },
    {
        studentUserName:'蕭鈞彥',
        className:'猴子班',
        number:2,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'宋宜仁',
        className:'猴子班',
        number:3,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'倪逸瑋',
        className:'猴子班',
        number:4,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'吳進韋',
        className:'猴子班',
        number:5,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'林右貞',
        className:'猴子班',
        number:6,
        isRead:true,
        isSign:false
    },
    {
        studentUserName:'高建宏',
        className:'猴子班',
        number:7,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'陳友鴻',
        className:'猴子班',
        number:8,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'萬艾旭',
        className:'猴子班',
        number:9,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'邱智傑',
        className:'猴子班',
        number:10,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'李哲啟',
        className:'猴子班',
        number:11,
        isRead:true,
        isSign:true
    },
])

const memberList1 = ref([
    {
        studentUserName:'劉均季',
        className:'兔子班',
        number:1,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'林典年',
        className:'兔子班',
        number:2,
        isRead:false,
        isSign:false
    },
    {
        studentUserName:'黃亭宏',
        className:'兔子班',
        number:3,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'蔣佩穎',
        className:'兔子班',
        number:4,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'潘順富',
        className:'兔子班',
        number:5,
        isRead:true,
        isSign:false
    },
    {
        studentUserName:'吳雅惠',
        className:'兔子班',
        number:6,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'李素方',
        className:'兔子班',
        number:7,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'蔡明軒',
        className:'兔子班',
        number:8,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'謝家綺',
        className:'兔子班',
        number:9,
        isRead:true,
        isSign:true
    },
    {
        studentUserName:'林宗達',
        className:'兔子班',
        number:10,
        isRead:true,
        isSign:true
    },
])

const list = ref([
    {
        name:'猴子班',
        isRead:10,
        isSign:9
    }
])


const data = ref({});
const options = ref({});
const apiLoading = ref(false)
const init = async() => {
    apiLoading.value = true
    data.value ={
        labels: ['猴子班'],
        datasets: [
            {
                label: '已讀',
                backgroundColor: '#20B2AA',
                data: [10],
            },
            {
                label: '已簽',
                backgroundColor: '#4169E1',
                data: [9],
            },
        ],
    };

    options.value = {
        maintainAspectRatio: true,
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        scales: {
            x: {
                min: 0,
                max: 10,
                ticks: {
                    reverse: false,
                    stepSize: 5
                },
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: false,
                text: 'Chart.js Horizontal Bar Chart',
                
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        //console.log('context',context)
                        if (label) {
                            label += context.formattedValue + '%';
                        }
                        return label;
                    },
                }
            }
        },
    };

    apiLoading.value = false
}

init()

const isMobile = computed(() => {
    return store.state.isMobile
})


</script>

<style>

</style>