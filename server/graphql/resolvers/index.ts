import { MutationResolvers, QueryResolvers } from "../../generated/graphql"
import Phone from "../../models/Phone"


const Query :QueryResolvers = {
    test: () => {
        return  "This is only for test"
    },
    phones: async () => {
        return await Phone.find();
    }
}

const Mutation: MutationResolvers = {
    createPhone: async(_, args) => {
        const {name, number} = args.input;

        return await Phone.create({name, number});
    },
    updatePhone: async(_, args) => {
        const {id, input} = args;

        return await Phone.findByIdAndUpdate(id, input);
    },
    deletePhone: async(_, args) => {
        const {id} = args;
        
        await Phone.findByIdAndRemove(id);
        return "ok";
    }
    
}

const resolvers = {
    Query,
    Mutation
}

export default resolvers
