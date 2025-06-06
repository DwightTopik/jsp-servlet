package ru.vsu.cs.dao;

import ru.vsu.cs.model.Passenger;

import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class PassengerDAO {
	private static final String DB_URL = loadDbUrl();

	private static String loadDbUrl() {
		try (InputStream input = PassengerDAO.class.getClassLoader().getResourceAsStream("config.properties")) {
			Properties prop = new Properties();
			prop.load(input);
			return prop.getProperty("db.url");
		} catch (Exception e) {
			throw new RuntimeException("Не удалось загрузить config.properties", e);
		}
	}

	public static Connection connect() throws SQLException {
		return DriverManager.getConnection(DB_URL);
	}

	public static List<Passenger> getAllPassengers() {
		List<Passenger> passengers = new ArrayList<>();
		String query = "SELECT * FROM passengers";

		try (Connection conn = connect();
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(query)) {

			while (rs.next()) {
				Passenger passenger = new Passenger(rs.getInt("id"), rs.getString("username"), rs.getString("fullName"),
						rs.getInt("age"), rs.getString("dob"), rs.getString("gender"), rs.getString("address"),
						rs.getString("contact"), rs.getString("idProof"));
				passengers.add(passenger);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return passengers;
	}

	public static boolean addPassenger(Passenger passenger) {
		String sql = "INSERT INTO passengers (username, fullName, age, dob, gender, address, contact, idProof) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

		try (Connection conn = connect(); PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, passenger.getUsername());
			stmt.setString(2, passenger.getFullName());
			stmt.setInt(3, passenger.getAge());
			stmt.setString(4, passenger.getDob());
			stmt.setString(5, passenger.getGender());
			stmt.setString(6, passenger.getAddress());
			stmt.setString(7, passenger.getContact());
			stmt.setString(8, passenger.getIdProof());

			return stmt.executeUpdate() > 0;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

		public static boolean deletePassenger(int id) {
		String sql = "DELETE FROM passengers WHERE id = ?";

		try (Connection conn = connect(); PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			return stmt.executeUpdate() > 0;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

		public static int getPassengerCount() {
		int count = 0;
		try {
			Class.forName("org.sqlite.JDBC");
			Connection conn = DriverManager.getConnection(DB_URL);
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT COUNT(*) AS total FROM passengers");

			if (rs.next()) {
				count = rs.getInt("total");
			}

			rs.close();
			stmt.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}

		public static List<Passenger> searchPassengers(String keyword) {
		List<Passenger> passengers = new ArrayList<>();
		String query = "SELECT * FROM passengers WHERE username LIKE ? OR fullName LIKE ?";

		try (Connection conn = connect(); PreparedStatement stmt = conn.prepareStatement(query)) {

			stmt.setString(1, "%" + keyword + "%");
			stmt.setString(2, "%" + keyword + "%");
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				Passenger passenger = new Passenger(rs.getInt("id"), rs.getString("username"), rs.getString("fullName"),
						rs.getInt("age"), rs.getString("dob"), rs.getString("gender"), rs.getString("address"),
						rs.getString("contact"), rs.getString("idProof"));
				passengers.add(passenger);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return passengers;
	}
	
	public static int getPassengerId(String usernameOrName) {
        String sql = "SELECT id FROM passengers WHERE username = ? OR fullName = ?";
        try (Connection conn = connect(); 
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usernameOrName);
            stmt.setString(2, usernameOrName);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt("id");             }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;     }

	public static boolean updatePassenger(Passenger passenger) {
	    Connection conn = null;
	    PreparedStatement pstmt = null;
	    boolean updated = false;

	    try {
	        conn = connect();
	        String sql = "UPDATE passengers SET username=?, fullName=?, age=?, dob=?, gender=?, address=?, contact=?, idProof=? WHERE id=?";
	        pstmt = conn.prepareStatement(sql);
	        pstmt.setString(1, passenger.getUsername());
	        pstmt.setString(2, passenger.getFullName());
	        pstmt.setInt(3, passenger.getAge());
	        pstmt.setString(4, passenger.getDob());
	        pstmt.setString(5, passenger.getGender());
	        pstmt.setString(6, passenger.getAddress());
	        pstmt.setString(7, passenger.getContact());
	        pstmt.setString(8, passenger.getIdProof());
	        pstmt.setInt(9, passenger.getId());

	        int rowsUpdated = pstmt.executeUpdate();
	        updated = rowsUpdated > 0;

	    } catch (SQLException e) {
	        e.printStackTrace();
	    } 
	    
	    return updated;
	}

	public static Passenger getPassengerById(int id) {
	    String sql = "SELECT * FROM passengers WHERE id = ?";
	    try (Connection conn = connect();
	         PreparedStatement stmt = conn.prepareStatement(sql)) {

	        stmt.setInt(1, id);
	        ResultSet rs = stmt.executeQuery();

	        if (rs.next()) {
	            return new Passenger(
	                rs.getInt("id"),
	                rs.getString("username"),
	                rs.getString("fullName"),
	                rs.getInt("age"),
	                rs.getString("dob"),
	                rs.getString("gender"),
	                rs.getString("address"),
	                rs.getString("contact"),
	                rs.getString("idProof")
	            );
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return null; 	}

}
