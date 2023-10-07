  const endpointUrl = "https://api.asgardeo.io/t/learnmasith/oidc/logout";
  // Usage example
	const idToken = localStorage.getItem('access_token');
	const postLogoutRedirectUri = "http://localhost:8080/DriveCareXpress/index.jsp";
	const state = localStorage.getItem('state');
	var client_Id = 'EGjadG6IuA1nPWue_CiKusnbBu8a';
	
   document.getElementById("client-id").value = client_Id;
   document.getElementById("post-logout-redirect-uri").value = postLogoutRedirectUri;
   document.getElementById("state").value = state;