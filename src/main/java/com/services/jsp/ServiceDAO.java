package com.services.jsp;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;

public class ServiceDAO {
	
	String dbUrl = "jdbc:mysql://172.187.178.153:3306/isec_assessment2";
	String dbUser = "isec";
	String dbPassword = "EUHHaYAmtzbv";
;
	
    public ResultSet getFutureServices(String username) throws ClassNotFoundException, SQLException{
    	
		ResultSet futureResultSet = null;
		Connection conn = null;

	try {
		 // Load the MySQL JDBC driver
	    Class.forName("com.mysql.cj.jdbc.Driver");
	    
	    // Establish a database connection
	    conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
	  


	    // Create a SQL SELECT query for future reservations
	    String futureSql = "SELECT * FROM vehicle_service WHERE username = ? AND CONCAT(date, ' ', time) >= ? ORDER BY date, time";
	    
	    // Create PreparedStatements for both queries
	    PreparedStatement futurePreparedStatement = conn.prepareStatement(futureSql);
	    futurePreparedStatement.setString(1, username);
	    
	    // Set the parameter value (current date and time)
	    SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    String currentDateTime = dateTimeFormat.format(new Date());
	    futurePreparedStatement.setString(2, currentDateTime);
	    
	    // Execute the SELECT queries
		 futureResultSet = futurePreparedStatement.executeQuery();
		 
	
		}catch (SQLException e) {
			e.printStackTrace();
			
			}
	return futureResultSet;
        
    }
    
public ResultSet getPastServices(String username) throws ClassNotFoundException, SQLException {
    	
			ResultSet pastResultSet = null;
			Connection conn = null;
		
		try {
		
		Class.forName("com.mysql.cj.jdbc.Driver");
			    
		// Establish a database connection
		conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
			  

		// Create a SQL SELECT query for past reservations
		String pastSql = "SELECT * FROM vehicle_service WHERE username = ? AND CONCAT(date, ' ', time) < ? ORDER BY date, time";
		
		PreparedStatement pastPreparedStatement = conn.prepareStatement(pastSql);
	
		pastPreparedStatement.setString(1, username);
		
		// Set the parameter value (current date and time)
		SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String currentDateTime = dateTimeFormat.format(new Date());
		pastPreparedStatement.setString(2, currentDateTime);
		
		// Execute the SELECT queries
		pastResultSet = pastPreparedStatement.executeQuery();
		
		
			} catch (SQLException e) {
			e.printStackTrace();
			
			}
		return pastResultSet;

        
    }
    
    public int deleteServices(int bookingId) throws ClassNotFoundException {
    	PreparedStatement preparedStatement = null;

    	try {
    		Class.forName("com.mysql.cj.jdbc.Driver");
		    
    		// Establish a database connection
    		Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
    			  

    	   
    	    // Create a SQL DELETE query
    	    String sql = "DELETE FROM vehicle_service WHERE booking_id = ?";

    	    // Create a PreparedStatement
    	    preparedStatement = conn.prepareStatement(sql);

    	    // Set the parameter value (booking id)
    	    preparedStatement.setInt(1, bookingId);

    	    // Execute the DELETE query
    	    int rowsAffected = preparedStatement.executeUpdate();
    	    
    	    
    	    // Check the number of rows affected to determine if the delete was successful
    	    conn.close();
    	    return rowsAffected;
    	}catch (SQLException e) {
    	    e.printStackTrace();
    	    return -1;
    	} 
    }
    
    
    public int insertService(String location, String mileageStr, String vehicle_no, String message, String userName, String dateStr, String timeStr) throws ParseException, ClassNotFoundException {
    	  
    	 int mileage = Integer.parseInt(mileageStr);
         
 	    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
 	    Date date = dateFormat.parse(dateStr);
 	    
 	    Time time = null;

 	    try {
 	        // Check if the timeStr matches the expected format "hh:mm"
 	        if (timeStr.matches("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")) {
 	            // If it matches, add ":00" to the end of the string to match SQL TIME format
 	            timeStr += ":00";
 	            // Create a Time object
 	            time = Time.valueOf(timeStr);
 	        } else {
 	            // Handle invalid time format
 	        	return -1;
 	            }
 	    } catch (IllegalArgumentException e) {
 	    	return -2;
 	     }

     

         try {
        	 Class.forName("com.mysql.cj.jdbc.Driver");
 		    
     		// Establish a database connection
     		Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
     			
             
             // Create a SQL INSERT statement
              String sql = "INSERT INTO vehicle_service (date, time, location, mileage, vehicle_no, message, username) VALUES (?, ?, ?, ?, ?, ?, ?)";
             
             // Create a PreparedStatement
             PreparedStatement preparedStatement = conn.prepareStatement(sql);
             
             // Set the parameter values
            preparedStatement.setDate(1, new java.sql.Date(date.getTime())); // Current date
             preparedStatement.setTime(2, time); // Current time
             preparedStatement.setString(3, location);
             preparedStatement.setInt(4, mileage);
             preparedStatement.setString(5, vehicle_no);
             preparedStatement.setString(6, message);
             preparedStatement.setString(7, userName);
             // Execute the INSERT statement
             int rowsInserted = preparedStatement.executeUpdate();
             conn.close();
             
             // Check if the insertion was successful
            return rowsInserted;
             // Close the database connection
           
         } catch (SQLException e) {
             e.printStackTrace();
             
             return -1;
         }
    }

    public List<String> JavaToJavaScript(ResultSet resultSet) throws SQLException{
    	
    	 // Create a List to hold JavaScript objects
        List<String> javascriptObjects = new ArrayList<>();

        while (resultSet.next()) {
            // Retrieve data from the ResultSet and construct a JavaScript object
            int bookingId = resultSet.getInt("booking_id");
            String date = resultSet.getString("date");
            String time = resultSet.getString("time"); // Adjust type based on your data
            String location = resultSet.getString("location");
            int mileage = resultSet.getInt("mileage");
            String vehicleNo = resultSet.getString("vehicle_no");
            String message1 = resultSet.getString("message");

            // Construct a JavaScript object using JSON-like notation
            String javascriptObject = String.format("{\"bookingId\": %d, \"date\": \"%s\", \"time\": \"%s\", \"location\": \"%s\", \"mileage\": %d, \"vehicleNo\": \"%s\", \"message\": \"%s\"}",
                    bookingId, date, time, location, mileage, vehicleNo, message1);

            javascriptObjects.add(javascriptObject);

        }
        return javascriptObjects;
        
    	
    }
    
}
