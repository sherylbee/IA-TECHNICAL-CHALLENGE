__To Run:__
1. Please clone repo, ensuring that you are in es5 branch (```git checkout es5```)
2. To test with different ```userLocation``` or adjust what has been referred to in the challenge as the range of the world, please edit the values of constants
```const userLocation = [0,2];```
```const gridRange = [-10, 10];```
on lines 10 and 11 of *./es5/es5-ClosestFacilityFinder.js* ensuring that the ```userLocation``` is within the range of the "world", and ```gridRange```, aka "world" is always symmetrical, and both are formatted as Number arrays. (see assumptions below)
3. OPTION 1 (best for backward compatibility)- Call ```node es5/es5-ClosestFacilityFinder.js``` from your terminal. This path contains the babel-transpiled versions of the original files found in ./es6+  

OPTION 2- Alternatively, for Node versions >= v12.4.0, you may call ```node es6+/ClosestFacilityFinder.js```

***
/*Assumptions*/
/*
1. There may be a fill facility at any and every coordinate with the exception of the user location (the user location cannot be a fill facility) (see below)

2. User location cannot be null or out of bounds of the grid

3. There may be 0 to (N+1 * N+1) -1 fill facility locations on the grid

4. User coordinates will be passed as an array of type Number

5. Size of world (grid range) will be passed as an array of type Number

6. Grid range will always be -N to N, i.e.

    * 6a. Grid center will always be 0
    * 6b. Number of coordinate locations from -N to N (inclusive) will always been odd

SUMMARY RESPONSES:
1) If I needed to support multiple fills at the same location, I would remove the check against duplicate locations in a facilityNetwork. I would also return the corresponding data for all facilities found at a given closest location (up to three)
2) If I were working with much more data, I would probably not rely on a sort. I would maybe try to solve it by traversing the grid along the course of a BFS as opposed to finding absolute distances of every single location. This would at least potentially save me from accessing every node and I could maybe short-circuit the process without surveying all of the data.
*/
