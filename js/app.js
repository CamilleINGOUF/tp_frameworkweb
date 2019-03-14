// import List from '../components/List'
//Vue.component
let List = ({
  props: {
    items: {
      type: Array
    }
  },
  template: `<ul class="list-group w-25">
              <li class="list-group-item" v-for="(item, index) in items" :key="index">
                <div class="mr-5 w-25 d-inline-block"  @click="toggle(index)">
                  <input type="checkbox" v-model="item.bought"/>
                  {{ item.name }}
                </div>
                <div class="input-group w-50 " v-if="item.bought">
                  <input type="number" class="form-control" aria-describedby="basic-addon1" v-model="item.price">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">€</span>
                  </div>
                  </div>

                <div class="mr-5 w-25 d-inline-block">
                  <button type="button" @click="deleteItem(index)" class="btn btn-danger">Supprimer</button>
                </div>
              </li>
            </ul>`,
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1)
    },

    toggle(index) {
      this.items[index].bought = !this.items[index].bought
    }
  }
})

let Autocomplete = ({
  props: ['items', 'input'],
  template: '<div v-if="input !== \'\'"><ul><li v-for="(item, index) in list" :key="index" @click="addItem(item)">{{ item.name }}</li></ul></div>',
  computed: {
    list () {
      const list = this.items.filter(i => i.name.toLowerCase().includes(this.input.toLowerCase())).map(l => l.name)
      return list.filter((value, i, self) => self.indexOf(value) === i)
    }
  },
  methods: {
    addItem(item) {
      this.items.push({...item})
    }
  }
})

new Vue({
  el: '#app',
  data: {
    shopList: [],
    newItem: ''
  },

  methods: {
    addItem () {
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
    }
  },

  components: {
    List,
    Autocomplete
  }
})
