<template>
    <div class="w-full h-full flex flex-col justify-start items-center bg-[rgb(245,245,220,0.1)]">
        <div class="w-full mt-1 md:mt-4 text-4xl font-semibold">註冊</div>
        <div class="w-[80%] my-4 flex flex-wrap justify-center items-center">
            <el-form
                :rules="rules"
                ref="formItem"
                label-width="0px"
                :model="form"
                style="width:100%;max-width:700px;"
            >
                <el-form-item label="" prop="email">
                    <el-input
                        placeholder="電子信箱" v-model="form.email"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Message" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" placeholder="密碼" v-model="form.password"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Key" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="secondPassword">
                    <el-input type="password" placeholder="確認密碼" v-model="form.secondPassword"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Key" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="name">
                    <el-input placeholder="姓名" v-model="form.name"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="User" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="phone">
                    <el-input placeholder="電話" v-model="form.phone"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Phone" />
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="gender">
                    <el-select 
                        v-model="form.gender"
                        placeholder="性別"
                        size="large"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <el-option
                            v-for="item in genderOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="birthday">
                    <el-input type="date" placeholder="生日" v-model="form.birthday"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Calendar" />
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="w-full min-h-[15px] text-red-600 text-sm md:text-lg">
                {{registerMessage || ''}}
            </div>
            <div class="w-full mt-1 flex flex-col justify-center items-center">
                <button @click="send" class="w-full md:w-[700px] max-w-[700px] bg-red-500 py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">註冊</button>
                <button @click="cancel" class="w-full md:w-[700px] max-w-[700px] bg-[#999999] mt-4 py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">取消</button>
        
            </div>
        </div>
    </div>
</template>
<script setup>
/*eslint-disable*/
import { registerApi } from '@/api/api'
import { ref,computed,onMounted } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()

const isMobile = computed(() => {
    return store.state.isMobile
})
const genderOptions = ref([
    {value: '', label: '請選擇性別'},
    {value: '男', label: '男'},
    {value: '女', label: '女'},
    {value: '其它', label: '其它'},
])

const init = () => {
}

init()

const formItem = ref(null)
const form = ref({
    email: '',
    password: '',
    secondPassword: '',
    name:'',
    phone:'',
    gender:'',
    birthday:'',
})

const rules = ref({
    email: [
        { required: true, message: '請輸入電子信箱', trigger: 'blur' },
        { min: 8, max: 130, message: 'Length should be 8 to 130', trigger: 'change' },
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' },
        { min: 8, max: 20, message: 'Length should be 8 to 20', trigger: 'change' },
    ],
    secondPassword: [
        { required: true, message: '請輸入確認密碼', trigger: 'blur' },
        { min: 8, max: 20, message: 'Length should be 8 to 20', trigger: 'change' },
    ],
    name: [
        { required: true,message: '請輸入姓名',trigger: 'blur' },
        { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'change' },
    ]
})

const send = async() => {
    if (loadStatus) {
      return false
    }
    await formItem.value.validate((valid, fields) => {
        if (valid) {
            register()
        } else {
            console.log('error submit!')
        }
    })
}

const registerMessage = ref('')
let loadStatus = false

const cancel = async() => {
    resetForm()
    router.push({ path: '/login' })
}

const register = async() => {
  loadStatus = true

  const formData = new FormData();
  formData.append("email", form.value?.email);
  formData.append("password", form.value?.password);
  formData.append("secondPassword", form.value?.secondPassword);
  formData.append("name", form.value?.name);
  formData.append("phone", form.value?.phone);
  formData.append("gender", form.value?.gender);
  formData.append("birthday", form.value?.birthday);

  await registerApi(formData).then((res) => {
      if(res.data.status){
          resetForm()
          router.push({ path: '/' })
      }else{
          registerMessage.value = res.data.message
      }
      loadStatus = false
  })
}

const resetForm = () => {
  formItem.value.resetFields()
}

</script>
<style lang="scss" scoped>
:deep(.el-input-group__append) {
    padding: 0px;
}
</style>
