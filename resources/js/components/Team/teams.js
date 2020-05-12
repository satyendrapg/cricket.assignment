import React ,{Component} from 'react' ;
import { Link } from 'react-router-dom';
import API from '../api';

class teams  extends Component{
    constructor(){
     super();
     this.state={
       teams :[]
     };
     this.deleteTeam = this.deleteTeam.bind(this);
   }

    async deleteTeam(id){
        let currentTeams = this.state.teams;

        let updatedTeams = currentTeams.filter(team=>team.id!==id);
        await this.deleteCall(id);
        this.setState({
            'teams':updatedTeams
        });

    }

    async deleteCall(id){
        return API.delete('teams/'+id,{
                headers: {
                  'content-type': 'multipart/form-data',
                  'X-CSRF-TOKEN':csrf_token
                }
            });
    }
    async componentDidMount(){
        try{
            const records = await this.getTeams();
            this.setState({
                'teams':records.data
            });

        }catch(error){
            console.log(error.response);
        }
    }
    async getTeams(){
        return API.get('teams',{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
    render(){
    let teamRow = this.state.teams.map((el, i) => (
            <tr key={i}>
                 <td>{i+1}</td>
                 <td><img height="75" width="75" src={'http://cricket.assignment.local/storage/teams/'+el.logoUri}/></td>
                 <td>
                   <Link to={'/detail/'+el.id}>{el.name}</Link>
                 </td>
                 <td>{el.clubState}</td>
                 <td>
                 <Link to={'/team/edit/'+el.id}><img height="15" width="15" src={'img/edit-icon.jpg'}/></Link>
                 &nbsp;&nbsp; <Link onClick={()=>{this.deleteTeam(el.id)}}><img height="20" width="20" src={'img/del-icon.png'}/></Link>
                 </td>
               </tr>
        ));
    return(
          <React.Fragment>
            <div className="row ">
                <div className="col-md-10 m-top-100"><h3>Teams</h3></div>
                <div className="col-md-2 m-top-100 float-right">
                    <Link to="/team/add"><button className="btn btn-primary">Add Team</button></Link>
                </div>
            </div><br />
          <table className="table table-bordered m-top-100 m-btm-100">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Club</th>
              <th>Action</th>
            </tr>
            </thead>
             <tbody>
             {teamRow}
            </tbody>
          </table>
          </React.Fragment>

     );
    };

};

export default teams;
