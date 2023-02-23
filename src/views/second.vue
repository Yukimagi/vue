<!--做完要在終端機跑 npm run dev -->
<template>
    <div>
        <h1>藥物</h1>
        

        <div>
            藥名<input type="text" v-model="tempItem.medname" />
            早<input type="checkbox" v-model="tempItem.eat_time" :value="'早'" />
            中<input type="checkbox" v-model="tempItem.eat_time" :value="'中'" />
            晚<input type="checkbox" v-model="tempItem.eat_time" :value="'晚'" />
            數量<input type="number" v-model="tempItem.no" />
            描述<input type="text" v-model="tempItem.descrp" />
            一<input type="checkbox" v-model="tempItem.weekly" :value="'一'" />
            二<input type="checkbox" v-model="tempItem.weekly" :value="'二'" />
            三<input type="checkbox" v-model="tempItem.weekly" :value="'三'" />
            四<input type="checkbox" v-model="tempItem.weekly" :value="'四'" />
            五<input type="checkbox" v-model="tempItem.weekly" :value="'五'" />
        </div>
        <button @click="createItem()">傳送資料</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: "",
            //存放變數資料ex:
            tempString: "",
            message: [],

            medlist: [],
            tempItem: {
                medname: "",
                eat_time: [],
                no: 1,
                descrp: "",
                weekly: [],
            }
        };
    },
    mounted() {
        //掛載後做的事，當這個組件被載入時執行
        // this.getItems();
    },
    methods: {
        //dosomething
        removeMsg(index) {
            this.message.splice(index, 1);//程式碼不用,區隔 只有變數   ,從index往後算一格切
        },

        

        getItems() {
            fetch(
                "https://127.0.0.1:81/drugs/"
            )//訪問這個網站的api
                .then((response) => response.json())//.then是fetch後要做的事，先告訴response的格式
                .then((data) => {
                    console.log(data);//顯示data於主控台//只要data裡的hourly
                    //方法2:console.log(data["hourly"]); [{},{}]
                    this.medlist=data;

                })
                .catch(console.error);//告訴錯誤
        },
        createItem() {
            fetch(
                "http://127.0.0.1:81/drugs/",
                {//訪問這個網站的api
                    method: "POST",
                    body: JSON.stringify({
                        medname: this.tempItem.medname,
                        eat_time: this.tempItem.eat_time,
                        no: this.tempItem.no,
                        descrp: this.tempItem.descrp,
                        weekly: this.tempItem.weekly,

                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: "cors",
                    credentials: "include",
                }
            )
            .then((response) => response.json())//.then是fetch後要做的事，先告訴response的格式
                .then((data) => {
                    console.log(data);//顯示data於主控台//只要data裡的hourly
                    //方法2:console.log(data["hourly"]); [{},{}]
                   if(data.status=="success") alert("資料新增成功");
                })
        },
        

    },
    computed: {
        publishedBookMessage() {
            return this.author.book.length > 0 ? 'Yes' : 'No'
        }
    }

};
</script>
<style lang="scss">
.d-flex {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    gap: 20px;

    .card {
        background-color: gray;
        backdrop-filter: blur(20px);
        width: 80px;
        height: 80px;
    }
}
</style>