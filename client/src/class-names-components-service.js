import * as axios from 'axios';

export async function getClassNamesComponents(amount) {
    try {
      const response = await axios(`http://localhost:8000/classnames?amount=${amount}`);
      const { data } = response;
  
      return data.flat();
    } catch(error) {
      console.log(error);
      return ['Stub Data'];
    }
  }