<template>
<v-container fluid>
    <Navbar :usr_name="user.usr_name" :usr_rol="user.usr_rol"> </Navbar>

    <v-card elevation="24" dark :style="'border: 1px solid grey'">
    <v-card-title>
    Nuevo Prospecto
    </v-card-title>
    <v-divider></v-divider>
        <v-card-text>
            <v-form outlined ref="addProspectoForm" @submit.prevent="addProspecto()">

                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-menu dark ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="FechaCaptacion" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="FechaCaptacion" label="Fecha Captación" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="FechaCaptacion" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="error" @click="menu = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(FechaCaptacion)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field name="Contacto" label="Contacto" v-model="contacto" :rules="campoObligatorio"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field name="name" label="Procedencia" id="Procedencia" v-model="procedencia" :rules="campoObligatorio"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field name="visitaClinica" label="Visita Clinica" id="visitaClinica" v-model="visitaClinica"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="1">
                        <v-text-field name="hab" label="Hab" id="hab" v-model="hab"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="2" sm="6" md="6">
                        <v-text-field name="nombrePaciente" label="Nombre del Paciente" id="nombrePaciente" v-model="nombrePaciente" :rules="campoObligatorio"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="6">
                        <v-text-field name="Diagnostico" label="Diagnóstico" id="Diagnostico" v-model="diagnostico" :rules="campoObligatorio"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2" sm="6" md="4">
                        <v-text-field name="medicoTratante" label="Médico Tratante" id="medicoTratante" v-model="medicoTratante"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="4">
                        <v-text-field name="especialidadMédica" label="Especialidad Médica" id="especialidadMédica" v-model="especialidadMédica"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="2">
                        <v-text-field name="pediatrico" label="Pediátrico" id="pediatrico" v-model="pediatrico"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="2">
                        <v-text-field name="prc_exito" label="% de éxito" id="prc_exito" v-model="prc_exito"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="2" sm="6" md="4">
                        <v-text-field name="tratamiento_atbx" label="Tratamiento ATBX" id="tratamiento_atbx" v-model="tratamiento_atbx"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="2">
                        <v-text-field name="nivel" label="Nivel" id="nivel" v-model="nivel"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="2">
                        <v-text-field name="tipo" label="Tipo" id="tipo" v-model="tipo"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="4">
                        <v-text-field name="prevision" label="Previsión" id="Previsión" v-model="prevision"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="2" sm="6" md="4">
                        <v-text-field name="financiador" label="Financiador" id="financiador" v-model="financiador"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="3">
                        <v-autocomplete ref="estado" v-model="estado" :rules="[() => !!estado || 'This field is required']" :items="estadoArr" label="Estado" placeholder="Select..." required></v-autocomplete>
                    </v-col>
                    <v-col cols="2" sm="6" md="3">
                        <v-text-field label="Monto Mes APP" prefix="$" value="0" v-model="montomesapp"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2" sm="6" md="6">
                        <v-text-field name="motivo" label="Motivo" id="motivo" v-model="motivo"></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="6">
                        <v-text-field name="comentario" label="Comentario" id="comentario" v-model="comentario"></v-text-field>
                    </v-col>
                </v-row>
                <v-btn block color="primary" dark type="submit">Guardar</v-btn>
            </v-form>
        </v-card-text>
    </v-card>

</v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
    data: () => ({
        user: {},
        obProspecto: {},
        contacto: '',
        visitaClinica: '',
        hab: '',
        nombrePaciente: '',
        pediatrico: '',
        especialidadMédica: '',
        pediatrico: '',
        medicoTratante: '',
        prc_exito: '',
        tratamiento_atbx: '',
        nivel: '',
        tipo: '',
        prevision: '',
        estado: '',
        motivo: '',
        contacto: '',
        comentario: '',
        financiador: '',
        diagnostico: '',
        montomesapp: 0,
        procedencia: '',
        estadoArr: ['APROBADO', 'RECHAZADO', 'PENDIENTE'],
        campoObligatorio: [
            v => !!v || 'Campo obligatorio'
        ],
        FechaCaptacion: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        step: 1,
        details: false,
        load: false,
        edit: false,
        del: false,
        add: false,
        search: "",
        year: new Date().getFullYear(),
        clienteToAdd: {
            usr_id: 0,
        },
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: "c_id",
        keys: ["c_id"],
        user: {},
        alert: {
            show: false,
            message: "Error",
            type: "error",
        },
    }),
    created: async function () {
        //cuando se carga la vista se cargan los datos del usuario que ingresó
        this.user = JSON.parse(sessionStorage.getItem("session"));
        if (this.user == null) {
            this.$router.push("/");
            //se redirecciona al Home si el objeto storage noe xistwe
        } else {
            try {
                //console.log(this.user);
                //const res = await this.axios.post("/prospectos/mis-prospectos", this.user);

                // console.log(res.data);

                //this.ProspectosListar = res.data;
            } catch (error) {
                console.log(error);
            }
        }
    },

    methods: {
        async addProspecto() {
            //console.log(this.user);
            let valid = this.$refs.addProspectoForm.validate();
            if (valid) {

                this.obProspecto.FechaCaptacion = this.FechaCaptacion;
                this.obProspecto.contacto = this.contacto;
                this.obProspecto.visitaClinica = this.visitaClinica;
                this.obProspecto.hab = this.hab;
                this.obProspecto.nombrePaciente = this.nombrePaciente;
                this.obProspecto.especialidadMedica = this.especialidadMedica;
                this.obProspecto.pediatrico = this.pediatrico;
                this.obProspecto.medicoTratante = this.medicoTratante;
                this.obProspecto.prc_exito = this.prc_exito;
                this.obProspecto.tratamiento_atbx = this.tratamiento_atbx;
                this.obProspecto.nivel = this.nivel;
                this.obProspecto.tipo = this.tipo;
                this.obProspecto.prevision = this.prevision;
                this.obProspecto.estado = this.estado;
                this.obProspecto.motivo = this.motivo;
                this.obProspecto.contacto = this.contacto;
                this.obProspecto.comentario = this.comentario;
                this.obProspecto.financiador = this.financiador;
                this.obProspecto.diagnostico = this.diagnostico;
                this.obProspecto.montomesapp = this.montomesapp;
                this.obProspecto.procedencia = this.procedencia;
                this.obProspecto.idusr = this.user.id_usr;
                this.obProspecto.fechaingreso = null;
                this.obProspecto.fecharechazo = null;
                //console.log(this.obProspecto);

                try {
                    const res = await this.axios.post(
                        "/prospectos/nuevo",
                        this.obProspecto);
                    this.$router.push("/prospectos");

                } catch (error) {}
                console.log('error backend');
               
            }
        }
    },
    computed: {

    },
    components: {
        Navbar,
    },
};
</script>
