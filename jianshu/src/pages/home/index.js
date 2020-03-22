import  React ,{ PureComponent } from 'react'
import { HomeWrapper ,HomeLeft,HomeRight} from './style'
import List from './components/List'
import Recommend from './components/Recommend'
import Topic from './components/Topic'
import Writer from './components/Writer'

import {  connect } from 'react-redux'
import { actionCreators } from './store'
import { BackTop } from './style'


class Home extends PureComponent {

    handleScrollTop (){
        window.scrollTo(0,0);
    }

    render(){
        const {  showScroll   }   = this.props
        return(
            <HomeWrapper>
                <HomeLeft>
                    <img alt='' className = 'banner-img' src="/images/gonglu.gif" />
                    <Topic/>
                    <List/>
                </HomeLeft>
                <HomeRight>
                    <Recommend/>
                    <Writer/>
                </HomeRight>
                            
                
        {showScroll === true ? <BackTop    onClick={this.handleScrollTop} >回到顶部 </BackTop> : null}
                
                
                
            </HomeWrapper>
        )
    };

    componentDidMount() {

       this.props.changeHomeData()
       this.bindEvents()       
    }
    componentWillUnmount() {
        window.removeEventListener('scroll',this.props.changeScrollTopShow)
    }

    bindEvents() {
        window.addEventListener('scroll',this.props.changeScrollTopShow)
    }

}

const mapState = (state)=>({
    showScroll: state.getIn(['home','showScroll'])
    
})


const mapDispatch = (dispath) =>({

    changeHomeData() {
       
        const action = actionCreators.getHomeInfo();
        dispath(action)     
        
    },
    changeScrollTopShow(e) {

        
        
        
        if(document.documentElement.scrollTop > 100){
            dispath(actionCreators.toggleTopShow(true)) 
        }else{
            dispath(actionCreators.toggleTopShow(false)) 
        }
    }

})


export default connect(mapState, mapDispatch)(Home) ;