package com.labc.Airport.Utilities;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpSession;

public class Client {
	private PoolManager pm;
	private Connection conn;
	public HttpSession session;
	private static PropertiesReader pr = PropertiesReader.getInstance();
	private static Encrypter encr = Encrypter.getInstance();
	private static Object lock = new Object();
	
	public Client() {
		this.pm = new PoolManager(lock);
		this.conn = this.getConnection();
	}
	
	public String login(Map<String,String[]> params) {
		String result = null;
		String useremail = params.get("email")[0].toLowerCase().trim();
		String password = params.get("password")[0];
		try {
			PreparedStatement stm = conn.prepareStatement(pr.getValue("check_if_user_exists_1"));
			stm.setString(1, useremail);
			ResultSet rs = stm.executeQuery();
			if(rs.next()) {					
				System.out.println("SUCIEDAD");
				System.out.println(rs.getString(1));
				if(rs.getString(2).equals(encr.encrypt(password))) {
					result = rs.getString(3);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		Pool.list.push(conn);
		if(Pool.queue.peek() != null) {
			Pool.queue.remove();
			lock.notify();
		}
		return result;
	}
	
	public boolean register(Map<String,String[]> params) {
		boolean result;
		String email = params.get("email")[0], password = params.get("password")[0],
				firstName = params.get("firstName")[0]/*, lastName = params.get("lastName")[0],
				city = params.get("city")[0], state = params.get("state")[0], country = params.get("country")[0],
				phoneNumber = params.get("phone")[0]*/;
		System.out.println(firstName);
		try {
			PreparedStatement stm = conn.prepareStatement(pr.getValue("create_new_user_1"));
			stm.setString(1, email.toLowerCase());
			stm.setString(2, encr.encrypt(password));
			stm.setString(3, firstName);
			/*stm.setString(4, lastName);
			stm.setString(5, city);
			stm.setString(6, state);
			stm.setString(7, null);
			stm.setBoolean(8, false);
			stm.setString(9, null);
			stm.setString(10, phoneNumber);
			stm.setString(11, null);
			stm.setString(12, country);*/
			if(stm.execute()) {
				result = true;
				Pool.list.push(conn);
				if(Pool.queue.peek() != null) {
					Pool.queue.remove();
					lock.notify();
				}
			}
			result = false;
		} catch (SQLException e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}

	private Connection getConnection() {
		return pm.getConn(this);
	}
}
