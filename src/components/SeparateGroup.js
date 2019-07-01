import React from 'react';

export default class freeTrainig extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
    const totalLen = this.props.items.reduce((res, cur) => 
      res + cur[0].length + cur[1].length + 2
    , 0);
    this.LINE_SIZE = 20;
    this.groupType = (totalLen < (this.LINE_SIZE * 2));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props) return;
    
    const totalLen = this.props.items.reduce((res, cur) => 
      res + cur[0].length + cur[1].length + 2
    , 0);
    this.groupType = (totalLen < (this.LINE_SIZE * 2));
  }
  

  getValidString(group) {
    let lineSize = 0;
    return group.reduce((res, cur, i) => {
      lineSize += cur[0].length + cur[1].length + 2;
      if (!this.groupType && !this.state.isExpanded && ((res.split(/\n/).length - 1) === 1) && (lineSize > this.LINE_SIZE)) {
        lineSize = cur[0].length + cur[1].length;
        return `${res}\n...\n${res}${cur[0]}(${cur[1]}) `;
      }
      if (lineSize > this.LINE_SIZE && i !== 0) {
        lineSize = cur[0].length + cur[1].length;
        return `${res}\n${cur[0]}(${cur[1]}) `;
      } else {
        return `${res}${cur[0]}(${cur[1]}) `;
      }
    }, '');
  }

  render() {
    const hieght = {
      maxHeight: this.state.isExpanded ? '700px' : '57px',
    }
    return (
      <div>
        <label key={this.props.key} className="group-checkbox">
          <input
          name="isGoing"
          type="checkbox"
          checked={this.props.isActive}
          onChange={this.props.changeCharSetState} />
          <div className="group-label" style={hieght} onClick={(!this.groupType) ? (e) => { 
            this.setState((state, props) => ({isExpanded: !state.isExpanded}));
            this.props.changeCharSetState();
          } : null}>
            <pre>{this.getValidString(this.props.items)}</pre>
          </div>
        </label>
      </div>
    )
  }
}