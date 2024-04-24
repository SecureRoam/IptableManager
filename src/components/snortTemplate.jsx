import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import { Card, CardBody, CardTitle, Button} from '@patternfly/react-core';
import { Table, Thead, Tbody, TableVariant, Tr, Th, Td } from '@patternfly/react-table';

function SnortTemplate({pathToFile}) {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        cockpit.file(pathToFile).read().then(data => {
        const linesData = data.trim().split('\n').filter(line => line !== '');
        const linesWithPosition = linesData.map((line, index) => ({ line, position: index + 1 }));
        setLines(linesWithPosition);
        }).catch(error => {
        console.log(`Error reading file: ${error}`);
        });
    }, [pathToFile]);

    return (
        <Card>
            <CardTitle>Logs</CardTitle>
          <CardBody>
            <Table variant={TableVariant.compact} aria-label="Snort Logs">
              <Thead>
                <Tr>
                  <Td>Number</Td>
                  <Td>Line</Td>
                </Tr>
              </Thead>
              <Tbody>
                {lines.map((line) => (
                  <Tr key={line.position}>
                    <Td>{line.position}</Td>
                    <Td>{line.line}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      );
}


export default SnortTemplate;