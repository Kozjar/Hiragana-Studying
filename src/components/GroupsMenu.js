import React from 'react';
import SeparateGroup from './SeparateGroup';

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

  renderHirakata() {

  }

  render() {
    const style = { left: this.state.isWindowExpanded ? '0' : '-290px' };
    return (
      <div style={style} className="groups-menu">
        <form className="card text-white mb-3 text-center groups-panel">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item text-white">
                <a onClick={this.props.setActiveAlphabet.bind(this, 0)}
                className={`nav-link text-white ${(this.props.alphabetId === 0) ? 'active' : ''}`} href="#">Hiragana</a>
              </li>
              <li className="nav-item">
                <a onClick={this.props.setActiveAlphabet.bind(this, 1)}
                className={`nav-link text-white ${(this.props.alphabetId === 1) ? 'active' : ''}`} href="#">Kanji</a>
              </li>
              <li className="nav-item">
                <a onClick={this.props.setActiveAlphabet.bind(this, 2)}
                className={`nav-link text-white ${(this.props.alphabetId === 2) ? 'active' : ''}`} href="#">Katakana</a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {
              this.props.ALPHABET.map((group, i) => 
                <SeparateGroup key={i}
                items={group} 
                isActive={this.state.activeCharSet[i]}
                changeCharSetState={this.changeCharSetState.bind(this, i)}/>
              )
            }
          </div>
        </form>

        {/* <form className="groups-panel">
          <div className="alphabet-selection-btns">
            <div onClick={this.props.setActiveAlphabet.bind(this, 0)} 
                className={`alphabet-btn ${(this.props.alphabetId === 0) ? 'activeTrainType' : ''}`}>Hiragana</div>
            <div onClick={this.props.setActiveAlphabet.bind(this, 1)} 
                className={`alphabet-btn ${(this.props.alphabetId === 1) ? 'activeTrainType' : ''}`}>Kanji</div>
            <div onClick={this.props.setActiveAlphabet.bind(this, 2)} 
                className={`alphabet-btn ${(this.props.alphabetId === 2) ? 'activeTrainType' : ''}`}>Katakana</div>
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
                  {group.map((cur, i) => { return (cur[1].length > 6 && i) ? 
                                                  <p key={i}><br/>{`${cur[0]}(${cur[1]}) `}</p> : 
                                                  <p key={i}>{`${cur[0]}(${cur[1]}) `}</p> }, '')}
                </div>
              </label>
            )
          }
        </form> */}

        <div onClick={this.groupsExpand.bind(this)} className="groups-push-btn">Groups</div>
      </div>
    )
  }
}