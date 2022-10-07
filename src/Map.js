import React from "react";

class Map extends React.Component{
    render(){
        return(
            <img src={this.props.map} alt='map' />
        )
    }
}

export default Map;