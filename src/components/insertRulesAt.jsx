import React, { useState } from 'react';
import cockpit from 'cockpit';
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
    });
  };

  return (
    <div>
      <h2>Insert a rule at a particular position</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
      <button onClick={handleInsertRulesAt}>Add rules at</button>
      <ValidateRule rule={text} />
      <p>{statusMessage}</p>
    </div>
  );
}

export default InsertRulesAt;
