<template>
    <fieldset class="flex flex-col border-0 space-y-3">
         <label v-bind:for="$attrs.name">
             {{ $props.label }}
        </label>
         <div class="flex relative">
            <input
                type="text"
                class="px-3 py-3 flex-1 shadow-md border rounded-sm border-gray-100 border-solid focus:border-gray-200"
                v-bind="$attrs"
            />
            <slot />
         </div>
    </fieldset>
</template>
<script>

    export default {
        inheritAttrs: false,
        props: {
            label: String
        }
    }

</script>
