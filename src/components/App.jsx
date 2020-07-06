import React from "react";
import {Quiz} from "./Quiz";
import axios from "axios";

class App extends React.Component{

  state = {
    //prod ready
    subData: [],
    loading: true
  }


  componentDidMount = async () => {
    const [theonion, nottheonion] = await Promise.all([
      axios.get("https://www.reddit.com/r/theonion/new.json?sort=popular&limit=10"),
      axios.get("https://www.reddit.com/r/nottheonion/new.json?sort=popular&limit=10")
    ]);
    this.setState({subData: theonion.data.data.children});
    this.setState({
      subData: [...this.state.subData, ...nottheonion.data.data.children],
      loading: false
    });
  }

  render(){
    if(this.state.loading){
      return <h1>loading...</h1>
    }
    return(
        <div className="ui center aligned container">
          <h1 className="ui green header" 
            style={{fontSize: "4em", paddingTop: "10%"}}>
            The Onion Quiz - Version 2
          </h1>
          <Quiz subData={this.state.subData}/>
        </div>
    );
  }   
}

export default App;
