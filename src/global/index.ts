import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'
/**use 自动传入app 作为参数 调用 */
export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}
