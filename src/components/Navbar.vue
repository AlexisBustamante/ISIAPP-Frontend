<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    dark
    app
    permanent 
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
                <v-img :src="require('../assets/Snake.svg')" contain />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title > {{ usr_name }} </v-list-item-title>
        <v-list-item-subtitle> {{usr_rol}} </v-list-item-subtitle>
      </v-list-item-content>
      <v-btn icon @click="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.ruta">
        <v-list-item-icon>
          <v-icon dark>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item link @click="signOUT()">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Cerrar Sesión </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>


<script>
export default {
  data: () => ({
    items: [
      { title: "Perfil", icon: "mdi-view-dashboard", ruta: "/profile" },
      { title: "Mis Clientes", icon: "mdi-account", ruta: "/clientes" },
    { title: "Vehiculos", icon: "mdi-car", ruta: "/vehiculos" }
    ],
    right: null,
    mini: false,
  }),
  methods: {
    signOUT() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
  props: ["usr_name","usr_rol"],
};
</script>