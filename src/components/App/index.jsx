import React from 'react';
import createCommand from 'robo-vacuum/lib/commands';
import RoboLocator from '../RoboLocator';

const {BasicMovementStrategy, RoboVacuum} = require('robo-vacuum/lib/robo');
const SquareRoom = require('robo-vacuum/lib/room');
const css = require('./App.css');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.robo = new RoboVacuum(new SquareRoom(5), new BasicMovementStrategy());
        this.state = {
            commandText: '',
            position: {x: -1, y: -1, f: ''}
        };
        this._handleChange = this._handleChange.bind(this);
    }

    render() {
        const {position} = this.state;
        const locatorCss = `${css.elementContainer} ${css.locatorContainer}`;
        return (
            <div>
                <h1>Robo Vacuum Tester</h1>
                <div className={css.elementContainer}>
                    <input
                        placeholder={'Enter Command'}
                        className={css.input}
                        value={this.state.commandText}
                        onChange={this._handleChange}
                    />
                </div>
                <div className={css.elementContainer}>
                    <RoboLocator
                        length={5}
                        width={5}
                        selected={{row: this._translateY(position.y), col: position.x}}
                        facing={position.f}
                    />
                </div>
            </div>
        );
    }

    _handleChange(event) {
        const commandText = event.target.value;
        this.robo.processCommand(createCommand(commandText));
        const position = this.robo.position;
        const updatedState = {commandText};
        if (position) {
            updatedState.position = position;
        }
        this.setState(updatedState);
    }

    _translateY(y) {
        return y !== -1 ? Math.abs(y - 5) : y;
    }
}