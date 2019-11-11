<template>
    <div class="purchase-list-container">
        <div class="purchase-list-header">
            {{purchase_list_header_text}}
        </div>

        <div v-if="!isEmpty"  class="purchase-table-container">
            <table class="purchase-table" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody class="purchase-list-body" v-for="data in table_data">
                    <tr>
                        <td>{{data.Item}}</td>
                        <td>{{font_right_date_text}}</td>
                        <td>{{data.Date}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div v-else class="purchase-list-empty">
            {{table_emptu_text}}
        </div>
    </div>
</template>

<script>
    let viewModel = {
        purchase_list_header_text: '選購字型',
        font_right_date_text: '字型授權起迄時間',
        table_emptu_text: '您尚未訂閱任何字型',
        isEmpty: false,
    }

    module.exports = {
        props: ["table_data"],
        data: function() {
            return viewModel
        },
        mounted: function() {
            this.isEmpty = this.table_data.length == 0;
            console.log(this.table_data.length);
        }
    }

</script>

<style scoped>
    .purchase-list-container {
        width: 100%;
        height: 100%;
        border-radius: 20pt;
        overflow: hidden;
        border: 2pt solid #E8E8E8;
        margin-bottom: 60pt;
    }

    .purchase-list-header {
        height: 60pt;
        line-height: 60pt;
        background-color: black;
        color: white;
        padding-left: 30pt;
    }
    
    .purchase-table-container{
        height: 100%;
        overflow: auto;
    }

    .purchase-table {
        width: 100%;
        padding: 0pt 20pt;
    }

    .purchase-list-body {
        background-color: white;
        border: none;
    }

    .purchase-list-body td {
        padding: 30pt 0pt;
        text-align: center;
        border-bottom: 1pt solid #E8E8E8;
    }
    
    .purchase-list-empty{
        text-align: center;
        padding-top: 120pt;
    }

</style>
