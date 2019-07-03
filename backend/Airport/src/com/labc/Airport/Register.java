package com.labc.Airport;

import java.io.IOException;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.labc.Airport.Utilities.Client;
import com.labc.Airport.Utilities.Pool;

@WebServlet("/Register")
@MultipartConfig()
public class Register extends HttpServlet {
	private Client cli;
	private static final long serialVersionUID = 1L;
       
    public Register() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map<String,String[]> params = request.getParameterMap();
		Object lock = new Object();
		Pool.getInstance(lock);
		cli = new Client();
		cli.register(params);
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
