import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'
import Chatbot from '../components/Chatbot'
import Footer from '../components/Footer'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Geeked Out Solutions" />
    <Navbar />
    <div>{children()}</div>
    <Chatbot />
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
