<template>
    <v-card max-width="400" class="mx-auto mt-10 elevation-10">
        <v-system-bar lights-out>
            <v-spacer></v-spacer>
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-cellular-outline</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>12:30</span>
        </v-system-bar>
        <v-toolbar dark>
            <v-btn icon class="hidden-xs-only">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title>Title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon class="hidden-xs-only">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-toolbar>
        <v-responsive :aspect-ratio="9/14">
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-text-field v-model="email" :rules="emailRules" :label="email_text" required></v-text-field>

                    <v-text-field v-model="password" :append-icon="showPas ? 'visibility' : 'visibility_off'" :rules="[rules.required, rules.min]" :type="showPas ? 'text' : 'password'" :label="password_text" :hint="password_hint_text" @click:append="showPas = !showPas"></v-text-field>
                    
                    <v-text-field v-if="registered" v-model="confirmPassword" :append-icon="showConfirmPas ? 'visibility' : 'visibility_off'" :rules="[rules.required, rules.min]" :type="showConfirmPas ? 'text' : 'password'" :label="confirm_password_text" :hint="password_hint_text" @click:append="showConfirmPas = !showConfirmPas"></v-text-field>

                    <v-btn dark color="blue-grey darken-1" class="mr-4" @click="validate">
                        Login
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-responsive>
    </v-card>
</template>

<script>
    let viewModel = {
        valid: true,
        registered: false,
        
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
        showPas: false,
        showConfirmPas: false,
        email_text: 'Email',
        password_text: 'Password',
        confirm_password_text: 'Confirm Password',
        password_hint_text: 'At least 8 characters',
        
        email: '',
        password: '',
        confirmPassword: '',
    };

    module.exports = {
        data: function() {
            return viewModel
        },
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            },
        },
        watch: {}
    }

</script>

<style scoped>


</style>
