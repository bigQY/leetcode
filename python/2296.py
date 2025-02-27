class TextEditor:

    def __init__(self):
        self.text = ''
        self.cursor = 0
        

    def addText(self, text: str) -> None:
        self.text = self.text[:self.cursor] + text + self.text[self.cursor:]
        self.cursor += len(text)
        

    def deleteText(self, k: int) -> int:
        if self.cursor-k < 0:
            k = self.cursor
        self.text = self.text[0:self.cursor-k] + self.text[self.cursor:]
        self.cursor -= k
        return k

    def cursorLeft(self, k: int) -> str:
        if self.cursor-k < 0:
            k = self.cursor
        self.cursor -= k
        return self.getLeft10Text()
        

    def cursorRight(self, k: int) -> str:
        if self.cursor+k > len(self.text):
            k = len(self.text) - self.cursor
        self.cursor += k
        return self.getLeft10Text()
    
    def getLeft10Text(self):
        if self.cursor-10 < 0:
            return self.text[0:self.cursor]
        return self.text[self.cursor-10:self.cursor]


#["TextEditor","addText","deleteText","addText","cursorRight","cursorLeft","deleteText","cursorLeft","cursorRight"]
#[[],["leetcode"],[4],["practice"],[3],[8],[10],[2],[6]]
obj = TextEditor()
obj.addText("leetcode")
print(obj.deleteText(4))
obj.addText("practice")
print(obj.cursorRight(3))
print(obj.cursorLeft(8))
print(obj.deleteText(10))
print(obj.cursorLeft(2))
print(obj.cursorRight(6))
print('\n'+obj.text)
print(obj.cursor)

#["TextEditor","addText","cursorLeft","cursorLeft","addText","deleteText"]
#[[],["jxarid"],[5],[10],["du"],[20]]

obj = TextEditor()
obj.addText("jxarid")
print(obj.cursorLeft(5))
print(obj.cursorLeft(10))
obj.addText("du")
print(obj.deleteText(20))
print('\n'+obj.text)
print(obj.cursor)