---
title: Creating A Mattermost Chatbot With Dialogflow & Google Cloud Functions
date: '2018-04-14'
category: chatbots
toc: true
toc_label: "Table of Contents"
tags:
  - chatbots
  - ai
  - dialogflow
  - google cloud
  - mattermost
---
![Mattermost Image](/assets/images/mattermost.jpg) ![Google Cloud Function Logo](/assets/images/cloud_function.png)

## Introduction
Today we will be discussing how to build a chatbot for the open source chat framework [Mattermost](https://about.mattermost.com/) and also using [Google Cloud Functions](https://cloud.google.com/functions/) to build out a Natural Understanding chatbot via the [Dialogflow](https://dialogflow.com/) system owned now by Google.

## Source Code For Project
The source code for this blog project can be found [Here](https://github.com/Geeked-Out-Solutions/blog-chatbot/tree/master/google-cloud)

I don't go into really detail on what the code does but basically it creates a webhook that takes the event from mattermost and grabs out the user and channel it was requested from (in case we wanted to later do @mention the user)

Then we classify this text by sending it to the Dialogflow API and once we get that response we use our Mattermost Incoming Webhook to post it back to the channel on line 42.

## Getting Started
First off you will need to sign up for [Google Cloud](https://cloud.google.com/) after you are signed up you will also need to sign up for the [Blaze Plan](https://firebase.google.com/pricing/) since we will be making external API calls, its pay as you go and you should also get $300 in credits when you sign up for google cloud.

More information on Google Cloud can also be found [Here](https://cloud.google.com/getting-started/)

We will also need to sign up for a free [Dialogflow](https://dialogflow.com/) account to be able to build a chatbot in.

Lastly we will need a Mattermost user that has permissions to create integrations on your mattermost server.

## Step 1 Configuring Google Cloud Webhook via Cloud Functions
Using the source code found [Here](https://github.com/Geeked-Out-Solutions/blog-chatbot/tree/master/google-cloud) copy the index.js file and package.json file to the respective sections in the google cloud function you create in the below steps.

1. Upon logging into [Google Cloud Console](https://console.cloud.google.com) you will want to go to the Compute Section > Then Cloud Functions.  You should see a screen similiar to mine below it will also ask you to create a project name as well, you can see mine is called Mycroft for a chatbot I have built for that community.

![Google Cloud Screenshot](/assets/images/cloud_function_step1.JPG)

2. Now we can click on Create Function and create our cloud function that we will be calling from Mattermost via a Outgoing Webhook Integration we will be setting up there next.

3. Upon clicking on Create Function you will be presented with a screen like you can see in the below image.  You will want to keep the defaults and you can name your function whatever you like and if you have extra memory requirements you can change that as well if you prefer.

***Make sure to open the inline editor and paste in the index.js and package.json files from the source code listed above and make sure the function to execute section is set to mattermostHook.***

![Google Cloud Screenshot 2](/assets/images/cloud_function_step2.JPG)

4. After clicking create we now have a screen with a lot of information on it, but if we click on the Trigger tab/section we will get our webhook URL, copy this down we will need it for the next section.

## Step 2 Setting Up Mattermost Webhooks
Now we need to follow the instructions via the Mattermost Documentation to setup a [Outgoing Webhook](https://docs.mattermost.com/developer/webhooks-outgoing.html) and [Incoming Webhook](https://docs.mattermost.com/developer/webhooks-incoming.html)

In your outgoing webhook setup you would basically have something similiar to the below screenshot configured, notice the bottom section where we need to put our google cloud trigger function URL there.  This is what tells mattermost to send the event to our bot.

We also have the trigger word setup that way that you have to do @botname with your question for it to respond, otherwise it will just respond to everything in the channel which is fine if that is what you want.

![Outgoing Webhook Example](/assets/images/outgoing_webhook.JPG)


In our incoming webhook we only really need to setup what channel we want our posts to go to, and it won't matter much anyways since in the API we can override the channel we post to.

![Incoming Webhook Example](/assets/images/incoming_webhook.JPG)

Great!  Now we have a webhook listening in the Random channel and another one that can post to it.  Now the downside right now is that with outgoing webhooks you would have to set one up for each channel you want this listening on and add the Google Cloud Trigger URL in each, I think another way around this in the future would be to setup a websocket bot, but that is for a different blog post.

## Step 3 Setting Up Google Dialogflow For Our Chatbot
Ok so now we just need the final step which is to setup a chatbot at [Dialogflow](https://dialogflow.com/)

1. So sign up for a new account it is free and then you will want to create a new Agent via the [Console](https://console.dialogflow.com/api-client/#/newAgent), you will want to select a name, timezone, and do not select api v2 for this particular how to.

2. We now need to create our first intent which we can do via the Intents section on the left side.  For more information from Dialogflow on creating a Agent with intents please refer [Here](https://dialogflow.com/docs/getting-started/building-your-first-agent).  You can see from the screenshot below I have clicked on create new intent and have given it some basic info here:


Here we are giving it just some basic questions that our user might ask to trigger this intent

![Greeting Intent SS 1](/assets/images/greet_intent_1.JPG)

In this screenshot we are giving the response that we want our bot to respond with when this intent is triggered.

![Greeting Intent SS 2](/assets/images/greet_intent_2.JPG)

Now we can save this and in the right side of the screen we should be able to then test via the console if our bot works:

![Greeting Intent SS 3](/assets/images/greet_intent_3.JPG)

3. Now finally we can go to the Gear/Settings icon for our agent (In dialogflow.com) and grab the client access token we will then put that into our index.js file in our google cloud fuction on line 3 and save it and we can now test our bot and it should reply.

***Please note it can take a few minutes for the google cloud function to save and then update before working, you can always look at the logs live from the fuction to see what it is doing***

![Mattermost Response](/assets/images/mattermost_response.JPG)

### Donate on Patreon
If you like this content or are interested in more how to's please check me out on [Patreon](https://www.patreon.com/Geekedoutsol) or you can [Donate](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=brianhh1230%40gmail%2ecom&lc=US&item_name=Geeked%20Out%20Solutions&no_note=0&cn=Add%20special%20instructions%20to%20the%20seller%3a&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted) directly.
