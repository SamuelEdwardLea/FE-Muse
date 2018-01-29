import React from 'react';
import TextField from 'material-ui/TextField';

const TextFieldExampleSimple = () => (
  <div>
    <TextField
      hintText="eg. David"
      floatingLabelText="Your first name"
    /><br />
     <TextField
      hintText="eg. Schwimmer"
      floatingLabelText="Your last name"
    /><br />
    {/* <TextField
      defaultValue="Default Value"
      floatingLabelText="Floating Label Text"
    /><br /> */}
  </div>
);

export default TextFieldExampleSimple;