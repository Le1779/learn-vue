<template>
    <div>
        <div class="column">
            <le-input :input_info="account_input_info"></le-input>
        </div>
        <div class="column">
            <le-input :input_info="product_input_info"></le-input>
        </div>
        <div class="column">
            <le-input :input_info="amount_input_info"></le-input>
        </div>
        <div class="column">
           <le-date-picker :input_info="purchase_date_input_info"></le-date-picker>
        </div>
        <div class="column">
           <le-date-picker :input_info="expire_date_input_info"></le-date-picker>
        </div>
        <div class="dialog-actions">
           <le-button :show_text="cancel_text" :type="cancel_button_type" @click.native="doCancel"></le-button>
            <le-button :show_text="create_text" @click.native="doCreate"></le-button>
        </div>
    </div>
</template>

<script>
    let viewModel = {
        create_text: '建立',
        cancel_text: '取消',
        cancel_button_type: 'cancel',
        account_input_info: {
            isFocus: false,
            id: 'account',
            title: '購買帳號',
            data: '',
        },
        product_input_info: {
            isFocus: false,
            id: 'product',
            title: '購買字型',
            data: '',
        },
        amount_input_info: {
            isFocus: false,
            id: 'amount',
            title: '購買金額',
            data: '',
        },
        purchase_date_input_info: {
            isFocus: false,
            id: 'purchase_date',
            title: '購買時間',
            data: '',
        },
        expire_date_input_info: {
            isFocus: false,
            id: 'expire_date',
            title: '到期日',
            data: '',
        },
    };

    module.exports = {
        props: {
            callback: Function
        },
        data: function() {
            return viewModel
        },
        methods: {
            doCreate() {
                console.log('create');
                let postData = {
                    account: viewModel.account_input_info.data,
                    product: viewModel.product_input_info.data,
                    amount: viewModel.amount_input_info.data,
                    purchase: viewModel.purchase_date_input_info.data,
                    expire: viewModel.expire_date_input_info.data
                }
                console.log(postData);
                //TODO: ajax 執行建立api
                this.cleanData();
                this.callback('complete');
            },
            doCancel(){
                this.cleanData();
                this.callback('cancel');
            },
            checkInput(){
                
            },
            cleanData(){
                console.log("cleanData");
                viewModel.account_input_info.data = null;
                viewModel.product_input_info.data = null;
                viewModel.amount_input_info.data = null;
                viewModel.purchase_date_input_info.data = null;
                viewModel.expire_date_input_info.data = null;
            }
        },
        components: {
            'le-button': httpVueLoader('../Dialog/le-button.vue'),
            'le-input': httpVueLoader('../Material Input/le-input.vue'),
            'le-date-range-picker': httpVueLoader('../Material Input/le-date-range-picker.vue'),
            'le-date-picker': httpVueLoader('../Material Input/le-date-picker.vue'),
        }
    }

</script>

<style scoped>
    .column {
        padding: 10px 0;
    }

    .title {
        color: rgba(0, 0, 0, 0.54);
        padding-bottom: 5px;
    }

    .content {
        color: #73879C;
    }

    .activator-wrapper label {
        
    }

    .mdrp__panel.dropdown-menu.show-calendar.opens-arrow-pos-left {
        position: initial;
    }

    .mdrp__panel.dropdown-menu.show-calendar.opens-arrow-pos-left::before {
        display: none;
    }

</style>
