<template>
    <div id="app">
        <router-view/>
        </div>
</template>

<script>
    export default {
        name: 'App',
        mounted(){
            let xmlhttp
            if (window.XMLHttpRequest){
                xmlhttp=new XMLHttpRequest()
            }
            else{
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
            }
            xmlhttp.open("GET","../static/configuration.json",false)
            xmlhttp.send()
            let configuration = JSON.parse(xmlhttp.responseText)
            this.$store.dispatch("Init",configuration)
            console.log(configuration)

        }
    }
</script>

