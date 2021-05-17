<template>
  <v-app app >
    <v-main >
      <router-view fluid></router-view>
    </v-main>
  </v-app>
  
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },

  data: () => ({
    //
    menubar:true
  }),
};
</script>

<style>
main{
  background-image:url('./assets/wallpaper-Login.jpg');
  background-size:cover;
}
</style>