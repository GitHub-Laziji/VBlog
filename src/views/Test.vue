<template>
    <div>

    </div>
</template>
<script>
    import QueryApi from '@/api/query'
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