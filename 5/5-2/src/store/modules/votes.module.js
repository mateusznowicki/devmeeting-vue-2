import { countBy } from 'lodash/fp';
import RepositoryFactory from '@/repositories/repository.factory';
import { voteOptions } from '@/consts/vote-options.const';
import { firebaseAction } from 'vuexfire';

const votesRepository = RepositoryFactory.get('votes');

const emptyOptionsObject = Object.assign({}, ...Array.from(voteOptions, k => ({ [k]: 0 })));
const groupByVoteType = countBy('vote');

//3/ 2. Add variable to your state which represents your firebase doc
const initialState = () => ({
  votes: [],
});

const state = initialState;

const getters = {
  groupedVotes: state => ({ ...emptyOptionsObject, ...groupByVoteType(state.votes) }),
  hasUserVoted: (state, getters, rootState, rootGetters) => {
    const currentUserId = rootGetters['user/userId'];
    return state.votes.findIndex(({ userId }) => userId === currentUserId) !== -1;
  },
};

const actions = {
  //5/ 3. Bind firebaseAction from vuexfire as your store action
  setVotesRef: firebaseAction(
    async ({ bindFirebaseRef }, ref) => {
      await bindFirebaseRef('votes', ref);
    },
  ),

  //3/ 4. And use it directly or wrap by other action
  initVotesRef({ dispatch }) {
    dispatch('setVotesRef', votesRepository.votesRef);
  },

  resetVotes() {
    votesRepository.resetVotes();
  },

  addVote(state, vote) {
    votesRepository.addVote(vote);
  },
};

export default {
  namespaced: true,
  getters,
  actions,
  state,
};
