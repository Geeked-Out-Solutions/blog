---
templateKey: blog-post
title: How To Build A Chabot Using Botpress and Rasa
date: 2018-03-03T11:47:31.786Z
description: A tutorial on building a chatbot using Rasa and Botpress.
---
In today’s post I will be teaching you how to setup https://botpress.io and https://nlu.rasa.ai/tutorial.html.

All code used on this how to is located at https://github.com/Geeked-Out-Solutions/patreon-rasa-model

Botpress is a new way of doing bots and makes it much easier in my opinion for developers to get a bot off the ground and working.  The project is mainly written in javascript and the code you will be writing for the bot is javascript.  It also uses YAML as the base for the responses that you setup.

Rasa is a natural language processing tool that will classify our text we send to the bot to know what intent and or response to send back or code to run in our bot script.

\# Step 1 – Setting up Docker

For this tutorial I am going to be using a docker instance in Digital Ocean but you can also just run this locally as well.  It depends on what type of connector you are going to use, slack and facebook for example would require the bot to be on the outside internet to be able to reach it.

Digital Ocean has a 1 click setup for running docker so it will make it extremely easy for you:

https://www.digitalocean.com/products/one-click-apps/docker/

Otherwise you can setup Ubuntu for example and follow this guide to setup docker: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04

If you are new to digital ocean and sign up you can use my referral link below to get $10 free to setup a droplet to play with:

https://m.do.co/c/99a20b7898c9

\# Step 2 – Installing Rasa

At this point we should have docker running on our droplet and a public IP on the droplet that we will be using later to tell slack where our bot is.

Now we need to setup the Rasa docker container so that we have a server running to classify and train our data.  I will be walking you through this process and showing you how to do this.

Run the following command to get the Rasa docker container spun up from your docker instance:

```
docker run -d -p 5000:5000 rasa/rasa_nlu:latest-spacy
```

This command is basically running as a daemon and is exposing port 5000 on the docker host so that we can communicate to it over port 5000.

This might take a few minutes to pull down the image and run, when its done you should see something like this:

```
root@docker:~# docker run -d -p 5000:5000 rasa/rasa_nlu:latest-spacy
```

```
8c81f9c92bd02e3521cec1891feacc124f6bf518226e7c5f2e2dccd81e3eb208
```

```
root@docker:~# docker ps
```

```
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS                    NAMES
```

```
8c81f9c92bd0        rasa/rasa_nlu:latest-spacy   "./entrypoint.sh s..."   3 seconds ago       Up 2 seconds        0.0.0.0:5000->5000/tcp   silly_archimedes
```

Now we have our docker instance running but we need to train it, I have created a basic training model using the instructions from Rasa’s tutorials which can be found here.

The training model repository is located at https://github.com/Geeked-Out-Solutions/patreon-rasa-model if you want to look at the formatting which is based on JSON , you can find out more information on how this works for Rasa here.  You can also use the GUI to build your own JSON model which is located at https://rasahq.github.io/rasa-nlu-trainer/

\## Step 2 – Training Rasa

So now we are going to run the below command from our docker host in order to train it from our github model:

\_\_Step 1\_\_ – Run this command to download our json formatted training model

\    curl 'https://raw.githubusercontent.com/Geeked-Out-Solutions/patreon-rasa-model/master/data/bot-model.json' | curl --request POST --header 'content-type: application/json' -d@- --url 'localhost:5000/train?project=test_model'

\    

If it worked correctly you should get some output like:   

\    {"info": "new model trained: model_20171203-164137"}

\_\_Step 2\_\_ – Verify our training model works and the server is responding to requests:

\    curl --request POST \

\--url http://localhost:5000/parse \

\--header 'content-type: application/json' \

\--data '{

\    "project": "test_model",

\    "q": "Can I get some help"

\    }'

If successful you should get a response like:

\    {"entities": \[], "intent": {"confidence": 0.49648593586144485, "name": "help"}, "text": "Can I get some help", "intent_ranking": \[{"confidence": 0.49648593586144485, "name": "help"}, {"confidence": 0.20108462813313294, "name": "affirm"}, {"confidence": 0.1540658365493932, "name": "greet"}, {"confidence": 0.14836359945602867, "name": "goodbye"}]}

\    

Now this will also work with the other data we have trained like help me, goodbye, etc.  Feel free to change the q= to a different phrase to test it.  Keep in mind if there are spaces in the phrase you need to use % like below:

\    curl 'http://localhost:5000/parse?q=hello%how%are%you'

So now our Rasa server is setup and responding to requests so now we need to setup Botpress.  In order to keep this fairly easy I’m not going to setup botpress via Docker right now, we will just install node and npm on our docker host and then install Botpress.  In a future write up I will setup a docker setup for Botpress as well.

\_\_Step 3\_\_ – Installing Botpress

Run the following commands to install botpress, I’m assuming you are on Ubuntu, if on a different Linux version then run the proper commands to install applications:

\    apt-get update

\    apt-get install nodejs

\    apt-get install npm

\    ln -s "$(which nodejs)" /usr/bin/node

\    npm install -g botpress

\    

After these commands you should now have botpress installed.  I recommend doing the following to make a new folder and then initializing the bot using the below commands:

\    mkdir my\_bot && cd $\_

\    bp init

\    

Now after typing bp init it will ask you a few questions to fill out most of this doesn’t matter and is up to your preference, here is the output from that command:

\    Hey there, thanks for using botpress!

\    We'll walk you through the creation of your new bot.

\    For more information or help, please visit http://github.com/botpress/botpress

\---------------

\    name: (my_bot)

\    description: My Test Bot

\    author: Brian Hopkins

\    version: (0.0.1)

\    

Now we need to install the Rasa module for botpress which we can do via the following command:

\    botpress install rasa_nlu

\    

Now we can start up botpress with the below command:

\    bp start

\    

Now if we go to either http://localhost:3000 if you are running it local or whatever the IP address is of your vm at port 3000 you will see the following page:

![welcome botpress](//images.contentful.com/yfvwui9abeg1/6fUaPfJOpOGOGGoyskYqM6/4da616e6814e628194ded3c74d693b06/welcome_botpress.jpg)

\_\_Step 4\_\_ – Configuring Rasa on Botpress

Now that we have the GUI up we can skip through this intro and then go to the Rasa NLU menu on the left side once you click that you will see a page like the following:

![rasa nlu](//images.contentful.com/yfvwui9abeg1/222oFr2tswQKyGC2eaG8MI/8588a8c6d5adcfb9373d2a2dd926f656/rasa_nlu.jpg)

Notice how I updated the project name field to be test_model which is what we named our model when we tested it earlier when training Rasa.  This is also where you would modify your Rasa address if you weren’t running it on the same server as your botpress application.

\_\_Step 5\_\_ – Modifying the Index.js File

Now we need to modify our index.js file which is going to be in our directory we made earlier, so if we go back to that directory and use nano for example to look at it, it will look like the following:

\    module.exports = function(bp) {

\    // Listens for a first message (this is a Regex)

\    // GET_STARTED is the first message you get on Facebook Messenger

\    bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {

\    event.reply('#welcome') // See the file \`content.yml\` to see the block

\    })

\    

\    // You can also pass a matcher object to better filter events

\    bp.hear({

\    type: /message|text/i,

\    text: /exit|bye|goodbye|quit|done|leave|stop/i

\    }, (event, next) => {

\    event.reply('#goodbye', {

\    // You can pass data to the UMM bloc!

\    reason: 'unknown'

\    })

\    })

\    }

Now we need to modify this part to look like this code below and then hit cntrl + o to save it and then cntrl + x to exit the file:

\    module.exports = function(bp) {

\    // Listens for a first message (this is a Regex)

\    bp.hear({'rasa_nlu.intent.name': 'greet'}, (event, next) => {

\    event.reply('#welcome') // See the file \`content.yml\` to see the block

\    })

\    bp.hear({'rasa_nlu.intent.name': 'goodbye'}, (event, next) => {

\    event.reply('#goodbye') // See the file \`content.yml\` to see the block

\    })

\    bp.hear({'rasa_nlu.intent.name': 'help'}, (event, next) => {

\    event.reply('#help') // See the file \`content.yml\` to see the block

\    })

\    }

\    

The last step is now to modify the content.yml file that is located in the same directory to handle what our responses will be, so same way we will do nano content.yml and then modify it to look like below:

\    welcome: # this is the #welcome bloc referenced in index.js

\- typing: true

\    text: # Picks one randomly

\- Hey there!

\- Good day

\- text: How can I help you?

\    typing: 2s

\    goodbye:

\- text: Have a good day

\    typing: 2s

\    help:

\- text: Sure I can help you, what would you like help with?

\    typing: 3s

\    

Now we can hit cntrl+o to save and cntrl+x to exit and now can start back up the bot with bp start.  We need to go to the Middleware tab and move the botpress-rasa_nlu up to the top of the Incoming middleware by dragging it up then saving it.

If everything was done correctly you now can interact with your bot via the Chat Emulator like below:

![chatbot final](//images.contentful.com/yfvwui9abeg1/ndUI1Z8PzaYu4AQEOy2OO/d067ceef9855ff1b4a5572d75106c82c/chatbot_final.jpg)

So now its sending our text to our Rasa instance, classifying the text, then running our javascript code in our index.js file that tells it to trigger the parts of the content.yml file.  You can also do other things in your js code before calling the response, etc.

The content and index.js files and everything else used here can be found here.

If you liked this post please consider donating to me on Patreon at https://www.patreon.com/Geekedoutsol
