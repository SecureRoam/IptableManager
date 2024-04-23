import React, { useState } from 'react';
import cockpit from 'cockpit';

function ValidateRule({rule}) {
    const [statusMessage, setStatusMessage] = useState('');

    const handleValidateRule = () => {
        const command = `${rule}`;
        cockpit.spawn(['sh', '-c', command], {superuser: 'try'}).then(() => {
            setStatusMessage('Rule is valid!');
        }).catch((error) => {
            setStatusMessage(`Error validating rule: ${error.message}`);
        });
    };

    return (
        <div>
            <button onClick={handleValidateRule}>Check rule</button>
            <p>{statusMessage}</p>
        </div>
    );
}

export default ValidateRule;
