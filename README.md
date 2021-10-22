# vue-app

## Some information

### We could have chosen two different approach.

    1 - using a route for each form
    2 - using a conditional rendered multistep form

I went with the second option.

`/` is our base route and it's component is Home.vue. We are fetching the hotels data using both API endpoints, then resolving with Promise.all call. The reason why i choose this approach is because rather than dealing with two different array of objects, after Promise.all i combined these two arrays together.

#### Store States, Getters, Mutations & Actions

- In actions object, `actionPushHotelsWithDetails` and `actionPushHotels` were the first draft. I did not remove those two for a fallback situation. Main data is stored using `actionMerge` action.

- `actionPushFiltered` and `actionClearFilter` used for filtering and clearing the filtered data respectively.

- `actionPushFiltered` and `actionClearFilter` used for filtering and clearing the filtered data respectively.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
