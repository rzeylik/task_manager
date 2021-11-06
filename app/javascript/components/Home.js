import React from "react"
import PropTypes from "prop-types"
class Home extends React.Component {
  render () {
    console.log(this.props.greeting)
    return (
      <React.Fragment>
        Home page with greeting: {this.props.greeting}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  greeting: PropTypes.array
};
export default Home
