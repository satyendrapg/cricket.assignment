import React,{Component} from 'react' ;
import { Link } from 'react-router-dom';
import API from '../api';

class team extends Component{
    constructor(){
     super();
     this.state={
       players :[],
       teamName: ''
     };
     this.deletePlayer = this.deletePlayer.bind(this);
   }

    async deletePlayer(id){
        let players = this.state.players;
        let updatedRecords = players.filter(player=>player.id!==id);
        await this.deleteCall(id);
        this.setState({
            'players':updatedRecords
        });
    }

    async deleteCall(id){
        return API.delete('player/'+id,{
                headers: {
                  'content-type': 'multipart/form-data',
                  'X-CSRF-TOKEN':csrf_token
                }
            });
    }
    async componentDidMount(){
        try{
            const list = await this.getTeam();
            //console.log(list);
            this.setState({
                'players':list.data.players,
                'teamName': list.data.team.name
            });

        }catch(error){
            console.log(error.response);
        }
    }
    async getTeam(){
       let param =window.location.pathname.split('/');
        return API.get('/team/'+param[param.length-1],{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
   render(){
       let record = this.state.players.map((el, i) => (
            <tr key={i}>
                 <td>{i+1}</td>
                 <td><img height="75" width="75" src={'http://cricket.assignment.local/storage/players/'+el.imageUri}/></td>
                 <td>{el.firstName+' '+el.lastName}</td>
                 <td>{el.matches}</td>
                 <td>{el.runs}</td>
                 <td>{el.highestScores}</td>
                 <td>
                   <Link to={'/player/edit/'+el.id}><img height="15" width="15" src={'img/edit-icon.jpg'}/></Link>
                    &nbsp; &nbsp;
                   <Link onClick={()=>{this.deletePlayer(el.id)}}><img height="20" width="20" src={'img/del-icon.png'}/></Link>
                 </td>
               </tr>
        ));
      return(
        <React.Fragment>

        <div class="row ">
            <div class="col-md-10 m-top-100"><h3>{this.state.teamName}</h3></div>
            <div class="col-md-2 m-top-100">
                <Link to ="/player/add"><button className="btn btn-primary">Add Player</button></Link>
            </div>
        </div><br />
        <table className="table table-bordered   m-btm-100">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Matches</th>
            <th>Runs</th>
            <th>Highest Score</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {record}

          </tbody>
        </table>
        </React.Fragment>
   );
   }
};

export default team;
