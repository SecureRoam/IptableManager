import React, { useState } from 'react';
import cockpit from 'cockpit';
import ValidateRule from './iptablesRequirements';

function AddRules({pathToFile}) {
  const [text, setText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleAddRules= () => {
    const command = `echo "${text}" >> ${pathToFile}`;
    console.log(`Executing command: ${command}`);
    cockpit.spawn(['sh', '-c', `echo "${text}" >> ${pathToFile}`], {superuser: 'try'}).then(() => {
      setStatusMessage('Line added successfully!');
      setText('');
    }).catch((error) => {
      setStatusMessage(`Error adding line: ${error.message}`);
    });
  };

  return (
    <div>
      <h2>Add a rule</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddRules}>Add Line</button>
      <ValidateRule rule={text} />
      <p>{statusMessage}</p>
    </div>
  );
}

export default AddRules;
