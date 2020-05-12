import React,{Component} from 'react' ;
import { Link } from 'react-router-dom';
import API from '../api';

class points extends Component{
    constructor(){
     super();
     this.state={
        points :[]
     };
   }


    async componentDidMount(){
        try{
            const points = await this.getPoints();
            this.setState({
                'points':points.data.data
            });
        }catch(error){
            console.log(error.response);
        }
    }
    async getPoints(){
        return API.get('/points/',{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
   render(){
       let pointRow = '';
        if(Array.isArray(this.state.points) && this.state.points.length>0 ){
            pointRow = this.state.points.map((rec, i) => (

            <tr key={i}>
                 <td>{rec.teamsName}</td>
                 <td>{rec.wins}</td>
                 <td>{rec.pts}</td>
               </tr>
        ));
      }
      return(
        <React.Fragment>

          <div class="row ">
            <div class="col-md-12 m-top-100"><h3>Points Table</h3></div>
          </div><br />
        <table className="table table-bordered   m-btm-100">
        <thead>
            <tr>
                <th>Teams</th>
                <th>Won</th>
                <th>Pts</th>
            </tr>
          </thead>
          <tbody>
          {pointRow}
          </tbody>
        </table>
        </React.Fragment>
   );
   }
};


export default points;
