import React, { useState, useEffect } from 'react';

export default function EmailLogin() {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [buttonText, setButtonText] = useState('Login');

  let clickLoginRegister = async () => {
    alert('W.I.P.');

    if(buttonText == 'Login'){

    }else {

    }
    /*let resp = await fetch('/userEmail',  {method: "POST", headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({email})});
    let json = await resp.json();
    if(json.err)alert(json.err);
    else alert(json.ok);*/
  }

  return (
    <div className="modal fade" id="emailLogin" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Login with email</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span className="text-white">&times;</span>
            </button>
          </div>
          <div className="modal-body w-100">

            <div className="w-100 m-1" style={{color: "white"}}>
              <ul className="nav nav-tabs nav-justified w-100">
                <li className="nav-item w-100">
                    <a onClick={()=>setButtonText('Login')} className="w-100 btn btn btn-outline-light" data-toggle="tab" href={`#loginTab`}>
                      Login
                    </a>
                </li>
                <li className="nav-item w-100">
                    <a onClick={()=>setButtonText('Register')} className="w-100 btn btn btn-outline-light" data-toggle="tab" href={`#registerTab`}>
                      Register
                    </a>
                </li>
              </ul>

            <div className="tab-content">
                <div id={`loginTab`} className="tab-pane fade show active">
                    <div className="m-2 card text-white bg-dark border border-white" >
                        <div className="card-body w-100">
                            <div className="form w-100 p-1">    
                                <div className="form-group w-100">    
                                    <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
                                </div>
                                <div className="form-group w-100">    
                                    <input className="form-control" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Enter password"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={`registerTab`} className="tab-pane fade">
                    <div className="m-2 card text-white bg-dark border border-white" >
                        <div className="card-body w-100">
                            <div className="form w-100 p-1">    
                                <div className="form-group w-100">    
                                    <input className="form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name"/>
                                </div>
                                <div className="form-group w-100">    
                                    <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
                                </div>
                                <div className="form-group w-100">    
                                    <input className="form-control" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Enter password"/>
                                </div>
                                <div className="form-group w-100">    
                                    <input className="form-control" type="password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} placeholder="confirm password"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onClick={()=>clickLoginRegister()}type="button" className="btn btn-warning" data-dismiss="modal">{buttonText}</button>
          </div>
        </div>
      </div>
    </div>
);
}
