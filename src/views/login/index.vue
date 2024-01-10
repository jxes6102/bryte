<template>
    <div class="w-full h-full flex flex-col justify-start items-center bg-[rgb(245,245,220,0.1)]">
        <div class="w-full mt-1 md:mt-4 text-4xl font-semibold">登入</div>
        <div class="w-[80%] my-4 flex flex-wrap justify-center items-center">
            <el-form
                label-width="0px"
                :model="form"
                style="width:100%;max-width:700px;"
            >
                <el-form-item label="">
                    <el-input 
                        placeholder="帳號" v-model="form.account"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="UserFilled" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input type="password" placeholder="密碼" v-model="form.password" 
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Key" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input placeholder="手機" v-model="form.phone" 
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Iphone" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input placeholder="驗證碼" v-model="form.checkNum" 
                        style="width: 50%;min-width:220px;max-width:300px;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Key" />
                        </template>
                        <template #append>
                            <div class="w-[50px] md:w-[100px]">圖片</div>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="w-full mt-1">忘記了您的密碼嗎? 請與各分校老師進行詢問，謝謝。</div>
            <div class="w-full mt-1 flex flex-col justify-center items-center">
                <button @click="login" class="w-full md:w-[80%] max-w-[700px] bg-[#6E6EFF] py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">登入</button>
                <button class="w-full md:w-[80%] max-w-[700px] bg-[rgb(13,181,156,0.9)] mt-4 py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">LINE登入</button>
            </div>
        </div>
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

const form = ref({
  account: '',
  password: '',
  phone: '',
  checkNum:''
})

const login = async() => {
    // let payload = {
    //     'account': 'teacher001',
    //     'password': 'teacher001'
    // }
    let payload = {
        'account': form.value.account,
        'password': form.value.password
    }

    await testLogin(payload).then((res) => {
        console.log('res',res.data)
        if(res.data.status){
            store.commit('setToken',res.data.data)
            router.push({ path: '/' })
        }else{
            console.log(res.data.message)
        }
    })

}
  
</script>
<style lang="scss" scoped>
</style>
  