<template>
  <div>
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          About Me
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Exit</el-dropdown-item>
            <el-dropdown-item divided>Your Info</el-dropdown-item>
            <el-dropdown-item>Settings</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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
