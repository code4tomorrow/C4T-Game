<template>
    <InputField 
        v-bind="$attrs" 
        v-bind:type="show ? 'text' : 'password'" 
        class="pr-[45px]">
        <div class="absolute right-3 w-6 h-full flex top-0 flex-col justify-center">
           <transition name="slide-up">
                <outline-eye-icon 
                    @click="show = !show"
                    v-if="show"
                    class="w-6 h-6 text-gray-300 absolute hover:text-gray-200 transition duration-200 cursor-pointer" 
                />
                <outline-eye-off-icon 
                    @click="show = !show"
                    v-else-if="!show"
                    class="w-6 h-6 text-gray-300 absolute hover:text-gray-200 transition duration-200 cursor-pointer" 
                />
           </transition>
        </div>
    </InputField>
</template>
<style>
    .slide-up-enter-active,
    .slide-up-leave-active {
        transition: all 0.25s ease-out;
    }

    .slide-up-enter-from {
        transform: translateY(20px);
        opacity: 0;
    }

    .slide-up-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }
</style>
<script lang="ts">

    export default {
        inheritAttrs: false,
        data(){
            return {
                show: false
            }
        }
    }

</script>
