export const rules = {
  name: [
    {
      required: true,
      message: 'Please enter your account',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: 'Invalid account,try again',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please enter password',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: 'Invalid password,try again',
      trigger: 'blur'
    }
  ]
}
