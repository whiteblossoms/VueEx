<template>
  <div class="login-phone">
    <el-form label-width="120px">
      <el-form-item label="Password">
        <el-input type="password" />
      </el-form-item>
      <el-form-item label="Confirm">
        <el-input type="password" />
      </el-form-item>
      <el-form-item label="Age">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
