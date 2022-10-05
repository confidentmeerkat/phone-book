import { MutationResolvers, QueryResolvers } from "../../generated/graphql"
import Contact from "../../models/Contact"


const Query :QueryResolvers = {
    test: () => {
        return  "This is only for test"
    },
    contacts: async () => {
        return await Contact.find();
    }
}

const Mutation: MutationResolvers = {
    createContact: async(_, args) => {
        return await Contact.create(args.input);
    },
    updateContact: async(_, args) => {
        const {id, input} = args;

        return await Contact.findByIdAndUpdate(id, input);
    },
    deleteContact: async(_, args) => {
        const {id} = args;
        
        await Contact.findByIdAndRemove(id);
        return "ok";
    }
    
}

const resolvers = {
    Query,
    Mutation
}

export default resolvers
