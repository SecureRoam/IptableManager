/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import cockpit from 'cockpit';
import React from 'react';
import AddRules from './components/addRules';
import { Alert, Button, Form, FormGroup, TextInput, Card, CardBody, CardTitle } from "@patternfly/react-core";
import IptablesTemplate from './components/iptableTemplate';
import InsertRulesAt from './components/insertRulesAt';
import ValidateRule from './components/validity';
import SnortTemplate from './components/snortTemplate';
import ResetIptables from './components/iptableBackup';
import './app.scss';

const _ = cockpit.gettext;

export class Application extends React.Component {
    constructor() {
        super();
        this.state = {
            fileContent: "",
            newLine: "",
            loading: true
        };

        cockpit.file('/etc/network/if-pre-up.d/iptables.sh').read().then(content => {
            this.setState({ fileContent: content, loading: false})
            
        }).catch(error => {
            console.error(error);
            this.setState({ loading: false });
        });
    }

    handleInputChange = (event) => {
        this.setState({ newLine: event.target.value });
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
          }
        return (
            <div className='App'>
                <Card>
                    <CardTitle>Snort :</CardTitle>
                    <CardBody>
                        <div className='Snort'>
			    <SnortTemplate pathToFile="/home/secureroamcompanion/snort.log"/>
			</div>  
                    </CardBody>
                </Card>
                <Card>
                    <CardTitle>Iptables :</CardTitle>
                    <CardBody>
                        <AddRules pathToFile="/etc/network/if-pre-up.d/iptables.sh" />
                        <InsertRulesAt pathToFile="/etc/network/if-pre-up.d/iptables.sh"/>
                        <IptablesTemplate pathToFile="/etc/network/if-pre-up.d/iptables.sh"/>
                        <ResetIptables backupPath="/etc/iptables.bak" rulesPath="/etc/network/if-pre-up.d/iptables.sh"/>  
                    </CardBody>
                </Card>      
            </div>
        );
    }
}
