<template>
    <div v-for="language in projectLanguages" :key="language.key" :class="'py-3 w-100 '+ language.background" 
        @click="redirect(language.url)">
            <i v-if="language.nameIcon != 'asp'" :class="'fa-brands '+ language.nameIcon + ' fa-xl fw-normal'"></i>
            <p v-else class="fw-bold mb-0">.NET</p>
    </div>
</template>

<script>
    export default{
        name: 'headCardProject',
        props:{
            projectLanguages: Array
        },
        methods:{
            redirect(url){
                window.open(url, '_blank').focus();
            }
        }
    }
</script>