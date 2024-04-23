import React, { useState } from 'react';
import cockpit from 'cockpit';

function ValidateRule({rule}) {
    const [statusMessage, setStatusMessage] = useState('');

  /*const handleValidateRule = () => {
    const command = `iptables-restore -n -t <(echo '${rule}')`;
    cockpit.spawn(['sh', '-c', command], {superuser: 'try'}).then(() => {
      setStatusMessage('Rule is valid!');
    }).catch((error) => {
      setStatusMessage(`Error validating rule: ${error.message}`);
    });
  };*/

    const handleValidateRule = () => {
    // Enregistrer les règles actuelles dans un fichier
        cockpit.spawn(['sh', '-c', 'iptables-save > /tmp/rules.txt'], { superuser: 'try' })
        .then(() => {
            // Ajouter la nouvelle règle au fichier
            const command = `echo "${rule}" >> /tmp/rules.txt`;
            return cockpit.spawn(['sh', '-c', command], { superuser: 'try' });
        })
        .then(() => {
            // Restaurer les règles à partir du fichier et vérifier s'il y a des erreurs
            return cockpit.spawn(['sh', '-c', 'iptables-restore < /tmp/rules.txt'], { superuser: 'try' });
        })
        .then(() => {
            setStatusMessage('Rule is valid!');
        })
        .catch((error) => {
            setStatusMessage(`Error validating rule: ${error.message}`);
        });
    }
    
    return (
        <div>
            <button onClick={handleValidateRule}>Check rule</button>
            <p>{statusMessage}</p>
        </div>
    );
}

export default ValidateRule;
