import React, { useState } from 'react';
import cockpit from 'cockpit';
import { Card, CardBody, CardTitle, CardFooter } from '@patternfly/react-core';
import ValidateRule from './validity'; // Import du composant de validation

function AddRules({ pathToFile }) {
  const [text, setText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleAddRules = () => {
    /*if (validationMessage !== 'Invalid rule!') {
      setStatusMessage('RInvalid rule. Validate your rule before adding');
      return;
    }*/

    const command = `echo "${text}" >> ${pathToFile}`;
    cockpit.spawn(['sh', '-c', command], { superuser: 'try' })
      .then(() => {
        setStatusMessage('Rule added');
        setText('');
        setValidationMessage('');
      })
      .catch((error) => {
        setStatusMessage(`Error while adding: ${error.message}`);
      });
  };

  /*const handleValidateRule = () => {
    // Utilise ValidateRule pour valider la règle
    const command = `iptables-restore -n -t <(echo '${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}')`;

    cockpit.spawn(['sh', '-c', command], { superuser: 'try' })
      .then(() => {
        setValidationMessage('Rule false !');
      })
      .catch((error) => {
        setValidationMessage(`Error validating rule : ${error.message}`);
      });
  };*/

  return (
    <Card>
      <CardTitle>Add a rule</CardTitle>
      <CardBody>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a rule"
          style={{ marginRight: '10px' }}
        />
        
        <button onClick={handleAddRules}>Add rule</button>
        <p>{statusMessage}</p>
        <p>{validationMessage}</p>
      </CardBody>
      <CardFooter>
        <ValidateRule rule={text}/>
      </CardFooter>
    </Card>
  );
}

export default AddRules;
