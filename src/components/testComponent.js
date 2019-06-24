import React from 'react';

export default class test extends React.Component {
    constructor(props) {
        super(props);
        this.remainingAlphabet = [...this.props.alphabet];
        this.state = { 
            answer: '', 
            correctness: false, 
            currentChar: undefined, 
            isGetAnswer: false,
            stats: {total: 0, correct: 0, wrong: 0} 
        };
    }

    componentDidMount() {
        this.nextChar();
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.alphabet !== prevProps.alphabet) this.restart();
    }
    
    nextChar() {
        if (!this.remainingAlphabet.length) {
            this.setState({currentChar: undefined});
            return undefined;
        }
        let nextNum = 0 + Math.random() * (this.remainingAlphabet.length);
        nextNum = Math.floor(nextNum);
        const currentChar = this.remainingAlphabet.splice(nextNum, 1)[0];
        console.log(currentChar);
        this.setState({currentChar: currentChar});
    }

    handleChange(e) {
        this.setState({ answer: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.isGetAnswer) {
            this.nextChar();
            this.setState({answer: ''});
            this.setState({isGetAnswer: false});
        } else {
            const correctness = (this.state.answer === this.state.currentChar[1]);

            console.log(`Your answer: ${this.state.answer}\nReal answer: ${this.state.currentChar[1]}`);
            console.log(`Yor answer correctness: ${this.state.answer === this.state.currentChar[1]}`);

            this.setState((state, props) => ({
                correctness,
                stats: {
                    total: state.stats.total + 1,
                    correct: state.stats.correct + (correctness ? 1 : 0), 
                    wrong: state.stats.wrong + (correctness ? 0 : 1)
                },
                isGetAnswer: true
            }));
        }
        // this.setState((state, props) => ({ isGetAnswer: !state.isGetAnswer }));
    }

    restart() {
      this.setState({ 
        answer: '', 
        correctness: false, 
        currentChar: undefined, 
        isGetAnswer: false,
        stats: {total: 0, correct: 0, wrong: 0} 
      });
      this.remainingAlphabet = [...this.props.alphabet];
      this.nextChar();
    }

    render() {
      let answerField;
      if (this.state.isGetAnswer) {
        if (this.state.correctness) {
          answerField = 
          <form className='test-form' onSubmit={this.handleSubmit.bind(this)}>
            <input style={{color: 'green'}} className='test-answer-input' type='text' value={this.state.answer}></input>
            <input className='submit-test-answer-btn' type='submit' value={this.state.isGetAnswer ? 'Next' : 'Check'}></input>
          </form>
        } else {
          answerField = 
          <form className='test-form' onSubmit={this.handleSubmit.bind(this)}>
            <input style={{color: 'red'}} className='test-answer-input' type='text' value={this.state.answer}></input>
            <div style={{color: 'green'}} className='test-answer-div'>{this.state.currentChar[1]}</div>
            <input className='submit-test-answer-btn' type='submit' value={this.state.isGetAnswer ? 'Next' : 'Check'}></input>
          </form>
        }
      } else {
        answerField = 
        <form className='test-form' onSubmit={this.handleSubmit.bind(this)}>
          <input className='test-answer-input' type='text' value={this.state.answer} onChange={this.handleChange.bind(this)}></input>
          <input className='submit-test-answer-btn' type='submit' value={this.state.isGetAnswer ? 'Next' : 'Check'}></input>
        </form>
      }

      return (
        <div className='training-container'>
          <div style={{color: (this.state.correctness) ? 'green' : 'red'}} 
              className={`correctness${this.state.isGetAnswer ? ' correctness-anim' : ''}`}>
          { this.state.correctness ? 'Correct' : 'Wrong' }
          </div>
          <div className='task-container'>
            <div className='japan-char'>{this.state.currentChar !== undefined ? this.state.currentChar[0] : 'No chars remain'}</div>
            { (this.state.currentChar !== undefined) && answerField }
          </div>
          <div className='test-stats'>
            <div>Total: {`${this.state.stats.total}/${this.props.alphabet.length}`}</div>
            <div style={{color: 'green'}}>Correct: {this.state.stats.correct}</div>
            <div style={{color: 'red'}}>Wrong: {this.state.stats.wrong}</div>
            <div className='restart-btn' onClick={this.restart.bind(this)}>Restart</div>
          </div>
        </div>
      )
    }
}