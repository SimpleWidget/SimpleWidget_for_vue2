<script lang="ts">
import Vue from 'vue';
import SInput from '../input/input.vue';

interface DatePickerProps {
  value?: string;
  placeholder?: string;
}

export default Vue.extend({
  name: 'SDatePicker',
  components: { SInput },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    }
  },
  data() {
    return {
      isShow: false as boolean,
      selectedDate: '' as string,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1
    };
  },
  computed: {
    weekDays(): string[] {
      return ['日', '一', '二', '三', '四', '五', '六'];
    },
    calendarDays(): (number | null)[] {
      const year = this.currentYear;
      const month = this.currentMonth;
      const firstDay = new Date(year, month - 1, 1).getDay();
      const daysInMonth = new Date(year, month, 0).getDate();
      const result: (number | null)[] = [];

      for (let i = 0; i < firstDay; i++) {
        result.push(null);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        result.push(i);
      }
      return result;
    }
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 1) {
        this.currentMonth = 12;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    selectDay(day: number) {
      this.selectedDate = `${this.currentYear}-${this.currentMonth}-${day}`;
      this.$emit('input', this.selectedDate);
      this.$emit('change', this.selectedDate);
      this.isShow = false;
    },
    handleDayClick(day: number | null) {
      if (day !== null) {
        this.selectDay(day);
      }
    },
    toggleCalendar() {
      this.isShow = !this.isShow;
    }
  }
});
</script>

<template>
  <div class="sw-date-picker">
    <div class="sw-date-picker__input" @click="toggleCalendar">
      <SInput :value="value" :placeholder="placeholder" readonly />
    </div>
    <div v-if="isShow" class="sw-date-picker__calendar sw-date-picker__calendar--show">
      <div class="sw-date-picker__header">
        <span class="sw-date-picker__title">{{ currentYear }}年{{ currentMonth }}月</span>
        <div class="sw-date-picker__nav">
          <button class="sw-date-picker__nav-btn" @click="prevMonth">‹</button>
          <button class="sw-date-picker__nav-btn" @click="nextMonth">›</button>
        </div>
      </div>
      <div class="sw-date-picker__week">
        <span v-for="day in weekDays" :key="day" class="sw-date-picker__week-item">{{ day }}</span>
      </div>
      <div class="sw-date-picker__days">
        <template v-for="(day, index) in calendarDays" :key="index">
          <div
            v-if="day !== null"
            class="sw-date-picker__day"
            @click="handleDayClick(day)"
          >
            {{ day }}
          </div>
          <div v-else class="sw-date-picker__day sw-date-picker__day--other" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/date-picker.scss';
</style>