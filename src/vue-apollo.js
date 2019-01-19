import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const AUTH_TOKEN = `apollo-token`;

const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || `/.netlify/functions/graphql`;
const defaultOptions = {
  httpEndpoint,
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
};

export function createProvider(options = {}) {
  const { apolloClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {},
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(`%cError`, `background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;`, error.message);
    },
  });

  return apolloProvider;
}

export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== `undefined` && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`%cError on cache reset (login)`, `color: orange;`, e.message);
  }
}

export async function onLogout(apolloClient) {
  if (typeof localStorage !== `undefined`) {
    localStorage.removeItem(AUTH_TOKEN);
  }
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`%cError on cache reset (logout)`, `color: orange;`, e.message);
  }
}
