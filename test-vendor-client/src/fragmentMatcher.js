import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const fm = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [
                {
                    kind: "UNION",
                    name: "VendorsResult",
                    possibleTypes: [
                        { name: "InternalServerError" },
                        { name: "PermissionDeniedError" },
                        { name: "UnauthorizedError" },
                        { name: "VendorsResultSuccess" },
                    ],
                },
                {
                    kind: "INTERFACE",
                    name: "Error",
                    possibleTypes: [
                        { name: "InternalServerError" },
                        { name: "PermissionDeniedError" },
                        { name: "UnauthorizedError" }
                    ]
                }
            ],
        },
    }
})

export default fm