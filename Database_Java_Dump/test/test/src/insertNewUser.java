import java.sql.*;

import java.util.Scanner;


public class insertNewUser {


    public static void insertUser(String Name, String Password, String email) {

        try {

            Connection conn = simpleConnect.basicConnect();


            int Id = retrieveLatestID() + 1;
            String name = Name;
            String password = Password;


            String insertString = "INSERT INTO  UserProfile(kirboid, firstname, loginpw, email) VALUES(?, ?, ?, ?)";
            PreparedStatement insertUser = conn.prepareStatement(insertString);
            try{

                insertUser.setInt(1, Id); //Set the parameters in the prepared statement as we iterate through the StringTokenizer
                insertUser.setString(2, name);
                insertUser.setString(3, password);
                insertUser.setString(4, email);
                insertUser.addBatch(); //addBatch rather than a bunch of executeUpdates will speed up your load time

                insertUser.executeBatch(); //execute the batch load

            } catch (Exception e) {
                System.out.println(e);
            }

            System.out.println("We have attempted to add " + name);

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void insertNewUserPrompt(){
        Scanner input = new Scanner(System.in);

        System.out.print("Enter new Email: ");
        String email = input.next();
        System.out.println("You entered " + email);

        System.out.print("Enter the first name of the new User: ");
        String NAME = input.next();
        System.out.println("You entered " + NAME);

        System.out.print("Please enter a new password: ");
        String Password= input.next();

        System.out.println("The new USERID and name are as follows: ");
        System.out.println(email + " " + NAME);

        insertNewUser.insertUser(NAME, Password, email);

        input.close();

    }


    public static int retrieveLatestID(){
        int id = 0;
        try {

            Connection conn = simpleConnect.basicConnect();
            Statement state = conn.createStatement();

            String LatestID =
                    "SELECT kirboid FROM USERPROFILE ORDER BY kirboid DESC LIMIT 1";

            try{
                ResultSet ID = state.executeQuery(LatestID);
                if(ID.next()){
                    id = ID.getInt(1);
                }

            }
            catch(Exception e) {
                System.out.println(e);}

            conn.close();
            return id;
        } catch (Exception e) {
            System.out.println(e);
        }
        return id;
    }


    public static void DELETEALLUSERS(){

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");

            Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@acadoradbprd01.dpu.depaul.edu:1521:ACADPRD0", "xsepulve", "cdm1535601");

            Statement state = conn.createStatement();

            String dropTable = "DELETE FROM userprofile";


            try {
                state.executeUpdate(dropTable); //All non-SELECT queries use executeUpdate
            } catch (Exception e) {
                System.out.println("Deleting all userprofile rows failed:\n" + e);
            }


            System.out.println("Finished Nuking everything!");

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }


    }





}




