<template>
    <div
        @click="close"
        class="transition-all fixed w-full h-full left-0 top-0 bg-slate-800 z-[999] opacity-50 flex flex-wrap justify-center items-center"
    >
    
    </div>
    <Teleport to="body">
        <div 
            @click="test"
            class="mine-fixed-center w-[90%] max-w-[600px] h-[40vh] left-0 top-0 rounded-lg bg-white z-[1000] flex flex-col justify-center items-center "
        >
            <div
                @click.stop="close" 
                class="absolute w-auto h-auto top-0 right-0 p-2 flex flex-wrap justify-center items-center">
                <el-icon size="30"><Close /></el-icon>
            </div>
            <slot name="message"></slot>
            <slot name="control"></slot>
        </div>
    </Teleport>
    
</template>

<script setup>
/*eslint-disable*/
import 'animate.css';
import { ref,computed,inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()

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