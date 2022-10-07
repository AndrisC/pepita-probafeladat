export const state = () => ({
  openMenu: true,
})

export const mutations = {
  setOpenMenu( state, setTo ) {
    state.openMenu = setTo
  }
}

export const actions = {
  setOpenMenuAction( Vuex, setTo ) {
    Vuex.commit('setOpenMenu', setTo)
  },
}
