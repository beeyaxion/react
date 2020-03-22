import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import {
    HeaderWrappper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style.js';
import { Link } from 'react-router-dom';


class Header extends PureComponent {

    getListArea() {
        const { focused, list, page , totalPage ,handleMouseEnter ,handleMouseLeave ,mouseIn ,handleChagePage } = this.props
        const newList = list.toJS()
        const pageList = []
        for (let i = (page - 1) * 10; i < page * 10 ; i++) {
            if(i<newList.length)
            {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
           
        }
        if (focused|| mouseIn) {
            return (
            <SearchInfo 
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
            >
                <SearchInfoTitle>
                    热门搜索
                    <SearchInfoSwitch 
                    onClick={()=>handleChagePage(page,totalPage,this.spinIcon)}
                    >
                        <span ref={(icon) => {this.spinIcon = icon}} className="iconfont spin ">&#xe7e3;</span>
                        换一批
                    </SearchInfoSwitch>
                </SearchInfoTitle>
                <SearchInfoList>
                    {pageList}
                </SearchInfoList>
            </SearchInfo>)
        }
        else {
            return null
        }
    }

    render() {
        const { focused, handleInputBlur, handleInputFocuse ,list } = this.props
        return (
            <HeaderWrappper>
                <Link to = '/'>
                    <Logo />
                </Link>
                <Nav >
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载APP</NavItem>
                    <NavItem className="right" >登录</NavItem>
                    <NavItem className="right" >
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>

                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames='slide'
                        >
                            <NavSearch className={focused ? 'focused' : ''}
                                onFocus={()=>handleInputFocuse(list)}
                                onBlur={handleInputBlur}
                            />
                        </CSSTransition>

                        <span className={focused ? 'focused iconfont zoom' : 'iconfont zoom'} >&#xe62b;</span>

                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>

                    <Button className="writting" >
                        <span className="iconfont">&#xe615;</span>
                        写文章
                    </Button>
                    <Button className="reg">注册</Button>


                </Addition>
            </HeaderWrappper>
        );
    }
}




const mapStateToProps = (state) => {

    return {
        //focused :state.get('header').get('focused')
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage: state.getIn(['header', 'totalPage']),
    }
}

const mapDispathToProps = (dispatch) => {

    return {
        handleInputFocuse(list) {        
            list.size ===0 && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {

            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        handleChagePage(page,totalPage ,spinIcon ) {
            let originAngle = spinIcon.style.transform.replace(/[^0-9]/ig,'')
            if(originAngle){
                originAngle = parseInt(originAngle,10)
            }else{
                originAngle = 0
            }
            spinIcon.style.transform = 'rotate('+(originAngle + 360 )+'deg)'

            if(page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
            
        }
    }
}

// export default Header;
export default connect(mapStateToProps, mapDispathToProps)(Header)