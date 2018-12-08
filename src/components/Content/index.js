
import {connect} from 'dva';
import fastClick from 'fastClick';
import { PhotoSwipe } from 'react-photoswipe';
import {Toast, TextareaItem, Modal} from 'antd-mobile';
// import {Player} from 'video-react';
import {loadJs, historyBackWithAnimation, getWH} from 'utils';
import {getAliConfigAndPostFiles, updateCommentApp, addCommentApp, updateCommentWechat, addCommentWechat} from 'services';
import delIcon from 'assets/img/del.svg';
import imageIcon from 'assets/img/image.svg';
import videoIcon from 'assets/img/video.svg';
import publishIcon from 'assets/img/publish.svg';
import noPublishIcon from 'assets/img/publish-no-allow.svg';
import videoPlayIcon from 'assets/img/video-play.svg';

// import "video-react/dist/video-react.css"; 
import 'react-photoswipe/lib/photoswipe.css';
import styles from './index.less';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            curVideoUrl: '',
            photoSwipeItems: [],
            isOpen: false
        };
      }
    // 生命周期:挂载
    async componentDidMount() {
        let u = navigator.appVersion;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        if (isiOS) {
            this.isiOS = true;
            await this.loadAli();
            this.iosInit();
            console.log(this.autoFocusInst.textareaRef.classList.add('needsclick'))
        } else if (isAndroid) {
            this.isAndroid = true;
            this.bindAndroidPickUp();
        }
            this.autoFocusInst.focus();
    }
    async loadAli() {
        const isCommonJsDone = await loadJs('/eduboss/components/aliyun-oss-sdk-4.4.4/aliyun-oss-sdk-4.4.4.min.js');
        if (isCommonJsDone) {
        } else {
        Toast.fail('加载阿里云资源资源出错');
        }
    }
    iosInit() {
        // var notNeed = fastClick.notNeeded(document.body);
        // $.fn.triggerFastClick=function(){
        //     this.trigger("click");
        //     if(!notNeed){
        //         this.trigger("click");
        //     }
        // }
        this.$inputVideo.addEventListener('change', async(e)=>{
            const {aliPath} = this.props;
            Toast.loading('正在上传');
            const {success, data} =  await getAliConfigAndPostFiles(e.target.files, aliPath);
            if (!!success) {
                Toast.hide();
                this.insert(data.url, 'video');
            } else {
                Toast.fail('上传失败');
            }
            this.$inputVideo.value = '';
        })
        this.$inputImage.addEventListener('change', async(e)=>{
            const {aliPath} = this.props;
            Toast.loading('正在上传');
            const {success, data} =  await getAliConfigAndPostFiles(e.target.files, aliPath);
            if (!!success) {
                Toast.hide();
                this.insert(data.url, 'image');
            } else {
                Toast.fail('上传失败');
            }
            this.$inputImage.value = '';
        })
    }
    bindAndroidPickUp() {
        
        window.nativeImgPickerForAndroid = (resData) => {
        var stringify = JSON.stringify(resData),
            paramsObj = eval('(' + stringify + ')') || {},
                    picData = paramsObj.picData,
                    imgFilePath = paramsObj.imgFilePath;
        Toast.loading('正在上传');
        var params = JSON.stringify({
            itemId: 'image',
            filesPath: imgFilePath,
        });
        window.android.nativeUploadFiles(params); // 拿不到files格式，走app上传
        }
        window.nativeGetVideoCallback = function(videoData) {
            const {aliPath} = this.props;
            var stringify = JSON.stringify(videoData),
            paramsObj = eval('(' + stringify + ')') || {},
            videoPath = paramsObj.videoPath;
            var params = JSON.stringify({
                    itemId: 'video',
                    filesPath: videoPath,
                });
            Toast.loading('正在上传');
            window.android.nativeUploadFiles(params); // 拿到本地文件地址
            }
            window.nativeFilesAliPathCallback = (resData) => { // app上传后执行
            console.log(resData, 'resData');
        
            var stringify = JSON.stringify(resData),
                paramsObj = eval('(' + stringify + ')') || {},
                itemId = paramsObj.itemId,
                isSucees = paramsObj.isSucees,
                url = aliPath + paramsObj.aliPath;
                    Toast.hide();
                    if (isSucees) {
                    this.insert(url, itemId);
                    } else {
                    Toast.fail('上传失败')
                    }
            }
    }
    toPublish = async() => {
        const {id, cmtId, replyFromId, content, list = [], token, from, commentId} = this.props;
        console.log(replyFromId, 're')
        if (list.length ==0 && content === '') {
            return Toast.info('请输入留言内容或者添加图片/视频', 2);
        }
        var params = {
            stuCommentManageId: cmtId || commentId,
            content: addTag(content, list),
            replyFromId,
            token
        };
        if (id) {
            params.id = id
        }
        Toast.info('提交中...');
        console.log(params);
        if (from === 'wechat') {
            this.publishToWechat(params);
        } else {
            this.publishToApp(params);
            
        }
    }
    async publishToWechat(params) {
        const id = params.id;
        const {resultCode, resuleMessage, data} =  id ? await updateCommentWechat(params) : await addCommentWechat(params);
        Toast.hide();
        if (resultCode === 0) {
            Toast.success(id ? '修改成功': '新增成功');
            setTimeout(function(){
                historyBackWithAnimation();
            }, 1000)
        } else {
        Toast.fail(resuleMessage || (id ? '修改失败': '新增失败'));
        }
    }
    async publishToApp(params) {
        const id = params.id;
        const {resultCode, resuleMessage, data} =  id ? await updateCommentApp(params) : await addCommentApp(params);
        Toast.hide();
        if (resultCode === 0) {
            Toast.success(id ? '修改成功': '新增成功');
            setTimeout(function(){
            historyBackWithAnimation();
        }, 1000)
        } else {
        Toast.fail(resuleMessage || (id ? '修改失败': '新增失败'));
        }
    }
    toSelectVideo = () => {
        if (this.isiOS) {
            var notNeed = fastClick.notNeeded(document.body);
            this.$inputVideo.click();
            if(!notNeed){
                this.$inputVideo.click();
            } // 双击触发file
        } else if (this.isAndroid){
        if (window.android && window.android.nativeSelectVideo) { // app没有再代理input:Video/*的点击事件，直接调app接口，选完视频执行nativeGetVideoCallback
            window.android.nativeSelectVideo('video');
        }
        }
    }
    toSelectImg = () => {
        if (this.isiOS) {
            var notNeed = fastClick.notNeeded(document.body);
            this.$inputImage.click();
            if(!notNeed){
                this.$inputImage.click();
            }
        } else if (this.isAndroid){
            this.$inputImage.click(); // app不会响应onchange，但会通过代理之执行 nativeImgPickerForAndroid
        }
    }
    insert = (url, type) => {
        const {list} = this.props;
        this.set('list', list ? list.concat({
            url,
            type
        }) : [{
            url,
            type
        }]);
    }
    set(k,v) {
        let payload = {};
        payload[k]=v;
        this.props.dispatch({
            type: 'detail/itemSet',
            payload
        })
    }
    play(url) {
        this.setState({visible: true, curVideoUrl: url})
    }
    preview = async (url) => {
        const {width, height} = await getWH(url);
        this.setState({
            photoSwipeItems: [{w: width, h: height, src: url}],
            isOpen: true
        })
    }
    imageRender = (item, index)=> {
        return <div key={index} className="rel w190 h190">
            <div  className="w170 h170  df v-center h-center ovh" onClick={()=> {
                this.preview(item.url)
            }}>
                <img  className="wp100" src={item.url}/>
            </div>
            <div className="p20 abs t-35 r-15"  onClick={()=>{
                    this.delItem(item)
                }}><img src={delIcon} alt=""/></div>
        </div>
    }
    videoRender = (item, index)=> {
        return <div key={index} className="rel w190 h190">
            <div  className="w170 h170  df v-center h-center ovh rel">
                <img className="wp100" src={item.url + '?spx&x-oss-process=video/snapshot,t_100,f_jpg'}/>
                <img src={videoPlayIcon} onClick={()=>{
                    this.play(item.url)
                }} className="abs-center" alt=""/>
            </div>
            <div className="p20 abs t-35 r-15"  onClick={()=>{
                        this.delItem(item)
                    }}><img src={delIcon} alt=""/></div>
            
        </div>
    }
    
    delItem(item){
        const {list} = this.props;
        this.set('list', list.filter(i=>i!==item));
    }
    handleClose = () => {
        this.setState({
          isOpen: false,
        });
      };
    render() {
        const {visible, curVideoUrl, photoSwipeItems, isOpen} = this.state;
        const {content, list = []} = this.props;
        const options = {
            index: 0,
            fullscreenEl: false,
            // 点击图片关闭
            tapToClose: true,
            shareEl: false,
          };
        return (
            <>
                <div className="df h-between v-center h126 bg-white">
                    <div className="df pl20">
                        <div className="p20" onClick={this.toSelectImg}><img className="w48" src={imageIcon}/></div>
                        <div className="p20" onClick={this.toSelectVideo}><img className="w48" src={videoIcon}/></div>
                        <input type="file" accept="video/*" className="dn" ref={e=>this.$inputVideo=e} />
                        <input type="file" accept="image/*" className="dn" ref={e=>this.$inputImage=e} />
                    </div>
                    <div className="df pl40 pr40" onClick={this.toPublish}><img className="w52" src={list.length ==0 && content === '' ? noPublishIcon: publishIcon}/></div>
                </div>

                <div className="h2 ml40 bg-blue1"></div>
                <div className="pl40 pr40 pt20 pb20 ovs" style={{maxHeight: '3rem'}}>
                    <TextareaItem
                    ref={el => this.autoFocusInst = el}
                    onChange={(v)=>{
                        this.set('content', v);
                    }}
                    autoHeight
                    value={content} 
                    placeholder="请输入文字" 
                    rows="1"></TextareaItem>
                </div>

                <div className="pl40">
                    <div className="df fw">
                        {
                            list.map((item, index)=> {
                                return item.type === 'video' ?
                                this.videoRender(item, index) :
                                this.imageRender(item, index);
                            })
                        }
                    </div>
                </div>
                
                <Modal
                    visible={visible}
                    closable
                    onClose={()=>{this.setState({visible: false})}}
                >
                    <div >
                        {/* <Player
                            // playsInline
                            poster={curVideoUrl + '?spx&amp;x-oss-process=video/snapshot,t_100,f_jpg'}
                            src={curVideoUrl}
                        /> */}
                        <video 
                        className="wp100 ovh" style={{height: '6rem'}}
                        controls="controls"
                        poster={curVideoUrl + '?spx&x-oss-process=video/snapshot,t_100,f_jpg'}
                        src={curVideoUrl}></video>
                    </div>
                </Modal>
                {!photoSwipeItems || photoSwipeItems && photoSwipeItems.length > 0 &&
                    <PhotoSwipe isOpen={isOpen} items={photoSwipeItems || []} options={options} onClose={this.handleClose} />
                }
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
  
function addTag(content, list) {
    let tags = ''
    list.map((item)=>{
        if (item.type === 'video') {
            tags+=`<video src="${item.url}" ></video>`
        } else {
            tags+=`<img src="${item.url}" ></img>`
        }
    });
    return content + tags;
}