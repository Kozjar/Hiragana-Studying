import React from 'react';

export default class freeTrainig extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentChar: { jap: '', ru: '', hirag: '' }, showAnswer: false };
    this.maxCount = 1;
  }

  componentDidMount() {
    this.nextChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.alphabet !== prevProps.alphabet) this.nextChar();
  }
  
  nextChar() {
    let nextNum = this.state.currentChar;
    while (nextNum == this.state.currentChar) {
      nextNum = this.getNewNum();
    }
    this.setState({ currentChar: {
      jap: this.props.alphabet[nextNum][0], 
      ru: this.props.alphabet[nextNum][1],
      hirag: this.props.alphabet[nextNum][2],
    } });
  }

  getNewNum() {
    // console.log(`this.props.alphabet.length = ${this.props.alphabet.length}`);
    // console.log(this.props.alphabet);
    let nextNum = 0 + Math.random() * (this.props.alphabet.length);
    nextNum = Math.floor(nextNum);
    if (this.props.alphabet[nextNum][0] === this.state.currentChar.jap) {
      return this.getNewNum();
    }
    // console.log(`next number = ${nextNum}`);
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
          <div className='japan-char'>{this.state.currentChar.jap}</div>
          {(this.props.alphabetId === 1) && <div className={'sound ' + (this.state.showAnswer ? '' : 'hide')}>{`[ ${this.state.currentChar.hirag} ]`}</div>}
          <div className={'sound ' + (this.state.showAnswer ? '' : 'hide')}>{this.state.currentChar.ru}</div>
          <button className="show-btn" onClick={this.onBtnClick.bind(this)}>{this.state.showAnswer ? '>' : 'show'}</button>
        </div>
      </div>
    )
  }
}
