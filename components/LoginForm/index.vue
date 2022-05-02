<template>
    <div class="space-y-3">
        <header class="space-y-2">
            <h1>Login to Your Account.</h1>
            <p>Continue Your Adventure.</p>
        </header>
        <div class="relative !mt-6">
           <ul class="flex list-none space-x-7">
                <li 
                    @click="currentTypeIndex=index" 
                    ref="types" 
                    v-for="(item, index) in types" 
                    :key="index" 
                    class="cursor-pointer border border-solid rounded-sm border-gray-100 px-3 py-2">
                        {{ item }}
                </li>
            </ul>
            <div 
                ref="typeHighlight" 
                class="absolute bg-black opacity-5 transition-all top-0 left-0 rounded-sm" 
            />
       </div>
       <form class="flex flex-col space-y-3 w-[350px]">
            <label for="user-email">Email Address</label>
            <input
                name="user-email" 
                class="px-3 py-3 shadow-md border rounded-sm border-gray-100 border-solid focus:border-gray-200"
                type="text"
                v-model="email"
                autocomplete="username"
                placeholder="Enter Email" 
            />
            <label for="user-email">Password</label>
             <input
                name="user-password" 
                class="px-3 py-3 shadow-md border rounded-sm border-gray-100 border-solid focus:border-gray-200"
                type="password"
                v-model="pass"
                autocomplete="current-password"
                placeholder="Enter Password" 
            />
            <Button />
       </form>
       <p>Don't Have an Account? <span>Sign Up</span>.</p>
    </div>
</template>
<script lang="ts">
    export default {
        data() {
            return {
                types: ["Volunteer", "Project Lead"],
                currentTypeIndex: 0,
                email: "",
                pass: ""
            }
        },
        watch: {
            currentTypeIndex(){
                this.updateType();
            },
            email(){
                console.log('update')
            }
        },
        methods: {
            updateType(){
                const types = this.$refs.types; 
                const currentType = types[this.currentTypeIndex]; 
                
                const { width, height } = currentType.getBoundingClientRect(); 

                const typeHighlight = this.$refs.typeHighlight;

                typeHighlight.style.width = `${width}px`; 
                typeHighlight.style.height =`${height}px`; 
                typeHighlight.style.left =`${currentType.offsetLeft}px`; 
                typeHighlight.style.top =`${currentType.offsetTop}px`; 
            }
        },
        mounted(){
           this.updateType();
        }
    }
</script>