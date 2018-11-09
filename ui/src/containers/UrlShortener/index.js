import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class UrlShortenerContainer extends Component {

    constructor(){



    }


  render() {
    return (
      <div>
        UrlShortenerContainer 
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlShortenerContainer )
