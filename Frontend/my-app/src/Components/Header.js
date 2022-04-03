import  Form  from 'react-bootstrap/Form';

const Header = ()=>{

    return(
        <div style={{display:"flex", alignItems:"center",justifyContent:"space-between", padding:"1rem", background:"lightblue"}}>
            <div>
                <b>EasyMaker</b>
            </div>
            <input style={{width:"500px", height:"20px", borderRadius:"0.3rem", border:"none", background:"lightgray"}}>
                
            </input>
           
                           
            <Form.Control type="text"  placeholder="Enter author name or title" />
                           
         
            <div>
                Icon
            </div>
        </div>
    );
};

export default Header;