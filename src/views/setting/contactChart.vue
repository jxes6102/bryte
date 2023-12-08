<template>
    <div class="w-auto h-auto md:h-[80%] p-2 text-sm md:text-xl flex flex-col justify-start items-center ">
        <div class="w-full max-w-[800px] rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div 
                v-for="(item,index) in list" :key="index"
                class="w-full py-1 flex flex-wrap justify-center items-center">
                <div class="grow shrink">{{item.name}}</div>
                <div class="grow shrink text-right flex flex-wrap justify-center items-center">
                    <div class="w-[auto] bg-[#20B2AA] text-white py-[1px] px-[2px] rounded">已讀</div>
                    <div class="px-1">{{item.isRead + '人'}}</div>
                </div>
                <div class="grow shrink text-right flex flex-wrap justify-center items-center">
                    <div class="w-[auto] bg-[#4169E1] text-white py-[1px] px-[2px] rounded">已簽</div>
                    <div class="px-1">{{item.isSign + '人'}}</div>
                </div>
                <div class="grow shrink text-right">
                    <div class="px-1">{{'總共' + item.total + '人'}}</div>
                </div>
            </div>
        </div>
        <div class="w-[250px] h-[150px] md:w-[750px] md:h-[450px]">
            <Bar v-if="!apiLoading" :data="data" :options="options" />
        </div>
        <div class="w-full max-w-[800px] rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div
                v-for="(item,index) in memberList" :key="index"
                class="w-full my-1 flex flex-wrap items-center justify-between">
                <div class="flex flex-wrap items-center justify-center">
                    <div class="px-1">{{item.class}}</div>
                    <div class="px-1">{{item.number+'號'}}</div>
                    <div class="px-1">{{item.name}}</div>
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
        name:'猴子一號',
        class:'猴子班',
        number:1,
        isRead:true,
        isSign:false
    },
    {
        name:'猴子二號',
        class:'猴子班',
        number:2,
        isRead:true,
        isSign:true
    },
    {
        name:'猴子三號',
        class:'猴子班',
        number:3,
        isRead:false,
        isSign:false
    },
    {
        name:'猴子四號',
        class:'猴子班',
        number:4,
        isRead:false,
        isSign:false
    },
    {
        name:'猴子五號',
        class:'猴子班',
        number:5,
        isRead:true,
        isSign:true
    },
    {
        name:'猴子六號',
        class:'猴子班',
        number:6,
        isRead:false,
        isSign:false
    },
    {
        name:'猴子七號',
        class:'猴子班',
        number:7,
        isRead:false,
        isSign:false
    },
    {
        name:'猴子八號',
        class:'猴子班',
        number:8,
        isRead:true,
        isSign:true
    },
    {
        name:'猴子九號',
        class:'猴子班',
        number:9,
        isRead:true,
        isSign:false
    },
])

const list = ref([
    {
        name:'幼兒園',
        isRead:53,
        isSign:2,
        total:171
    },
    {
        name:'幼稚園',
        isRead:12,
        isSign:23,
        total:57
    }
])
const data = ref({});
const options = ref({});
const apiLoading = ref(false)
const init = async() => {
    apiLoading.value = true
    data.value ={
        labels: ['幼兒園', '幼稚園'],
        datasets: [
            {
                label: '已讀',
                backgroundColor: '#20B2AA',
                data: [22.5, 33.4],
            },
            {
                label: '已簽',
                backgroundColor: '#4169E1',
                data: [44.9, 55.0],
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
                max: 100,
                ticks: {
                    reverse: false,
                    stepSize: 20
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