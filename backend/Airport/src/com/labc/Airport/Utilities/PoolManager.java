package com.labc.Airport.Utilities;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class PoolManager {
	private static PropertiesReader pr = PropertiesReader.getInstance();
	public static Pool pool;
	public static int minimum, maximum, increment;
	private static Object lock;
	
	public PoolManager(Object lock) {
		pool = Pool.getInstance(lock);
		PoolManager.lock = lock;
	}
	
	public static void loadProperties() {
		PoolManager.minimum = Integer.valueOf(pr.getValue("minimum"));
		PoolManager.maximum = Integer.valueOf(pr.getValue("maximum"));
		PoolManager.increment = Integer.valueOf(pr.getValue("increment"));
	}
	
	
	public Connection getConn(Client user) {
		Connection nextConn = null;
		synchronized(lock) {
			if(Pool.list.empty()) {
				if(Pool.activeConns <= PoolManager.maximum - PoolManager.increment)
					createConn(lock);
				else if(Pool.activeConns == PoolManager.maximum) {
					Pool.queue.add(user);
					try {
						lock.wait();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		}
		nextConn = Pool.list.pop();
		return nextConn;
	}
	
	private void createConn(Object lock) {
		System.out.println(Pool.activeConns);
		synchronized(lock) {
			for (int i = 0; i < PoolManager.increment; i++) {
				try {
					Connection conn = DriverManager.getConnection("jdbc:postgresql:"+pr.getValue("database")
					, pr.getValue("dbUser"), pr.getValue("dbPassword"));
					Pool.list.push(conn);
					Pool.activeConns++;
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
