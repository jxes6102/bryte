<template>
    <div
        @click="close"
        class="transition-all fixed w-full h-full left-0 top-0 bg-slate-800 z-[999] opacity-50 flex flex-wrap justify-center items-center"
    >
    </div>
    <div 
        @click="test"
        :class="{ 
            'left-[calc(50%_-_135px)] top-[calc(50%_-_90px)] md:left-[calc(50%_-_300px)] md:top-[calc(50%_-_200px)] w-[270px] h-[180px] md:w-[600px] md:h-[400px] ' : type == 'default',
            'left-[calc(50%_-_135px)] top-[calc(50%_-_120px)] md:left-[calc(50%_-_300px)] md:top-[calc(50%_-_220px)] w-[270px] h-[240px] md:w-[600px] md:h-[440px] ' : type == 'large',
            'left-[calc(50%_-_100px)] top-[calc(50%_-_75px)] md:left-[calc(50%_-_200px)] md:top-[calc(50%_-_100px)] w-[200px] h-[150px] md:w-[400px] md:h-[200px] ' : type == 'small'
        }"
        class="animate__animated animate__bounceIn fixed  rounded-lg bg-white z-[1000] flex flex-col justify-center items-center "
    >
        <div
            v-if="closeStatus"
            @click.stop="close" 
            class="absolute w-auto h-auto top-0 right-0 p-2 flex flex-wrap justify-center items-center">
            <el-icon size="30"><Close /></el-icon>
        </div>
        <slot name="message"></slot>
        <slot name="control"></slot>
    </div>
    
</template>

<script setup>
/*eslint-disable*/
import 'animate.css';
import { ref,computed,inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()

const props = defineProps({
    type: {
        type: String,
        default: 'default'
    },
    closeStatus:{
        type:Boolean,
        default:true
    }
})

const isMobile = computed(() => {
    return store.state.isMobile
})

const test = () => {
    // console.log('test')
}

const cancel = inject('cancel')
const close = () => {
    // console.log('close')
    cancel()
}

</script>

<style lang="scss" scoped>

</style>