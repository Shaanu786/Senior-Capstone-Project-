import java.sql.*;
import java.util.Scanner;


public class loginUser {

    public static boolean loginAttempt(String email, String password){
        boolean exists = false;
        try {

            Connection conn = simpleConnect.basicConnect();
            Statement state = conn.createStatement();
            email = "'" + email +"'";
            password = "'"+ password + "'";
            String check =
                    "Select * from userprofile where email = " + email + " and loginpw = " + password + ";";

            try{
                ResultSet loginResult= state.executeQuery(check);
                if (loginResult.next()){
                    exists = true;
                }
            }
            catch(Exception e) {
                System.out.println(e);}

            conn.close();
            return exists;
        } catch (Exception e) {
            System.out.println(e);
        }
        return exists;
    }



    public static void LoginUserPrompt(){
        Scanner input = new Scanner(System.in);

        System.out.print("Enter Email: ");
        String email = input.next();
        System.out.println("You entered " + email);



        System.out.print("Please enter password: ");
        String Password= input.next();

        System.out.println("The information passes is as follows: ");
        System.out.println(email + " " + Password);

       boolean exists = loginAttempt(email, Password);
        if (exists){
            System.out.println("You exist in the Database, cool!");
        }
        else{
            System.out.println("Owo notices you dont exist in the database XD ");
        }

        input.close();

    }
}
