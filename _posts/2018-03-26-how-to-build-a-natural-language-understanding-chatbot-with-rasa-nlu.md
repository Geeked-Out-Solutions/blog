---
layout: post
title: How To Build A Natural Language Understanding Chatbot With Rasa NLU
date: '2018-03-26'
category: chatbots
tags:
  - chatbots
  - rasa
  - python
  - flask
  - ai
  - machine learning
---
![Chatbot Screenshot](/assets/images/rasa_chatbot.JPG)


# Introduction
Today we will be going over how to build a Rasa chatbot.  We will be using natural language processing also known as NLU to make our chatbot appear to be smart and understand the questions we are asking.

This project I have built and go over in this post was meant to be a starting point for a boilerplate chatbot with Rasa as a complete docker application.  Using compose we have simplified the process of bringing up rasa, bringing up a chatbot ui, and handling our training all in docker.

# What Is Rasa??
[Rasa](https://rasa.ai) is a open source platform for building conversational chatbots and software.  It uses existing ML and NLP libraries to classify the text based on models you train it with.  For more information please see the docs [Here](https://nlu.rasa.com/installation.html)

# Source Code For Project
The source code for a boilerplate chatbot can be found [here](https://github.com/lackeyai/rasa_chatbot).  It includes a training model already that can answer phrases related to greeting, goodbye, and help.

# Bot Infrastructure
Once you bring everything up with docker-compose you should have the following setup:

1. A Rasa container listening at port 5000 

2. A Flask container listening at port 5005

# How It Works
So I have simplified some of the process here by using Flask to create a very basic UI for interacting with the chatbot.  It uses some js code I found on GitHub to make calls to the Flask route /chat which runs the below code:

```python
@app.route('/chat')
def chat_response():
    rasa_host = os.environ["RASA_HOST"]
    if 'question' in request.args:
        print(request.args['question'])
        user_message = request.args['question']
        print("This is the user message: {}".format(user_message))
        print("The rasa host is: {}".format(rasa_host))
        url = "http://{}:5000/parse".format(rasa_host)
        response = requests.get(url,params={"q":user_message, "project": "chatbot"})
        print(response.json())
        response = response.json()
        print(response)
        intent = response["intent"]
        print("Intent {}".format(intent))
        if intent['name'] == 'help':
            response_text = "Sure I can help you"
        elif intent['name'] == 'greet':
            response_text = greeting()
        elif intent['name'] == 'goodbye':
            response_text = goodbye()
        elif intent['name'] == 'about':
            response_text = about()
        else:
            response_text = "Sorry I don't understand"
        return jsonify({"status": "success", "response": response_text})
    else:
        return jsonify({"status": "failed", "response": "could not find question"})
```

There is a bit going on here but the very basic is we take the question being sent to the chatbot UI and route it to the Rasa container running on port 5000 to classify this text.

Once we get the response back from Rasa which would normally look something like below.  You can see we are just taking this json object and checking the intent that is given back with the highest confidence and getting what the intent name is.

Once we have the intent name we can then know how to respond to the user.

```json
{"entities": [], "intent": {"confidence": 0.49648593586144485, "name": "help"}, "text": "Can I get some help", "intent_ranking": [{"confidence": 0.49648593586144485, "name": "help"}, {"confidence": 0.20108462813313294, "name": "affirm"}, {"confidence": 0.1540658365493932, "name": "greet"}, {"confidence": 0.14836359945602867, "name": "goodbye"}]}
```

So you can see in the code we have if conditions setup for the different intents trained on our bot in this case which are help, greet, goodbye, and about.  This is then routed back to the chatbot UI where the response is rendered.  I am using a responses.py file which I import into the flask app to handle my generic responses for each intent.

# Building Your Own Version
Getting started with Rasa actually is very easy you can clone the source code located [here](https://github.com/lackeyai/rasa_chatbot) which only requires you have docker and docker-compose installed.

Once you have the repository downloaded you just need to run the following command to create our .env file and then modify it with our hostname so our application knows how to reach Rasa without hardcoding it:

`cp .env.default .env`

Then modify this file and ensure RASA_HOST= your docker host ip.

Now we can spin up our application with `docker-compose up -d --build --remove-orphans`  **Make sure you are in the dir with the docker-compose.yml file**

## Training Your Own Model
If everything was done right you can now visit your chatbot UI at http://dockerip:5005 and interact with it.  To train the chatbot with your own model is very easy using the [Rasa NLU GUI Trainer](https://rasahq.github.io/rasa-nlu-trainer/).

Using the above application you can build out your bot-model.json file in a GUI format.  You can see from the existing training data how it works and you can build upon it or clear it out and use your own data then save it.  You can then train your bot with this bot-model.json file via:

`curl -XPOST dockerip:5000/train?project=chatbot -d @bot-model.json` 

This will take a few to run and will give you back a message stating the training is complete.  This builds out a model folder in the container which we have mapping outside to our repository so we don't lose our training data.

Now you can modify the app.py file in the flask folder to your liking based on whatever intents you came up with and their responses.

# More Information on Rasa
This post was not meant to be a full tutorial on Rasa for more information please see the examples [here](https://nlu.rasa.com/tutorial.html) in the documentation for training and more Rasa specific information.
