<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-center items-center ">
        <div class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                <div>
                    姓名
                </div>
            </div>
            <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                <el-input 
                    v-model="userProfile.name"
                    :readonly="true"
                    class="w-full"
                    />
            </div>
            <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                <div>
                    暱稱
                </div>
            </div>
            <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                <el-input 
                    v-model="userProfile.nickName"
                    :readonly="true"
                    class="w-full"
                    />
            </div>
            <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                <div>
                    電子信箱
                </div>
            </div>
            <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                <el-input 
                    v-model="userProfile.email"
                    :readonly="true"
                    class="w-full"
                    />
            </div>
            <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                <div>
                    電話
                </div>
            </div>
            <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                <el-input 
                    v-model="userProfile.phone"
                    :readonly="true"
                    class="w-full"
                    />
            </div>
            <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                <div>
                    性別
                </div>
            </div>
            <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                <el-input 
                    v-model="userProfile.gender"
                    :readonly="true"
                    class="w-full"  
                    />
            </div>
            <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                <div>
                    生日
                </div>
            </div>
            <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                <el-date-picker
                    v-model="userProfile.birthday"
                    :readonly="true"
                    class="w-full"
                    style="width: 100%;"
                    type="date"
                    />
            </div>
            <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                <div>
                    LINE綁定狀態
                </div>
            </div>
            <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                <button @click="bindLine" :class="userProfile.isLineId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-[#999999]'" class="w-full text-white font-bold rounded">{{userProfile.isLineId ? '已綁定' : '未綁定'}}</button>                
            </div>
            <div class="relative w-full h-auto pt-[20px] px-2 md:px-4 text-sm md:text-lg items-center">
                <button
                    @click="edit"
                    class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-1 md:px-2 rounded">
                    完成
                </button>
                <button
                    @click="cancel"
                    class="min-w-[20%] bg-gray-500 hover:bg-[#999999] text-white font-bold mx-2 py-1 px-2 md:py-1 md:px-2 rounded">
                    取消
                </button>
            </div>
        </div>
        <!-- <div 
            @click="bindLineNotify"
            class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>LINE Notify綁定狀態</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>{{userProfile?.isLineId ? '已綁定' : '未綁定'}}</div>
            </div>
        </div> -->
        <dialogView v-if="dialogStatus">
            <template v-slot:message>
                <div class="text-base md:text-2xl px-3">{{dialogData}}</div>
            </template>
            <template v-slot:control>
                <div class="absolute w-full bottom-4 flex flex-wrap justify-center items-center">
                    <button
                        @click="cancel"
                        class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                        確定
                    </button>
                </div>
            </template>
        </dialogView>
        <dialogView v-if="lineStatus">
            <template v-slot:message>
                <div class="text-base md:text-2xl px-3">{{lineData}}</div>
            </template>
            <template v-slot:control>
                <div class="absolute w-full bottom-4 flex flex-wrap justify-center items-center">
                    <button
                        @click="bindLineInfo"
                        class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                        確定
                    </button>
                    <button
                        @click="cancel"
                        class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                        取消
                    </button>
                </div>
            </template>
        </dialogView>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { getProfile,getLineInformationBindAccount,editLineInformationBindAccount } from '@/api/api'
import { ref,watch,computed,provide } from 'vue'
import { useRouter,useRoute } from "vue-router";
import dialogView from "@/components/dialogView.vue"

const router = useRouter()
const route = useRoute()

const store = useStore()

const lineId = computed(() => {
    return store.state.lineId
})

const userProfile = ref({

})
const init = async(payload) => {
    console.log(lineId.value);
    if (lineId.value) {
        const formData = new FormData();
        formData.append("lineId", lineId.value);
        await editLineInformationBindAccount(formData).then((res) => {
            bindLineSuccess()
            console.log(res.data.message);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        }).catch((err) => {})
    }
    const formDataProfile = new FormData();
    formDataProfile.append("userId", payload.UserID);
    await getProfile(formDataProfile).then((res) => {
        userProfile.value = res.data.data
        userProfile.value.birthday = new Date(userProfile.value.birthday)
    })
    .catch((error) => {
        // handle error
        console.log(error);
    })
}

watch(route, (newVal,oldval) => {
    let payload = {
        UserID:''
    }
    if(newVal.query?.UserID){
        payload.UserID = newVal.query.UserID
    }

    init(payload)
},{ deep: true,immediate: true });

const dialogStatus = ref(false)
const dialogData = ref('')
const lineStatus = ref(false)
const lineData = ref('')
const bindLine = () => {
    if(route.query?.UserID) return false

    lineStatus.value = true
    lineData.value = '您確定要綁定 LINE 嗎?'
}
const bindLineSuccess = () => {
    if(route.query?.UserID) return false

    store.commit('clearLineId')
    dialogStatus.value = true
    dialogData.value = '綁定 LINE 成功'
}

const bindLineNotify = () => {
    if(route.query?.UserID) return false

    dialogStatus.value = true
    dialogData.value = '您確定要將 LINE Notify 解除綁定嗎?'
}

const cancel = () => {
    dialogStatus.value = false
    lineStatus.value = false
}

provide('cancel', cancel)


const bindLineInfo = () => {
    getLineInformationBindAccount().then((res) => {
        if(res.data.status){
            openLink(res.data.data)
        }
    }).catch((err) => {})
}


const openLink = (url) => {
    window.location.href = url
}
</script>

<style>

</style>