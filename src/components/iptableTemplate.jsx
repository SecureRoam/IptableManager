import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import { Card, CardBody, CardTitle, Button} from '@patternfly/react-core';
import { Table, Thead, Tbody, TableVariant, Tr, Th } from '@patternfly/react-table';


function IptablesTemplate({pathToFile}) {
    const [lines, setLines] = useState([]);

    useEffect(() => {
      const interval = setInterval(() => {
        watchFile();
      }, 10000);
      watchFile();
      return () => clearInterval(interval);
  }, [pathToFile]);

  const watchFile = async () => {
    cockpit.file(pathToFile).read().then(data => {
      const linesData = data.trim().split('\n');
      const linesWithPosition = linesData
        .filter(line => line.trim().startsWith('iptables'))
        .map((line, index) => ({ line, position: index + 1 }));
      setLines(linesWithPosition);
      }).catch(error => {
      console.log(`Error reading file: ${error}`);
      });
  };

    return (
        <Card>
          <CardTitle>Current Iptables rules</CardTitle>
          <CardBody>
            <Table variant={TableVariant.compact} aria-label="Iptables Rules">
              <Thead>
                <Tr>
                  <Th>Number</Th>
                  <Th>Line</Th>
                  <Th/>
                </Tr>
              </Thead>
              <Tbody>
                {lines.map((line) => (
                  <Tr key={line.position}>
                    <Th>{line.position}</Th>
                    <Th>{line.line}</Th>
                    <Th>
                      <Button variant="secondary" onClick={() => handleButtonClick(line.position)}>Remove</Button>
                    </Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      );
      
}


export default IptablesTemplate;
