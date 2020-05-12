import React, {Component} from 'react' ;
import API from '../api';

 class Add extends Component{
   constructor(){
     super();
     this.state={
       'id':'',
       'teamId':'',
       'firstName':'',
       'lastName':'',
       'imageUri':'',
       'country':'',
       'jerseyNumber':'',
       'matches':'',
       'runs':'',
       'highestScores':'',
       'fifties':'',
       'hundreds':'',
       'teamsList':'',
       'isError':false,
       'errorMessage':'',
       'isSuccess':false
     };
     this.onSubmiHandler = this.onSubmiHandler.bind(this);
     this.fileChangeHandler = this.fileChangeHandler.bind(this);
     this.teamChangeHandler = this.teamChangeHandler.bind(this);
     this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
     this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
     this.countryChangeHandler = this.countryChangeHandler.bind(this);
     this.jerseyNumberChangeHandler = this.jerseyNumberChangeHandler.bind(this);
     this.matchesChangeHandler = this.matchesChangeHandler.bind(this);
     this.runsChangeHandler = this.runsChangeHandler.bind(this);
     this.highestScoresChangeHandler = this.highestScoresChangeHandler.bind(this);
     this.hundredsChangeHandler = this.hundredsChangeHandler.bind(this);
     this.fiftiesChangeHandler = this.fiftiesChangeHandler.bind(this);
   }
   async onSubmiHandler(e){
      e.preventDefault();
      try{

           const {res} = await this.addPlayer(this.state);
           this.setState({
                'isError':false,
                'isSuccess':true

          });
          this.props.history.push("/detail/"+this.state.teamId);
        }catch (error) {
            this.setState({
                'isError':true,
                'errorMessage':error.response.data.message,
                'isSuccess':false
            });
        }
   }
   async addPlayer(stateData){
       const formdata = new FormData();
      formdata.append('teamId',stateData. teamId );
      formdata.append('firstName',stateData.firstName);
      formdata.append('lastName',stateData.lastName);
      formdata.append('imageUri',stateData.imageUri);
      formdata.append('country',stateData.country);
      formdata.append('jerseyNumber',stateData.jerseyNumber);
      formdata.append('matches',stateData.matches);
      formdata.append('runs',stateData.runs);
      formdata.append('highestScores',stateData.highestScores);
      formdata.append('fifties',stateData.fifties);
      formdata.append('hundreds',stateData.hundreds);

  return API.post('players/add',formdata,{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });

   }
   fileChangeHandler(e){
      this.setState({'imageUri':e.target.files[0]});
   }
   teamChangeHandler(e){
      this.setState({'teamId':e.target.value});
   }
   firstNameChangeHandler(e){
      this.setState({'firstName':e.target.value});
    }
   lastNameChangeHandler(e){
      this.setState({'lastName':e.target.value});
    }
   countryChangeHandler(e){
      this.setState({'country':e.target.value});
    }
   jerseyNumberChangeHandler(e){
      this.setState({'jerseyNumber':e.target.value});
    }
   matchesChangeHandler(e){
      this.setState({'matches':e.target.value});
    }
    runsChangeHandler(e){
      this.setState({'runs':e.target.value});
    }
   highestScoresChangeHandler(e){
      this.setState({'highestScores':e.target.value});
    }
   fiftiesChangeHandler(e){
      this.setState({'fifties':e.target.value});
    }
   hundredsChangeHandler(e){
      this.setState({'hundreds':e.target.value});
    }
   async componentDidMount(){
        try{
            const list = await this.loadList();
            //console.log(list);
            this.setState({
                'teamsList':list.data
            });

        }catch(error){
            console.log(error.response);
        }
    }
    async loadList(){
        return API.get('teams',{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
   render(){
        let msgDiv='';
        let teamsdd = '';

        if (this.state.isError) {
          msgDiv = <div className="alert alert-warning">{this.state.errorMessage}</div>;
        }
        if (this.state.isSuccess){
          msgDiv = <div className="alert alert-success">Player added Succesfully</div>;
        }
        if(this.state.teamsList.length>0){
            teamsdd =this.state.teamsList.map((team,i)=>{
                 return <option key={team.id} value={team.id}>{team.name}</option>;
            });
        }
    return(
          <React.Fragment>
            <h3>Add Player</h3>
            {msgDiv}
          <form name="player-form" onSubmit={this.onSubmiHandler}>

              <div className="form-group">
                <label >First Name</label>
                <input required type="text" name="fname" onChange={this.firstNameChangeHandler} className="form-control"/>
              </div>
              <div className="form-group">
                <label >Last Name</label>
                <input required type="text" name="lname" onChange={this.lastNameChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input  type="file" onChange={this.fileChangeHandler}   name="imageUri" className="form-control-file" />
              </div>
              <div className="form-group">
                <label className="form-label" for="teamId" >Teams</label>
                <select required name="teamId" onChange={this.teamChangeHandler}  className="form-control" id="teamId">
                    <option value="">Select State</option>
                    {teamsdd}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" for="country" >Country</label>
                <input  type="text" required name="country" onChange={this.countryChangeHandler}  className="form-control" id="country" />

              </div>
              <div className="form-group">
                <label >Jersey Number</label>
                <input  type="text" name="jerseyNumber" onChange={this.jerseyNumberChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Matches Played</label>
                <input  type="text" name="matches" onChange={this.matchesChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Totals Runs</label>
                <input  type="text" name="runs" onChange={this.runsChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Highest Score</label>
                <input  type="text" name="highestScores" onChange={this.highestScoresChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Fifties</label>
                <input  type="text" name="fifties" onChange={this.fiftiesChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Hundreds</label>
                <input  type="text" name="hundreds" onChange={this.hundredsChangeHandler} className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
          </React.Fragment>

     );
    }
}
export default Add;
