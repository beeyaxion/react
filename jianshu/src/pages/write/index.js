import  React ,{ PureComponent } from 'react'

import {  connect } from 'react-redux'

import { Redirect } from 'react-router-dom';



class Write extends PureComponent {
    render(){   
        const { loginStatus }      = this.props;
        console.log()
        if(loginStatus) {
            return(
                <div>写文档</div>
             )
        }
        else{
            return <Redirect to= '/login'/>
        }
        
    }    
}

const mapState = (state)=>({
    loginStatus: state.getIn(['login','login'])
})

const mapDispatch = (dispatch) => ({
  
})


export default connect(mapState, mapDispatch)(Write) ;