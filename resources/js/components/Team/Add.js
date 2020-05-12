import React, {Component} from 'react' ;
import { Redirect } from 'react-router-dom' ;
import API from '../api';

 class Add extends Component{
   constructor(){
     super();
     this.state={
       name:'',
       logoUri:null,
       clubState:'',
       isError:false,
       errorMessage:'',
       isSuccess:false

     };
     this.onSubmiHandler = this.onSubmiHandler.bind(this);
     this.fileChange = this.fileChange.bind(this);
     this.addTeam = this.addTeam.bind(this);
     this.nameChange = this.nameChange.bind(this);
     this.stateChangeHandler = this.stateChangeHandler.bind(this);
   }
   async onSubmiHandler(e){
      e.preventDefault();
      try{

           const {res} = await this.addTeam(this.state);
           this.setState({
                'isError':false,
                'isSuccess':true

          });
          this.props.history.push("/");
        }catch (error) {
            this.setState({
                'isError':true,
                'errorMessage':error.response.data.message,
                'isSuccess':false
            });
        }
   }
   async addTeam(stateData){
      const formdata = new FormData();
      formdata.append('logoUri',stateData.logoUri);
      formdata.append('name',stateData.name);
      formdata.append('clubState',stateData.clubState);

      return API.post('teams',formdata,{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });

   }
   fileChange(e){
      this.setState({'logoUri':e.target.files[0]});
   }
   nameChange(e){
      this.setState({'name':e.target.value});
   }
   stateChangeHandler(e){
      this.setState({'clubState':e.target.value});
    }

   render(){
        let msgDiv='';

        if (this.state.isError) {
          msgDiv = <div className="alert alert-warning">{this.state.errorMessage}</div>;
        }
        if (this.state.isSuccess){
          msgDiv = <div className="alert alert-success">Team updated Succesfully</div>;
        }
    return(
          <React.Fragment>
            <h3>Add Team</h3>
            {msgDiv}
          <form onSubmit={this.onSubmiHandler}>

              <div className="form-group">
                <label for="name">Team Name</label>
                <input required type="text" name="name" onChange={this.nameChange} className="form-control" id="team_name" placeholder="Enter Team Name"/>
              </div>
              <div className="form-group">
                <label for="logoUri">Logo Uri</label>
                <input required type="file" onChange={this.fileChange}   name="logoUri" className="form-control-file" id="logoUri"/>
              </div>
              <div className="form-group">
                <label className="form-label" for="clubState" >Club State</label>
                <select name="clubState" onChange={this.stateChangeHandler}  className="form-control" id="clubState">
                    <option value="">Select State</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Rajasthan</option>
                    <option>Banglore</option>
                    <option>Kolkatta</option>
                    <option>Hyderabad</option>
                    <option>Pubjab</option>
                    <option>Chennai</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </React.Fragment>

     );
    }
}

export default Add;
