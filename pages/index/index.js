import {connect} from 'dva';
import vconsole from 'vconsole';
import {rootFontSizeSet} from 'utils';
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
      // new vconsole();
    }
    
  }
  render() {
    const {from} = this.props;
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