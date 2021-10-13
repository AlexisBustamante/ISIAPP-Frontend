<template>
  <v-container fluid>
    <Navbar :usr_name="user.usr_name" :usr_rol="user.usr_rol"> </Navbar>

    <v-alert text v-model="alert.show" :type="alert.type" dismissible>
      {{ alert.message }}
    </v-alert>

    

  </v-container>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
export default {
  data: () => ({
   
  }),

  created: async function() {
    //cuando se carga la vista se cargan los datos del usuario que ingresó
    this.user = JSON.parse(sessionStorage.getItem("session"));
    if (this.user == null) {
      this.$router.push("/");
      //se redirecciona al Home si el objeto storage noe xistwe
    } else {
      try {
        //console.log(this.user);
        const res = await this.axios.post("/clientes/mis-clientes", this.user);
        //console.log(res.data);
        this.ClientesListar = res.data;
      } catch (error) {
        console.log(error);
      }
    }
  },

  methods: {
    
  },
  components: {
    Navbar,
  },
};
</script>
