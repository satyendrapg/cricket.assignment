import axios from 'axios';

export default axios.create({
  baseURL: `http://cricket.assignment.local/api/`
});
