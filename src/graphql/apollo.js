import { onError } from "apollo-link-error";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
//import { setContext } from 'apollo-link-context';
import { createUploadLink } from "apollo-upload-client";
//import { onError } from 'apollo-link-error';
import toast from "../utils/toast";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const link = createUploadLink({ uri: `http://localhost:8001/graphql` });

// const authRetryLink = onError(
//     (error) => {
//         if(error){
//             if (error.graphQLErrors && error.networkError && error.networkError.statusCode && error.networkError.statusCode === 500) {
//                 localStorage.removeItem('auth_token');
//             }
//             error.graphQLErrors.map(err => { toast.error(err.message)})
//         }
//     },
// );

// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('auth_token');
//     return {
//         headers: {
//             ...headers,
//             auth_token: token ? `${token}` : "",
//         }
//     }
// });

// {
//   typePolicies: {
//     Query: {
//       fields: {
//         getIzvestajs: {
//           merge(existing, incoming, { mergeObjects }) {
//             // Correct, thanks to invoking nested merge functions.
//             return mergeObjects(existing, incoming);
//           },
//         },
//       },
//     },
//   },
// }

export default new ApolloClient({
  cache: new InMemoryCache(),
  //link: ApolloLink.from([authRetryLink, authLink, link]),
  link: ApolloLink.from([link, errorLink]),
});
