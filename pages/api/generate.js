import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration ({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`Using the number below, based on a scale where where 1 is that I am feeling the worst and 10 is that I am feeling the best give me the status of my mental health and advise only one way I can immediatly improve on it, in detail. Do not mention more than 2 activities. Do not mention Yoga or meditation. If the number is under 6 add a positive one liner to cheer me up, without using the words 'cheer up'. 

number: `;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 260,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;