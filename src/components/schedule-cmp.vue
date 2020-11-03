<template>
  <b-card>
    <b-row class="justify-content-around align-items-center"  sm="d-flex flex-column">
      <h4 class="">Schedule a copy</h4>
      <date-time
        input-class="date-time curser"
        v-model="dateTime"
        type="datetime"
      ></date-time>
      <b-button @click="setSchedule" variant="secondary"
        >Schedule a copy</b-button
      >
    </b-row>
  </b-card>
</template>

<script>
import { Datetime } from "vue-datetime";
export default {
  name: "schedule-cmp",
  data() {
    return {
      dateTime: new Date().toISOString(),
    };
  },
  methods: {
    setSchedule() {
      this.$emit("setSchedule", this.dateTime);
    },
  },
  components: {
    dateTime: Datetime,
  },
};
</script>

<style>
.date-time {
  display: flex;
  flex-grow: 1;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>