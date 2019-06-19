# App Test

# Architecture

See architecture.yml

# Router

!! Fectch before Route
https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation

Link in Component

```
 <router-link to="/foo">Go to Foo</router-link>
```

Go to the route with params

```
	router.push({ name: 'user', params: { userId: '123' } })

	<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

```

Display multiple views at the same time instead of nesting them

```
	<router-view class="view one"></router-view>
	<router-view class="view two" name="a"></router-view>
	<router-view class="view three" name="b"></router-view>

  and route is...
  {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }

```

Get Params in URL of Router

```
 return this.$route.params.username
```

because \$route injected in top level root

Go history back

```
 this.$router.go(-1)
```

Buton back

Go to the specific route

```
this.$router.push('/')
```

Redirect since route

```
    { path: '/a', redirect: '/b' }
```

Route Dynamique

```
 { path: '/user/:id', component: User }
```

Listen on change route from component

```
beforeRouteUpdate (to, from, next) {
   // react to route changes...
   // don't forget to call next()
 }
```

Define Route with params of Component

```
  {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
```

404 example page

```
	{
	// will match everything
	path: '*'
	}
```

Sub routing

```
	<router-view></router-view>
	{ path: '/user/:id', component: User,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'posts',
          component: UserPosts
        }
      ]
    }
```

# Snippets

!! Mutations must be synchone

Mutations Must Be Synchronous

!! Actions muste be sync or async

- Instead of mutating the state, actions commit mutations.
- Actions can contain arbitrary asynchronous operations.

---

Call an action triggered by dispacth, since component with store:

```
	store.dispatch('increment')
```

Remove by Index of Arrays state store

```
	todos.splice(todos.indexOf(todo), 1)
```

Inverted a property item:

```
	todos[todos.indexOf(todo)].completed = !todo.completed
```

Replace a new propertie in store

```
	state.obj = { ...state.obj, newProp: 123 }
```

Select One

```
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
```

Change all items properties batch:

```
	todos.forEach(todo => (todo.completed = completed))
```

# Examples of Interesting Projects

    - Shoppings Cart
    - Todo

# Examples of VueX Architecture

Avec les mutations, il fait paser par les actions et ne pas appeler les mutations directement, pour une

# Example of Async Actions can be call in mounted(){}

```
// Recupérer just le products of state store
actions: {
    addProduct({ products }, product) {
			products.push(product)
		},
    fetchProducts({ commit, getters }) {
			fetch(URI)
				.then(res => res.json())
				.then(data => {
					// Get the last 50 products
					const products = data.slice(50)

					products.forEach(product => {
                        commit('addProduct', { // commit add who store state products
                            brand_name: product.brand_name,
                            name: product.name,
                            id: product.gtin14,
                            remaining: 10,
                            price:
                                Math.floor(parseInt(product.size) * 5 / Math.random()) * 10
                        })
					})
				})
		}
	}
```

# Required

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
