import { connect } from 'dva';
import {Icon, NavBar} from 'antd-mobile';
import {doAsk} from 'services/header';
import './index.less';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    async doAjax() {
        let params = {id: 'test for req'};
        const {a} = await doAsk(params);
        console.log(a, 'a')
    }
    render() {
        const {id, location} = this.props;
        return (
            <NavBar 
            icon={<Icon type="left" />}
            leftContent="返回" 
            mode="light" 
            className="navbar" 
            onLeftClick={() => this.doAjax()}
            >
                {id ? '编辑' : '添加'}留言
            </NavBar>
        )
    }
}
function mapStateToProps({detail}) {
    return {
      id: detail.id
    };
  }
  
export default connect(mapStateToProps)(Header);