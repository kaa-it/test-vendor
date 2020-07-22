const { ApolloServer } = require('apollo-server')

const typeDefs = `
    type Vendor {
        id: ID!
        name: String!
    }
    
    type VendorsResultSuccess {
        vendors: [Vendor!]!
    }
    
    interface Error {
        message: String!
    }
    
    type UnauthorizedError implements Error {
        message: String!
    }
    
    type PermissionDeniedError implements Error {
        message: String!
    }
    
    type InternalServerError implements Error {
        message: String!
    }
    
    union VendorsResult = VendorsResultSuccess | UnauthorizedError | PermissionDeniedError | InternalServerError 
    
    type Query {
        vendors: VendorsResult!
    }   
`

let count = 1

const resolvers = {
    Query: {
        vendors: () => {
            switch (count) {
                case 1:
                    count++
                    return { __typename: "UnauthorizedError", message: "User not found" }
                case 2:
                    count++
                    return { __typename: "PermissionDeniedError", message: "User has no permission for this operation" }
                case 3:
                    count++
                    return { __typename: "InternalServerError", message: "Failed to fetch users from database" }
                case 4:
                    count = 1
                    return { __typename: "VendorsResultSuccess", vendors: [
                            { id: "232323", name: "test" },
                            { id: "454545", name: "Incotex" }
                    ]}
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({url}) => console.log(`Vendor Service running on ${url}`))