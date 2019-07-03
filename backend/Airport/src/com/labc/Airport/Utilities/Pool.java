package com.labc.Airport.Utilities;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;


public class Pool {
	public static Stack<Connection> list = new Stack<Connection>();
	private static Pool instance;
	public static int activeConns = 0;
	public static Queue<Client> queue = new LinkedList<>();
	
	private Pool() {
		try {
			Class.forName("org.postgresql.Driver");
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
			System.out.println("You must have JDBC Driver installed in the JVM.");
		}
		PoolManager.loadProperties();
		initialize();
	}
	
	private void initialize() {
		PropertiesReader propRead = PropertiesReader.getInstance();
		for(int i = 0; i < PoolManager.minimum;i++) {
			try {
				Connection conn = DriverManager.getConnection("jdbc:postgresql:"+propRead.getValue("database"),
						propRead.getValue("dbUser"), propRead.getValue("dbPassword"));
				list.push(conn);
				activeConns++;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	public static Pool getInstance(Object lock) {
		synchronized(lock) {
			if(Pool.instance == null) {
				Pool.instance = new Pool();
			}
			return Pool.instance;
		}
	}


}
