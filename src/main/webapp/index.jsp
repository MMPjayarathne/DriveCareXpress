<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">

<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	
<link rel="stylesheet" href="css/style.css">

<title>DriveCareXpress</title>

</head>
<body class="img js-fullheight" style="background-image: url(images/background2.jpg);">
	<section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Welcome to DriveCareXpress</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0">
		      	<h3 class="mb-4 text-center">Sign In using Asgardeo</h3>
		      	
	            <div class="form-group">
	            	<button type="button" onclick="window.location.href='https://api.asgardeo.io/t/learnmasith/oauth2/authorize?response_type=code&client_id=EGjadG6IuA1nPWue_CiKusnbBu8a&scope=openid%20email%20phone%20profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FDriveCareXpress%2Fauthorize.jsp'" class="form-control btn btn-primary submit px-3">Sign In</button>
	            	
	            </div>
	  
	          <p class="w-100 text-center">&mdash; Don't have an Asgardeo Account &mdash;</p>
	          <div class="social d-flex text-center">
	          	<a href="https://console.asgardeo.io/" class="px-2 py-2 mr-md-1 rounded"><span class="ion-logo-facebook mr-2"></span> Create</a>
	          </div>
		      </div>
				</div>
			</div>
		</div>
	</section>


	</body>
</html>