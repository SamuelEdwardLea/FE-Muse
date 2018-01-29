import React from 'react';
// import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import './App.css';
// import 'react-input-range/lib/css/index.css';

class AgeSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 20, max: 40 },
    };
  }

  change = (event) => {console.log(event)}
  
  render() {
    return (
      <InputRange
      className="input-range__slider input-range__track--active"
        maxValue={55}
        minValue={18}
        value={this.state.value}
        onChange={(value, props) => {
          this.setState({ value });
          this.props.action(this.state.value);
        }
        }
        
        />
    );
  }
}

export default AgeSlider;
