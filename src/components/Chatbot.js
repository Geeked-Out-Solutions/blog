import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import steps from '../config/steps';
import chat_styles from '../config/chatstyles'
import logo from '../img/logo.png'


class Chatbot extends Component {
  render() {
    return (
      <div className="Chatbot">
        <div className="container content">
          <div className="row justify-content-md-right">
            <div className="col">
              <ThemeProvider theme={chat_styles}>
                <ChatBot
                  steps={steps}
                  headerTitle="Geekbot"
                  placeholder="Type away..."
                  customDelay="500"
                  floating="false"
                  botAvatar={logo}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Chatbot;
