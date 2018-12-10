export default (api, opts) => {
    api.modifyHTMLChunks(()=> {
        return [opts.name]   
    })
};