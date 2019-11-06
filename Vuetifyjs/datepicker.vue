<template>
    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field v-model="date" label="Picker without buttons" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
    </v-menu>
</template>


<script>
    module.exports = {
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
        }),
    }

</script>
