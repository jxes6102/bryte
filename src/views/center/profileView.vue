<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-center items-center ">
        <div class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>姓名</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>{{userProfile?.name}}</div>
            </div>
        </div>
        <div class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>暱稱</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>{{userProfile?.nickName}}</div>
            </div>
        </div>
        <div class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>電子信箱</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>{{userProfile?.email}}</div>
            </div>
        </div>
        <div class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>電話</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>{{userProfile?.phone}}</div>
            </div>
        </div>
        <div class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>性別</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>{{userProfile?.gender}}</div>
            </div>
        </div>
        <div class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>生日</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>{{userProfile?.birthday?.getFullYear() + '/' + userProfile?.birthday?.getMonth() + '/' + userProfile?.birthday?.getDate()}}</div>
            </div>
        </div>
        <div 
            @click="bindLine"
            class="w-[95%] md:w-[45%] h-[100%] text-base md:text-xl rounded-lg bg-slate-50 m-2 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center ">
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>LINE綁定狀態</div>
            </div>
            <div class="w-full h-auto flex flex-wrap items-center justify-between">
                <div>{{userProfile?.isLineId ? '已綁定' : '未綁定'}}</div>
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

const userProfile = ref(null)
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