/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  const str=s

  if(str.length===0){
    return []
  }

  if(str.length===1){
    return [[str]]
  }

  if(str.length===2){
    let result=[]
    if(str[0]===str[1]){
      result.push([str])
    }
    result.push([str[0],str[1]])
    return result
  }

  const result=[]
  const isHuiWen=(str)=>{
    if(str.length===0){
      return false
    }
    if(str.length===1){
      return true
    }

    for(i=0;i<str.length/2;i++){
      if(str[i]===str[str.length-1-i]){
        continue
      }else{
        return false
      }
    }
    return true
  }
  const getSubStrings=(str='',mask=1)=>{
    if(mask==0){
      return [str]
    }

    let maskStr=mask.toString(2)
    let subStrs=[]
    while(maskStr.length<str.length-1){
        maskStr='0'+maskStr
    }
    for(i=0;i<str.length;){
      let start=i
      let end=i+1
      while (maskStr[end-1]==='0' && end<str.length-1) {
        end=end+1
      }
      subStrs.push(str.substring(start,end))
      i=end
      if(start>=str.length-1){
        break;
      }
    }
    return subStrs
  }

  for(j=0;j<Math.pow(2,str.length-1)-1;j++){
    const subStrs=getSubStrings(str,j)
    let isAllHuiWen=true
    for (let index = 0; index < subStrs.length; index++) {
      const subStr = subStrs[index];
      if(!isHuiWen(subStr)){
        isAllHuiWen=false
        break
      }
    }
    if(isAllHuiWen){
      result.push(subStrs)
    }
  }
  return result
};


console.log(partition('cdd').toString())
