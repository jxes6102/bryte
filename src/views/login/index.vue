<template>
    <div class="w-full h-full flex flex-col justify-start items-center bg-[rgb(245,245,220,0.1)]">
        <div class="w-full mt-1 md:mt-4 text-4xl font-semibold">登入</div>
        <div class="w-[80%] my-4 flex flex-wrap justify-center items-center">
            <el-form
                :rules="rules"
                ref="formItem"
                label-width="0px"
                :model="form"
                style="width:100%;max-width:700px;"
            >
                <el-form-item label="" prop="account">
                    <el-input
                        placeholder="帳號或電子信箱" v-model="form.account"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="UserFilled" />
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
                <!-- <el-form-item label="" prop="phone">
                    <el-input placeholder="手機" v-model="form.phone"
                        style="width: 100%;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Iphone" />
                        </template>
                    </el-input>
                </el-form-item> -->
                <el-form-item label="" prop="checkNum">
                    <el-input placeholder="驗證碼" maxlength="4" v-model="form.checkNum"
                        style="width: 50%;min-width:220px;max-width:300px;height: 40px;font-size: 18px;">
                        <template #prepend>
                            <el-button icon="Umbrella" />
                        </template>
                        <template #append>
                            <div @click="setCaptcha" class="w-[90px] md:w-[100px]">
                                <img class="w-full h-full" :src="captchaData?.dataUrl" alt="圖片錯誤">
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="w-full min-h-[15px] text-red-600 text-sm md:text-lg">
                {{loginMessage || ''}}
            </div>
            <div class="w-full mt-1">忘記了您的密碼嗎? 請與各分校老師進行詢問，謝謝。</div>
            <div class="w-full mt-1 flex flex-col justify-center items-center">
                <button @click="send" class="w-full md:w-[700px] max-w-[700px] bg-[#6E6EFF] py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">登入</button>
                <button @click="lineLogin" class="w-full md:w-[700px] max-w-[700px] bg-[rgb(13,181,156,0.9)] mt-4 py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">LINE登入</button>
                <button @click="register" class="w-full md:w-[700px] max-w-[700px] bg-red-500 mt-4 py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">註冊</button>
                <!-- <button @click="testOpen" class="w-full md:w-[700px] max-w-[700px] bg-red-500 mt-4 py-[4px] px-[6px] text-white border-0 cursor-pointer rounded">測試開啟</button> -->
            </div>
        </div>
    </div>
</template>
<script setup>
/*eslint-disable*/
import { testLogin,getLineInformation,getCaptcha,authorize } from '@/api/api'
import { ref,computed,onMounted } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()

const isMobile = computed(() => {
    return store.state.isMobile
})

const captchaData = ref({})
const setCaptcha = () => {
    getCaptcha().then((res) => {
        // console.log('res',res)
        if(res.data.status){
            captchaData.value = res.data.data
            // console.log('captchaData',captchaData.value)
        }else{
            console.log(res.data.message)
        }
    })
}
const init = () => {
    store.commit('clearToken')
    store.commit('clearUserData')
    setCaptcha()
}

init()

const formItem = ref(null)
const form = ref({
  account: '',
  password: '',
  checkNum:''
  // phone: '',
})

const rules = ref({
    account: [
        { required: true, message: '請輸入帳號', trigger: 'blur' },
        { min: 8, max: 130, message: 'Length should be 8 to 130', trigger: 'change' },
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' },
        { min: 8, max: 20, message: 'Length should be 8 to 20', trigger: 'change' },
    ],
    checkNum: [
        { required: true,message: '請輸入驗證碼',trigger: 'blur' },
        { min: 4, message: 'Length should be 4', trigger: 'change' },
    ],
})

// const accountCheck = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('請輸入帳號'))
//   }else {
//     callback()
//   }
// }

// const passwordCheck = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('請輸入密碼'))
//   }else {
//     callback()
//   }
// }

// const checkNumCheck = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('請輸入驗證碼'))
//   }else {
//     callback()
//   }
// }

// const rules = reactive({
//     account: [{ validator: accountCheck, trigger: 'blur' }],
//     password: [{ validator: passwordCheck, trigger: 'blur' }],
//     checkNum: [{ validator: checkNumCheck, trigger: 'blur' }],
// })

const send = async() => {
    if (loadStatus) {
      return false
    }
    await formItem.value.validate((valid, fields) => {
        // console.log('formItem',formItem.value)
        // console.log('fields',fields)
        // console.log('valid',valid)

        if (valid) {
            // console.log('submit!')
            login()
        } else {
            console.log('error submit!')
        }
    })
}

const loginMessage = ref('')
let loadStatus = false
const login = async() => {
// teacher001
//   let payload = {
//       'account': form.value?.account,
//       'password': form.value?.password,
//       'captchaId': captchaData.value?.captchaId,
//       'captchaCode': form.value?.checkNum
//   }
  loadStatus = true

  const formData = new FormData();
  formData.append("account", form.value?.account);
  formData.append("password", form.value?.password);
  formData.append("captchaId", captchaData.value?.captchaId);
  formData.append("captchaCode", form.value?.checkNum);

  await testLogin(formData).then((res) => {
      if(res.data.status){
        //   console.log('res.data',res.data)
          store.commit('setUserData',res.data.data)
          store.commit('setToken',res.data.data)
        //   resetForm()
        //   router.push({ path: '/' })
        
        authorize().then((res) => {
            if(res.data.status){
                store.commit('setUser',res.data.data)
                resetForm()
                router.push({ path: '/' })
            }else{
                setCaptcha()
                loginMessage.value = res.data.message
                //   console.log(res.data.message)
            }
            loadStatus = false
        })
      }else{
          setCaptcha()
          loginMessage.value = res.data.message
        //   console.log(res.data.message)
      }
      loadStatus = false
  })
}

const resetForm = () => {
  formItem.value.resetFields()
}

const htmlData = ref('')
const lineLogin = () => {
    // console.log('lineLogin')

    getLineInformation().then((res) => {
        console.log('getLineInformation',res.data.data)
        // loginMessage.value = res.data.data
        if(res.data.status){
            // window.open(res.data.data, '_self')
            // window.location.replace(res.data.data)
            //未知 在手機板必新開分頁顯示
            // window.location.href = res.data.data;
            openLink(res.data.data)
        }

    })
    // https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fresponse_type%3Dcode%26client_id%3D2001937495%26redirect_uri%3Dhttps%253A%252F%252Fjxes6102.github.io%252Fbryte%252F%26state%3Da1561e4078dc03b657ac93195a9f68934fd9fae1622d8e5239ad87a8d7aabb8f%26scope%3Dprofile%26openId%3D&loginChannelId=2001937495&loginState=70feooN8nomIsavCwLnhJM
}

const testOpen = () => {
    // window.location.href = 'https://tw.dictionary.search.yahoo.com/'
    // window.open('https://tw.dictionary.search.yahoo.com/', '_self')

    let client_id = '1656734224';
    let redirect_uri = 'https://jxes6102.github.io/bryte/';
    let link = 'https://access.line.me/oauth2/v2.1/authorize?';
    link += 'response_type=code';
    link += '&client_id=' + client_id;
    link += '&redirect_uri=' + redirect_uri;
    link += '&state=logintest';
    link += '&scope=openid%20profile';

    // openLink(link)
    openLink('https://tw.dictionary.search.yahoo.com/')
}

const register = () => {
    router.push({ path: '/register' })
}

const openLink = (url) => {
    // window.location.replace(res.data.data)
    // window.open(res.data.data, '_self')
    window.location.href = url

}

</script>
<style lang="scss" scoped>
:deep(.el-input-group__append) {
    padding: 0px;
}
</style>
