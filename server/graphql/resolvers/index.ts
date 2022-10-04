import { QueryResolvers } from "../../generated/graphql"

const Query :QueryResolvers = {
    test: () => {
        return  "This is only for test"
    }
}

const resolvers = {
    Query
}

export default resolvers
