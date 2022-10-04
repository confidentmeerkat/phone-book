import { MutationResolvers, QueryResolvers } from "../../generated/graphql"
import bookModel from "../../models/Book"


const Query :QueryResolvers = {
    test: () => {
        return  "This is only for test"
    },
    book: async () => {
        return await bookModel.find();
    }
}

const Mutation: MutationResolvers = {
    createPhone: async(_, args) => {
        const {name, number} = args.input;

        return await bookModel.create({name, number});
    },
    updatePhone: async(_, args) => {
        const {id, input} = args;

        return await bookModel.findByIdAndUpdate(id, input);
    },
    deletePhone: async(_, args) => {
        const {id} = args;
        
        await bookModel.findByIdAndRemove(id);
        return "ok";
    }
    
}

const resolvers = {
    Query,
    Mutation
}

export default resolvers
