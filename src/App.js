import React, { Fragment } from 'react';
import FreeTraining from './components/freeTrainingComponent'
import Test from './components/testComponent'
import './App.css';

export default class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trainType: 0 };
    this.alphabet = [ 
      [ 'あ', 'а', 0 ],
      [ 'い', 'и', 0 ],
      [ 'う', 'у', 0 ],
      [ 'え', 'э', 0 ],
      [ 'お', 'о', 0 ],

      [ 'か', 'ка', 0 ],
      [ 'き', 'ки', 0 ],
      [ 'く', 'ку', 0 ],
      [ 'け', 'кэ', 0 ],
      [ 'こ', 'ко', 0 ],

      [ 'さ', 'са', 0 ],
      [ 'し', 'си', 0 ],
      [ 'す', 'су', 0 ],
      [ 'せ', 'сэ', 0 ],
      [ 'そ', 'со', 0 ],

      [ 'た', 'та', 0 ],
      [ 'ち', 'ти', 0 ],
      [ 'つ', 'цу', 0 ],
      [ 'て', 'тэ', 0 ],
      [ 'と', 'то', 0 ],
    ];
    this.maxCount = 0;
  }

  setTrainType(n) {
    this.setState({ trainType: n, });
  }

  render() {
    return (
      <Fragment>
        <div className='trainig-type'>
          <div className={(this.state.trainType === 0) ? 'train-type activeTrainType' : 'train-type'}
                  onClick={this.setTrainType.bind(this, 0)}>Free practice</div>
          <div className={(this.state.trainType === 1) ? 'train-type activeTrainType' : 'train-type'}
                  onClick={this.setTrainType.bind(this, 1)}>Test</div>
        </div>
        {(this.state.trainType === 0) && <FreeTraining alphabet={this.alphabet}/>}
        {(this.state.trainType === 1) && <Test alphabet={this.alphabet}/>}
      </Fragment>
    )
  }
}
