import java.util.ArrayList;
import java.util.List;

public class Harshad {
    
    public static boolean isHarshad(int n) {
        int sum = 0;
        int temp = n;
        while (temp > 0) {
            sum += temp % 10;
            temp /= 10;
        }
        return n % sum == 0;
    }
    
    public static List<Integer> getSequence(int start, int count) {
        List<Integer> result = new ArrayList<>();
        int num = start + 1;
        
        while (result.size() < count) {
            if (isHarshad(num)) {
                result.add(num);
            }
            num++;
        }
        return result;
    }
    
    public static int[] getSequenceArray(int start, int count) {
        int[] result = new int[count];
        int num = start + 1;
        int idx = 0;
        
        while (idx < count) {
            if (isHarshad(num)) {
                result[idx++] = num;
            }
            num++;
        }
        return result;
    }
    
    public static int getDigitSum(int n) {
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }
    
    public static void main(String[] args) {
        List<Integer> sequence = getSequence(10, 10);
        System.out.println("Harshad sequence starting from 10:");
        for (int num : sequence) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        int[] array = getSequenceArray(400, 10);
        System.out.println("\nFrom 400:");
        for (int num : array) {
            System.out.print(num + " ");
        }
    }
}
