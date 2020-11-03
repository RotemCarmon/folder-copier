<template>
  <section class="copier-app-container">
    <b-container class="mx-auto mb-3">
      <student-list
        class="mb-4"
        :students="students"
        @setStudent="setStudent"
      />

      <b-row class="justify-content-center px-5 mb-4">
        <b-col>
          <b-form-select
            v-model="sprint"
            :options="sprints"
            class="curser"
          ></b-form-select>
        </b-col>
        <b-col>
          <b-form-select
            v-model="delivery"
            :options="deliveries"
            class="curser"
          ></b-form-select>
        </b-col>
        <b-col>
          <b-button @click="onCopy()" variant="success" class="w-100"
            >Copy Now</b-button
          >
        </b-col>
      </b-row>

      <schedule-cmp @setSchedule="onCopy" />
    </b-container>
    <div>
      <!-- MODAL -->
      <b-modal id="bv-modal-example" hide-footer>
        <h3 class="text-center">{{ msg }}</h3>
        <b-button
          class="mt-3"
          :variant="variant"
          block
          @click="$bvModal.hide('bv-modal-example')"
          >Close Me</b-button
        >
      </b-modal>
    </div>
  </section>
</template>

<script>
import { copierService } from "../services/copierService.js";
import studentList from "./student-list.vue";
import scheduleCmp from "./schedule-cmp.vue";

export default {
  name: "copier-app",
  data() {
    return {
      srcInput: "",
      students: null,
      sprint: "Sprint2",
      delivery: "Wednesday",
      sprints: ["Sprint1", "Sprint2", "Sprint3", "Sprint4"],
      deliveries: ["Wednesday", "Thursday", "Saturday"],
      chosenStudents: [],
      msg: "",
      variant: "success",
    };
  },
  created() {
    this.onGetStudents();
  },
  methods: {
    async onGetStudents() {
      this.students = await copierService.getStudents();
    },
    setStudent(student) {
      if (!this.chosenStudents.includes(student))
        this.chosenStudents.push(student);
      else {
        const idx = this.chosenStudents.findIndex((s) => s === student);
        this.chosenStudents.splice(idx, 1);
      }
    },

    onCopy(dateTime = "") {
      if (!this.chosenStudents.length) {
        this.variant = "danger";
        this.msg = "Most choose students";
        return this.showModal();
      }
      const payload = {
        students: this.chosenStudents,
        sprint: this.sprint,
        delivery: this.delivery,
        dateTime,
      };
      this.variant = "success";
      if (dateTime) this.msg = "A Schedule was made";
      else this.msg = "A Copy was made";

      copierService.onCopy(payload).then((res) => {
        this.showModal();
        this.resetSelectedStudents();
        console.log("Copy returned ", res);
      });
    },

    resetSelectedStudents() {
      this.students.forEach((student) => {
        student.isChacked = false;
      });
      this.chosenStudents = [];
    },
    showModal() {
      this.$bvModal.show("bv-modal-example");
      setTimeout(() => this.$bvModal.hide("bv-modal-example"), 3000);
    },
  },
  components: {
    studentList,
    scheduleCmp,
  },
};
</script>
<style>
.curser {
  cursor: pointer;
}
</style>
