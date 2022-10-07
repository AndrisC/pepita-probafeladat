<template lang="html">
  <div class="nav-bar-wrapper">
    <div @click="$router.push('/')" class="nav-logo">
      <span>THE
        ART
        MUSEUM</span>
    </div>

    <div class="page-title">
      <h6>{{title}}</h6>
    </div>

    <div @click="closeMenu()" class="nav-button">
      <img src="bars-solid.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeMenu() {
      this.$store.dispatch('setOpenMenuAction', !this.$store.state.openMenu)
    },
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-wrapper {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  height: 60px;
  padding: $space-s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-logo {
  width: 50px;
  white-space: pre-line;
  font-weight: bold;
  font-size: 10px;
}
.page-title {
  color: $primary-color;

  h6 {
    font-weight: 600;
  }
}
.nav-button {
  height: 18px;
  padding: 0 $space-xs;
  margin-left: 32px;
  cursor: pointer;
  transition: all .2s ease;

  img {
    height: 100%;
  }
  &:hover {
    opacity: .7;
  }
}
</style>
