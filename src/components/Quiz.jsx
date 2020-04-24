import React from "react";
import Modal from "react-modal";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%"
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
      overlayClick: true
    };

    this.handleYesClick = this.handleYesClick.bind(this);
    this.handleNoClick = this.handleNoClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
  }

  afterOpenModal(){
    console.log("modal opened");
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
    console.log("modal closed");
    console.log(this.state.newArr);
    console.log(this.state.randNum);

    this.setState({
      modalIsOpen: false,
      quizTitle: this.state.newArr[this.state.randNum].data.title
    });
  }

  componentDidMount(){
    const randNumCalc = Math.floor(Math.random() * this.props.subData.length);
    console.log("component mounted");
    console.log(this.props.subData);
    console.log(randNumCalc);

    
    this.setState({
      randNum: randNumCalc,
      quizTitle: this.props.subData[randNumCalc].data.title,
      newArr: this.props.subData
    });
  }

  handleYesClick(){
    console.log(this.state.newArr[this.state.randNum].data.title);
    console.log(this.state.newArr[this.state.randNum].data.subreddit);
    console.log("yes clicked", this.state.newArr.length);
    if(this.state.newArr.length === 10){
      this.setState({
        modalMessage: "This is the end of the quiz.",
        overlayClick: false,
        gameOver: true,
        buttonText: "Refresh to restart",
        modalIsOpen: true
      })
    }else if(this.state.newArr[this.state.randNum].data.subreddit === "TheOnion"){
      this.setState({
        modalMessage: "Correct! This article title is from The Onion.",
        modalIsOpen: true
      });
    }else{
      this.setState({
        modalMessage: "Wrong! This article title is not from The Onion.",
        modalIsOpen: true
      });
    }
  }

  handleNoClick(){
    // console.log("no clicked", this.state.randNum);
    console.log(this.state.newArr[this.state.randNum].data.title);
    console.log(this.state.newArr[this.state.randNum].data.subreddit);
    console.log("no clicked", this.state.newArr.length);
    if(this.state.newArr.length === 10){
      this.setState({
        modalMessage: "This is the end of the quiz.",
        overlayClick: false,
        gameOver: true,
        buttonText: "Refresh to restart",
        modalIsOpen: true
      })
    }else if(this.state.newArr[this.state.randNum].data.subreddit === "nottheonion"){
      this.setState({
        modalMessage: "Correct! This article title is not from The Onion.",
        modalIsOpen: true
      });
    }else{
      this.setState({
        modalMessage: "Wrong! This article title is from The Onion.",
        modalIsOpen: true
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

          <h1>{this.state.modalMessage}</h1>
          <button onClick={this.handleModalButtonClick}>{this.state.buttonText}</button>

        </Modal>
      </div>
    );
  }
}

export {Quiz};