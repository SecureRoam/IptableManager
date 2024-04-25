import React, { useState } from 'react';
import cockpit from 'cockpit';
import { Card, CardBody, CardFooter, CardTitle } from '@patternfly/react-core';
import ValidateRule from './validity';

function InsertRulesAt({pathToFile}) {
  const [text, setText] = useState('');
  const [position, setPosition] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInsertRulesAt= () => {
    const command = `sed -i '' -e '${position}i\\\n ${text}' ${pathToFile}`;    
    //console.log(`Executing command: ${command}`);
    cockpit.spawn(['sh', '-c', `${command}`], {superuser: 'try'}).then(() => {
      setStatusMessage(`Line added successfully at ${position}`);
      setText('');
    }).catch((error) => {
      setStatusMessage(`Error adding line: ${error.message}`);
      //setStatusMessage(`Line added successfully at ${position}`);
    });
  };

  return (
    <Card>
      <CardTitle>Insert rule at a particular position</CardTitle>
      <CardBody>
        <p>Rule :</p>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} style={{ marginBottom: '10px' }}/>
        <p>Position :</p>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} style={{ marginRight: '10px' }}/>
        <button onClick={handleInsertRulesAt}>Add rules at</button>
        <p>{statusMessage}</p>
      </CardBody>
      <CardFooter>
        <ValidateRule rule={text}/>
      </CardFooter>
    </Card>
  );
}

export default InsertRulesAt;
