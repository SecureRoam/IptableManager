import React, { useState } from 'react';
import cockpit from 'cockpit';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

function ResetIptables({ backupPath, rulesPath }) {
    const [statusMessage, setStatusMessage] = useState('');

    const handleResetRules = () => {
        cockpit.file(backupPath).read().then(backupContent => {
            cockpit.spawn(['sh', '-c', `echo '${backupContent}' > ${rulesPath}`], { err: 'message', stdout: 'message' }).done(res => {
                if (res.message && res.message.indexOf('Error') === -1) {
                    setStatusMessage('Rules reset successfully');
                } else if (res.message){
                    setStatusMessage(`Error resetting rules: ${res.message}`);
                } else {
                    setStatusMessage(`Rules reset successfully`)
                }
            }).fail(error => {
                setStatusMessage(`Error resetting rules: ${error}`);
            });
        }).catch(error => {
            setStatusMessage(`Error reading backup file: ${error}`);
        });
    }

    return (
        <Card>
            <CardTitle>Mistake ? Reset your rules</CardTitle>
            <CardBody>
                <button onClick={handleResetRules}>Reset rules</button>
                <p>{statusMessage}</p>
            </CardBody>
        </Card>
    );
}

export default ResetIptables;
