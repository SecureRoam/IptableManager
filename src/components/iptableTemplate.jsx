import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';

function IptablesTemplate({pathToFile}) {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        cockpit.file(pathToFile).read().then(data => {
        const linesData = data.trim().split('\n');
        const linesWithPosition = linesData.map((line, index) => ({ line, position: index + 1 }));
        setLines(linesWithPosition);
        }).catch(error => {
        console.log(`Error reading file: ${error}`);
        });
    }, [pathToFile]);

    return (
        <div>
        <h2>Iptables rules</h2>
        <ul>
            {lines.map(line => (
            <li key={line.position}>{`${line.position}: ${line.line}`}</li>
            ))}
        </ul>
        </div>
    );
}


export default IptablesTemplate;