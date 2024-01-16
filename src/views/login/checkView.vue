<template>
    <div v-html="content" class="absolute left-0 top-0 w-full h-full flex flex-wrap justify-center items-center bg-[rgb(245,245,220,0.1)]">
    </div>
</template>
<script setup>
/*eslint-disable*/
import { testLogin } from '@/api/api'
import { ref,computed,onMounted } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()
const content = computed(() => {
    return store.state.lineHtml
})
</script>
<style lang="scss" scoped>
</style>
  