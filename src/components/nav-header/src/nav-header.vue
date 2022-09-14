<template>
  <div class="nav-header">
    <el-icon>
      <component :is="componentId" class="fold-menu" @click="toggle"></component>
    </el-icon>
    <div class="content">
      <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import Breadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    UserInfo,
    Breadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const componentId = ref('fold')
    const isFold = ref(false)
    const toggle = () => {
      if (componentId.value === 'fold') componentId.value = 'expand'
      else componentId.value = 'fold'
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      componentId,
      toggle,
      isFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;
  .fold-menu {
    cursor: pointer;
    margin-top: 2px;
  }

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
  }
}
</style>
