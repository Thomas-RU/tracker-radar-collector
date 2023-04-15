import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) throws IOException {
            File file = new File("patterns.txt");
            Scanner scan = new Scanner(file);
            String line = "";
            ArrayList<String> text = new ArrayList<>();
    
            while(scan.hasNextLine()) {
                line = scan.nextLine();
                if (!text.contains(line.toLowerCase()))
                    text.add(line.toLowerCase());
            }
            scan.close();
            File f = new File("uniqPatterns.txt");
            if (f.createNewFile())
                    System.out.println("File created");
                else
                    System.out.println("File already exists");
            FileWriter writer = new FileWriter("uniqPatterns.txt");
            for (String a : text) {
                writer.write(a + "\n");
            }
            writer.close();
    }
}