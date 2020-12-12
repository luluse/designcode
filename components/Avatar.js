import React from 'react';
import { ReactReduxContext } from 'react-redux';
import styled from 'styled-components';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    name: state.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      })
  };
}

class Avatar extends React.Component {
  state = {
    photo : "https://share.getcloudapp.com/Z4uqoAjB"
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          // photo: response.results.sprites.front_default,
          photo: response.photo,
        });

        this.props.updateName(response.name)
      });
  }

  render(){
    return (
      <Image source={{ uri: this.state.photo }} />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  /* background-color: blue; */
`;