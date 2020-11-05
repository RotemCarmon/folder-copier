<template>
  <b-card class="p-3 mb-4">
    <b-row class="mb-4">
      <input
        v-model="mustTxt"
        placeholder="Must match (enter comma seperated values)"
        class="pl-2 w-100"
        type="text"
        id="must-match"
      />
    </b-row>
    <b-row class="mb-4">
      <input
        v-model="optionalTxt"
        placeholder="Optional match (enter comma seperated values)"
        class="pl-2 w-100"
        type="text"
        id="opt-match"
      />
    </b-row>
    <b-row class="">
      <b-button @click="onCopy()" variant="success" class="w-100"
        >Copy Now</b-button
      >
    </b-row>
  </b-card>
</template>

<script>
export default {
  name:'input-cmp',
  data(){
    return {
      mustTxt: '',
      optionalTxt: ''
    }
  },
  methods: {
    onCopy(){
      this.$emit('copy', {mustTxt: this.mustTxt, optionalTxt:this.optionalTxt })
    }
  },
};
</script>