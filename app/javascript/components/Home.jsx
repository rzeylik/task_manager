import React from "react"
import PropTypes from "prop-types"

const Home = (props) => {
  return (
    <React.Fragment>
      Home page with greeting: { props.greeting }
    </React.Fragment>
  )
}

Home.propTypes = {
  greeting: PropTypes.array
};
export default Home
