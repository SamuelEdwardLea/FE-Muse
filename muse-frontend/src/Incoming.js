import React from 'react'

class Incoming extends React.Component {
  state = {
    liked: [],
    likedYou: [],
    mutual: []
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/user/incoming/pkcopley@gmail.com')
      .then(buffer => buffer.json())
      .then(({liked, likedYou, mutual}) => {
        console.log(liked, likedYou, mutual)
        this.setState({liked, likedYou, mutual})
      })
  }

  render() {
    return (
      <ul style={{color: 'white'}}>
        <li>hi</li>
      </ul>
    )
  }
}

export default Incoming