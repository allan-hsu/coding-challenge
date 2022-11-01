# Solution Manual Test Runs

```
Hardware Overview:
  Model Name:	MacBook Pro
  Model Identifier:	MacBookPro17,1
  Chip:	Apple M1
  Total Number of Cores:	8 (4 performance and 4 efficiency)
  Memory:	8 GB
  System Firmware Version:	7429.81.3
  OS Loader Version:	7429.81.3
```

Both Sync and Async solution uses a generic min heap with proxies to help easier compare and access the stored records

## Solution Analysis
Let there be N number of sources, each with 1~M number of records
## Sync Solution
- Time Complexity: O(NMlogN)
- Space Complexity: O(N)
## Async Solution
Solution can be as simple as the Sync solution with the switch of `pop` to `popAsync` but if we pop one by one it causes us to wait for a long time.
Ex. 100 records with ~20000 records total with each pop having ~4ms delay means we have to wait at least ~80 seconds!
In order to save time, `popAsync` can be called on all N sources and try to print more than one record at a time.
To preserve order we call more of `popAsync` on each specific resoure if the result is still older than the current second oldest record.
By using `PRINT_RATIO=0.2` we print 20% of what is in min heap so the heap doesn't get filled with results returned from `popAsync` calls.
- Time Complexity: O(NMlogN)
- Space Complexity: O(NM) -- Actual size is dependent on how much is printed out between tasks so this number shouldn't be reached

## Result
### Sync Solution
**100 sources totalling 24116 records**
```
Memory usage by rss, 61.145088MB 
Memory usage by heapTotal, 17.727488MB 
Memory usage by heapUsed, 10.698048MB 
Memory usage by external, 2.728301MB 
Memory usage by arrayBuffers, 0.019358MB 

***********************************
Logs printed:            24116
Time taken (s):          1.312
Logs/s:                  18381.09756097561
***********************************
```
**1000 sources totalling  240231 records**
```
Memory usage by rss, 85.786624MB 
Memory usage by heapTotal, 43.17184MB 
Memory usage by heapUsed, 12.605576MB 
Memory usage by external, 2.728301MB 
Memory usage by arrayBuffers, 0.019358MB 

***********************************
Logs printed:            240501
Time taken (s):          11.014
Logs/s:                  21835.93608135101
***********************************
```
**10000 sources totalling 2402898 records**
```
Memory usage by rss, 89.161728MB 
Memory usage by heapTotal, 56.27904MB 
Memory usage by heapUsed, 22.521944MB 
Memory usage by external, 2.726284MB 
Memory usage by arrayBuffers, 0.018622MB 

***********************************
Logs printed:            2402898
Time taken (s):          118.699
Logs/s:                  20243.62463036757
***********************************
```
**100000 sources totalling 24060461 records**
```
Memory usage by rss, 228.245504MB 
Memory usage by heapTotal, 191.578112MB 
Memory usage by heapUsed, 149.622624MB 
Memory usage by external, 2.726284MB 
Memory usage by arrayBuffers, 0.018622MB 

***********************************
Logs printed:            24060461
Time taken (s):          1352.698
Logs/s:                  17787.016022792966
***********************************
```

<p>
With this growth rate, having 1 mil sources would cause the task to take 3~hrs!
That’s without any of the networking delay that may happen if some of the sources are remote.
</p>


### Async Solution
**100 sources totalling 23408 records**
```
Memory usage by rss, 90.505216MB 
Memory usage by heapTotal, 48.611328MB 
Memory usage by heapUsed, 23.499824MB 
Memory usage by external, 2.726284MB 
Memory usage by arrayBuffers, 0.018622MB 

***********************************
Logs printed:            23408
Time taken (s):          3.302
Logs/s:                  7089.036947304664
***********************************
```
**1000 sources totalling 234841 records**
```
Memory usage by rss, 190.857216MB 
Memory usage by heapTotal, 142.065664MB 
Memory usage by heapUsed, 109.874312MB 
Memory usage by external, 2.726284MB 
Memory usage by arrayBuffers, 0.018622MB 

***********************************
Logs printed:            234841
Time taken (s):          15.755
Logs/s:                  14905.807680101554
***********************************
```
**10000 sources totalling  2338360 records**
```
Memory usage by rss, 448.954368MB 
Memory usage by heapTotal, 406.962176MB 
Memory usage by heapUsed, 47.55492MB 
Memory usage by external, 2.726284MB 
Memory usage by arrayBuffers, 0.018622MB 

***********************************
Logs printed:            2338360
Time taken (s):          175.389
Logs/s:                  13332.421075438026
***********************************
```