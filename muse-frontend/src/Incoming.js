import React from 'react'
import './incoming.css'

class Incoming extends React.Component {
  state = {
    likedYou: [],
    mutual: [],
    loading: true
  }

  componentWillMount() {
    fetch(`http://localhost:3000/api/user/incoming/${this.props.email}`)
      .then(buffer => buffer.json())
      .then(({likedYou, mutual}) => {
        console.log(likedYou, mutual)
        this.setState({
          likedYou: likedYou,
          mutual: mutual,
          loading: false})
      })
  }

  render() {
    return (
      <div className="body">
    {!this.state.loading ? 
    (
      <ul style={{color: 'white', position: 'relative', top: '200px'}}>
      {this.state.likedYou.length? ( 
        <div>
          <p><strong> These people have liked you:</strong> </p>
        {this.state.likedYou.map(user => (
          <ul>
            <li> {`${user.Name}, ${user.Age}`} </li>
            <li> {user.Bio} </li>
             <li> {user.matchingOn.genres.map(genre => (<p> {genre} </p>))} </li>
          </ul>
        ))}
        </div>
      )
         : (null)
      }

      {this.state.mutual.length? ( 
        <div>
          <p><strong> You've liked each other: </strong> </p>
        {this.state.mutual.map(user => (
          <ul>
            <li> {`${user.Name}, ${user.Age}`} </li>
            <li> {user.Bio} </li>
            You both like!
            <li> {user.matchingOn.genres.map(genre => (<p> {genre} </p>))} </li>
          </ul>
        ))}
        </div>
      )
         : (null)
      }
      </ul>
    )
    :
    <p>loading </p>}
    </div>
  )
  }
}

export default Incoming