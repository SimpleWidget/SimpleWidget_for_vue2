<template>
  <div id="dev">
    <h2>SimpleWidget_for_vue2_DEV</h2>

    <h3>Button</h3>
    <SButton type="primary">Primary</SButton>
    <SButton type="success">Success</SButton>
    <SButton type="danger">Danger</SButton>

    <h3>Input</h3>
    <SInput v-model="inputValue" placeholder="请输入" clear />
    <SInput type="password" v-model="passwordValue" placeholder="密码" showPassword style="margin-top: 10px; width: 200px;" />

    <h3>Textarea</h3>
    <STextarea v-model="textareaValue" placeholder="请输入文本" :rows="3" />

    <h3>Select</h3>
    <SSelect v-model="selectValue" placeholder="请选择">
      <SOption value="1" label="选项一" />
      <SOption value="2" label="选项二" />
      <SOption value="3" label="选项三" />
    </SSelect>

    <h3>Checkbox</h3>
    <SCheckbox v-model="checked">同意协议</SCheckbox>

    <h3>Radio</h3>
    <SRadio v-model="radioValue" label="1">选项一</SRadio>
    <SRadio v-model="radioValue" label="2">选项二</SRadio>

    <h3>Switch</h3>
    <SSwitch v-model="switchValue" />

    <h3>Table</h3>
    <STable :data="tableData" :columns="tableColumns" border stripe hover select :num="true" />

    <h3>Badge</h3>
    <SBadge value="5" />
    <SBadge value="100" :max="99" />

    <h3>Tag</h3>
    <STag>标签一</STag>
    <STag type="success">成功标签</STag>
    <STag type="danger" :close="true">可关闭</STag>

    <h3>Alert</h3>
    <SAlert type="success" title="成功提示">操作成功！</SAlert>

    <h3>Dialog</h3>
    <SButton type="primary" @click="dialogVisible = true">打开弹窗</SButton>
    <SDialog :visible.sync="dialogVisible" title="对话框标题" width="400">
      <p>这是对话框的内容区域</p>
      <template #footer>
        <SButton @click="dialogVisible = false">取消</SButton>
        <SButton type="primary" @click="dialogVisible = false">确定</SButton>
      </template>
    </SDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      inputValue: '',
      passwordValue: '',
      textareaValue: '',
      selectValue: '',
      checked: false,
      radioValue: '',
      switchValue: false,
      dialogVisible: false,
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