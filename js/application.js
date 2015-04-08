data = [
	{ name: "Mark-Paul Gosselaar", photo_url: "img/default.png" },
	{ name: "Delta Burke", photo_url: "img/avatars/delta.png" },
	{ name: "Alf", photo_url: "img/avatars/alf.png" },
	{ name: "Jaleel White", photo_url: "img/avatars/jaleel.png" },
	{ name: "Ralph Macchio", photo_url: "img/avatars/ralph.png" },
	{ name: "Candace Cameron", photo_url: "img/avatars/candace.png" },
	{ name: "Patrick Duffy", photo_url: "img/avatars/pduff.png" },
	{ name: "Arnold Schwartzengger", photo_url: "img/avatars/arnold.png" }
];


$(document).ready(function() {
	/*
	   Start up
	*/
	function initApplication() {
		data.reverse();
		updateEmployeeList();
		initForm();
	}

	/*
	   Update templated list and add click handlers for the close buttons
	*/
	function updateEmployeeList() {
		var employeeList = $('ul[js-id="employee-list"]');
		var employeeListItems = "<% _.each(employees, function(employee) { %><li class='employee-list-item'><i class='close'></i><div class='inner'><img src='<%= employee.photo_url %>' alt='<%= employee.name %>'><div class='name-container'><%= employee.name %></div></div></li><% }); %>";
		var employeeListTemplate = _.template(employeeListItems, {employees : data});
		employeeList.html(employeeListTemplate);

		$('.close').click(function(e) {
			/*
			   Remove record if name matches
			*/
			var matchedName = $(this).parent().find('.name-container').text();
			data = $.grep(data, function(e) {
     			return e.name != matchedName;
			});
			updateEmployeeList();
		});
	}

	/*
	   Watch for form submit
	*/
	function initForm() {
		var defaultPhoto = "img/default.png";
		var nameField = $('input[name="name"]');
		var urlField = $('input[name="photo_url"]');
		var button = $("button");

		/*
		   Button handler also updates list with new data
		*/
		button.click(function(e) {
			e.preventDefault();
			var nameFieldVal = nameField.val() != "" ? nameField.val() : "Random Name " + $.now();
			var urlFieldVal = urlField.val() != "" ? urlField.val() : defaultPhoto;
			var employeeListItem = {
				name: nameFieldVal,
				photo_url: urlFieldVal,
			};
			data.unshift(employeeListItem);
			updateEmployeeList();
		});
	}

	initApplication();
});

