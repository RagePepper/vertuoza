"use client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const ApolloContainer = ({children}: Readonly<{
    children: React.ReactNode;
    
  }>) => {

    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache(),
    })

    return(
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
export default ApolloContainer
