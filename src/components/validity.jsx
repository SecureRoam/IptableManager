/*import React, { useState } from 'react';
import cockpit from 'cockpit';

function ValidateRule({rule}) {
    const [statusMessage, setStatusMessage] = useState('');

    const handleValidateRule = () => {
        const command = `iptables -C ${rule}`;
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
*/
/*
import React, { useState } from 'react';
import cockpit from 'cockpit';

function ValidateRule({ rule }) {
  const [validationMessage, setValidationMessage] = useState('');

  const handleValidateRule = () => {
    //const command = `iptables-restore -n -t <(echo '${rule}')`;
    const command = `echo '*filter' && echo ':INPUT ACCEPT [0:0]' && echo ':FORWARD ACCEPT [0:0]' && echo ':OUTPUT ACCEPT [0:0]' && echo ${rule} && echo 'COMMIT' | iptables-apply -t`;
    cockpit.spawn(['sh', '-c', command], { superuser: 'try' })
      .then(() => {
        setValidationMessage('Rule is valid!');
      })
      .catch((error) => {
        setValidationMessage(`Error validating rule: ${error.message}`);
      });
  };

  return (
    <div>
      <button onClick={handleValidateRule}>Validate rule</button>
      <p>{validationMessage}</p>
    </div>
  );
}

export default ValidateRule;*/
/*
import React, { useState } from 'react';
import cockpit from 'cockpit';

function ValidateRule({ rule }) {
  const [validationMessage, setValidationMessage] = useState('');

  const handleValidateRule = () => {
    const command = `iptables-restore -n < <(echo "${rule}") > /dev/null 2>&1 && echo "Rule is valid!" || echo "Rule is not valid!"`;
    cockpit.spawn(['sh', '-c', command], { superuser: 'try' })
      .then((result) => {
        setValidationMessage(result.stdout.trim());
      })
      .catch((error) => {
        setValidationMessage(`Error validating rule: ${error.message}`);
      });
  };

  return (
    <div>
      <button onClick={handleValidateRule}>Validate rule</button>
      <p>{validationMessage}</p>
    </div>
  );
}

export default ValidateRule;
*//*
import React, { useState } from 'react';
import cockpit from 'cockpit';

function ValidateRule({ rule }) {
  const [validationMessage, setValidationMessage] = useState('');

  const handleValidateRule = () => {
    // Valider le format de la règle pour éviter les injections
    if (!rule || rule.trim() === '') {
      setValidationMessage('Aucune règle fournie.');
      return;
    }

    const sanitizedRule = rule.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); // Échappe les caractères spéciaux
    const command = `iptables-restore -n -t <(echo '${sanitizedRule}')`;

    cockpit.spawn(['sh', '-c', command], { superuser: 'try' })
      .then(() => {
        setValidationMessage('Règle valide !');
      })
      .catch((error) => {
        setValidationMessage(`Erreur lors de la validation de la règle : ${error.message}`);
      });
  };

  return (
    <div>
      <button onClick={handleValidateRule}>Check rule</button>
      <p>{validationMessage}</p>
    </div>
  );
}

export default ValidateRule;*/

import React, { useState } from 'react';
import cockpit from 'cockpit';

function ValidateRule({ rule }) {
  const [validationMessage, setValidationMessage] = useState('');

  const handleValidateRule = () => {
    // Valider le format de la règle pour éviter les injections
    if (!rule || rule.trim() === '') {
      setValidationMessage('Aucune règle fournie.');
      return;
    }

    const sanitizedRule = rule.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); // Échappe les caractères spéciaux

    // Créer un fichier temporaire
    const tempFile = '/tmp/iptables_temp_file';
    const createFileCommand = `echo '${sanitizedRule}' > ${tempFile}`;

    // Vérifier la syntaxe iptables de la règle
    const checkSyntaxCommand = `iptables-restore -n -t < ${tempFile}`;

    // Supprimer le fichier temporaire
    const deleteFileCommand = `rm ${tempFile}`;

    cockpit.spawn(['sh', '-c', createFileCommand], { superuser: 'try' })
      .then(() => {
        return cockpit.spawn(['sh', '-c', checkSyntaxCommand], { superuser: 'try' });
      })
      .then(() => {
        return cockpit.spawn(['sh', '-c', deleteFileCommand], { superuser: 'try' });
      })
      .then(() => {
        setValidationMessage('Règle valide !');
      })
      .catch((error) => {
        setValidationMessage(`Erreur lors de la validation de la règle : ${error.message}`);
        cockpit.spawn(['sh', '-c', deleteFileCommand], { superuser: 'try' }); // Supprimer le fichier en cas d'erreur
      });
  };

  return (
    <div>
      <button onClick={handleValidateRule}>Check rule</button>
      <p>{validationMessage}</p>
    </div>
  );
}

export default ValidateRule;


