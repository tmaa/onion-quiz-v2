import React from "react";
import axios from "axios";
import {Quiz} from "./Quiz";
import "./App.css"

class App extends React.Component{

  state = {
    subData: [],
    loading: true
  }


  componentDidMount(){
    this.makeApiCall();
  }

  makeApiCall = async() => {
    const [theonion, nottheonion] = await Promise.all([
      axios.get("https://www.reddit.com/r/theonion/new.json?sort=popular&limit=10/"),
      axios.get("https://www.reddit.com/r/nottheonion/new.json?sort=popular&limit=10/")
    ]);
    this.setState({subData: theonion.data.data.children})
    this.setState({
      subData: [...this.state.subData, ...nottheonion.data.data.children],
      loading: false
    })
  }

//   top: "50%",
//   left: "50%",
//   right: "50%",
//   bottom: "auto",
//   marginRight: "-50%",
//   transform: "translate(-50%, -50%"
// }

  render(){
    if(this.state.loading){
      return <h1>loading...</h1>
    }
    return(
        <div className="ui center aligned container">
          <h1 className="ui green header" 
            style={{fontSize: "4em", paddingTop: "20%"}}>
            The Onion Quiz - Version 2
          </h1>
          <Quiz subData={this.state.subData}/>
        </div>
    );
  }   
}

export default App;
