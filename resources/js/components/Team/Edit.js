import React, {Component} from 'react' ;
import { Link } from 'react-router-dom';
import API from '../api';
 class Edit extends Component{
   constructor(){
     super();
     this.state={
       teamId:'',
       name:'',
       clubState:'',
       logoUri:''
     }
     this.nameChangeHandler = this.nameChangeHandler.bind(this);
     this.stateChangeHandler = this.stateChangeHandler.bind(this);
     this.onSubmiHandler = this.onSubmiHandler.bind(this);
     this.fileChangeHandler = this.fileChangeHandler.bind(this);

   }

   fileChangeHandler(e){
      this.setState({'logoUri':e.target.files[0]});
   }
   nameChangeHandler(e){
      this.setState({'name':e.target.value});
   }
   stateChangeHandler(e){
      this.setState({'clubState':e.target.value});
    }
   async componentDidMount(){
        try{
            const team = await this.getTeam();
            this.setState({
                'teamId':team.data.id,
                'name':team.data.name,
                'clubState':team.data.clubState,
                'isUpdated':false,
                'isSuccess':false
            });

        }catch(error){
            console.log(error.response);
        }
    }
   async getTeam(){
       let param =window.location.pathname.split('/');
        return API.get('/teams/'+param[param.length-1],{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
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

      return API.post('teams/update/'+stateData.teamId,formdata,{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });

   }
   render(){

       let errorDiv='';

        if (this.state.isError) {
          errorDiv = <div className="alert alert-warning">{this.state.errorMessage}</div>;
        }
      let successDiv='';

        if (this.state.isSuccess) {
          successDiv = <div className="alert alert-success">Team updated Succesfully</div>;
        }
    return(
          <React.Fragment>
            <h3>Edit Team</h3>
            {errorDiv}
            {successDiv}
          <form onSubmit={this.onSubmiHandler} >
              <div className="form-group">
                <label className="form-control-label" >Team Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.nameChangeHandler} className="form-control" id="name" placeholder="Enter Team Name"/>
              </div>
              <div className="form-group">
                <label className="form-control-label">Logo Uri</label>
                <input type="file"   name="logoUri" onChange={this.fileChangeHandler} className="form-control-file" id="logoUri"/>
              </div>
              <div className="form-group">
                <label className="form-check-label">Club State</label>
                <input type="text" name="clubState" value={this.state.clubState} onChange={this.stateChangeHandler}   className="form-control" id="clubState"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </React.Fragment>

     );
    }
}

export default Edit;
