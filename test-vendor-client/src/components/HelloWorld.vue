<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="error !== ''" style="color:red">
      {{ error }}
    </p>
    <ul v-else>
      <li v-for="v in vendors" :key="v.id">
        {{ v.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import idx from 'idx'

const GET_ALL_VENDORS = gql`
    query {
        vendors {
            ... on VendorsResultSuccess {
                vendors {
                    id
                    name
                }
            }
            ... on Error {
                __typename
                message
            }
        }
    }
`

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  apollo: {
    vendors: {
      query: GET_ALL_VENDORS,
      manual: true,
      result({data, loading}) {
        if (!loading) {
          console.log(data)
          const typename = idx(data, d => d.vendors.__typename)
          console.log(typename)
          switch (typename) {
            case "VendorsResultSuccess":
              this.vendors = data.vendors.vendors
              this.error = ""
              break
            default:
              this.error = data.vendors.message
          }
        }
      }
    }
  },
  data() {
    return {
      vendors: [],
      error: ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
