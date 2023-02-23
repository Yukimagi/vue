<!--做完要在終端機跑 npm run dev -->
<template>
    <div>資料</div>

    <div>
        長者狀態<input type="text" v-model="evn.event_type">
        訊息<input type="text" v-model="evn.message">
        攝影機號碼<input type="text" v-model="evn.data.cam">
    </div>

    <button @click="createData()">新增</button>
    <button @click="getData()">拿</button>
    <li v-for="(ent,index) in evn1">
        {{ent.event_type}}
    </li>

</template>

<script>
export default {
    data(){//存放變數資料
        return {
            evn:{
                event_type :"",
                message : "",
                data : {},
            },
            evn1:[],
        }
    },
    methods:{
        getData(){
            fetch("http://127.0.0.1:81/events/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.evn1 = data;
            })
            .catch(console.error);
        },
        createData(){
            fetch("http://127.0.0.1:81/events/",{
                method:"POST",
                body: JSON.stringify(this.evn),
                headers:{
                    "Content-Type": "application/json",
                },
                mode:"cors",
                credentials: "include",
            })
            .then((response) => response.json())//.then是fetch後要做的事，先告訴response的格式
                .then((data) => {
                    console.log(data);//顯示data於主控台//只要data裡的hourly
                    //方法2:console.log(data["hourly"]); [{},{}]
                   if(data.status=="success") alert("資料新增成功");
                })
        },
    },
    mounted(){//掛載後做的事，當這個組件被載入時執行
        // this.getData();
    },
    computed: {
        publishedBooksMessage() {
            return this.author.books.length > 0 ? 'Yes' : 'No'
        }
    }
}

</script>
<style lang="scss">
    .card{
        background-color:grey;
        height:10px;
        margin:10px;
    }
</style>