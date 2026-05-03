<script lang="ts">
import Vue from 'vue';

interface CalendarProps {
  value?: Date;
}

export default Vue.extend({
  name: 'SCalendar',
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentDate: new Date()
    };
  },
  computed: {
    year(): number {
      return this.currentDate.getFullYear();
    },
    month(): number {
      return this.currentDate.getMonth() + 1;
    },
    day(): number {
      return this.currentDate.getDate();
    },
    weekDays(): string[] {
      return ['日', '一', '二', '三', '四', '五', '六'];
    },
    monthNames(): string[] {
      return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    },
    calendarDays(): (number | null)[] {
      const y = this.year;
      const m = this.month;
      const firstDay = new Date(y, m - 1, 1).getDay();
      const daysInMonth = new Date(y, m, 0).getDate();
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
    isToday(d: number | null): boolean {
      if (!d) return false;
      const today = new Date();
      return d === today.getDate() && this.month === today.getMonth() + 1 && this.year === today.getFullYear();
    },
    isSelected(d: number | null): boolean {
      if (!d) return false;
      return d === this.day;
    },
    selectDay(d: number | null) {
      if (d !== null) {
        this.currentDate = new Date(this.year, this.month - 1, d);
        this.$emit('change', this.currentDate);
      }
    },
    prevMonth() {
      this.currentDate = new Date(this.year, this.month - 2, 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.year, this.month, 1);
    }
  }
});
</script>

<template>
  <div class="sw-calendar">
    <div class="sw-calendar__header">
      <span class="sw-calendar__title">{{ year }}年{{ monthNames[month - 1] }}</span>
      <div class="sw-calendar__nav">
        <button class="sw-calendar__nav-btn" @click="prevMonth">‹</button>
        <button class="sw-calendar__nav-btn" @click="nextMonth">›</button>
      </div>
    </div>
    <div class="sw-calendar__week">
      <span v-for="d in weekDays" :key="d" class="sw-calendar__week-item">{{ d }}</span>
    </div>
    <div class="sw-calendar__days">
      <div
        v-for="(d, index) in calendarDays"
        :key="index"
        class="sw-calendar__day"
        :class="{
          'sw-calendar__day--other': d === null,
          'sw-calendar__day--today': isToday(d),
          'sw-calendar__day--selected': isSelected(d)
        }"
        @click="selectDay(d)"
      >
        {{ d || '' }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/calendar.scss';
</style>