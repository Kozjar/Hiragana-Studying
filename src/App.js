import React, { Fragment } from 'react';
import FreeTraining from './components/freeTrainingComponent'
import Test from './components/testComponent'
import GroupsMenu from './components/GroupsMenu'
import { ALPHABET } from './constants'
import './App.css';
import './styles/groupsMenu.css'

export default class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeCharSet: ALPHABET.reduce((activeCharSet, curSet) => [...activeCharSet, ...curSet]), 
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
    const newCharSet = groups.reduce((newSet, isShouldBeAdded, i) => {
      return isShouldBeAdded ? [...newSet, ...ALPHABET[i]] : newSet;
    }, []);
    this.setState({ activeCharSet: newCharSet }, () => console.log(this.state.activeCharSet));
  }

  render() {
    return (
      <Fragment>
        <GroupsMenu ALPHABET={ALPHABET}
                    setActiveCharSet={this.setActiveCharSet.bind(this)}/>
        <div className='trainig-type'>
          <div className={(this.state.trainType === 0) ? 'train-type activeTrainType' : 'train-type'}
                  onClick={this.setTrainType.bind(this, 0)}>Free practice</div>
          <div className={(this.state.trainType === 1) ? 'train-type activeTrainType' : 'train-type'}
                  onClick={this.setTrainType.bind(this, 1)}>Test</div>
        </div>
        {(this.state.trainType === 0) && <FreeTraining alphabet={this.state.activeCharSet}/>}
        {(this.state.trainType === 1) && <Test alphabet={this.state.activeCharSet}/>}
      </Fragment>
    )
  }
}
