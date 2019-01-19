<template>
  <div class="App o-container o-container--s o-vertical-spacing o-vertical-spacing--xl">
    <h1>How to Use GraphQL with Vue Apollo Components and Netlify Functions</h1>
    <ApolloQuery
      :query="require('./queries/articles.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">
          Loading...
        </div>
        <div v-else-if="error">
          An error occured! Please try again.
        </div>
        <ul
          v-else-if="data"
          class="App__article-list"
        >
          <li
            v-for="article in data.articles"
            :key="article.id"
            class="App__article-list-item"
          >
            <div class="App__article-list-figure">
              <img
                :src="article.image"
                alt=""
              >
            </div>
            <div class="App__article-list-body">
              <h2>
                {{ article.title }}
              </h2>
              <p>
                {{ article.body }}
              </p>
            </div>
          </li>
        </ul>
        <div v-else>
          There are no articles yet. Please come back later.
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: `App`,
};
</script>

<style lang="scss">
@import './assets/scss/settings/**/*';
@import './assets/scss/generic/**/*';
@import '{
  .o-container,
  .o-container--s,
} from ~@avalanche/object-container';
@import '{
  .o-vertical-spacing,
  .o-vertical-spacing--xl,
} from ~@avalanche/object-vertical-spacing';

.App {
  padding-top: setting-spacing(xl);
  padding-bottom: setting-spacing(xl);

  h1 {
    text-align: center;
  }
}

.App__article-list-item {
  display: flex;

  &:not(:first-child) {
    margin-top: setting-spacing(l);
    padding-top: setting-spacing(l);
    border-top: 1px solid #e2e2e2;
  }
}

.App__article-list-body {
  margin-left: setting-spacing(m);
}
</style>
