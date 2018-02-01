import React from 'react';
import InputRange from 'react-input-range';
import './App.css';

class AgeSlider extends React.Component {
state = {
      value: { min: 20, max: 40 },
    };
  

  change = (event) => {console.log(event)}
  
  render() {
    return (
      <InputRange
      className="input-range__slider input-range__track--active"
        maxValue={55}
        minValue={18}
        value={this.state.value}
        disabled={this.props.disabled}
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
