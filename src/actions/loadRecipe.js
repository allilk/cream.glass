import axios from "axios";

export const GetFiles = () => dispatch => {
        axios.get('http://localhost:8000/api/files/', {headers: {
            'Authorization':'Token cab55363c45a54a5e5aa03f0801500f4c1e9cfde67bd749c5e592e905f1a4668'
        }}).then(res => {
            dispatch({
                type: GET_FILES,
                payload: res.data
            });
        }).catch(err => console.log(err));

    }

  
  