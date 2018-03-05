import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { year: new Date().getFullYear() };
  }

  render() {
    return (
      <footer>
        <ul className="footer">
          <li>
            &copy; {this.state.year} Geeked Out Solutions
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
