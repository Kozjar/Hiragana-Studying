import React from 'react';

export default class freeTrainig extends React.Component {
  constructor(props) {
    super(props);
    this.groupType = this.props.items.reduce((res, cur) => 
      res + cur[0].length + cur[1].length + 2
    , 0);
    this.LINE_SIZE = 15;
  }

  getValidString(group) {
    let lineSize = 0;
    return group.reduce((res, cur) => {
      lineSize += cur[0].length + cur[1].length + 2;
      if (lineSize > this.LINE_SIZE) {
        lineSize = cur[0].length + cur[1].length;
        return `${res}\n${cur[0]}(${cur[1]}) `;
      } else {
        return `${res}${cur[0]}(${cur[1]}) `;
      }
    }, '');
  }

  render() {
    return (
      <div>
        {(this.groupType < (this.LINE_SIZE * 2)) && 
          (
              <label key={this.props.key} className="group-checkbox">
                <input
                name="isGoing"
                type="checkbox"
                checked={this.props.isActive}
                onChange={this.props.changeCharSetState} />
                <div className="group-label">
                  <pre>{this.getValidString(this.props.items)}</pre>
                </div>
              </label>
          )
        }
      </div>
    )
  }
}