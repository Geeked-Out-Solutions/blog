---
templateKey: blog-post
title: Create A React Chatbot Featuring Mycroft AI Content
date: 2018-03-05T12:06:52.947Z
description: >-
  In this tutorial I will be showing you how to build a React chatbot featuring
  Mycroft AI content as the demo.
---
![Mycroft AI Chatbot Screenshot](/img/mycroft_ss.jpg)

In this blog post I will be showing you how to build a simple chatbot in React based on <https://lucasbassetti.com.br/react-simple-chatbot/> which is a nice package to create your own chatbot solution.  In this example I'm just using the chatbot to answer basic questions about a open source project [Mycroft AI](https://mycroft.ai/)

# Source Code

The source code for this project can be found at <https://github.com/btotharye/mycroft-chat>

# Initial Setup

First things first you will need to make sure you have node and npm installed which are required for this project.  You can find the links below for instructions for each platform on installing it.  Also make sure you have git installed as well.

**Node/NPM Guides:**

[Windows Guide](http://blog.teamtreehouse.com/install-node-js-npm-windows)

[Linux Guide](http://blog.teamtreehouse.com/install-node-js-npm-linux)

[OSX Guide](http://blog.teamtreehouse.com/install-node-js-npm-mac)

# Installing Project

To start using the project after setting up npm and git it is pretty straightforward.  You just clone the repo or download it and then run the below steps:

1. Clone the repo:
   ```
   git clone https://github.com/btotharye/mycroft-chat.git
   ```
2. Install packages:
   ```
   cd mycroft-chatnpm install
   ```
3. Start Up Application:
   ```
   npm start
   ```

If everything was performed correctly you should now have a working chatbot if you open you browser and navigate to <http://localhost:3000>

# How The Chatbot Works

So this chatbot is based off the react project <https://lucasbassetti.com.br/react-simple-chatbot/> so you can visit that link for more information about the bot in general.  The general concept of the bot is you have steps that control how the chatbot flow works.

Take a look at this example steps file from this chatbot solution we are working on:

`const steps = [`

`{`

`id: '1',`

`message: 'Hello how may I help you?',`

`trigger: '2',`

`},`

`{`

`id: '2',`

`options: [`

`{ value: 'What is Mycroft AI?', label: 'What Is Mycroft', trigger: 'what-mycroft' },`

`{ value: 'Skills Available', label: 'Skills Available', trigger: 'skills-available' },`

`{ value: 'How To Install Mycroft AI', label: 'How-to Install', trigger: 'install' },`

`{ value: 'Documentation', label: 'Documentation', trigger: 'documentation' },`

`{ value: 'Mark 2', label: 'Mark 2 Information', trigger: 'mark2' },`

`],`

`},`

`{`

`id: 'what-mycroft',`

`message: 'Mycroft is the world’s first open source assistant. Mycroft runs anywhere – on a desktop computer, inside an automobile, or on a Raspberry Pi.',`

`trigger: 'what-mycroft-2',`

`},`

`{`

`id: 'what-mycroft-2',`

`message: 'This is open source software which can be freely remixed, extended, and improved. Mycroft may be used in anything from a science project to an enterprise software application.',`

`trigger: 'what-mycroft-link'`

`},`

`{`

`id: 'what-mycroft-link',`

`component: <WhatMycroft />,`

`trigger: '1'`

`},`

`{`

`id: 'skills-available',`

`message: 'this is where the available skills will be listed',`

`trigger: '1',`

`},`

`{`

`id: 'install',`

`message: 'Mycroft supports a lot of different platforms.  Please see the hyperlink below for more information.',`

`trigger: 'install-comp',`

`},`

`{`

`id: 'install-comp',`

`component: <InstallMycroft />,`

`trigger: '1'`

`},`

`{`

`id: 'documentation',`

`component: <Documentation />,`

`trigger: '1'`

`},`

`{`

`id: 'mark2',`

`message: 'The newest hardware coming out for Mycroft AI is the Mark 2.  It will feature a screen and other cool features. See the link below for more information and to back it on kickstarter.',`

`trigger: 'mark2-link'`

`},`

`{`

`id: 'mark2-link',`

`component: <Mark2 />,`

`trigger: '1'`

`},`

`];`

`export default steps;`

Now in the above code here we are setting up the flow of the chatbot.  You can see that id 1 is the initial hello how may I help you message and we have steps in our workflow to handle what happens on each step.  So id 2 we are triggering from step 1 and that gives us the menu of all the options we have that we can answer.

Notice how we have the below options, this is how we generate the menu of what our bot can answer.  These then correspond to other triggers that are other steps that we trigger based on what a customer picks in the chatbot.

`options: [`

`{ value: 'What is Mycroft AI?', label: 'What Is Mycroft', trigger: 'what-mycroft' },`

`{ value: 'Skills Available', label: 'Skills Available', trigger: 'skills-available' },`

`{ value: 'How To Install Mycroft AI', label: 'How-to Install', trigger: 'install' },`

`{ value: 'Documentation', label: 'Documentation', trigger: 'documentation' },`

`{ value: 'Mark 2', label: 'Mark 2 Information', trigger: 'mark2' },`

Lets take the example of 'How To Install Mycroft AI' which triggers the install step.  You can see below the actual step this install triggers:

`{`

`id: 'install',`

`message: 'Mycroft supports a lot of different platforms.  Please see the hyperlink below for more information.',`

`trigger: 'install-comp',`

`},`

`{`

`id: 'install-comp',`

`component: <InstallMycroft />,`

`trigger: '1'`

`},`

So what we are doing in the code above is giving some information about Mycroft AI in the first response and then triggering another action called install-comp which in this case stands for component.  We have written a separate React component to be called here called InstallMycroft which actually does the below which is just creating a basic React component to generate a html link that points to the Mycroft AI installation documentation.

Now in this part you could do anything here, take in variables and then make API calls and give back information or whatever you decide to do in your application.

`import React, { Component } from 'react';`

`class InstallMycroft extends Component {`

`render(){`

`return(`

`<div>`

`<a href="https://mycroft.ai/get-mycroft/" target="_blank" rel="noopener noreferrer">Click Here For Instructions To Download/Install Mycroft</a>`

`</div>`

`);`

`}`

`}`

`export default InstallMycroft;`

This above is what generates this context in the chatbot, also notice how it triggers the menu again, this is because we trigger 1 in the step as seen above in the code.



<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

<ins class="adsbygoogle"
 style="display:block" data-ad-client="ca-pub-2750422863713517"
 data-ad-slot="8313202585"
 data-ad-format="auto"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>



![Chatbot Install Screenshot](/img/mycroft_ss_install.jpg)

# More Information

Please continue to follow my blog for more information on this project and others as well as more tutorials on chatbots and how to make even more complex chatbot examples.  I hope this repository along with this basic tutorial gives you more information on how to build and create chatbot applications in React.  Also please follow me on Patreon as well if you like the content.

<a href="https://www.patreon.com/bePatron?u=7262852">
<img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become A Patron" />
</a>



<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

<ins class="adsbygoogle"
 style="display:block" data-ad-client="ca-pub-2750422863713517"
 data-ad-slot="8313202585"
 data-ad-format="auto"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
