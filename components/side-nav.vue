<template lang="html">
  <div class="side-nav-container" :class="{'closed': $store.state.openMenu}">
    <div class="search">
      <search-field
        placeholder="Search"
        v-model="searchedMenus"
        :searchdata="menus"
        sideNavStyle
      />
    </div>

    <div class="menu-container">
      <div v-for="menu in searchedMenus" :class="{'disabled' : menu.disabled}" class="one-menu">
        <a
          v-if="!menu.disabled"
          :href="`/${menu.path}`"
          @click="closeMenu()"
        >
          <img :src="menu.icon" alt="">

          <span>{{menu.name}}</span>
        </a>
        <a v-else>
          <img :src="menu.icon" alt="">

          <span>{{menu.name}}</span>
        </a>
      </div>

      <div v-if="!searchedMenus.length" class="empty-state">
        <img src="empty.svg" alt="">
        <span>Sorry! No results found...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: 'events.svg',
          name: 'Exhibitions & Events',
          path: 'exhibition',
          disabled: true
        },
        {
          icon: 'artists.svg',
          name: 'Artists & Artworks',
          path: 'artists',
          disabled: true
        },
        {
          icon: 'collections.svg',
          name: 'Collections',
          path: '',
          disabled: false
        },
        {
          icon: 'tickets.svg',
          name: 'Plan Your Visit',
          path: 'tickets',
          disabled: false
        },
        {
          icon: 'membership.svg',
          name: 'Become a Member',
          path: 'membership',
          disabled: true
        },
        {
          icon: 'shop.svg',
          name: 'Shop',
          path: 'shop',
          disabled: true
        },
      ],
      searchedMenus: []
    }
  },
  methods: {
    closeMenu() {
      this.$store.dispatch('setOpenMenuAction', true)
    },
  }
}
</script>

<style lang="scss" scoped>
.side-nav-container {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 310px;
  padding: $space-m;
  height: 100%;
  background: $primary-color;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  transition: all .2s ease;
}
.closed {
  left: -310px;
  box-shadow: none;
  transition: all .2s ease;
}
.search {
  margin-bottom: 32px;
}
.disabled {
  opacity: .5;

  a {
    cursor: default;
  }
}
.one-menu {
  margin-bottom: 32px;

  span {
    font-size: 18px;
  }
  img {
    width: 24px;
    height: 26px;
    margin-right: $space-s;
  }
  a {
    user-select: none;
    display: flex;
    align-items: flex-end;
    text-decoration: none;
    color: white;
  }
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  opacity: .8;

  img {
    width: 34px;
    margin-bottom: $space-s;
  }
}
</style>
