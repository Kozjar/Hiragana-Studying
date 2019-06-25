import React from 'react';

export default class freeTrainig extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isWindowExpanded: false,
      activeCharSet: [true, true, true, true, true, true, true, true]
    };
    this.maxCount = 0;
  }

  groupsExpand() {
    this.setState((state, props) => ({ isWindowExpanded: !state.isWindowExpanded }));
  }

  changeCharSetState(num) {
    const activeCharSet = [...this.state.activeCharSet];
    activeCharSet[num] = !activeCharSet[num];
    this.setState({activeCharSet}, () => this.props.setActiveCharSet(this.state.activeCharSet));
    console.log(this.state.activeCharSet);
  }

  render() {
    const style = { left: this.state.isWindowExpanded ? '0' : '-258px' };
    return (
      <div style={style} className="groups-menu">
        <form className="groups-panel">
          <div className="alphabet-selection-btns">
            <div onClick={this.props.setActiveAlphabet.bind(this, 0)} 
                className={`alphabet-btn ${(this.props.alphabetId === 0) ? 'activeTrainType' : ''}`}>Hiragana</div>
            <div onClick={this.props.setActiveAlphabet.bind(this, 1)} 
                className={`alphabet-btn ${(this.props.alphabetId === 1) ? 'activeTrainType' : ''}`}>Kanji</div>
          </div>
          {
            this.props.ALPHABET.map((group, i) => 
              <label key={i} className="group-checkbox">
                <input
                name="isGoing"
                type="checkbox"
                checked={this.state.activeCharSet[i]}
                onChange={this.changeCharSetState.bind(this, i)} />
                <div className="group-label">
                  {/* {`${group[0][0]}(${group[0][1]}) ${group[1][0]}(${group[1][1]}) ${group[2][0]}(${group[2][1]}) 
                  ${group[3][0]}(${group[3][1]}) ${group[4][0]}(${group[4][1]})`} */}
                  {group.reduce((str, cur) => `${str} ${cur[0]}(${cur[1]})`, '')}
                </div>
              </label>
            )
          }
          {/* <input className="groups-panel__save-btn" type="submit" value="Save"></input> */}
        </form>
        <div onClick={this.groupsExpand.bind(this)} className="groups-push-btn">Groups</div>
      </div>
    )
  }
}