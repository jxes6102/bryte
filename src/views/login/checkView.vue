<template>
    <div class="w-full h-full flex flex-col justify-start items-center bg-[rgb(245,245,220,0.1)]">
        check
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

</script>
<style lang="scss" scoped>
</style>
  