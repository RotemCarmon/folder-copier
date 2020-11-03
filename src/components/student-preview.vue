<template>
  <b-col
    @click="setStudent"
    xl="2"
    lg="3"
    md="4"
    sm="12"
    :class="badgeColor"
    class="m-1 h5 p-2 rounded student-badge"
  >
    {{ student.name }}
  </b-col>
</template>

<script>
export default {
  name: "student-preview",
  props: {
    student: {
      type: Object,
    },
  },
  data() {
    return {
      // isChacked: false,
    };
  },
  methods: {
    setStudent() {
      this.student.isChacked = !this.student.isChacked;
      this.$emit("setStudent", this.student);
    },
  },
  computed: {
    badgeColor() {
      return this.student.isChacked ? "badge-green" : "badge-secondary";
    },
  },
};
</script>

<style>
.student-badge {
  cursor: pointer;
  user-select: none;
}
.badge-green {
  background-color: #176f2c;
  color: #afafaf;
}
</style>