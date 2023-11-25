<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList, java.sql.*, java.util.List, com.services.jsp.*, org.json.simple.JSONArray, org.json.simple.JSONObject" %>

<%
    if (request.getParameter("username") != null) {
        ServiceDAO service = new ServiceDAO();
        List<String> PastResultSetData = new ArrayList<>();
        List<String> futureResultSetData = new ArrayList<>();
        JSONObject jsonObject = new JSONObject();
        JSONArray pastJsonArray = new JSONArray();
        JSONArray futureJsonArray = new JSONArray();
        //System.out.println("username: "+username);
        try {
            String username = request.getParameter("username");
            System.out.println("username: "+username);
            ResultSet pastResultSet = service.getPastServices(username);
            ResultSet futureResultSet = service.getFutureServices(username);

            PastResultSetData = service.JavaToJavaScript(pastResultSet);
            futureResultSetData = service.JavaToJavaScript(futureResultSet);

            if (PastResultSetData == null) {
                PastResultSetData = new ArrayList<>();
            }
            if (futureResultSetData == null) {
                futureResultSetData = new ArrayList<>();
            }

            for (String data : PastResultSetData) {
                pastJsonArray.add(data);
            }
            for (String data : futureResultSetData) {
                futureJsonArray.add(data);
            }

            jsonObject.put("PastResultSetData", pastJsonArray);
            jsonObject.put("futureResultSetData", futureJsonArray);
            System.out.println("jsonObject: "+jsonObject);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(jsonObject.toJSONString());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
%>