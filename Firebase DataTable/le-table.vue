<template>
    <table class="user-table">
        <thead>
            <tr>
                <th>account</th>
                <th>platform</th>
                <th>creat date</th>
                <th>last login time</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>le8419951779@gmail.com</td>
                <td>facebook</td>
                <td>2019/10/28</td>
                <td>2019/11/11</td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>le8419951779@gmail.com</td>
                <td>google</td>
                <td>2019/10/28</td>
                <td>2019/11/11</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    let viewModel = {

    };
    module.exports = {
        props: ["table_data"],
        data: function() {
            return viewModel
        },
        methods: {

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
        color: rgba(0,0,0,0.54);
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

</style>
