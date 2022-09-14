import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      goodsList: [],
      goodsCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction(context, payload) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'user':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }
      console.log(pageUrl)
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      const pName = pageName[0].toUpperCase() + pageName.slice(1)

      const { list, totalCount } = pageResult.data
      context.commit(`change${pName}List`, list)
      context.commit(`change${pName}Count`, totalCount)
    },
    async deletePageDataAction(context, payload: any) {
      const { pageName, id, queryInfo } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo
      })
    },
    async createPageDataAction({ dispatch }, payload) {
      console.log(1)
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      console.log(newData)
      await createPageData(pageUrl, newData)
      console.log(2)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 5
        }
      })
    },
    async editPageDataAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 5
        }
      })
    }
  }
}

export default systemModule
