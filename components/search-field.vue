<template lang="html">
  <div class="input-wrapper" :class="{'alt-input-wrapper': sideNavStyle}">
    <div v-if="sideNavStyle" class="alt-icon">
      <i v-if="typedWord" @click="typedWord = '', search()" class="far clear-x fa-times"></i>
      <i v-else class="far fa-search" @click="search()"></i>
    </div>

    <div class="input-container" :class="{'alt-search': sideNavStyle}">
      <input
        v-bind="$attrs"
        v-model.lazy="typedWord"
        @change="$emit('typedWord', typedWord)"
        @keyup.enter="search()"
        @blur="search()"
      />

      <div v-if="!sideNavStyle" class="icon">
        <i v-if="typedWord" @click="typedWord = '', search()" class="far clear-x fa-times"></i>
        <i v-else class="far fa-search" @click="search()"></i>
      </div>
    </div>

    <span v-if="!sideNavStyle" class="advanced">Advanced Search</span>
  </div>
</template>

<script>
export default {
  props: {
    searchdata: {
      type: Array,
      required: true,
    },
    value: {
      type: null,
    },
    sideNavStyle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchResult: [],
      typedWord: "",
    }
  },
  created() {
    this.search()
  },
  watch: {
    typedWord() {
      this.search()
    },
  },
  methods: {
    search() {
      if (this.typedWord == "") return this.$emit("input", this.$props.searchdata)
      let result = this.$props.searchdata.filter((word) =>
        word.name.toLowerCase().includes(this.typedWord.toLowerCase())
      )
      this.$emit("input", result)
    },
  },
}
</script>

<style lang="scss" scoped>
.input-container {
  width: 100%;
  max-width: 500px;
  height: 48px;
  position: relative;
}
.alt-input-wrapper {
  display: flex;
  align-items: center;

  .input-container {
    height: 42px;
  }
}
::placeholder {
  font-size: 18px;
  color: $primary-color;
}
.advanced {
  font-size: 12px;
  color: $primary-color;
  cursor: pointer;
}
input {
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  box-sizing: border-box;
  padding: $space-s;
  padding-right: $space-l!important;
  outline: none;
  border: 2px solid $primary-color;
  background: #fff;
}
.icon {
  position: absolute;
  top: 50%;
  right: $space-s;
  transform: translateY(-50%);

  i {
    font-size: 18px;
    cursor: pointer;
    color: $primary-color;
    transform: scaleX(-1);
  }
}
input:focus {
  border: 2px solid $primary-color;
  background: #fff;
}
input {
  color: $primary-color;
  font-size: 18px;
}
input:focus ~ i {
  color: $primary-color;
}
.alt-search {
  input {
    background: $primary-color;
    border: 2px solid white;
    color: white!important;
  }
  input:focus {
    border: 2px solid white;
    background: $primary-color;
  }
  input::placeholder {
    color: white;
  }
}
.alt-icon {
  width: 24px!important;
  margin-right: 18px;

  i {
    font-size: 20px;
    font-weight: 100;
    cursor: pointer;
    color: white;
    transform: scaleX(-1);
  }
  .clear-x {
    color: white!important;
    cursor: pointer;
  }
}
.alt-icon ~ i {
  color: white;
}
.clear-x {
  color: $primary-color!important;
  cursor: pointer;
}
</style>
