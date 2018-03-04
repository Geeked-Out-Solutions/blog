import React from 'react'
import Link from 'gatsby-link'

import github from '../img/github-icon.svg'
import logo from '../img/logo.png'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <figure className="image">
            <img src={logo} alt="Geeked Out Solutions" style={{ width: '90px'}} />
          </figure>
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/about">
          About
        </Link>
      </div>
      <div className="navbar-end">
        <a
          className="navbar-item"
          href="https://github.com/geeked-out-solutions"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <img src={github} alt="Github" />
          </span>
          <a
            className="navbar-item"
            href="https://www.patreon.com/bePatron?u=7262852"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become A Patron" />
            </span>
          </a>
        </a>
      </div>
    </div>
  </nav>
)

export default Navbar
