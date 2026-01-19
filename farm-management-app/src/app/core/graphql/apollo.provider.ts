import { HttpLink } from 'apollo-angular/http';

import { environment } from '../../../environments/environment.development';
import { InMemoryCache } from '@apollo/client/cache';
import {ApolloClientOptions} from '@apollo/client';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri: environment.graphql.mesure
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  };
}
