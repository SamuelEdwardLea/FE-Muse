import React from 'react'
import './incoming.css'

class Incoming extends React.Component {
  state = {
    liked: [],
    likedYou: [],
    mutual: [],
    loading: true
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/user/incoming/pkcopley@gmail.com')
      .then(buffer => buffer.json())
      .then(({liked, likedYou, mutual}) => {
        console.log(liked, likedYou, mutual)
        this.setState({
          liked: liked,
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
      {this.state.liked.length? ( 
        <div>
          <p><strong> You've liked:</strong> </p>
        {this.state.liked.map(user => (
          <ul>
            <li> {`${user[0].Name}, ${user[0].Age}`} </li>
            <li> {user[0].Bio} </li>
          </ul>
        ))}
        </div>
      )
         : (null)
      }

      {this.state.likedYou.length? ( 
        <div>
          <p><strong> These people have liked you:</strong> </p>
        {this.state.likedYou.map(user => (
          <ul>
            <li> {`${user[0].Name}, ${user[0].Age}`} </li>
            <li> {user[0].Bio} </li>
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
            <li> {`${user[0].Name}, ${user[0].Age}`} </li>
            <li> {user[0].Bio} </li>
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