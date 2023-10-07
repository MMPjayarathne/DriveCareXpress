  
  // Usage example
	const idToken = localStorage.getItem('access_token');
	
	const state = localStorage.getItem('state');

	
   document.getElementById("client-id").value = client_Id;
   document.getElementById("post-logout-redirect-uri").value = postLogoutRedirectUri;
   document.getElementById("state").value = state;