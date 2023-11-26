/**
 * 
 */

        const accessToken = localStorage.getItem('access_token');
       	 var username = null;
        if(accessToken){
        	
        var settings = {
            "url": infoUrl,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + accessToken
            },
        };

        $.ajax(settings)
            .done(function (response) {
                //console.log(response);
                username =  response.username;
                var given_name = response.given_name;
                var phone = response.phone_number;
                var email = response.email;
                var parts = given_name.split(' ');
                var firstName = parts[0];
                var address = response.address;
                var country = address.country;
                //console.log(country);
                document.getElementById('givenName').textContent = given_name;
                document.getElementById('name').textContent = firstName;
                document.getElementById('email').textContent = email;
                document.getElementById('phone').textContent = phone;
                document.getElementById('country').textContent = country;
                
                document.getElementById('submit').addEventListener('click', function () {
                    // Set the username as a hidden field value in the form
                    document.getElementById('usernameField').value = username;
                 });
                  document.getElementById('delete').addEventListener('click', function () {
                    // Set the username as a hidden field value in the delete form
                    document.getElementById('usernameForDelete').value = username;
                 });
                
                
              
                
                //calling
                getReservation() 
                 
             
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
        
        
        
 // Function to load getReservation.js
function getReservation() {
    var script = document.createElement('script');
    script.src = "../js/getReservation.js";
    document.head.appendChild(script);
}       
       
      
        