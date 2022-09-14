<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">Search</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><el-icon><refresh /></el-icon>&nbsp;Reset</el-button
          >

          <el-button type="primary" @click="handleQuery"
            ><el-icon><search /></el-icon>&nbsp;Search</el-button
          >
          <!-- <el-button type="primary" @click="handleQuery"
            ><Search /><el-icon><search /></el-icon>&nbsp;Search</el-button
          > -->
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    MyForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}

    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   console.log(key)
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // const formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createTime: ''
    // })

    const handleQuery = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQuery
    }
  }
})
</script>

<style scoped>
.header {
  color: salmon;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
