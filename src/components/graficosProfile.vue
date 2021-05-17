<template>
<v-card
    class="mt-4 mx-auto"
    max-width="400"
    dark
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      :color="colorgrafico"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="4"
        padding="16"
        height=100
        label-size=12
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        User Registrations
      </div>
      <div class="subheading font-weight-light grey--text">
        Last Campaign Performance
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      labels: [
        
      ],
      value: [
        
      ],
      
    }),
    props: ["value","labels","colorgrafico"],
  }
  
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>