var Node = function(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
};

Node.prototype.insert = function(val) {
    var node = new Node(val);
    node.next = this;
    node.prev = this.prev;
    if (this.prev) {
        this.prev.next = node;
    }
    this.prev = node;
};

Node.prototype.remove = function() {
    var node = this.prev;
    this.prev = node.prev;
    if (node.prev) {
        node.prev.next = this;
    }
};

Node.prototype.range = function(end) {
    var result = '';
    var node = this;
    while (node !== end) {
        result += node.val;
        node = node.next;
    }
    return result;
};

var TextEditor = function() {
    this.cursor = new Node('\0'); // 初始光标节点
};

TextEditor.prototype.addText = function(text) {
    for (let i = 0; i < text.length; i++) {
        this.cursor.insert(text[i]);
    }
};

TextEditor.prototype.deleteText = function(k) {
    var count = 0;
    while (k > 0 && this.cursor.prev) {
        this.cursor.remove();
        k--;
        count++;
    }
    return count;
};

TextEditor.prototype.cursorLeft = function(k) {
    while (k > 0 && this.cursor.prev) {
        this.cursor = this.cursor.prev;
        k--;
    }
    var head = this.cursor;
    for (let i = 0; i < 10 && head.prev; i++) {
        head = head.prev;
    }
    return head.range(this.cursor);
};

TextEditor.prototype.cursorRight = function(k) {
    while (k > 0 && this.cursor.next) {
        this.cursor = this.cursor.next;
        k--;
    }
    var head = this.cursor;
    for (let i = 0; i < 10 && head.prev; i++) {
        head = head.prev;
    }
    return head.range(this.cursor);
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/design-a-text-editor/solutions/3078930/she-ji-yi-ge-wen-ben-bian-ji-qi-by-leetc-o4by/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。