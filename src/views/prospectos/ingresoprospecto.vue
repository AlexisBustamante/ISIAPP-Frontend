<template>
<v-container fluid>
    <Navbar :usr_name="user.usr_name" :usr_rol="user.usr_rol"> </Navbar>

    <v-card elevation="24" dark :style="'border: 1px solid grey'">
    hola chaval
    </v-card>

</v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
    data: () => ({
        user: {},
        step: 1,
        details: false,
        load: false,
        edit: false,
        del: false,
        add: false,
        search: "",
        year: new Date().getFullYear(),
        clienteToEdit: {},
        clienteToDelete: {},
        clienteToAdd: {
            usr_id: 0,
        },
        emailRules: [
            (value) => !!value || "Campo obligatorio",
            (value) => /.+@.+\..+/.test(value) || "Ingrese E-mail válido", ///expresion para validar un email
        ],
        headers: [{
                text: "Fecha Captación",
                value: "fecha"
            },
            {
                text: "Paciente",
                value: "nombrepaciente"
            },
            {
                text: "Diagnóstico",
                value: "diagnostico"
            },
            {
                text: "Médico",
                value: "medicotratante"
            },
            {
                text: "Procedencia",
                value: "procedencia"
            },
            {
                text: "Estado",
                value: "estado"
            },
            {
                text: "Actions",
                value: "actions",
                sortable: false
            },
        ],
        itemsPerPageArray: [4, 8, 12],
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: "c_id",
        keys: ["c_id"],
        user: {},
        ProspectosListar: [],
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

    },
    computed: {

    },
    components: {
        Navbar,
    },
};
</script>
