import api from "../api";
import { useState, useContext } from "react";
import AuthContext from "../auth";

const ProfileRow = (props)=>{
    console.log(props);
    const [editing, setEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(props.value);
    const ctx = useContext(AuthContext);

    return(<div style={{display: "flex", justifyContent: "space-between", marginTop:"60px"}}>
    <div style={{display: "flex"}}>
        <p style={{fontSize: 16, fontFamily: "Ribeye Marrow", marginRight: "20px", marginLeft: "20px"}}>{props.label}:</p>
        { editing ? <input defaultValue={ props.field==="password" ? "":props.value} onChange={(e)=>{ setCurrentValue(e.target.value); }} style={{background:"transparent"}} ></input>: <p style={{fontSize: 16, fontWeight: 700}}>{props.value}</p>  }
        
    </div>
    
    { editing ? 
    <div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px", cursor:"pointer"}}
    onClick={ async ()=>{  
         props.user[props.field] = currentValue
         const response = await api.updateUserById(props._id, props.user, null );
         if(response.status === 200){
            alert("Editing succeeded.");
            ctx.setAuth({
                user: response.data.user,
                loggedIn: true,
                guest: false
            });
         }
         else{
             alert("Editing failed.");
         }
         setEditing(false);
    }}>
    Save
</div>
:
<div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px", cursor:"pointer"}}
        onClick={()=>{ setEditing(true); }}>
        Edit
    </div>
    }
    


</div>);
};

export default ProfileRow;