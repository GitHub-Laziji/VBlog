<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'App',
        computed: {
            ...mapGetters([
                'githubUsername'
            ])
        },
        created(){
            let xmlhttp
            if (window.XMLHttpRequest){
                xmlhttp=new XMLHttpRequest()
            }else{
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
            }
            xmlhttp.open("GET","../static/configuration.json",false)
            xmlhttp.send()
            let configuration = JSON.parse(xmlhttp.responseText)
            this.$store.dispatch("Init",configuration)
            console.log('加载配置文件...\n'+JSON.stringify(configuration))
        }
    }
</script>

