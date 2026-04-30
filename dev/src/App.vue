<template>
  <div id="dev">
    <h2>SimpleWidget_for_vue2_DEV</h2>

    <h3>Button</h3>
    <SButton type="primary">Primary</SButton>
    <SButton type="success">Success</SButton>
    <SButton type="danger">Danger</SButton>

    <h3>Select</h3>
    <SSelect v-model="selectValue" placeholder="请选择">
      <SOption value="1" label="选项一" />
      <SOption value="2" label="选项二" />
      <SOption value="3" label="选项三" />
    </SSelect>

    <h3>Table</h3>
    <STable :data="tableData" :columns="tableColumns" border stripe hover select :num="true" />

    <h3>Badge</h3>
    <SBadge value="5" />
    <SBadge value="100" :max="99" />

    <h3>Tag</h3>
    <STag>标签一</STag>
    <STag type="success">成功标签</STag>
    <STag type="danger" :close="true">可关闭</STag>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      selectValue: '',
      tableData: [
        { name: '张三', age: 25, city: '北京' },
        { name: '李四', age: 30, city: '上海' },
        { name: '王五', age: 28, city: '广州' },
      ],
      tableColumns: [
        { key: 'name', title: '姓名', width: 120 },
        { key: 'age', title: '年龄', width: 100 },
        { key: 'city', title: '城市', width: 150 },
      ]
    };
  }
});
</script>

<style>
#dev {
  padding: 20px;
}
h3 {
  margin: 16px 0 8px;
}
</style>