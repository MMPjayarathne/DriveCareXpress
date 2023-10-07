/**
 * 
 */

 		const introspectionEndpointUrl = 'https://api.asgardeo.io/t/learnmasith/oauth2/introspect';
        const accessToken = localStorage.getItem('access_token');
       
        if(accessToken){
        	
        var settings = {
            "url": "https://api.asgardeo.io/t/learnmasith/oauth2/userinfo",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + accessToken
            },
        };

        $.ajax(settings)
            .done(function (response) {
                console.log(response);
                var username =  response.username;
                var given_name = response.given_name;
                var phone = response.phone_number;
                var email = response.email;
                var parts = given_name.split(' ');
                var firstName = parts[0];
                document.getElementById('givenName').textContent = given_name;
                document.getElementById('name').textContent = firstName;
                document.getElementById('email').textContent = email;
                document.getElementById('phone').textContent = phone;
                
                document.getElementById('submit').addEventListener('click', function () {
                    // Set the username as a hidden field value in the form
                    document.getElementById('usernameField').value = username;
                 });
                
                document.getElementById('pastRes').addEventListener('click', function () {
                    // Set the username as a hidden field value in the form
                    document.getElementById('usernameField2').value = username;
                   
                });
                document.getElementById('futureRes').addEventListener('click', function () {
                    // Set the username as a hidden field value in the form
                    document.getElementById('usernameField3').value = username;
                   
                });
                 
             
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                // Handle any errors here
                console.error('Error:', errorThrown);
                alert("Error in the authorization. Login again!");
                window.location.href = "../index.jsp";
            });
        }
        else{
        	window.location.href = "../index.jsp";	
        }
        
        
      
        