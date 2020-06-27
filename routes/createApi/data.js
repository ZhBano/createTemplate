
function cretaInitData(data){
   
    let templata= `
    import request from '@/utils/request'
    
    `
    data.forEach(item=>{
      templata +=`
      // ${item.readMe}
      export function ${item.functionName}(data) {
        return request({
          url: '${item.url}',
          method: '${item.methodName}',
          ${item.methodName==='get'?'params: data':'data'}
        })
      }
      `
    })
  return templata
}

module.exports={cretaInitData}