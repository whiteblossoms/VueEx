// @ts-nocheck
<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
      pageName="users"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
// import MyForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import { useStore } from '../../../../store'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import MyForm from '@/base-ui/form'
import { modalConfig } from './config/modal.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },

  setup() {
    // const userCount = computed(() => store.state.system.userCount)

    // const pageContentRef = ref<InstanceType<typeof PageContent>>()
    let [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    handleQueryClick = handleQueryClick as () => void
    handleResetClick = handleResetClick as () => void

    const newCallback = () => {
      const passwordItem = modalConfig.formItems?.find((item) => item.field === 'password')
      passwordItem!.isHidden = false
      console.log(passwordItem)
    }

    const editCallback = () => {
      const passwordItem = modalConfig.formItems?.find((item) => item.field === 'password')
      passwordItem!.isHidden = true
      console.log(passwordItem)
    }

    let [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
      newCallback,
      editCallback
    )

    handleNewData = handleNewData as () => void
    handleEditData = handleEditData as () => void

    const store = useStore()

    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId')

      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')

      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      newCallback,
      editCallback,
      modalConfigRef
    }
  }
})
</script>

<style scoped>
/* .content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
} */
</style>
