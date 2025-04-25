#!/usr/bin/env python3
import sys
import threading
from bisect import bisect_right

def getMinOperations(change, arr):
    n = len(change)
    m = len(arr)
    pos = [[] for _ in range(m)]
    for i, x in enumerate(change, start=1):
        if x > 0:
            j = x - 1
            if 0 <= j < m:
                pos[j].append(i)

    def feasible(T):
        deadlines = []
        for j in range(m):
            lst = pos[j]
            idx = bisect_right(lst, T) - 1
            if idx < 0:
                return False
            deadlines.append((lst[idx], arr[j]))
        deadlines.sort()
        cum = 0
        for k, (d, work) in enumerate(deadlines, start=1):
            cum += work
            if cum > d - k:
                return False
        return True

    lo, hi, ans = 1, n, -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            ans = mid
            hi = mid - 1
        else:
            lo = mid + 1
    return ans

def main():
    data = list(map(int, sys.stdin.read().split()))
    it = iter(data)
    n = next(it)
    change = [next(it) for _ in range(n)]
    m = next(it)
    arr = [next(it) for _ in range(m)]
    print(getMinOperations(change, arr))

if __name__ == "_main_":
    threading.Thread(target=main).start()