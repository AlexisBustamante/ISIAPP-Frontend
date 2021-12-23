<template>
<v-container fluid>

    <v-alert text v-model="alert.show" :type="alert.type" dismissible>
        {{ alert.message }}
    </v-alert>
    <v-row align="center" justify="center">
        <v-col align="center">
            <v-card dark class="ma-4" justify="center" elevation="24" max-width="420" max-height="430" shaped outlined :style="'border: 1px solid grey'">
                <v-row justify="center">
                    <v-avatar size="100 " class="ma-8">
                        <v-img :src="require('../assets/Snake.svg')" contain />
                    </v-avatar>
                </v-row>
                <v-row justify="center">
                    <v-card-title justify="center">Welcome to SnakeApp</v-card-title>
                </v-row>

                <v-card-text>
                    <v-form class="ma-3" @submit.prevent="" ref="signInForm">
                        <v-text-field label="E-mail" prepend-icon="mdi-email" v-model="user.email"></v-text-field>

                        <v-text-field label="Contraseña" prepend-icon="mdi-lock" type="password" v-model="user.password"></v-text-field>

                        <v-btn block class="success mt-3" type="submit" @click="signIn()">Sign In</v-btn>
                    </v-form>
                </v-card-text>

            </v-card>
        </v-col>
    </v-row>

</v-container>
</template>

<script>
// @ is an alias to /src

export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
        alert: {
            show: false,
            message: "Error",
            type: "error",
        },
        nameRules: [
            (value) => !!value || "Campo Obligatorio",
            (value) =>
            (value && value.length >= 5) ||
            "El nombre debe contener más de 5 carácteres",
        ],
        emailRules: [
            (value) => !!value || "Campo obligatorio",
            (value) => /.+@.+\..+/.test(value) || "Ingrese E-mail válido", ///expresion para validar un email
        ],
        passwordRules: [
            (value) => !!value || "Campo obligatorio",
            (value) =>
            (value && value.length >= 6) ||
            "El password debe contener más de 6 carácteres",
        ],
        user: {
            name: "",
            email: "",
            password: ""
        },
        suForm: true,
    }),

    methods: {
        async signUp() {
            //$refs . Nombre del Formulario.
            let valid = this.$refs.signupForm.validate();
            //console.log(valid);

            if (valid) {
                try {
                    //se le pasa el body this . user del formulario
                    const res = await this.axios.post("/signup", this.user);

                    this.$refs.signupForm.reset(); //todos lso cmapso en blanco ene l formulario
                    this.suForm = false;
                    //  console. log(res);

                    this.alert = {
                        show: true,
                        type: "success",
                        message: res.data.message,
                    };
                } catch (error) {
                    this.alert = {
                        show: true,
                        type: "error",
                        message: error.response.data.message,
                    };
                }
            }
        },

        async signIn() {
            let valid = this.$refs.signInForm.validate();
            //console.log(valid);

            if (valid) {
                try {
                    //se le pasa el objeto ocn los parametros.
                    const res = await this.axios.post("/signIn", this.user);

                    //este log se ve ene el navegador, ya que es frontend.
                    // console.log(res.data);

                    if (res.data.Notfound) {
                        this.alert = {
                            show: true,
                            message: res.data.message,
                            type: "error",
                        };
                    } else {
                        //si lopgra registrarse se añade a la ssesion storage el objeto usuario.
                        // console.log(res.data.name);
                        sessionStorage.setItem("session", JSON.stringify(res.data));
                        sessionStorage.setItem("displayMenu", false);
                        this.$router.push("/profile");

                        //se redirecciona a /profile
                    }
                } catch (error) {
                    this.alert = {
                        show: true,
                        type: "error",
                        message: error.response.data.message,
                    };
                }
            }
        },

    }, //methods
};
</script>

<style>


</style>
