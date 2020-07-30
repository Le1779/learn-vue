<template>
    <div class="card-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="{
                title: 'No.',
                text: 'WO-20200729-FFFF',
                class: 'md'
            }"></textview>
        </div>
        <div class="detail-container">
            <div>
                <textview :model="{
                    title: '專案名稱',
                    text: '一號工單',
                    class: 'sm'
                }"></textview>
            </div>
            <div>
               <router-link :to="{name:'WO_COST'}" class="formula">
                   <textview :model="{
                        title: '總工時',
                        text: '2.5天',
                        class: 'md'
                    }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{
                        title: '參與人數',
                        text: 2,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">x</div>
                    <textview :model="{
                        title: '人力成本(天/元)',
                        text: 2000,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{
                        title: '成本概算',
                        text: 10000,
                        class: 'md red'
                    }"></textview>
               </router-link>
            </div>
            <div>
                <router-link :to="{name:'WO_EDIT'}" class="formula">
                    <textview :model="{
                        title: '編輯次數',
                        text: 1,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{
                        title: '送單數量',
                        text: 5,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{
                        title: '編輯率',
                        text: '20%',
                        class: 'md'
                    }"></textview>
                </router-link>
            </div>
            <div>
                <router-link :to="{name:'WO_REJECT'}" class="formula">
                    <textview :model="{
                        title: '退單次量',
                        text: 2,
                        class: 'md red'
                    }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{
                        title: '送單數量',
                        text: 5,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{
                        title: '退單率',
                        text: '40%',
                        class: 'md red'
                    }"></textview>
                </router-link>
            </div>
            <div>
                <router-link :to="{name:'WO_REOPEN'}" class="formula">
                    <textview :model="{
                        title: '重啟次數',
                        text: 1,
                        class: 'md red'
                    }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{
                        title: '送單數量',
                        text: 5,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{
                        title: '重啟率',
                        text: '20%',
                        class: 'md red'
                    }"></textview>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({

        }),

        watch: {

        },

        created() {
            console.log("created wo detail");
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
        },

        methods: {
            back() {
                this.$router.back(-1)
            }
        },
    }

</script>

<style scoped>
    .card-container {
        width: 100%;
    }

    .detail-container {
        margin: 12px 48px 48px;
    }

    .formula {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto auto auto;
        border: 1px solid #C1C1C1;
        border-radius: 8px;
        margin: 8px 12px;
        padding: 24px 12px;
        text-decoration:none;
    }

    .symbol {
        display: inline;
        color: #7E7E7E;
        font-size: 16px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }
    
</style>
