import {connect} from 'dva';
import vconsole from 'vconsole';
import {rootFontSizeSet, SkinType} from 'utils';
import 'antd-mobile/dist/antd-mobile.less';
import Header from 'components/Header';
import Content from 'components/Content';
import styles from './index.less';
class App extends React.Component {
  componentWillMount() {
    const {dispatch} = this.props;
    rootFontSizeSet();
    dispatch({
      type: 'detail/get',
    });
    if (process.env.UMI_ENV === 'prod') {

    } else {
      console.log(process.env.UMI_ENV, 'process.env.UMI_ENV')
      new vconsole();
    }
    
  }
  render() {
    const {from} = this.props;
    from === 'app' &&
    (document.getElementsByTagName('body')[0].className = SkinType === 'RED_COLOR' ? 'themeRed' : 'themeBlue');
    return (
      <div className="list">
        {
          from === 'app' &&
          <Header/>
        }
        <Content/>
      </div>
    );
  }
}

function mapStateToProps({detail}) {
  return {
    from: detail.from
  };
}

export default connect(mapStateToProps)(App);
//test  localhost:8000/?id=780&from=app&token=0300da61-1255-4f72-a9c9-b6e29c601b50&aliPath=https://pingtai-uat.oss-cn-shenzhen.aliyuncs.com/
// login http://uat3.xuebangsoft.net/eduboss/MobileInterface/staffPhoneLogin.do?contact=18825154993&passwordMd5=666666