<%@ page language="java" contentType="text/html; charset=ISO-8859-1"   pageEncoding="ISO-8859-1"%>

<%
	
		String code = request.getParameter("code");
	
	// Retrieve the 'session_state' parameter from the URL
		String sessionState = request.getParameter("session_state");
	

%>
<!DOCTYPE html>
<html>
<head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <script type="text/javascript">
        // Function to make a POST request
        function makePostRequest() {
            // Define the URL
            var url = 'https://api.asgardeo.io/t/learnmasith/oauth2/token';

            var code = encodeURIComponent('<%= code %>');
            var sessionState = encodeURIComponent('<%= sessionState %>');
            var client_Id = 'EGjadG6IuA1nPWue_CiKusnbBu8a';
            var client_secret = 'VG4Ci2N7JaEGxXreq6tRs4lj48MEbBkYYc2qAF0iHhka';
            var redirect_uri = 'http://localhost:8080/DriveCareXpress/authorize.jsp';

            // Define the request body parameters
            var bodyParams = new URLSearchParams();
            bodyParams.append('code', code);
            bodyParams.append('grant_type', 'authorization_code');
            bodyParams.append('client_id', client_Id);
            bodyParams.append('client_secret', client_secret);
            bodyParams.append('redirect_uri', redirect_uri);

            // Define the request options
            var requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: bodyParams.toString() // Convert bodyParams to a string
            };

            // Make the POST request using jQuery AJAX
            $.ajax(url, requestOptions)
                .done(function (data) {
                    // Handle the response data here
                    console.log(data.access_token);
                    var access_token  = data.access_token;
                   	var id_token = data.id_token;
   
                    var settings = {
                    	    "url": "https://api.asgardeo.io/t/learnmasith/oauth2/userinfo",
                    	    "method": "GET",
                    	    "timeout": 0,
                    	    "headers": {
                    	        "Authorization": "Bearer "+ access_token
                    	    },
                    	};

                    	$.ajax(settings).done(function (response) {
                    	    console.log(response);
                    	});
                    console.log(data);
                })
                .fail(function (error) {
                    // Handle any errors here
                    console.error('Error:', error);
                });
        }

        // Call the function to make the POST request
        makePostRequest();
    </script>
</body>
</html>
