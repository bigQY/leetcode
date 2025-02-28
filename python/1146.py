class SnapshotArray:

    def __init__(self, length: int):
        self.array={}
        self.snapshots=[]
        

    def set(self, index: int, val: int) -> None:
        self.array[index]=val
        

    def snap(self) -> int:
        self.snapshots.append(self.array.copy())
        return len(self.snapshots)-1
        

    def get(self, index: int, snap_id: int) -> int:
        if index not in self.snapshots[snap_id]:
            return 0
        return self.snapshots[snap_id][index]
        


#["SnapshotArray","set","snap","set","get"]
#[[3],[0,5],[],[0,6],[0,0]]

sa = SnapshotArray(3)
sa.set(0,5)
print(sa.snap())
sa.set(0,6)
print(sa.get(0,0)) # 5

# 内存超过限制
