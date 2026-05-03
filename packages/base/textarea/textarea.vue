<script lang="ts">
import Vue from 'vue';

interface TextareaProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxlength?: number;
  showCount?: boolean;
}

export default Vue.extend({
  name: 'STextarea',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    },
    maxlength: {
      type: Number,
      default: undefined
    },
    showCount: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes(): object {
      return {
        'sw-textarea--disabled': this.disabled
      };
    }
  },
  methods: {
    handleInput(e: Event) {
      const target = e.target as HTMLTextAreaElement;
      this.$emit('update:modelValue', target.value);
    },
    handleFocus(e: FocusEvent) {
      this.$emit('focus', e);
    },
    handleBlur(e: FocusEvent) {
      this.$emit('blur', e);
    }
  }
});
</script>

<template>
  <div class="sw-textarea" :class="classes">
    <textarea
      class="sw-textarea__inner"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span v-if="showCount && maxlength" class="sw-textarea__count">
      {{ modelValue.length }} / {{ maxlength }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/textarea.scss';
</style>