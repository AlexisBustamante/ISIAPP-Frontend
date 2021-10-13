<template>
  <v-container fluid>
    <Navbar :usr_name="user.usr_name" :usr_rol="user.usr_rol"> </Navbar>

    <v-alert text v-model="alert.show" :type="alert.type" dismissible>
      {{ alert.message }}
    </v-alert>

    <v-dialog max-width="650" v-model="edit">
      <v-card dark :style="'border: 1px solid grey'">
        <v-card-title>Crear Cliente Nuevo </v-card-title>

        <v-card-text>
          <v-form ref="editClienteForm" @submit.prevent="editCliente()">
            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-account-box-multiple"
                  label="Nombres"
                  :rules="[(v) => !!v || 'Nombre es requerido']"
                  v-model="clienteToEdit.c_nombre"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Apellidos"
                  :rules="[(v) => !!v || 'Apellidos es requerido']"
                  v-model="clienteToEdit.c_apellidos"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-card-account-details-outline"
                  label="Direccion"
                  :rules="[(v) => !!v || 'Direccion es requerido']"
                  v-model="clienteToEdit.c_direccion"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-phone-dial"
                  label="Telefono "
                  v-model="clienteToEdit.c_telefono"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-email"
                  label="E-mail"
                  :rules="emailRules"
                  v-model="clienteToEdit.c_email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn block class="primary mt-3" type="submit">Editar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog dark v-model="del" max-width="500">
      <v-card :style="'border: 1px solid grey'">
        <v-card-title
          >¿Desea eliminar al cliente {{ clienteToDelete.c_nombre }}
          {{ clienteToDelete.c_apellidos }}?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            v-model="clienteToDelete.c_id"
            text
            @click="EliminarCliente(clienteToDelete.c_id)"
          >
            Eliminar
          </v-btn>
          <v-btn color="blue darken-1" text @click="del = false">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


<v-dialog dark v-model="add" max-width="500">
      <v-card :style="'border: 1px solid grey'">

  <v-stepper vertical v-model="step" editable=true>
    <v-stepper-step step="1" :complete="step>1" >Datos Personales</v-stepper-step>

    <v-stepper-content step="1">

      <v-card dark :style="'border: 1px solid grey'">
        <v-card-title>Crear Cliente Nuevo </v-card-title>

        <v-card-text>
          <v-form ref="addClienteForm" @submit.prevent="addCliente()">
            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-account-box-multiple"
                  label="Nombres"
                  :rules="[(v) => !!v || 'Nombre es requerido']"
                  v-model="clienteToAdd.c_nombre"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Apellidos"
                  :rules="[(v) => !!v || 'Apellidos es requerido']"
                  v-model="clienteToAdd.c_apellidos"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-card-account-details-outline"
                  label="Direccion"
                  :rules="[(v) => !!v || 'Direccion es requerido']"
                  v-model="clienteToAdd.c_direccion"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-phone-dial"
                  label="Telefono "
                  v-model="clienteToAdd.c_telefono"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-email"
                  label="E-mail"
                  :rules="emailRules"
                  v-model="clienteToAdd.c_email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn block class="primary mt-3" type="submit">Agregar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
      <v-btn
        color="primary"
        @click="step = 2"
      >
        Continue
      </v-btn>

      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="2">vStepperStepText</v-stepper-step>


  </v-stepper>

      </v-card>
  

</v-dialog>



    <v-dialog max-width="650" v-model="addold">
      <v-card dark :style="'border: 1px solid grey'">
        <v-card-title>Crear Cliente Nuevo </v-card-title>

        <v-card-text>
          <v-form ref="addClienteForm" @submit.prevent="addCliente()">
            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-account-box-multiple"
                  label="Nombres"
                  :rules="[(v) => !!v || 'Nombre es requerido']"
                  v-model="clienteToAdd.c_nombre"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Apellidos"
                  :rules="[(v) => !!v || 'Apellidos es requerido']"
                  v-model="clienteToAdd.c_apellidos"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-card-account-details-outline"
                  label="Direccion"
                  :rules="[(v) => !!v || 'Direccion es requerido']"
                  v-model="clienteToAdd.c_direccion"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-phone-dial"
                  label="Telefono "
                  v-model="clienteToAdd.c_telefono"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-email"
                  label="E-mail"
                  :rules="emailRules"
                  v-model="clienteToAdd.c_email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn block class="primary mt-3" type="submit">Agregar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card elevation="24" dark :style="'border: 1px solid grey'">
      <v-card-title>
        Clientes
        <v-spacer></v-spacer>
        <v-btn class="success mt-3" @click="add = true">
        <v-icon>mdi-account-plus-outline
        </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        >
        </v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="ClientesListar" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon dark color="purple" class="mr-2" @click="details = true">
            mdi-account-details
          </v-icon>

          <v-icon
            dark
            color="primary"
            class="mr-2"
            @click="ReadClienteToEdit(item)"
          >
            mdi-pencil
          </v-icon>

          <v-icon dark color="red" class="mr-2" @click="ReadClientToDel(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

  </v-container>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
export default {
  data: () => ({
    step:1,
    details: false,
    load: false,
    edit: false,
    del: false,
    add: false,
    search: "",
    clienteToEdit: {},
    clienteToDelete: {},
    clienteToAdd: {
      usr_id: 0,
    },
    emailRules: [
      (value) => !!value || "Campo obligatorio",
      (value) => /.+@.+\..+/.test(value) || "Ingrese E-mail válido", ///expresion para validar un email
    ],
    headers: [
      { text: "Nombres", value: "c_nombre" },
      { text: "Apellidos", value: "c_apellidos" },
      { text: "Telefono", value: "c_telefono" },
      { text: "E-mail", value: "c_email" },
      { text: "Dirección", value: "c_direccion" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    itemsPerPageArray: [4, 8, 12],
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: "c_id",
    keys: ["c_id"],
    user: {},
    ClientesListar: [],
    alert: {
      show: false,
      message: "Error",
      type: "error",
    },
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
    ReadClientToDel(cliente) {
      this.clienteToDelete = cliente;
      this.del = true;
    },
    async EliminarCliente(c_id) {
      try {
        const res = await this.axios.delete(`/clientes/eliminar/${c_id}`);

        this.del = false;
        let pos = this.ClientesListar.findIndex((c) => c.c_id == c_id);
        this.coursesList.splice(pos, 1);

        this.alert.type = "succes";
        this.alert.show = true;
        this.alert.message = res.data.message;

        this.eliminar = false;
      } catch (error) {
        this.add = false;
        this.alert.show = true;
        this.alert.message = error.response.data.message;
        this.alert.type = "error";
      }
    },

    async addCliente() {
      //console.log(this.clienteToAdd);

      let valid = this.$refs.addClienteForm.validate();

      if (valid) {
        this.clienteToAdd.usr_id = this.user.id_usr;

        try {
          const res = await this.axios.post(
            "/clientes/nuevo-cliente",
            this.clienteToAdd
          );

          console.log(res);
          this.ClientesListar.push(res.data.cliente);
          this.ClientesListar.reverse();

          this.$refs.addClienteForm.reset();
          this.add = false;

          this.alert.show = true;
          this.alert.message = res.data.message;
          this.alert.type = "success";
        } catch (error) {
          // console.log(error);
          this.add = false;
          this.alert.show = true;
          this.alert.message = error.response.data.message;
          this.alert.type = "error";
        }
      }
    },
    ReadClienteToEdit(item) {
      this.clienteToEdit.c_id = item.c_id;
      this.clienteToEdit.c_nombre = item.c_nombre;
      this.clienteToEdit.c_apellidos = item.c_apellidos;
      this.clienteToEdit.c_email = item.c_email;
      this.clienteToEdit.c_telefono = item.c_telefono;
      this.clienteToEdit.c_direccion = item.c_direccion;
      this.clienteToEdit.usr_id=this.user.id_usr;
      this.edit = true;
    },

    async editCliente() {
      let valid = this.$refs.editClienteForm.validate();

      if (valid) {

        try {
          const res = await this.axios.put(
            `/clientes/editar/${this.clienteToEdit.c_id}`,
            this.clienteToEdit
          );

          const index = this.ClientesListar.findIndex(
            (c)=>c.c_id ==this.clienteToEdit.c_id
          );

          this.ClientesListar[index]=this.clienteToEdit;

          this.edit = false;
          this.alert.show = true;
          this.alert.message = res.data.message;
          this.alert.type = "success";

        } catch (error) {
          console.log(error);
          this.edit = false;
          this.alert.show = true;
          this.alert.message = error.response.data.message;
          this.alert.type = "error";
        }
      }
    },
  },
  components: {
    Navbar,
  },
};
</script>
