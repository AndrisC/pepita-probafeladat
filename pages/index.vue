<template lang="html">
  <div class="container">
    <nav-bar title="Collection"/>

    <div class="collections-container" @click="closeMenu($event)">
      <div ref="sidenav">
        <side-nav />
      </div>

      <div class="content-wrapper">
        <div class="search-container">
          <search-field
          class="search"
          placeholder="Explore the collection"
          v-model="searchedProducts"
          :searchdata="products"
          />
        </div>

        <div class="collection">
          <div v-for="oneItem in searchedProducts" :key="oneItem.id" class="one-item">
            <div class="item-img">
              <img :src="oneItem.img" alt="">
            </div>

            <span>{{oneItem.name}}</span>
          </div>
        </div>

        <div v-if="!searchedProducts.length" class="empty-state">
          <img src="empty-red.svg" alt="">
          <span>Sorry! No results found...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          img: 'deco.png',
          name: 'Decorative arts & crafts',
        },
        {
          id: 2,
          img: 'impress.png',
          name: 'American impressionism',
        },
        {
          id: 3,
          img: 'stijl.png',
          name: 'De stijl',
        },
        {
          id: 4,
          img: 'cubism.png',
          name: 'Cubism',
        },
        {
          id: 5,
          img: 'american.png',
          name: 'American',
        },
        {
          id: 6,
          img: 'greek.png',
          name: 'Greek antiquities',
        },
      ],
      searchedProducts: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("click", this.close)
    })
  },
  beforeDestroy() {
    window.removeEventListener("click", this.close)
  },
  methods: {
    closeMenu(e) {
      if (!this.$refs.sidenav.contains(e.target) && !this.$store.state.openMenu) {
        this.$store.dispatch('setOpenMenuAction', true)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: calc(100vh - 60px);
}
.collections-container {
  display: flex;
  height: 100%;
}
.content-wrapper {
  width: 100%;
}
.search-container, .collection {
  padding: $space-s;
}
.collection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 18px;
}
.one-item {
  span {
    color: $primary-color;
    font-size: 12px;
    text-transform: uppercase;
  }
  img {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
.item-img {
  margin-bottom: $space-xs;
}
.empty-state {
  display: flex;
  width: 100%;
  height: 60vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $primary-color;
  opacity: .8;
  font-size: 22px;

  img {
    width: 40px;
    margin-bottom: $space-m;
  }
}

@media screen and (min-width: 750px) {
  .collection {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  .one-item {
    span {
      font-size: 16px;
    }
  }
}
</style>
