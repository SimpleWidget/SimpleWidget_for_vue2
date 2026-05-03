<script lang="ts">
import Vue from 'vue';

interface UploadProps {
  accept?: string;
  multiple?: boolean;
  limit?: number;
}

export default Vue.extend({
  name: 'SUpload',
  props: {
    accept: {
      type: String,
      default: '*'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      fileList: [] as string[],
      inputRef: null as HTMLInputElement | null
    };
  },
  methods: {
    handleClick() {
      (this.$refs.inputRef as HTMLInputElement)?.click();
    },
    handleChange(evt: Event) {
      const target = evt.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        this.$emit('change', files);
        Array.from(files).forEach(file => {
          const url = URL.createObjectURL(file);
          this.fileList.push(url);
        });
      }
    },
    handleRemove(index: number) {
      this.fileList.splice(index, 1);
    }
  }
});
</script>

<template>
  <div class="sw-upload">
    <input
      ref="inputRef"
      type="file"
      class="sw-upload__input"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
    />
    <div class="sw-upload__trigger" @click="handleClick">
      <span class="sw-upload__icon">+</span>
    </div>
    <span class="sw-upload__tip">点击上传</span>
    <div v-if="fileList.length" class="sw-upload__list">
      <div v-for="(url, index) in fileList" :key="index" class="sw-upload__item">
        <img :src="url" alt="" />
        <span class="sw-upload__remove" @click="handleRemove(index)">✕</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../theme/upload.scss';
</style>