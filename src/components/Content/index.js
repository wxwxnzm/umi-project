
import {connect} from 'dva';
import publishIcon from 'assets/img/publish.svg';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
    // 生命周期:挂载
    async componentDidMount() {
    }
    toPublish() {

    }
    render() {
        return (
            <>
                <div className="df h-between v-center h126 bg-white">
                    <div className="df pl40 pr40" onClick={this.toPublish}><img className="w52" src={publishIcon}/></div>
                </div>
            </>
        )
    }
}

function mapStateToProps({detail}) {
    return {
      ...detail
    };
}
export default connect(mapStateToProps)(App);
  