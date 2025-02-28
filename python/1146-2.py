class SnapshotArray:

    def __init__(self, length: int):
        self.array=[[(0,0)] for _ in range(length)] #(val, snap_id)
        self.snapshotsId=0
        

    def set(self, index: int, val: int) -> None:
        if self.array[index][-1][1] == self.snapshotsId:
            self.array[index][-1] = (val, self.snapshotsId)
        else:
            self.array[index].append((val, self.snapshotsId))
        

    def snap(self) -> int:
        self.snapshotsId += 1
        return self.snapshotsId-1
        

    def get(self, index: int, snap_id: int) -> int:
        snap_list = self.array[index]
        left, right = 0, len(snap_list) - 1
        res = -1
        while left <= right:
            mid = (left + right) // 2
            if snap_list[mid][1] <= snap_id:
                res = mid
                left = mid + 1
            else:
                right = mid - 1
        return snap_list[res][0]
        

        


#["SnapshotArray","set","snap","set","get"]
#[[3],[0,5],[],[0,6],[0,0]]

sa = SnapshotArray(3)
sa.set(0,5)
print(sa.snap())
sa.set(0,6)
print(sa.get(0,0)) # 5

