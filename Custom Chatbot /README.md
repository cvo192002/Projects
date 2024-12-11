By Sage Labesky and Christy Vo

This puprpose of this project is to create a chatbot whose purpose is to recommend math courses to a prospective student based on the course subject and difficulty level. 

It was implemented using a vector database (weaviate) and the ChatGPT3-5 API.

The user first writes out what they want. Next the LLM interprets this and returns a  Python list which is used to filter the vector database for a course that fits the user's request. It then feeds this course back to the LLM along with the original prompt and the LLM forms a response based off of only that information. 

Along the way there are numerous checks that will end the process early if the user's information is insufficient or if the LLM or Vector database return irrelevant information. The OpenAI moderation tool is also used to filter out bad prompts and responses.

There is also a function whose purpose it is to store previous promts and responses into an array so the chatbot can have context. This is mostly so that it can keep track of and return a list of previously discussed courses on request. One important part of the  iplementation was being careful with what was and wasn't added to the context. For example, if I prompt the LLM to respond with just relevant or irrelevant based on the prompt and add that to the context, it will no longer respond to the user with information, instead, no matter what the user prompts with, it will respond with relevant or irrelevant.

Getting the LLM to format the Python array correctly was also very important, and I ended up using the python strip function to remove extrenuous characters that the LLM seemingly really likes to add.

Overall, the project is functioning mostly correctly. Occasionally the LLM doesn't interpret the prompt correctly and in that case it just tells the user to try again which usually solves the problem.