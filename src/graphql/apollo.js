import { onError } from "apollo-link-error";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const link = createUploadLink({ uri: `http://localhost:8001/graphql` });

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([link, errorLink]),
});
