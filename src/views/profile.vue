<template>
  <v-container fluid>
    <Navbar :usr_name="user.usr_name" :usr_rol="user.usr_rol"> </Navbar>

    <v-row>
      <v-col>
        <graficos
          :value="value"
          :labels="labels"
          :colorgrafico="color1"
        ></graficos>
      </v-col>

      <v-col>
        <graficos
          :value="value"
          :labels="labels"
          :colorgrafico="color2"
        ></graficos>
      </v-col>

      <v-col>
        <graficos
          :value="value"
          :labels="labels"
          :colorgrafico="color3"
        ></graficos>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import graficos from "@/components/graficosProfile";
export default {
  data: () => ({
    color1: "green",
    color2: "primary",
    color3: "purple",
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
    alert: {
      show: false,
      message: "Error",
      type: "error",
    },
    edit: false,
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
    nameRules: [
      (value) => !!value || "Campo Obligatorio",
      (value) =>
        (value && value.length >= 5) ||
        "El nombre debe contener más de 5 carácteres",
    ],
    user: {
      id_usr: 0,
      usr_name: "Error",
      usr_email: "error",
    },
    userEdit: {
      idE: 0,
      nameE: "Error",
      emailE: "error",
      passwordE: "error",
    },
  }),

  created: function() {
    //cuando se carga la vista se cargan los datos del usuario que ingresó
    this.user = JSON.parse(sessionStorage.getItem("session"));

    if (this.user == null) {
      this.$router.push("/");
      //se redirecciona al Home si el objeto storage noe xistwe
    }
  },
  methods: {
    async editarPerfil() {
      let valid = this.$refs.editProfileForm.validate();
      if (valid) {
        try {
          const res = await this.axios.put(
            `/profile/${this.userEdit.idE}`,
            this.userEdit
          );

          this.user.name = this.userEdit.nameE;
          this.user.email = this.userEdit.emailE;
          this.user.passsword = this.userEdit.passwordE;

          this.userEdit.passwordE = "";
          //this.user.name=this.userEdit.nameE;
          sessionStorage.setItem("session", JSON.stringify(this.user));
          //modifico la session
          this.edit = false;

          this.alert.show = true;
          this.alert.message = res.data.message;
          this.alert.type = "success";
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("error");
      }
    },
  },

  components: {
    Navbar,
    graficos,
  },
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
