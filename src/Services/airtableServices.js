import axios from "axios";
import config from "./config.json";


const authKey = 'Bearer keyXfYaRYt1SfZcwU';

export function fetchAllProjectstrial() {
  fetch(
    `${config.airTableServiceBaseUrl}/Design%20projects`,{
        headers : new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer keyXfYaRYt1SfZcwU'}),
    }
    
  )
  
  
 
//   .then( res=>res.json())
//   return res
//   .then(json => {
//     console.log(json);
//     return json;
//   })

  //.catch(error=>console.log({error}))
}

export function fetchAllProjects() {
    return axios.get(
      `${config.airTableServiceBaseUrl}/Design%20projects`,
      {
          headers: { Authorization: authKey },
          'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    );
  }
  export function patchProjectRecord(payload) {
    return axios.patch(
      `${config.airTableServiceBaseUrl}/Design%20projects`,payload,
      {
          headers: { Authorization: authKey,"Content-Type": "application/json", "Accept": "application/json" },
         
            
        }
    );
  }
  export function patchTaskRecord(payload) {
    return axios.patch(
      `${config.airTableServiceBaseUrl}/Tasks`,payload,
      {
          headers: { Authorization: authKey,"Content-Type": "application/json", "Accept": "application/json" },
         
            
        }
    );
  }
  export function patchClientRecord(payload) {
    return axios.patch(
      `${config.airTableServiceBaseUrl}/Clients`,payload,
      {
          headers: { Authorization: authKey,"Content-Type": "application/json", "Accept": "application/json" },
         
            
        }
    );
  }

  export function fetchTasksByID(task) {
    return axios.get(
      `${config.airTableServiceBaseUrl}/Tasks/${task}`,
      {
          headers: { Authorization: authKey },
         
            
        }
    );
  }
  export function fetchClientsByID(client) {
    return axios.get(
      `${config.airTableServiceBaseUrl}/Clients/${client}`,
      {
          headers: { Authorization: authKey },
         
            
        }
    );
  }
  export function fetchAllClients() {
    return axios.get(
      `${config.airTableServiceBaseUrl}/Clients?view=All%20clients`,
      {
          headers: { Authorization: authKey,"Content-Type": "application/json", "Accept": "application/json" },
         
            
        }
    );
  }
  export function fetchAllTasks() {
    return axios.get(
      `${config.airTableServiceBaseUrl}/Tasks?view=All%20tasks`,
      {
          headers: { Authorization: authKey,"Content-Type": "application/json", "Accept": "application/json" },
         
            
        }
    );
  }