<template>
    <div class="space-y-3">
        <header class="space-y-2">
            <h1 class="text-3xl">Login to Your Account.</h1>
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
                        {{ userRoleMappings[item] }}
                </li>
            </ul>
            <div 
                ref="typeHighlight" 
                class="absolute bg-black opacity-5 transition-all top-0 left-0 rounded-sm" 
            />
       </div>
       <form class="flex flex-col space-y-3 w-[350px]">
           <InputField 
                label="Email Address"
                v-bind:value="email"
                v-on:input="email = $event.target.value"
                name="user-email" 
                autocomplete="username"
                placeholder="Enter Email" 
            />
            <PasswordField 
                label="Password"
                name="user-password"
                type="password"
                autocomplete="current-password"
                v-bind:value="pass"
                v-on:input="pass = $event.target.value"
                placeholder="Enter Password" 
            />
            <p class="text-right transition duration-100 hover:text-blue-500 text-gray-400 cursor-pointer">Forgot Password?</p>
            <p class="text-red-500" v-if="!!error">{{ error }}</p>
            <Button @click="login" :loading="attemptingLogin">
                Login
            </Button>
       </form>
       <p>Don't Have an Account? <span class="text-blue-500">Sign Up.</span></p>
    </div>
</template>

<script lang="ts">
   import { gql, useMutation } from '@urql/vue';
   import { userRoleMappings } from "../../utils/mappings";

    export default {
        data() {
            return {
                types: Object.keys(userRoleMappings),
                userRoleMappings,
                currentTypeIndex: 0,
                email: "",
                pass: "",
                error: ""
            }
        },
        watch: {
            currentTypeIndex(){
                this.updateType();
            },
            email(){
                this.$data.error = "";
            },
            pass(){
                this.$data.error = "";
            }
        },
        setup() {
            const mutation = gql`
                    mutation loginClient($email: String!, $pass: String!, $type: String! ) {
                        loginClient(email:$email, pass:$pass, type:$type) {
                            id,
                            email,
                            name
                        }
                    }
                `;
            const { executeMutation:loginClient, fetching:attemptingLogin } = useMutation(mutation);
            return {
                loginClient,
                attemptingLogin
            }
        },
        methods: {
            async login(){
                const email = this.$data.email;
                const pass = this.$data.pass;
                const type = this.$data.types[this.$data.currentTypeIndex];

                if (!email || !pass) {
                    this.$data.error = "Please enter a valid email and password.";
                    return;
                }; 

                const response = await this.loginClient({ 
                   email, pass, type
                })

                const errors = response.error?.graphQLErrors || [];

                if (!!errors.length) {
                    this.$data.error = errors.map(error => error.message).join(", ");
                    return;
                };

                const hasAccess = useCookie("has_access"); 
                if (!!hasAccess.value) {
                    navigateTo({
                        path: "/~"
                    })
                }
            },
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