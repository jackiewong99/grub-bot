export const CUISINES = [
  {
    set: '1',
    cuisineSet: ['American', 'Asian fusion', 'Cantonese', 'Chinese'],
    btnSet: []
  },
  {
    set: '2',
    cuisineSet: ['French', 'Greek', 'Indian', 'Italian'],
    btnSet: []
  },
  {
    set: '3',
    cuisineSet: ['Japanese', 'Korean', 'Mediterranean', 'Mexican'],
    btnSet: []
  },
  {
    set: '4',
    cuisineSet: ['Middle Eastern', 'Moroccan', 'Spanish', 'Taiwanese'],
    btnSet: []
  },
  {
    set: '5',
    cuisineSet: ['Thai', 'Vegan', 'Vegetarian'],
    btnSet: []
  }
];

export const PRICE_RANGE = ['$', '$$', '$$$', '$$$$'];

export const PROMPTS = {
  promptOne: 'Which cuisine are you craving? (Pick one)',
  promptTwo: 'How much are you willing to spend?',
  promptThree: 'Are you looking for a restaurant nearby?',
  promptFour: 'Does rating and popularity matter to you?'
};

export const YES_NO_ANSWERS = ['Yes', 'No'];

export const PROMPT_CLASS_LIST = ['chat-msg', 'chat-msg--left'];
export const REPLY_CLASS_LIST = ['chat-msg', 'chat-msg--right'];
