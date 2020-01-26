
class OneDimArray {
    static genRandomArray = (count) => {
        const arr = [];
        arr.length = count;
        for (let i = 0; i < count; i++) {
            arr[i] = Math.floor(Math.random() * 100) - 50;
        }
        return arr;
    };
    static closestToTarget = (arr, goal) => {
        if (!arr || arr.length === 0) {
            console.error("empty array");
            return;
        }
        let closestIndex = 0;
        for (let i = 0; i < arr.length; i++) {
            if (Math.abs(arr[i] - goal) < Math.abs(arr[closestIndex] - goal))
                closestIndex = i;
        }
        console.log(`closest to ${goal}`, arr, arr[closestIndex]);
    }
    static mergeSort = (unsortedArray) => {
        if (unsortedArray.length <= 1)
            return unsortedArray;

        const middle = Math.floor(unsortedArray.length / 2);
        //console.log(`middle is ${middle}`);

        const left = unsortedArray.slice(0, middle);
        //console.log(`left is ${left}`);

        const right = unsortedArray.slice(middle);
        //console.log(`right is ${right}`);

        return OneDimArray.merge(OneDimArray.mergeSort(left), OneDimArray.mergeSort(right));
    };
    static merge = (left, right) => {
        let resultArray = [], leftIndex = 0, rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                resultArray.push(left[leftIndex]);
                leftIndex++;
            }
            else {
                resultArray.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };
    static selectionSort = (arr) => {
        const cloned = [...arr];
        for (let i = 0; i < cloned.length; i++) {
            const smallestIndex = OneDimArray.findSmallestElem(cloned, i);
            if (smallestIndex != i) {
                OneDimArray.swap(cloned, smallestIndex, i);
            }
        }
        return cloned;
    };
    static findSmallestElem = (arr, startIndex) => {
        let smallestIndex = startIndex;
        for (let i = startIndex + 1; i < arr.length; i++) {
            if (arr[i] < arr[smallestIndex])
                smallestIndex = i;
        }
        return smallestIndex;
    };
    static swap = (arr, a, b) => {
        //console.log(`swapping ${arr[a]} with ${arr[b]}`);
        const temp = arr[b];
        arr[b] = arr[a];
        arr[a] = temp;
    };
    static insertionSort = (arr) => {
        const cloned = [...arr];
        for (let i = 1; i < cloned.length; i++) {
            let j = i;
            while (j > 0 && cloned[j - 1] > cloned[j]) {
                OneDimArray.swap(cloned, j, j - 1);
                j--;
            }
        }
        return cloned;
    };
    static flatten = arr => {
        const output = [];
        OneDimArray.flattenArr(arr, output);
        return output;
    }
    static flattenArr = (arr, output) => {
        arr.forEach(item => {
            if (item instanceof Array)
                OneDimArray.flattenArr(item, output);
            else
                output.push(item);
        })
    };
    static findPairsNSquared = (arr, sum) => {
        for (let i = 0; i < arr.length; i++)
            for (let j = i+1; j < arr.length; j++)
                if (arr[i] + arr[j] === sum)
                    console.log(`${arr[i]} + ${arr[j]} = ${sum}`);
    };
    static findPairsNlogN = (arr, sum) => {
        arr.sort((a, b) => a > b ? 1 : -1);
        let low = 0;
        let high = arr.length - 1;
        while (low < high) {
            if (arr[low] + arr[high] === sum) {
                console.log(`${arr[low]} + ${arr[high]} = ${sum}`);
            }
            if (arr[low] + arr[high] < sum)
                low++;
            else
                high--;
        }
    };
    static findPairsN = (arr, sum) => {
        const hashMap = new Map();
        for (let i = 0; i < arr.length; i++) {
            if (hashMap.has(arr[i])) {
                console.log(`${hashMap.get(arr[i])} + ${arr[i]} = ${sum}`);
            } else {
                hashMap.set(sum - arr[i], arr[i]);
            }
        }
    };
    static removeDuplicates = arr => {
        return [...new Set(arr)];
    }
}

const arr = OneDimArray.genRandomArray(10);
OneDimArray.closestToTarget(arr, 0);
console.log(OneDimArray.mergeSort(arr));
console.log(OneDimArray.insertionSort(arr));
console.log(OneDimArray.selectionSort(arr));
console.log(OneDimArray.flatten([[1, 2, [3]], 4]));
OneDimArray.findPairsNSquared([3, 4, 5, 6, 7, 8, 2, 1, 9], 10);
console.log(`---`);
OneDimArray.findPairsNlogN([3, 4, 5, 6, 7, 8, 2, 1, 9], 10);
console.log(`---`);
OneDimArray.findPairsN([3, 4, 5, 6, 7, 8, 2, 1, 9], 10);
console.log(OneDimArray.removeDuplicates([3, 4, 5, 3, 7, 8, 9, 1, 9]));
