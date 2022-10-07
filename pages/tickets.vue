<template lang="html">
  <div class="container">
    <nav-bar title="Plan Your Visit"/>

    <div class="tickets-container" @click="closeMenu($event)">
      <div ref="sidenav">
        <side-nav />
      </div>

      <div class="header-text">
        <h4>Skip the line.
        Purchase Tickets.</h4>

        <p>All exhibitions, audio tours, and films
        included in the price of admission.</p>
      </div>

      <div class="tab-conbtainer">
        <tabs v-model="choosenTab" :tabs="tabs" />
      </div>

      <div class="ticket-cart-container">
        <div v-for="ticket in tickets" :key="ticket.name" class="one-ticket">
          <div class="ticket-detail">
            <span>{{ticket.name}}</span>
            <p v-if="ticket.desc">{{ticket.desc}}</p>
          </div>

          <div class="flex-container">
            <div class="price-container">
              <p class="amount">price: $ {{ticket.price}}</p>
            </div>

            <div class="quantity-container">
              <button @click="ticket.quantity > 0 ? ticket.quantity -- : ticket.quantity" class="negative quantity-button" type="button" name="button">
                <i class="fas fa-minus"></i>
              </button>

              <div class="quantity">
                <span :class="{'activeQuantity': ticket.quantity > 0}">{{ticket.quantity}}</span>
              </div>

              <button @click="ticket.quantity ++" class="positive quantity-button" type="button" name="button">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="total-container">
          <p>Total</p>
          <p class="amount">$ {{totalCost}}</p>
        </div>

        <div class="button-container">
          <button @click="" type="button" name="button">Continue to Payment</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          text: 'Today',
          date: 'March 21, 2016',
          open: 'Open 9:30am-8:30pm',
          value: 1
        },
        {
          text: 'Tomorrow',
          date: 'March 22, 2016',
          open: 'Open 10:30am-5:30pm',
          value: 2
        },
        {
          text: 'Other',
          date: 'From Monday to Friday',
          open: 'Open 9:30am-8:30pm',
          value: 3
        }
      ],
      choosenTab: 1,
      tickets: [
        {
          name: 'Adults',
          desc: '',
          price: 8,
          quantity: 0
        },
        {
          name: 'Seniors',
          desc: '65+ with ID',
          price: 4,
          quantity: 0
        },
        {
          name: 'Students',
          desc: 'with ID',
          price: 6,
          quantity: 0
        },
      ],
    }
  },
  computed: {
    totalCost() {
      let sum = 0

      for (var ticket in this.tickets) {
        sum += this.tickets[ticket].quantity * this.tickets[ticket].price
      }
      return sum
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
.header-text {
  padding: $space-s;

  h4 {
    font-weight: 600;
    white-space: pre-line;
  }
  p {
    color: $primary-color;
    white-space: pre-line;
    font-weight: 600;
  }
}
.tab-conbtainer {
  margin-top: $space-s;
}
.ticket-cart-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: $space-l 0;
}
.one-ticket {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  width: 100%;
  padding: $space-s;
}
.ticket-detail {
  font-weight: 600;

  p {
    font-size: 12px;
    color: $color-grey;
    font-weight: 500;
  }
}
.quantity-container {
  display: flex;
  align-items: center;

  button {
    width: 18px;
    height: 18px;
    border: 1px solid $color-grey;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: $color-grey;
    font-size: 10px;
    transition: all .2s ease;

    &:hover {
      border-color: $font-color-lighter;
      color: $font-color-lighter;
    }
  }
}
.flex-container {
  display: flex;
  align-items: center;
}
.price-container {
  display: none;
  margin-right: $space-m;
  font-size: 14px;
  font-weight: 400;
}
.quantity {
  margin: $space-xxs $space-s;
  width: 13px;

  span {
    color: $color-grey;
  }
}
.activeQuantity {
  color: $font-color!important;
  font-weight: 600;
}
.total-container {
  border-top: 2px solid $primary-color;
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: $space-l 0 $space-m 0;
  font-weight: 600;

  p {
    margin-top: $space-xxs;
    padding: 0 $space-s;
  }
  .amount {
    margin-right: $space-m;
  }
}
.button-container {
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: $space-s;

  button {
    height: 42px;
    width: 100%;
    max-width: 250px;
    cursor: pointer;
    color: white;
    font-size: 12px;
    padding: 12px;
    background: $primary-color;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: all .2s ease;

    &:hover {
      background: rgba($primary-color, .9);
    }
    &:focus {
      background: rgba($primary-color, .9);
    }
    &:active {
      background: rgba($primary-color, .8);
    }
  }
}
@media screen and (min-width: 750px) {
  .one-ticket, .total-container, .button-container {
    max-width: 600px;
  }
  .button-container {
    justify-content: flex-end;
    padding-right: 0;
  }
  .total-container {
    font-size: 18px;
  }
  .price-container {
    display: block;
  }
  .header-text {
    p {
      white-space: normal;
    }
  }
}
</style>
