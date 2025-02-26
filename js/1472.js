/**
 * @param {string} homepage
 */
var BrowserHistory = function(homepage) {
    this.history=[homepage];
    this.current=0;
    
};

/** 
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function(url) {
    // 删除当前位置之后的历史记录
    this.history.splice(this.current+1,this.history.length-this.current-1);
    // 添加新的历史记录
    this.history.push(url);
    this.current=this.history.length-1
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function(steps) {
    // 计算回退后的位置
    if (this.current-steps<0){
        this.current=0;
    }
    else{
        this.current-=steps;
    }
    return this.history[this.current];
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function(steps) {
    // 计算前进后的位置
    if (this.current+steps>=this.history.length){
        this.current=this.history.length-1;
    }
    else{
        this.current+=steps;
    }
    return this.history[this.current];
};

/** 
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */

var obj = new BrowserHistory('leetcode.com')
obj.visit('google.com')
obj.visit('facebook.com')
obj.visit('youtube.com')
console.log(obj.back(1))
console.log(obj.back(1))
console.log(obj.forward(1))
obj.visit('linkedin.com')
console.log(obj.forward(2))
console.log(obj.back(2))
console.log(obj.back(7))