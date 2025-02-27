
var TextEditor = function() {
    this.text = '';
    this.cursor = 0;
    
};

/** 
 * @param {string} text
 * @return {void}
 */
TextEditor.prototype.addText = function(text) {
    this.text = this.text.slice(0, this.cursor) + text + this.text.slice(this.cursor);
    this.cursor += text.length;
};

/** 
 * @param {number} k
 * @return {number}
 */
TextEditor.prototype.deleteText = function(k) {
    if (this.cursor - k < 0) {
        k = this.cursor;
    }
    this.text = this.text.slice(0, this.cursor - k) + this.text.slice(this.cursor);
    this.cursor -= k;
    return k;
};

/** 
 * @param {number} k
 * @return {string} 返回移动后光标左边 min(10, len) 个字符
 */
TextEditor.prototype.cursorLeft = function(k) {
    if (this.cursor - k < 0) {
        k = this.cursor;
    }
    this.cursor -= k;
    return this.text.slice(this.cursor-Math.min(10,this.cursor),this.cursor);
};

/** 
 * @param {number} k
 * @return {string} 返回移动后光标左边 min(10, len) 个字符
 */
TextEditor.prototype.cursorRight = function(k) {
    if (this.cursor + k > this.text.length) {
        k=this.text.length-this.cursor;
    }
    this.cursor += k;
    return this.text.slice(this.cursor-Math.min(10,this.cursor),this.cursor);
};

/** 
 * Your TextEditor object will be instantiated and called as such:
 * var obj = new TextEditor()
 * obj.addText(text)
 * var param_2 = obj.deleteText(k)
 * var param_3 = obj.cursorLeft(k)
 * var param_4 = obj.cursorRight(k)
 */

// var obj = new TextEditor()
// obj.addText('leetcode')
// console.log(obj.deleteText(4))
// obj.addText('practice')
// console.log(obj.cursorRight(3))
// console.log(obj.cursorLeft(8))
// console.log(obj.deleteText(10))
// console.log(obj.cursorLeft(2))
// console.log(obj.cursorRight(6))

//["TextEditor","addText","cursorLeft","cursorLeft","addText","deleteText"]
// [[],["jxarid"],[5],[10],["du"],[20]]
// var obj = new TextEditor()
// obj.addText('jxarid')
// console.log(obj.cursorLeft(5))
// console.log(obj.cursorLeft(10))
// obj.addText('du')
// console.log(obj.deleteText(20))
