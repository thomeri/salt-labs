public class ProgramClosestEnemy
    {
        public static void Main()
    {
        int[] arr = { 2, 0, 1, 0, 0, 0, 2 };
        int result = ClosestEnemy(arr);
        Console.WriteLine(result);
    }

    static int ClosestEnemy(int[] arr)
    {
        int positionOfOne = Array.IndexOf(arr, 1);
        List<int> positionOfTwo = new List<int>();
        List<int> distances = new List<int>();

        for(int i=0;i<arr.Length; i++){
            if(arr[i]==2){
                positionOfTwo.Add(i);
            }
        }
        for(int j=0; j<positionOfTwo.Count; j++){
            distances.Add(Math.Abs(positionOfOne - positionOfTwo[j]));
            }
        return distances.Min();
        
    }
        
    }

