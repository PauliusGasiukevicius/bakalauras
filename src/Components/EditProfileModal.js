import React, { useState, useEffect } from 'react';

export default function EditProfileModal({user, setUser}) {

    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState('');
    const [name, setName] = useState(user.name);
    const [confirmPass, setConfirmPass] = useState('');
    const [imageUrl, setImageUrl] = useState(user.imageUrl);

  let clickLoginRegister = async () => {

    setLoading(true);

      let resp = await fetch(`/editProfile/${user._id}`,  {method: "POST", headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, pass, confirmPass, user, imageUrl})});
      let json = await resp.json();
      if(json.err)alert(json.err);
      else
      {
        setUser({...json, token: user.token});
        setTimeout(document.getElementById('closeEmailLogin').click(),50);
      }
    setLoading(false);
  }

  let onChangeImage = async (e) => {
    let img = document.getElementById('profileEditImageUpload').files[0]; 

    let formData = new FormData();
    formData.append("image", img);
    formData.append("user", JSON.stringify(user));

    setLoading(true);
    let resp = await fetch(`/image`, {method: "POST", body: formData});
    let json = await resp.json();
    if(json.url)setImageUrl(json.url);
    else alert(json.err);
    setLoading(false);
  }

  return (
    <>
    {loading ? 
    <div className="position-fixed h-100 w-100 mx-auto" style={{zIndex: 10}}>
      <div className="fa fa-spinner fa-spin text-white mx-auto" style={{fontSize: "7em"}}></div>
    </div> : null}

    <button className="btn btn-outline-light mx-auto m-2" data-toggle="modal" data-target={`#profileEdit`}>
        <p className="align-middle p-0 m-0">
            Edit profile <i className="fa fa-edit"></i>
        </p>
    </button>

    <div className="modal fade" id="profileEdit" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Edit profile</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span className="text-white">&times;</span>
            </button>
          </div>
          <div className="modal-body w-100">

                <div id={`profileEdit`} className="tab-pane fade show active">
                    <div className="m-2 card text-white bg-dark border border-white" >
                        <div className="card-body w-100">
                            <div className="form w-100 p-1">
                              <img style={{width: "300px"}} className="p-2 card-img-top img-fluid mx-auto" src={imageUrl} />
                                <div className="custom-file m-2">
                                  <input onChange={(e)=>onChangeImage(e)} type="file" className="custom-file-input" id="profileEditImageUpload" accept="image/gif, image/jpeg, image/png" />
                                  <label className="custom-file-label text-left" htmlFor="profileEditImageUpload">Change Image</label>
                                </div>
                                <br />
                                <div className="form-group w-100 m-2">    
                                    <input className="form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter new name"/>
                                </div>
                                {
                                  user.ID[0]=='E' ? 
                                <>
                                  <div className="form-group w-100 m-2">    
                                      <input className="form-control" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Enter new password"/>
                                  </div>
                                  <div className="form-group w-100 m-2">    
                                      <input className="form-control" type="password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} placeholder="Confirm new password"/>
                                  </div>
                                </> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
        </div>
          <div className="modal-footer">
            <button id="closeEmailLogin" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onClick={()=>clickLoginRegister()}type="button" className="btn btn-warning">{!loading ? 'Save changes' : <i className="fa fa-spinner fa-spin text-white mx-auto" />}</button>
          </div>
        </div>
      </div>
    </div>
    </>
);
}
