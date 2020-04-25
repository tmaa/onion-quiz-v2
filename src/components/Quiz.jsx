import React from "react";
import Modal from "react-modal";
import wrongImg from "./../images/wrongImg.png";
import correctImg from "./../images/correctImg.png";
import "./Quiz.css"


const modalStyle = {
  content: {
    display: "flex",
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%",
  }
};

Modal.setAppElement("#root")

class Quiz extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      randNum: -1,
      newArr: [],
      quizTitle: "",
      modalIsOpen: false,
      modalMessage: "",
      gameOver: false,
      buttonText: "Next Question",
      overlayClick: true,
      modalImage: correctImg,
      questionNumber: 1,
      questionURL: ""
    };

    this.handleYesClick = this.handleYesClick.bind(this);
    this.handleNoClick = this.handleNoClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
  }

  afterOpenModal(){
    const randNumCalc = Math.floor(Math.random() * (this.state.newArr.length - 1));

    var temp = this.state.newArr.filter((sd) => {
      return sd.data !== this.state.newArr[this.state.randNum].data;
    });

    this.setState({
      newArr: temp,
      randNum: randNumCalc
    });

  }

  //close modal and move to next question
  handleModalButtonClick(){
    if(this.state.gameOver === false){
      this.closeModal();
    }else{
      window.location.reload();
    }
  }
  closeModal(){

    this.setState({
      modalIsOpen: false,
      quizTitle: this.state.newArr[this.state.randNum].data.title,
      questionNumber: (20 - this.state.newArr.length) + 1
    });
  }

  componentDidMount(){
    const randNumCalc = Math.floor(Math.random() * this.props.subData.length);

    this.setState({
      randNum: randNumCalc,
      quizTitle: this.props.subData[randNumCalc].data.title,
      newArr: this.props.subData
    });
  }

  handleYesClick(){
    if(this.state.newArr[this.state.randNum].data.subreddit === "TheOnion"){
      let message = "Correct! This article title is from The Onion.";
      if(this.state.newArr.length === 11){
        message = message + " Unfortunately, this is the end of the quiz.";
        this.setState({
          overlayClick: false,
          gameOver: true,
          buttonText: "Refresh to restart"
        });
      }
      this.setState({
        modalMessage: message,
        modalImage: correctImg,
        modalIsOpen: true,
        questionURL: this.state.newArr[this.state.randNum].data.url
      });
    }else{
      let message = "Wrong! This article title is not from The Onion.";
      if(this.state.newArr.length === 11){
        message = message + " Unfortunately, this is the end of the quiz.";
        this.setState({
          overlayClick: false,
          gameOver: true,
          buttonText: "Refresh to restart"
        });
      }
      this.setState({
        modalMessage: message,
        modalImage: wrongImg,
        modalIsOpen: true,
        questionURL: this.state.newArr[this.state.randNum].data.url
      });
    }
  }

  handleNoClick(){
    if(this.state.newArr[this.state.randNum].data.subreddit === "nottheonion"){
      let message = "Correct! This article title is not from The Onion.";
      if(this.state.newArr.length === 11){
        message = message + " Unfortunately, this is the end of the quiz.";
        this.setState({
          overlayClick: false,
          gameOver: true,
          buttonText: "Refresh to restart"
        });
      }
      this.setState({
        modalMessage: message,
        modalImage: correctImg,
        modalIsOpen: true,
        questionURL: this.state.newArr[this.state.randNum].data.url
      });
    }else{
      let message = "Wrong! This article title is from The Onion.";
      if(this.state.newArr.length === 11){
        message = message + " Unfortunately, this is the end of the quiz.";
        this.setState({
          overlayClick: false,
          gameOver: true,
          buttonText: "Refresh to restart"
        })
      }
      this.setState({
        modalMessage: message,
        modalImage: wrongImg,
        modalIsOpen: true,
        questionURL: this.state.newArr[this.state.randNum].data.url
      });
    }
  }

  render(){
    if(this.state.randNum === -1){
      return <h1>loading</h1>
    }
    return(
      <div>
        <div style={{paddingBottom: "20%"}}>
          <h2>{this.state.questionNumber}/10</h2>
          <h1 style={{fontSize: "2.5em", paddingBottom: "5%"}}>{this.state.quizTitle}</h1>
          <button className="massive ui green button" onClick={this.handleYesClick}>Onion-y</button>
          <button className="massive ui red button" onClick={this.handleNoClick}>Not the onion</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel="Example modal"
          shouldCloseOnOverlayClick={this.state.overlayClick}
        >
        <div className="ui center aligned container">
          <img alt={this.state.modalImage} src={this.state.modalImage}/>
          <h1 style={{paddingBottom: "5%"}}>{this.state.modalMessage}</h1>
          <h2>Check out the article <a href={this.state.questionURL} target="_blank" rel="noopener noreferrer">here</a></h2>
          <button onClick={this.handleModalButtonClick}>{this.state.buttonText}</button>
        </div>
        </Modal>
      </div>
    );
  }
}

export {Quiz};