// export function reversedArray<T>(array: T[]): T[] {
//   let left = 0;
//   let right = array.length - 1;
//   while (left < right) {
//     [array[left]!, array[right]!] = [array[right]!, array[left]!];
//     left++;
//     right--;
//   }
//   return array;
// }


export function reversedArray<T>(array: T[]): T[] {
  let left = 0;
  let right = array.length - 1;
  while (left < right) {
    [array[left], array[right]] = [array[right], array[left]] as [T,T];
    left++;
    right--;
  }
  return array;
}
