import React,{useState} from 'react';

import "./App.css";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

function App() {

  const [user, setUser] = useState({})


  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:8888/facebookLogin",
      data: { accessToken: response.accessToken, userId: response.id },
    }).then((res) => {
      setUser(res.data)
    });
  };

  return (
    <div className="App">


      {
        user?.token ?
         (
           <div>
             <h1>{user.user.name} </h1>
             <h1>{user.user.email}</h1>
             <a href={user.user.profilePhoto}>Click here for Profile Photo</a>
              </div>
         ): (
          <FacebookLogin
                  appId="450564109717592"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                />
                  )
      }
      
    </div>
  );
}

export default App;
