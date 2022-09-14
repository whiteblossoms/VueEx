import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      label: '角色名称',
      type: 'input',
      rules: [],
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      label: '权限介绍',
      type: 'input',
      rules: [],
      placeholder: '请输入权限介绍'
    },
    {
      field: 'createTime',
      label: 'createDate',
      type: 'datepicker',
      rules: [],
      placeholder: 'Please choose date',
      otherOptions: {
        startPlaceholder: 'startTime',
        endPlaceholder: 'endTime',
        type: 'daterange'
      }
    }
  ],

  labelWidth: '120px',

  itemLayout: {
    padding: '10px 40px'
  }
}
