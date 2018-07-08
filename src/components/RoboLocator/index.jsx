import React from 'react';

const css = require('./RoboLocator.css');

export default class RoboLocator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {length: cols, width: rows, selected, facing} = this.props;
        return (
            <table className={css.table}>
                <tbody>
                    {this._buildRows(rows, cols, selected, facing)}
                </tbody>
            </table>
        );
    }

    _buildColumns(cols, selectedCol, facing) {
        const columns = [];
        for (let i = 0; i <= cols; ++i) {
            const isCurrentPosition = selectedCol === i;
            const indicator = isCurrentPosition ? facing.toUpperCase().charAt(0) : '.';
            const className = isCurrentPosition ? css.occupiedCell : css.emptyCell;
            columns.push(<td key={i} className={className}>{indicator}</td>);
        }
        return columns;
    }

    _buildRows(rows, cols, selected, facing) {
        const content = [];
        for (let i = 0; i <= rows; ++i) {
            const selectedCol = selected.row === i ? selected.col : -1;
            content.push(<tr key={i}>{this._buildColumns(cols, selectedCol, facing)}</tr>);
        }
        return content;
    }
}