import React ,{Component} from 'react';
import Nabar from './component/Nabar';
import bg from './image-bg/1.jpg';
class home extends Component {
    render(){
        return(
            <Nabar>
            <div style={paper2}>
            <div style={sectionStyle}>
            <div style={{paddingTop: "50px"}}>hello</div>
            </div>
            </div>
            </Nabar>
        )
    }
}
export default home;
var sectionStyle = {
    backgroundImage: `url(${bg})`,
    overflow: 'auto',
    height: '1000px',
}
var paper2 =
{
    width: '98%',
    height: '700px',
    marginleft: '10px',
    marginright: '10px',
}