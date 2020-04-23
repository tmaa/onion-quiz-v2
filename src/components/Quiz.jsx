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
      modalIsOpen: false
    };

    this.handleYesClick = this.handleYesClick.bind(this);
    this.handleNoClick = this.handleNoClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // openModal(){
  //   this.setState({modalIsOpen: true});
  // }
  afterOpenModal(){
    console.log("modal is open");
  }
  closeModal(){
    this.setState({modalIsOpen: false});
  }

  componentDidMount(){
    const randNumCalc = Math.floor(Math.random() * (this.props.subData.length - 0 + 1)) + 0;
    this.setState({randNum: randNumCalc});
    this.setState({quizTitle: this.props.subData[randNumCalc].data.title})

    console.log(this.state.randNum);
    console.log(randNumCalc);
  }

  handleYesClick(){
    this.setState({modalIsOpen: true});
    //logic, right or wrong answer, link to article
  }

  handleNoClick(){

  }

  render(){
    if(this.state.randNum === -1){
      return <h1>loading</h1>
    }
    return(
      <div>
        <div>
          <h1 style={{fontSize: "2.5em"}}>{this.state.quizTitle}</h1>
          <button className="massive ui green button" onClick={this.handleYesClick}>Onion-y</button>
          <button className="massive ui red button" onClick={this.handleNoClick}>Not the onion</button>
        </div>
        <Modal 
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel="Example modal"
        >

          <button onClick={this.closeModal}>close</button>
          <h1>I am modal</h1>
        </Modal>
      </div>
    );
  }
}

export {Quiz};