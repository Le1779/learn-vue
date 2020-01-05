<template>
    <v-dialog v-model="dialog_model.show" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                   {{ pickedDate }}
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="dialog_model.item.Name" label="商品名稱"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-dialog ref="dialog" v-model="menu" :return-value.sync="pickedDate" persistent width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="showPickedDate" label="Picker in dialog" prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="pickedDate" scrollable range>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog.save(pickedDate)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="dialog_model.item.Price" label="售價"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select v-model="dialog_model.item.Unit" :items="unitItems" label="單位"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="dialog_model.item.Stock" label="庫存量"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select v-model="dialog_model.item.Area" :items="areaItems" label="銷售地區"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="dialog_model.item.Remark" label="商品敘述" outlined></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

           <v-card-actions class="px-7 py-0">
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="save">Search</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: ["dialog_model", "search_item"],

        data: () => ({
            menu: false,
            pickedDate: [],
            title: '搜尋商品',
            unitItems: ['個', '根', '箱', '袋'],
            areaItems: ['全區', '北區', '中區', '南區', '東區'],
            inStockItems: [
                {text: '', value: null}
            ]
        }),

        methods: {
            close() {
                this.dialog_model.show = false;
            },
            save() {
                this.loading = true;
                this.$emit('action', false)
            }
        },
        
        computed: {
            showPickedDate() {
                return this.pickedDate.length <= 1 ? null : this.pickedDate[0] + "~" + this.pickedDate[1]
            },
        },
        
        watch: {
            dialog_model: {
                handler(val) {
                    if (val.show) {
                        this.loading = false;
                    }
                },
                deep: true
            },
        }
    }

</script>

<style scoped>


</style>
