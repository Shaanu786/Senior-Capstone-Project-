import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Scanner;

public class simpleConnect {

    public static Connection basicConnect() {
        Connection conn = null;
        try {
            Class.forName("org.postgresql.Driver");
            String url = "jdbc:postgresql://capstone-test.c99efyc5e4ww.us-east-2.rds.amazonaws.com:5432/Xsepulve";
            String user = "Xsepulve";
            String password = "D9dfsRwSDFnQyVy62Cd8";
            conn = DriverManager.getConnection(url, user, password);

            return conn;
        } catch (Exception e) {
            System.out.println(e);
        }
        return conn;
    }


}
