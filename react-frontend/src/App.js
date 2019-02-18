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
        //Hello {{name}}! {% if test -%} How are you?{%- endif %}
        value: ' ', 
        value2: ' ',
        dummy_values: 1,
        };
        


        
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
        var headers = {
            'Content-Type': 'application/json',
           
        }


        const request_info = {
            template: this.state.value,
            values: this.state.value2,
            input_type: "json",
            showwhitespaces: 1,
            dummy_values: this.state.dummy_values,
        }

        this.setState({ isLoading: true });



/*


 axios({  method: 'post',
    url: "http://localhost:5000/convert",
    data: request_info,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        console.log(response);
        console.log("FORM:" + request_info);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
        console.log("FORM" + request_info);

    })
    }
    });*/

        axios.post("http://localhost:5000/convert", {request_info}, {headers: headers})
            .then((response) => {
                  this.setState({ data: response.data, isLoading: false });
                     
                   console.log(request_info)
             })
            .catch((err) => {
                  this.setState({ data: err, isLoading: false });
                  
                   console.log(request_info)
             });
    }


  handleChange(event) {
    this.setState({value: event.target.value});
  }


  handleChange2(event) {
     this.setState({value2: event.target.value});
  }

   

  handleSubmit(event) {
    event.preventDefault();
}
    


    
/*
 state = {
        loading_screen: true,
        template_rendered: null,
    }

    //This is for the render display
    async componentDidMount(){

 

        const url = "http://localhost:5000/convert";
        //fetch data
        const response = await fetch(url);
        const data = await response.json();
        //change this so that if there is no response in render make it blank 
        this.setState({template_rendered: data,loading_screen:false})
        console.log("response: "+ response.status)
        console.log(data)


            ////POST////////////////

        
    }*/
  
  render() {


    return (
      <div className="App">
      
          <p>
          {window.token}



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
              
               <textarea id="template" placeholder="Hello {{name}}! {% if test -%} How are you?{%- endif %}" onChange={this.handleChange.bind(this)}/>
            </div>
            <div class="col-md-5">
                <h1>Render</h1>
                {/*.replace(/•/g, " ")*/}
                <div id="render"> {this.state.loading || !this.state.data? <div id="render">Waiting for input...</div> : <div><div>{this.state.data.toString().replace(/•/g, " ")}</div></div>}</div>
      
            </div>
            
        </div>

         <div class="row">
            <div class="col-md-5">
                <h1>Values</h1>
                <textarea id="values" value={this.state.value2} onChange={this.handleChange2.bind(this)}></textarea>
            </div>
          
        <div class="col-md-5">
     
                <div id="settings">
               
                 
                    <h1> JSON</h1>
                  
                    <input type="button" class="btn btn-success" id="convert" value="Convert" onClick={this.click} disabled={this.state.isLoading}/>
                    {console.log("It's here: " + this.state.data)}
                    <input type="button" class="btn btn-danger" id="clear" value="Clear" />
                </div>
            </div>
  
        </div>
    
    </form>

      </div>
    );
  }
}

// App.propTypes = { action: React.PropTypes.string.isRequired, method: React.PropTypes.string}


