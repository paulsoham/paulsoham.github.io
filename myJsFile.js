const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const vehicleNo = urlParams.get('vehicleNo');

if(vehicleNo) {
	const arrTemp = arrJson.filter(obj => obj['Vehicle No.'] === vehicleNo.toString().trim());
	if(arrTemp.length > 0) {
		const dataObj = arrTemp[0];
		console.log("dataObj: " + JSON.stringify(dataObj));
		
		let validityTill = dataObj['Validity Till']
		//console.log("validityTill STRING: " + validityTill);
		validityTill = stringToDateTime(validityTill);
		//console.log("validityTill DATE: " + validityTill);
		if(validityTill && validityTill < new Date()) {
			//addError('e-Challan Validity Expired!');
		}
		
		for (const key in dataObj) {
			if (dataObj.hasOwnProperty(key)) {
				addRow(key.trim(), dataObj[key].trim()); //Adding row dynamically.
			}
		}
	}
	else {
		//addError('Invalid Vehicle No.!');
	}
}
else {
	//addError('Vehicle No. not provided!');
}

function stringToDateTime(dateTimeStr) { //SAMPLE: 21/10/2022 06:38 AM
    if(!dateTimeStr) return null;
    try {
        const arrTemp = dateTimeStr.split(" ");
        const arrDateParts = arrTemp[0].split("/").map(value => parseInt(value));
		const arrTimeParts = arrTemp[1].split(":").map(value => parseInt(value));
		if(arrTemp[2] === 'PM') arrTimeParts[0] = arrTimeParts[0] + 12;

        return new Date(arrDateParts[2], arrDateParts[1] - 1, arrDateParts[0], arrTimeParts[0], arrTimeParts[1]);
    }
    catch(e) {
        return null;
    }
}

// function addError(strErrorMsg) {
// 	let parent_container = document.getElementById('parentContainer');
// 	let error_text = document.createElement("p");
// 	error_text.setAttribute('class', 'error_text');
//     error_text.name = "error_text";
// 	error_text.innerHTML = strErrorMsg;
// 	parent_container.insertBefore(error_text, parent_container.children[1]);
// }

function addRow(strItemTitle, strItemValue) {
    let table = document.getElementById('item_table');
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
	row.setAttribute('class', 'item_tr');
    let item_td = row.insertCell(0);
	item_td.setAttribute('class', 'item_td');

	let item_title = document.createElement("span");
	item_title.setAttribute('class', 'item_title');
    item_title.name = "item_title_" + (rowCount + 1);
	item_title.innerHTML = strItemTitle;
	item_td.appendChild(item_title);

	let item_value = document.createElement("span");
	item_value.setAttribute('class', 'item_value');
    item_value.name = "item_value_" + (rowCount + 1);
	item_value.innerHTML = ': ' + strItemValue;
	item_td.appendChild(item_value);
}
