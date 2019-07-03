package com.labc.Airport;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.labc.Airport.Utilities.Client;

@WebServlet("/Login")
@MultipartConfig()
public class Login extends HttpServlet {
	private Client cli;
	private static final long serialVersionUID = 1L;
       
    public Login() {
        super();
    }
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map<String,String[]> params = request.getParameterMap();
		cli = new Client();
		String userFirstName = cli.login(params);
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Content-Type", "text/plain");
		PrintWriter out = response.getWriter();
		System.out.print(userFirstName);
		if(userFirstName != null) {	
			HttpSession session = request.getSession(true);
			session.setAttribute("username", userFirstName);
			out.write("Welcome " + userFirstName);
		}
		else 
			out.write("Incorrect e-mail/password");
		
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
