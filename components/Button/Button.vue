<template>
    <button 
        type="button" 
        class="text-white flex justify-center items-center cursor-pointer border-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <Loader class="mr-2" v-if="loading" />
            <slot/>
    </button>
</template>
<script lang="ts">
    export default {
        props: {
            loading: Boolean
        }
    }
</script>