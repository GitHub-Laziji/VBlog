<template>
    <div>

    </div>
</template>
<script>

    export default{
        data(){
            return{

            }
        },
        mounted(){
            QueryApi.test().then((result)=>{
                console.log(result)
            })
        },
        methods:{

        }
    }
</script>