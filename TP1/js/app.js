// import List from '../components/List'
//Vue.component
let List = ({
  props: {
    items: {
      type: Array
    }
  },
  data: () => ({
    filterMode: 'all'
  }),
  template: `<div>
            <div class="btn-group mb-3" role="group">
              <button type="button" :class='filterMode === "all" ? "btn btn-primary" : "btn btn-secondary"' @click="filterMode = 'all'">All</button>
              <button type="button" :class='filterMode === "bought" ? "btn btn-primary" : "btn btn-secondary"' @click="filterMode = 'bought'">Bought</button>
              <button type="button" :class='filterMode === "notBought" ? "btn btn-primary" : "btn btn-secondary"' @click="filterMode = 'notBought'">Not bought</button>
            </div>
            <ul class="list-group w-25">
              <li class="list-group-item" v-for="(item, index) in list" :key="index">
                <div class="mr-5 w-25 d-inline-block"  @click="toggle(index)">
                  <input type="checkbox" v-model="item.bought"/>
                  {{ item.name }}
                </div>
                <div class="input-group w-50 " v-if="item.bought">
                  <input type="number" class="form-control" v-model="item.price">
                  <div class="input-group-append">
                    <span class="input-group-text">€</span>
                  </div>
                  </div>

                <div class="mr-5 w-25 d-inline-block">
                  <button type="button" @click="deleteItem(index)" class="btn btn-danger">Supprimer</button>
                </div>
              </li>
            </ul></div>`,
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1)
    },

    toggle(index) {
      this.items[index].bought = !this.items[index].bought
    }
  },

  computed: {
    list () {
      if(this.filterMode === 'notBought')
        return this.items.filter(i => !i.bought)
      else if(this.filterMode === 'bought')
        return this.items.filter(i => i.bought)
      else
        return this.items
    }
  }
})

let Autocomplete = ({
  props: ['items', 'input'],
  data: () => ({
    products : [{name: 'Bananes'},{name: 'Chocolat'},{name: 'Pâtes'},{name: 'Pesto'},{name: 'Capotes'}]
  }),
  template: '<div class="bg-secondary w-25" v-if="input !== \'\'"><ul><li v-for="(item, index) in list" :key="index" @click="addItem(item)">{{ item }}</li></ul></div>',
  computed: {
    list () {
      const all = this.products.concat(this.items)
      const list = all.filter(i => i.name.toLowerCase().includes(this.input.toLowerCase())).map(l => l.name)
      return list.filter((value, i, self) => self.indexOf(value) === i)
    }
  },
  methods: {
    addItem(item) {
      this.items.push({
        name: item,
        bought: false,
        price: 0
      })
    }
  }
})

new Vue({
  el: '#app',
  data: {
    shopList: [],
    newItem: '',
    budget: 50
  },

  mounted() {
    this.shopList = JSON.parse(window.localStorage.getItem('shopList')) || []
    this.budget = JSON.parse(window.localStorage.getItem('budget')) || 50
  },

  watch: {
    shopList: {
      handler () {
        window.localStorage.setItem('shopList', JSON.stringify(this.shopList))
      },
      deep: true
    },

    budget () {
      window.localStorage.setItem('budget', JSON.stringify(this.budget)) 
    }
  },

  methods: {
    addItem () {
      if(this.newItem === '')
        return;
      this.shopList.push({
        name: this.newItem,
        bought: false,
        price: 0
      })
      this.newItem = ''
    }
  },

  computed: {
    total () {
      return this.shopList.reduce((acc, cur) => cur.bought ? acc += Number(cur.price) : acc, 0)
    },

    alert() {
      return this.total > this.budget
    }
  },

  components: {
    List,
    Autocomplete
  }
})
