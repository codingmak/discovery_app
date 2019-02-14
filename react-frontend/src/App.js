import React, { Component } from 'react';

import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = { 
        data: '',
        isLoading: false,
        value1: 'Hello {{name}}! {% if test -%} How are you?{%- endif %}', 
        value2: '{"name": "John"}' };

        


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.click = this.click.bind(this);

        

    }
//post
 click() {
        //what to send over to flask:
   /*     template: $('#template').val(),
            console.log($('#template').val())
            values: $('#values').val(),
            input_type: input_type,
            
            //boolean
            showwhitespaces: is_checked_showwhitespaces,
            dummyvalues: is_checked_dummyvalues*/

        const request_info = {
            template: this.state.value1,
            values: this.state.value2
        }

        this.setState({ isLoading: true });

        axios.post("http://localhost:5000/convert", {request_info},console.log(request_info))
            .then((response) => {
                  this.setState({ data: response.data, isLoading: false });
             })
            .catch((err) => {
                  this.setState({ data: err, isLoading: false });
             });
    }


  handleChange(event) {
    this.setState({value: event.target.value1});
  }

    handleValueChange(event) {
    this.setState({value: event.target.value2});
  }
  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value1);
    event.preventDefault();
  }

   

    

//////////////GET/////////////////
    state = {
        loading: true,
        person: null,
    }
    async componentDidMount(){

   /*     axios.post("http://localhost:5000/convert", this.state.value1).then(response => {
          console.log(response);
        }).catch(error => {
          console.log("this is error", error);
    });*/

        const url = "https://api.randomuser.me/";
        const response = await fetch(url);
        const data = await response.json();
        //change this so that if there is no response in render make it blank 
        this.setState({person: data.results[0],loading:false})
        console.log("response: "+ response.status)
        console.log(data)


            ////POST////////////////

        
    }
    


  
  render() {


    return (
      <div className="App">
      
          <p>
          {window.token}


          <div>
          {this.state.loading || !this.state.person ? <div id="render">loading...</div> : <div><div>{this.state.person.name.first}</div><div>{this.state.person.name.last}</div></div>}
          </div>


          </p>


          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
           
          </a>
    <form class="container">
        <div class="row">
            <div class="col-md-5">
                <h1>Template</h1>
               <textarea id="template" value={this.state.value1} onChange={this.handleChange}/>
            </div>
            <div class="col-md-5">
                <h1>Render</h1>
                <div id="render"></div>
      
            </div>
            <div class="col-md-2">
                <h1>Settings</h1>
                <div id="settings">
                    <label><input type="checkbox" name="showwhitespaces" checked="checked" /> Show whitespaces</label><br/>
                     <label><input type="checkbox" name="dummyvalues" /> Use dummy values</label>
                    <h1> JSON</h1>
                  
                    <input type="button" class="btn btn-success" id="convert" value="Convert" onClick={this.click} disabled={this.state.isLoading}/>
                    {console.log(this.state.data)}
                    <input type="button" class="btn btn-danger" id="clear" value="Clear" />
                </div>
            </div>
        </div>
         <div class="row">
            <div class="col-md-5">
                <h1>Values</h1>
                <textarea id="values" value={this.state.value2} onChange={this.handleValueChange}></textarea>
            </div>
            <div class="col-md-7">
                <h1>Custom Filters</h1>
            
            </div>
        </div>
       
    </form>

      </div>
    );
  }
}

// App.propTypes = { action: React.PropTypes.string.isRequired, method: React.PropTypes.string}


