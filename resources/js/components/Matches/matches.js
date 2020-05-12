import React,{Component} from 'react' ;
import { Link } from 'react-router-dom';
import API from '../api';
class matches extends Component{
    constructor(){
     super();
     this.state={
       matches :[]
     };
   }


    async componentDidMount(){
        try{
            const match = await this.loadList();
            this.setState({
                'matches':match.data.data
            });
        }catch(error){
            console.log(error.response);
        }
    }
    async loadList(){
        return API.get('/matches/',{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
   render(){
       let matchRow = '';
        if(Array.isArray(this.state.matches) && this.state.matches.length>0 ){
        matchRow = this.state.matches.map((rec, i) => (

            <tr key={i}>
                 <td>{i+1}</td>
                 <td>{rec.teamFirst}</td>
                 <td>{rec.teamTwo}</td>
                 <td>{rec.score}</td>
                 <td>{rec.teamWinner}</td>
                 <td>{rec.matchPoints}</td>
               </tr>
        ));
      }
      return(
        <React.Fragment>

          <div class="row ">
            <div class="col-md-12 m-top-100"><h3>Matches</h3></div>
          </div><br />
        <table className="table table-bordered   m-btm-100">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Score</th>
            <th>Winner</th>
            <th>Points</th>
          </tr>
          </thead>
          <tbody>
          {matchRow}
          </tbody>
        </table>
        </React.Fragment>
   );
   }
};

export default matches;
