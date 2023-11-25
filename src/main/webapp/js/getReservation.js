var refreshInterval;

function clearTable(tableId) {
    var table = document.getElementById(tableId);
    var rows = table.getElementsByTagName('tr');

    // Start from the end to avoid modifying the array while iterating
    for (var i = rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function updateReservations() {
    $.ajax({
        url: 'fetchData.jsp', // URL to your server-side script that fetches updated data
        method: 'GET',
        data: { username: username },
        dataType: 'json',
        success: function(response) {
            //console.log(response);
            if (response.pastResultSetData !== undefined) {
                var pastReservations = response.pastResultSetData;
                // Update past reservations table
                var pastTable = document.getElementById("pastTable");
				clearTable('pastTable');
               	pastReservations.forEach(function(reservation) {
		         var row = pastTable.insertRow();
		         var data;
		            try {
		                // Replace single quotes with double quotes for date and time properties
		                data = JSON.parse(reservation.replace(/date: '([^']*)'/g, '"date": "$1"').replace(/time: '([^']*)'/g, '"time": "$1"'));
		            } catch (e) {
		                console.error('Error parsing JSON:', e);
		                console.log('Invalid JSON:', reservation); // Log the invalid JSON string
		                return;
		            }
		
		            // Define the keys to populate the table
		            var keys = ['bookingId', 'date', 'time', 'location', 'mileage', 'vehicleNo', 'message'];
		
		            keys.forEach(function(key) {
		                var cell = row.insertCell();
		                cell.innerHTML = data[key]; // Get the value of each key
		            });
		        });
            }

            if (response.futureResultSetData !== undefined) {
                var futureReservations = response.futureResultSetData;
               // console.log('Updated futureReservations:', futureReservations);
                // Update future reservations table
                var futureTable = document.getElementById("futureTable");
                 // Clear previous data
               // Clear previous data
               clearTable('futureTable');
				futureReservations.forEach(function(reservation) {
				    var row = futureTable.insertRow();
				    var data;
				
				    try {
				        // Clean the reservation string to replace bad control characters that might cause issues with JSON parsing
				        var cleanedReservation = reservation.replace(/[\u0000-\u001F]+/g, ""); // Replace control characters
				        data = JSON.parse(cleanedReservation.replace(/date: '([^']*)'/g, '"date": "$1"').replace(/time: '([^']*)'/g, '"time": "$1"'));
				    } catch (e) {
				        console.error('Error parsing JSON:', e);
				        console.log('Invalid JSON:', reservation); // Log the invalid JSON string
				        return;
				    }
				
				    // Define the keys to populate the table
				    var keys = ['bookingId', 'date', 'time', 'location', 'mileage', 'vehicleNo', 'message'];
				
				    keys.forEach(function(key) {
				        var cell = row.insertCell();
				        cell.innerHTML = data[key]; // Get the value of each key
				    });
				    
				     // Add the delete button in the last column
				    var deleteCell = row.insertCell();
				    var deleteButton = document.createElement('button');
				    deleteButton.setAttribute('class', 'delete');
				    deleteButton.setAttribute('onclick', `document.getElementById('id01').style.display='block'; document.getElementById('bookingID').value = ${data.bookingId};`);
				    deleteButton.innerHTML = 'Delete';
				    deleteCell.appendChild(deleteButton);
				});

            }

            // Clear the interval after data is fetched once
            clearInterval(refreshInterval);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

// Start periodic updates
$(document).ready(function() {
    updateReservations(); // Initial data fetch
    refreshInterval = setInterval(updateReservations, 5000); // 5000 milliseconds = 5 seconds
});



