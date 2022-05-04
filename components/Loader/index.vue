<template>
    <div class="container">
        <span class="line" v-for="i in count" :key="i" :style="assignStyles(i)"/>
    </div>
</template>
<script lang="ts">
    export default {
        methods: {
            assignStyles(i:number) {
                const style = {};

                const delay = this.$data.delay; 
                const count = this.$data.count;

                style['--i'] = i - 1;
                style['transform'] = `rotate(calc(360deg / ${count} * var(--i))) translate(7.5px, 0px)`
                style['animation-duration'] = `${count * delay}ms`; 
                style['animation-delay'] = `calc(var(--i) * ${delay}ms)`;
                return style; 
            }
        },
        data(){
            return {
                count: 10,
                delay: 85
            }
        }
    }
</script>
<style scoped>
    .container {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .line {
        height: 2px;
        width: 6px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.5);
        display: block;
        position: absolute;
        animation: blinking infinite;
    }

    @keyframes blinking {
        from {
            background: rgba(255, 255, 255, 0.2);
        };
        to {
            background: rgba(255, 255, 255, 0.7);
        };
    }
</style>