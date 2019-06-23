import React from 'react';

export default class freeTrainig extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentChar: 0, showAnswer: false };
    this.maxCount = 0;
  }

  componentDidMount() {
    this.nextChar();
  }
  

  nextChar() {
    let nextNum = this.state.currentChar;
    while (nextNum == this.state.currentChar) {
      nextNum = this.getNewNum();
    }
    this.setState({ currentChar: nextNum });
  }

  getNewNum() {
    let nextNum = 0 + Math.random() * (this.props.alphabet.length);
    nextNum = Math.floor(nextNum);
    if (this.props.alphabet[this.state.currentChar][2] == this.maxCount) {
      if (Math.floor(0 + Math.random() * 2)) return this.getNewNum();
    }
    this.maxCount += 1;
    return nextNum;
  }

  onBtnClick() {
    if (this.state.showAnswer) this.nextChar();
    this.setState((state, props) => ({ showAnswer: !state.showAnswer }));
  }

  render() {
    return (
      <div className='training-container'>
        <div className='task-container'>
          <div className='japan-char'>{this.props.alphabet[this.state.currentChar][0]}</div>
          <div className={'sound ' + (this.state.showAnswer ? '' : 'hide')}>{this.props.alphabet[this.state.currentChar][1]}</div>
          <button onClick={this.onBtnClick.bind(this)}>{this.state.showAnswer ? '>' : 'show'}</button>
        </div>
      </div>
    )
  }
}
