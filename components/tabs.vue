<template lang="html">
  <div class="tabs-container">
    <ul ref="nav">
      <div class="tabs-wrapper">
        <li
          v-for="(tab, i) in tabs"
          @click="setTab(i)"
          ref="tabs"
          :class="{ activeTab: value === tab.value }"
          >
          <p>{{tab.text}}</p>
          <span v-if="value === tab.value" class="line"></span>
        </li>
      </div>
    </ul>

    <div v-for="(tab, i) in tabs" v-if="value === tab.value" class="tab-content">
      <p>{{tab.date}}</p>
      <p>{{tab.open}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    tabs: {
      type: Array,
      required: true,
    },
  },
  created() {
    if( !this.$props.value ) this.setTab(0)
  },
  methods: {
    setTab(i) {
      if(!this.$refs.tabs) return

      this.$emit("input", this.$props.tabs[i].value)
    },
  },
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  background: inherit;
  display: flex;
  cursor: pointer;
  margin-bottom: $space-s;
  border-bottom: 2px solid $color-grey-light;
}
li {
  transition: all 0.2s;
  margin: 0px $space_xxs 0px $space_xxs;
  display: flex;
  margin: 0 $space-s;
  user-select: none;
  position: relative;
  text-align: center;
  white-space: nowrap;
  color: $color-grey;

  &:hover {
    color: $font-color;
  }

  p {
    font-size: 18px;
    font-weight: 500;
    margin: 0 auto $space-xs auto;
  }
}
.tabs-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.tab-content {
  color: $font-color;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.activeTab {
  color: $primary-color !important;

  p {
    color: $font-color;
  }
}
.line {
  width: 100%;
  height: 2px;
  background: $primary-color;
  position: absolute;
  bottom: -2px;
  left: 0;
  z-index: 100;
}
</style>
