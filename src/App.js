import React, { Fragment } from 'react';
import FreeTraining from './components/freeTrainingComponent'
import Test from './components/testComponent'
import GroupsMenu from './components/GroupsMenu'
import { ALPHABET, KANJI } from './constants'
import './styles/groupsMenu.css'
import './App.css';

export default class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeCharSet: ALPHABET.reduce((activeCharSet, curSet) => [...activeCharSet, ...curSet]), 
      activeAlphabet: ALPHABET,
      activeAlphabetId: 0,
      trainType: 0 
    };
    this.maxCount = 0;
  }

  componentDidMount() {
  }
  

  setTrainType(n) {
    this.setState({ trainType: n, });
  }

  setActiveCharSet(groups) {
    const newCharSet = this.state.activeAlphabet.reduce((newSet, curSet, i) => {
      return groups[i] ? [...newSet, ...curSet] : newSet;
    }, []);
    if (newCharSet.length) this.setState({ activeCharSet: newCharSet });
    else this.setState({ activeCharSet: [['no char', 'no char'], ['no char ', 'no char ']] });
  }

  setActiveAlphabet(n) {
    switch (n) {
      case 0:
        this.setState({activeAlphabet: ALPHABET, activeAlphabetId: 0}, () => this.setActiveCharSet([true, true, true, true, true, true, true, true]));
        break;
      case 1:
        this.setState({activeAlphabet: KANJI, activeAlphabetId: 1}, () => this.setActiveCharSet([true, true, true, true, true, true, true, true]));
        break;
      default:
        return;
    }
  } 

  render() {
    return (
      <Fragment>
        <GroupsMenu ALPHABET={this.state.activeAlphabet}
                    alphabetId={this.state.activeAlphabetId}
                    setActiveCharSet={this.setActiveCharSet.bind(this)}
                    setActiveAlphabet={this.setActiveAlphabet.bind(this)}/>
        <div className='trainig-type'>
          <div className={(this.state.trainType === 0) ? 'train-type activeTrainType' : 'train-type'}
                onClick={this.setTrainType.bind(this, 0)}>Free practice</div>
          <div className={(this.state.trainType === 1) ? 'train-type activeTrainType' : 'train-type'}
                onClick={this.setTrainType.bind(this, 1)}>Test</div>
        </div>
        {
          (this.state.trainType === 0) && 
          <FreeTraining alphabetId={this.state.activeAlphabetId} alphabet={this.state.activeCharSet}/>
        }
        {(this.state.trainType === 1) && <Test alphabet={this.state.activeCharSet}/>}
      </Fragment>
    )
  }
}
