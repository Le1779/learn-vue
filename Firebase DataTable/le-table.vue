<template>
    <div>
        <table class="user-table">
            <thead>
                <tr>
                    <th>account</th>
                    <th>platform</th>
                    <th>creat date</th>
                    <th>last login time</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="data in table_data">
                <tr>
                    <td>{{data.Email}}</td>
                    <td>{{data.Item}}</td>
                    <td>{{data.Date}}</td>
                    <td>{{data.Expired}}</td>
                    <td>
                        <div class="fa fa-trash button_icon" @click="showDeleteDialog(data.Email)"></div>
                    </td>
                </tr>
            </tbody>
        </table>
        <le-dialog :dialog_info="dialog_info"></le-dialog>
    </div>
</template>

<script>
    let viewModel = {
        dialog_info: {
            showDialog: false,
            title: '刪除紀錄',
            type: 'delete_hint',
            content: {
                Email: 'kevinle@dynacw.com',
                Item: '華康中黑體',
                Data: '2019/10/31',
                Expired: '2019/11/02'
            }
        }
    };
    module.exports = {
        props: ["table_data"],
        data: function() {
            return viewModel
        },
        methods: {
            showDeleteDialog(email) {
                viewModel.dialog_info.showDialog = true;
                viewModel.dialog_info.content.Email = email;
            }
        },
        components: {
            'le-dialog': httpVueLoader('../Dialog/le-dialog.vue')
        }
    }

</script>

<style scoped>
    table {
        border-spacing: 0;
        border-collapse: separate;
        width: 100%;
        text-align: left;
    }

    th {
        font-size: 12px;
        background-color: #FAFAFA;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        padding: 8px 24px;
        font-weight: 500;
        text-align: left;
        color: rgba(0, 0, 0, 0.54);
    }

    tbody {
        background-color: #FFFFFF;
    }

    tbody:hover {
        background-color: #F0F0F0;
    }

    td {
        color: rgba(0, 0, 0, 0.54);
        font-size: 13px;
        line-height: 16px;
        height: 48px;
        padding: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        white-space: nowrap;
        padding: 10px 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    tbody:hover .button_icon {
        opacity: 1;
    }

    .button_icon {
        opacity: 0;
        font-size: 16px;
        vertical-align: middle;
        align-items: center;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        color: rgba(0, 0, 0, .52);
        line-height: 40px;
        background: none;
        box-shadow: none;
        border: none;
    }

    .button_icon:hover {
        color: rgba(0, 0, 0, .78);
    }

</style>
