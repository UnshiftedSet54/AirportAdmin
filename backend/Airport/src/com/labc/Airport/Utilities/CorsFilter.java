package com.labc.Airport.Utilities;

import javax.servlet.http.HttpServletResponse;

public class CorsFilter {
	
	public static void setHeaders(HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
	}
}