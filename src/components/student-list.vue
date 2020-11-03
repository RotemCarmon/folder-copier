<template>
  <b-row class="justify-content-center">
    <student-preview
      v-for="student in students"
      :key="student.name"
      @setStudent="setStudent(student)"
      :student="student"
    />
  </b-row>
</template>

<script>
import studentPreview from "./student-preview.vue";
export default {
  props: {
    students: {
      type: Array,
    }
  },
  data() {
    return {
      myStudents: null,
    };
  },
  methods: {
    setStudent(student) {

      this.$emit('setStudent', student)
    },
  },
  components: {
    studentPreview,
  },
};
</script>

<style>
</style>