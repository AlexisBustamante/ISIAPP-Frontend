<template>
<v-container fluid>

    <Navbar :usr_name="user.usr_name" :usr_rol="user.usr_rol"> </Navbar>
    <v-app-bar app dense dark elevation="24" height="50" :style="'border: 1px solid grey'">
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details>
        </v-text-field>
    </v-app-bar>



    <v-row>
        <v-col>
            <v-card dark :style="'border: 1px solid grey'" max-width="170">
                <v-card-subtitle>
                    <h4>Aprobados:</h4> <strong>{{cantAprobado}}</strong>
                </v-card-subtitle>
                <v-card-subtitle>
                    <h4>Rechazados:</h4> <strong>{{cantRechazado}}</strong>
                </v-card-subtitle>
                <v-card-subtitle>
                    <h4>Pendientes:</h4> <strong>{{cantPendiente}}</strong>
                </v-card-subtitle>
            </v-card>
        </v-col>

        <v-col cols="5" md="4">
            <ChartDonut :series="series" :labels="labels"></ChartDonut>
        </v-col>
        
        <v-col cols="1" sm="1" md="6">

        </v-col>

    </v-row>

    <v-row>
        <v-col cols="2" sm="2" md="2">
            <span v-show="false">
                {{valoresGrafico}}
            </span>
        </v-col>
    </v-row>

    <v-dialog dark v-model="del" max-width="500">
        <v-card :style="'border: 1px solid grey'">
            <v-card-title>¿Desea eliminar al Prospecto <br>
                {{ propectoToDel.nombrepaciente }}
                con fecha {{ propectoToDel.fecha }} ?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" v-model="propectoToDel.idventa" text @click="EliminarProspecto(propectoToDel.idventa)">
                    Eliminar
                </v-btn>
                <v-btn color="blue darken-1" text @click="del = false">
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-alert text v-model="alert.show" :type="alert.type" dismissible>
        {{ alert.message }}
    </v-alert>

    <v-row></v-row>

    <v-card elevation="24" dark :style="'border: 1px solid grey'">
        <v-card-title>
            {{cantPos}}
            <v-spacer></v-spacer>
            <v-btn 
            class="success mt-3" color="success" @click="exportar()">
                <v-icon>mdi-microsoft-excel
                </v-icon>
                Exportar
            </v-btn>
            <v-spacer></v-spacer>
 <v-btn 
            class="primary mt-3" color="primary" @click="ingresoProspecto()">
                <v-icon>mdi-account-plus-outline
                </v-icon>
                Ingresar Nuevo
            </v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="ProspectosListar" :search="search">
            <template v-slot:item.actions="{ item }">
                <v-icon dark color="primary" class="mr-2" @click="ReadProspectoToEdit(item)">
                    mdi-pencil
                </v-icon>
                <v-icon dark color="red" class="mr-2" @click="ReadProspectoToDel(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:item.estado="{ item }">
                <v-chip close-icon="mdi-close-outline" color="green" v-if="item.estado=='APROBADO'">
                    {{item.estado}}
                </v-chip>
                <v-chip close-icon="mdi-close-outline" color="#ff0017" v-if="item.estado=='RECHAZADO'">
                    {{item.estado}}
                </v-chip>
                <v-chip close-icon="mdi-close-outline" color="#ffb017" v-if="item.estado=='PENDIENTE'">
                    {{item.estado}}
                </v-chip>

            </template>
        </v-data-table>
    </v-card>
</v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ChartDonut from "@/components/ChartDonut.vue";
import ChartLines from "@/components/ChartLines.vue";
import XLSX from 'xlsx';


export default {
    data: () => ({
        ProspectoEdit: {},
        series: [],
        labels: ['Aprobados', 'Rechazados', 'Pendiente'],
        user: {},
        step: 1,
        filename:'Prospectos_',
        details: false,
        load: false,
        edit: false,
        del: false,
        add: false,
        search: "",
        year: new Date().getFullYear(),
        clienteToEdit: {},
        propectoToDel: {},
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
        sortBy: "idventa",
        keys: ["idventa"],
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
                const res = await this.axios.post("/prospectos/mis-prospectos", this.user);
                //console.log(res.data);
                this.ProspectosListar = res.data;
            } catch (error) {
                console.log(error);
            }
        }
    },

    methods: {
        ingresoProspecto() {
            //direcciono al formulario de ingreso
            this.$router.push("/prospectos/nuevo");
        },
        ReadProspectoToDel(item) {
            //console.log(item.idventa);
            //var idventa = item.idventa;
            this.propectoToDel = item;
            this.del = true;
        },
        ReadProspectoToEdit(item) {
            //console.log(item.idventa);}
            //envio ala vista editar
             this.$router.push(`/prospectos/editar/${item.idventa}`);

        },
        async EliminarProspecto(idventa) {

            //console.log(idventa);
            try {

                const res = await this.axios.delete(`/prospectos/eliminar/${idventa}`);

                this.del = false;
                let pos = this.ProspectosListar.findIndex((v) => v.idventa == idventa);
                this.ProspectosListar.splice(pos, 1);

                this.alert.type = "success";
                this.alert.show = true;
                this.alert.message = res.data.message;

            } catch (error) {

                this.add = false;
                this.alert.show = true;
                this.alert.message = error.response.data.message;
                this.alert.type = "error";
            }

        },
        exportar(){
            let data = XLSX.utils.json_to_sheet(this.ProspectosListar)
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, data, this.filename)
            XLSX.writeFile(workbook, `${this.filename}.xlsx`)

        }
    },
    computed: {
        cantPos: function () {
            // `this` apunta a la instancia vm
            return 'Prospectos al año ' + this.year + ' : ' + this.ProspectosListar.length
        },
        cantAprobado: function () {

            var arrResult = this.ProspectosListar.filter(p => p.estado == 'APROBADO');
            return arrResult.length;
        },
        cantRechazado: function () {
            var arrResult = this.ProspectosListar.filter(p => p.estado == 'RECHAZADO');
            return arrResult.length;
        },
        cantPendiente: function () {
            var arrResult = this.ProspectosListar.filter(p => p.estado == 'PENDIENTE');
            return arrResult.length;
        },
        valoresGrafico: function () {
            var arrResult1 = (this.ProspectosListar.filter(p => p.estado == 'APROBADO')).length;
            var arrResult2 = (this.ProspectosListar.filter(p => p.estado == 'RECHAZADO')).length;
            var arrResult3 = (this.ProspectosListar.filter(p => p.estado == 'PENDIENTE')).length;
            this.series = [];
            this.series.push(arrResult1);
            this.series.push(arrResult2);
            this.series.push(arrResult3);
        }
    },
    components: {
        Navbar,
        ChartDonut,
        ChartLines
    },
};
</script>
