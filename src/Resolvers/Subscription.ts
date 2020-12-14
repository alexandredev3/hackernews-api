import { MutationArgs } from '../utils/IMutation'

function newLinkSubscribe({ parent, args, context }: MutationArgs) {
  return context.pubsub.asyncIterator("NEW_LINK");
};

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload: any) => {
    return payload
  }
}

export default newLink;