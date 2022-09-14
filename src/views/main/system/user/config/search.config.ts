import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      label: 'ID',
      type: 'input',
      placeholder: 'Please enter your ID'
    },
    {
      field: 'name',
      label: 'userName',
      type: 'input',
      rules: [],
      placeholder: 'Please enter userName'
    },
    {
      field: 'realname',
      label: 'realName',
      type: 'input',
      rules: [],
      placeholder: 'Please enter realName'
    },
    {
      field: 'cellphone',
      label: 'cellPhone',
      type: 'input',
      placeholder: 'Please enter cellPhone'
    },
    {
      field: 'enable',
      label: 'status',
      type: 'select',
      rules: [],
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ],
      placeholder: 'Choose status'
    },
    {
      field: 'createAt',
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
