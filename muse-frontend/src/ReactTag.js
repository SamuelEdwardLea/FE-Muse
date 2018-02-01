import React, { Component } from 'react';
import randomColor from 'randomcolor';
import TagCloud from 'react-tag-cloud';
import CloudItem from './CloudItem';
import './ReactTag.css';


const styles = {
  big: {
    fontFamily: 'serif',
    fontSize: 40,
    fontWeight: 'bold'
  },
  medium: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'normal'
    
  },
  small: {
    fontSize: 20,
    fontWeight: 'bold'    
  },
  tiny: {
    fontSize: 10,
    fontWeight: 'bold'
  }
};

let bigGenres = [];
let mediumGenres = [];
let smallGenres = [];
let tinyGenres = [];

class ReactTag extends Component {
  componentDidMount() {

    let genres = this.props.genres[0].matchingOn.genres;
    let genresNo = this.props.genres[0].matchingOn.genres.length;
    let divisor = Math.floor(genresNo / 4);

    let editableGenres = [];


    genres.forEach(genre => {
      editableGenres.push(genre)
    })


    for (let i = 0; i < divisor; i++) {
      bigGenres.push(editableGenres[0]);
      editableGenres.splice(0, 1)
    }

    for (let i = 0; i < divisor; i++) {
      mediumGenres.push(editableGenres[0]);
      editableGenres.splice(0, 1)
    }

    for (let i = 0; i < divisor; i++) {
      smallGenres.push(editableGenres[0]);
      editableGenres.splice(0, 1)
    }

    for (let i = 0; i < divisor; i++) {
      tinyGenres.push(editableGenres[0]);
      editableGenres.splice(0, 1)
    }

    console.log('******', bigGenres)
    console.log('!!!!!!', mediumGenres)
    console.log('!!!!!!', smallGenres)
    console.log('!!!!!!', mediumGenres)

    setInterval(() => {
      this.forceUpdate();
    }, 5000);
  }

  render() {
    return (
      <div className='app-outer'>
        <div className='app-inner'>
          <TagCloud
            className='tag-cloud'

            style={{
              height: '100%',
              fontFamily: 'sans-serif',
              //fontSize: () => Math.round(Math.random() * 50) + 16,
              fontSize: 30,
              color: () => randomColor({
                // hue: 'red'
              }),
              padding: 5,
            }}>

            {bigGenres.map((genre, i) => (
              <div style={styles.big}>{genre}</div>
            ))}

            {mediumGenres.map((genre, i) => (
              <div style={styles.medium}>{genre}</div>
            ))}

            {smallGenres.map((genre, i) => (
              <div style={styles.small}>{genre}</div>
            ))}

            {tinyGenres.map((genre, i) => (
              <div style={styles.tiny}>{genre}</div>
            ))}

            {/* <div style={styles.big}>Beaner</div>
            <div style={styles.medium}>Dragon Ball</div>
            <div style={styles.small}>Doofus</div>
            <div style={styles.tiny}>Bepis</div> */}

          </TagCloud>
        </div>
      </div>
    );
  }
}

export default ReactTag;
